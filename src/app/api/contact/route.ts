import { NextRequest } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const requestBuckets = new Map<string, number[]>();

const getClientKey = (req: NextRequest) => {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (clientKey: string) => {
  const now = Date.now();
  const recent = (requestBuckets.get(clientKey) ?? []).filter(
    (ts) => now - ts < RATE_WINDOW_MS,
  );

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    requestBuckets.set(clientKey, recent);
    return true;
  }

  recent.push(now);
  requestBuckets.set(clientKey, recent);
  return false;
};

const sendViaResend = async ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!resendApiKey || !to) {
    return { attempted: false, ok: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  });

  return { attempted: true, ok: res.ok, status: res.status };
};

export async function POST(req: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const website = payload.website?.trim() ?? "";

  if (website) {
    return Response.json({ ok: true, message: "Thanks for your message." });
  }

  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey)) {
    return Response.json(
      {
        ok: false,
        error: "Too many requests. Please wait a few minutes and try again.",
      },
      { status: 429 },
    );
  }

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (message.length > 3000) {
    return Response.json(
      { ok: false, error: "Message is too long (max 3000 characters)." },
      { status: 400 },
    );
  }

  try {
    const resendResult = await sendViaResend({ name, email, message });
    if (resendResult.attempted) {
      if (resendResult.ok) {
        return Response.json({
          ok: true,
          message: "Message sent successfully.",
        });
      }

      return Response.json(
        {
          ok: false,
          error: `Email delivery failed with status ${resendResult.status}.`,
        },
        { status: 502 },
      );
    }
  } catch {
    return Response.json(
      { ok: false, error: "Network error while sending email." },
      { status: 502 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    return Response.json({
      ok: true,
      message:
        "Message received in local mode. Set CONTACT_WEBHOOK_URL to deliver externally.",
    });
  }

  try {
    const forwardRes = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "portfolio-contact",
        timestamp: new Date().toISOString(),
        name,
        email,
        message,
      }),
    });

    if (!forwardRes.ok) {
      return Response.json(
        {
          ok: false,
          error: `Webhook delivery failed with status ${forwardRes.status}.`,
        },
        { status: 502 },
      );
    }

    return Response.json({ ok: true, message: "Message sent successfully." });
  } catch {
    return Response.json(
      { ok: false, error: "Network error while sending message." },
      { status: 502 },
    );
  }
}
