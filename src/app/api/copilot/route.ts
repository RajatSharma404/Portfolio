import { NextRequest } from "next/server";
import { getClientKey, isRateLimited } from "@/lib/rate-limit";

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
  let body: { question?: string };
  try {
    body = (await req.json()) as { question?: string };
  } catch {
    return new Response("Invalid JSON request body.", { status: 400 });
  }
  const prompt = body.question?.trim() ?? "";

  if (!prompt) {
    return new Response("Please provide a question.", { status: 400 });
  }

  const clientKey = getClientKey(req);
  if (isRateLimited(clientKey, 8, 60 * 1000)) {
    return new Response(
      "Too many questions in a short period. Please wait a minute before asking Copilot again.",
      { status: 429, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  const directReply = promptReply(prompt);
  if (directReply) {
    return new Response(directReply, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  function getContextualFallback(rawPrompt: string): string {
    const p = rawPrompt.toLowerCase();
    if (p.includes("dsa") || p.includes("leetcode") || p.includes("problem")) {
      return "Rajat has solved 500+ LeetCode problems primarily in C++, with an active 100+ day streak and top 10% global ranking. Check skills.json in the sidebar to explore his topic mastery clusters!";
    }
    if (p.includes("project") || p.includes("build") || p.includes("portfolio")) {
      return "Rajat has built 15+ full-stack and AI applications including DSA Tracker, Expense Tracker, and Weather Forecast App. Head over to projects.js to inspect the source code and live demos.";
    }
    if (p.includes("stack") || p.includes("tech") || p.includes("language") || p.includes("framework")) {
      return "Rajat's core stack spans C++, TypeScript, React 19, Next.js 16, Node.js, FastAPI, PostgreSQL, and Google Gemini AI. Open package.json or skills.json for the full breakdown.";
    }
    if (p.includes("intern") || p.includes("hire") || p.includes("job") || p.includes("work") || p.includes("available")) {
      return "Yes! Rajat is actively seeking software engineering internships and collaborative full-stack opportunities. Drop him a message via contact.css or LinkedIn!";
    }
    if (p.includes("education") || p.includes("college") || p.includes("degree") || p.includes("university")) {
      return "Rajat is currently pursuing his B.Tech in Computer Science & Engineering (2023-2027) at Kanpur Institute of Technology. Check experience.ts for details!";
    }
    return "I'm Rajat's Portfolio Copilot! You can ask me about his 500+ LeetCode milestones, full-stack projects, tech stack, or engineering internship availability. Or type /projects, /contact, or /resume to navigate.";
  }

  // 1. Google Gemini 2.5 Flash (Primary AI Provider)
  const geminiKey = process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text: `${systemPrompt}\n\nProfile context:\n${profileContext}`,
                },
              ],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              maxOutputTokens: 350,
              temperature: 0.7,
            },
          }),
        },
      );

      if (geminiRes.ok) {
        const data = (await geminiRes.json()) as {
          candidates?: Array<{
            content?: {
              parts?: Array<{ text?: string }>;
            };
          }>;
        };
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          return new Response(text, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }
      }
    } catch {
      // Fall through to secondary provider or fallback
    }
  }

  // 2. Anthropic Claude (Secondary AI Provider)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    try {
      const anthropicResponse = await fetch(
        "https://api.anthropic.com/v1/messages",
        {
          method: "POST",
          headers: {
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 400,
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

      if (anthropicResponse.ok) {
        const data = (await anthropicResponse.json()) as {
          content?: Array<{ type: string; text?: string }>;
        };

        const answer =
          data.content
            ?.filter((chunk) => chunk.type === "text")
            .map((chunk) => chunk.text ?? "")
            .join("")
            .trim();

        if (answer) {
          return new Response(answer, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }
      }
    } catch {
      // Fall through to fallback
    }
  }

  // 3. Dynamic Contextual Fallback (always works offline/demo)
  const fallback = getContextualFallback(prompt);
  return new Response(fallback, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
