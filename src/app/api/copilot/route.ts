import { NextRequest } from "next/server";

const profileContext = `
Name: Rajat Sharma
Role: Full Stack Developer, AI/ML Learner, and DSA Enthusiast
Education: Kanpur Institute of Technology, B.Tech CSE (2023-2027)
Skills: Full Stack Development, AI/ML, DSA, React, Next.js, Node.js, TypeScript, Python, C++, Java, PostgreSQL
Availability: Open to internships, collaborations, and interesting engineering problems
Tone: professional, conversational, witty, and code-aware
`;

const systemPrompt = `
You are Rajat's Portfolio Copilot, an intelligent, witty, and technically-minded assistant embedded in Rajat Sharma's VS Code-themed portfolio.

Rules:
- Answer as the expert on Rajat's projects, skills, and education.
- Keep replies concise: 2 to 3 sentences max unless the user asks for a deep dive.
- Use light coding metaphors naturally, but do not sound generic or corporate.
- If you do not know a specific detail, tell the user to check README.md or experience.ts in the sidebar.
- If the user types /projects, /contact, or /resume, tell them exactly which sidebar file to click.
- Always encourage them to reach out via contact.css or the social links at the bottom.
- If the user asks for dark mode or light mode, reply exactly: I'm a developer—I only live in Dark+. Check the theme chip in the top-right.
`;

const commandReplies: Record<string, string> = {
  "/projects":
    "Open projects.js in the sidebar to inspect Rajat's featured work.",
  "/contact":
    "Open contact.css in the sidebar for contact details, then check the social links at the bottom.",
  "/resume": "Open resume.pdf from the sidebar to view the resume.",
};

const promptReply = (rawPrompt: string) => {
  const prompt = rawPrompt.trim();
  const normalized = prompt.toLowerCase();

  if (commandReplies[normalized]) {
    return commandReplies[normalized];
  }

  if (normalized.includes("dark mode") || normalized.includes("light mode")) {
    return "I'm a developer—I only live in Dark+. Check the theme chip in the top-right.";
  }

  return null;
};

export async function POST(req: NextRequest) {
  const { question } = (await req.json()) as { question?: string };
  const prompt = question?.trim() ?? "";

  if (!prompt) {
    return new Response("Please provide a question.", { status: 400 });
  }

  const directReply = promptReply(prompt);
  if (directReply) {
    return new Response(directReply, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    const fallback =
      promptReply(prompt) ??
      "Rajat is a full-stack developer, AI/ML learner, and DSA enthusiast. Check README.md or experience.ts for the detailed breakdown, and contact.css for the reach-out path.";

    return new Response(fallback, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const anthropicResponse = await fetch(
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 500,
        system: `${systemPrompt}\n\nProfile context:\n${profileContext}`,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  if (!anthropicResponse.ok) {
    const errorMsg = `Sorry, the Copilot API encountered an error. Try refreshing your browser or ask again in a moment. (${anthropicResponse.status})`;
    return new Response(errorMsg, { status: 500 });
  }

  const data = (await anthropicResponse.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };

  const answer =
    data.content
      ?.filter((chunk) => chunk.type === "text")
      .map((chunk) => chunk.text ?? "")
      .join("") ?? "No response.";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let i = 0;
      const step = () => {
        const part = answer.slice(i, i + 3);
        if (!part) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(part));
        i += 3;
        setTimeout(step, 24);
      };
      step();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
