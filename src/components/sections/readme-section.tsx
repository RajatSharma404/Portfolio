"use client";

import React from "react";

export function ReadmeSection() {
  const highlights = [
    "VS Code-style layout with explorer, tabs, terminal, and command palette",
    "Personalized sections for home, about, projects, skills, experience, and contact",
    "Built-in Copilot assistant with portfolio-aware responses",
    "Animated interactions powered by Framer Motion",
    "Responsive design tuned for desktop and mobile",
    "Dark-first visual system with custom typography and UI theming",
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <article className="space-y-6 rounded-[30px] border border-(--border) bg-[#10151f] p-6 md:p-8">
        <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f] font-mono">
            README.md
          </p>
          <h1 className="display-font mt-2 text-3xl text-[#f2f2f2] md:text-5xl font-bold">
            Rajat&apos;s Portfolio
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#a9a9a9] md:text-base">
            An interactive, VS Code-inspired portfolio for Rajat Sharma. It
            blends a polished developer workspace aesthetic with personal
            branding, project showcases, a terminal, a Copilot-style assistant,
            and smooth motion throughout the site.
          </p>
        </div>

        <section>
          <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
            Highlights
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-[#131b2a] px-4 py-3 text-xs md:text-sm text-[#d6d6d6] leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
              Tech Stack
            </h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-[#d6d6d6]">
              <li>• Next.js 16 (App Router)</li>
              <li>• React 19</li>
              <li>• TypeScript 5</li>
              <li>• Tailwind CSS v4</li>
              <li>• Framer Motion</li>
              <li>• Lucide React</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
              Copilot Tips
            </h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-[#d6d6d6]">
              <li>• <code className="text-cyan-300">/projects</code> - opens projects section guidance</li>
              <li>• <code className="text-cyan-300">/contact</code> - points to contact details</li>
              <li>• <code className="text-cyan-300">/resume</code> - points to resume.pdf in sidebar</li>
              <li>• Ask about dark mode: stays loyal to Dark+!</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
              Getting Started
            </h3>
            <pre className="mt-3 overflow-x-auto code-font text-xs md:text-sm text-[#d6d6d6] bg-black/30 p-3 rounded-xl border border-white/5">
              {`npm install
npm run dev`}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
              Project Structure
            </h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-[#d6d6d6]">
              <li>• <code className="text-cyan-200">src/app/page.tsx</code> - main portfolio IDE shell</li>
              <li>• <code className="text-cyan-200">src/context/</code> - workspace state context</li>
              <li>• <code className="text-cyan-200">src/components/vscode/</code> - IDE shell UI components</li>
              <li>• <code className="text-cyan-200">src/components/sections/</code> - content view components</li>
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}
