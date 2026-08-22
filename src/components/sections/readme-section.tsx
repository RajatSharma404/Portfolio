"use client";

import React from "react";
import { Terminal, Layers, Sparkles, Cpu, Palette, Volume2 } from "lucide-react";

export function ReadmeSection() {
  const highlights = [
    {
      icon: <Layers size={16} className="text-cyan-400" />,
      title: "Dual View & Split Screen Engine",
      desc: "Instant switching between rendered Preview, syntax-highlighted Code with line numbers & 1-click Copy, and desktop Split View.",
    },
    {
      icon: <Sparkles size={16} className="text-amber-400" />,
      title: "LeetCode Pulse & 500+ Solved",
      desc: "Concentric SVG circular difficulty rings (Easy 220, Medium 250, Hard 30+) and 6 algorithmic topic mastery clusters.",
    },
    {
      icon: <Terminal size={16} className="text-emerald-400" />,
      title: "5-Tab Developer Console",
      desc: "Terminal shell with neofetch, matrix, git, and dino game, plus Problems (0 errors), Output, Debug Console, and Ports tabs.",
    },
    {
      icon: <Palette size={16} className="text-purple-400" />,
      title: "8 Iconic VS Code Themes",
      desc: "Instant theme switching between Dracula, Dark+, Monokai, One Dark Pro, Solarized, SynthWave '84, Tokyo Night, and GitHub Dark.",
    },
    {
      icon: <Volume2 size={16} className="text-blue-400" />,
      title: "Web Audio API Haptics",
      desc: "Zero-latency synthesized audio feedback for mechanical clicks, modal pops, and success chimes with status bar toggle.",
    },
    {
      icon: <Cpu size={16} className="text-rose-400" />,
      title: "Multi-Panel Activity Bar",
      desc: "Live File Explorer, Global Text Search with click-to-line highlight, Git Source Control, and Extensions Marketplace.",
    },
  ];

  const terminalCommands = [
    { cmd: "neofetch", desc: "Display ASCII developer & system specs" },
    { cmd: "matrix", desc: "Toggle animated digital green matrix stream" },
    { cmd: "dsa", desc: "Print 500+ LeetCode breakdown and patterns" },
    { cmd: "skills", desc: "Print full-stack technical competencies" },
    { cmd: "theme <name>", desc: "Switch theme (e.g. synthwave, tokyonight)" },
    { cmd: "git status", desc: "Check staged files and branch status" },
    { cmd: "play", desc: "Launch embedded Dino Runner game" },
    { cmd: "contact", desc: "Display email and social reach-out links" },
  ];

  return (
    <div className="px-5 py-5 md:px-8 select-text">
      <article className="space-y-6 rounded-[30px] border border-(--border) bg-[#10151f] p-6 md:p-8">
        {/* Header Banner */}
        <div className="rounded-2xl border border-white/8 bg-black/20 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[11px]">
            <span className="rounded-full bg-cyan-400/10 border border-cyan-400/30 px-2.5 py-0.5 text-cyan-200">
              Next.js 16.2.3
            </span>
            <span className="rounded-full bg-purple-400/10 border border-purple-400/30 px-2.5 py-0.5 text-purple-200">
              React 19
            </span>
            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 text-amber-200">
              500+ LeetCode Solved
            </span>
          </div>
          <h1 className="display-font mt-2 text-3xl text-[#f2f2f2] md:text-5xl font-bold">
            Rajat&apos;s VS Code Portfolio
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#a9a9a9] md:text-base">
            An authentic, feature-packed developer workspace engineered for Rajat Sharma.
            It blends a polished VS Code desktop IDE aesthetic with real-time GitHub telemetry,
            algorithmic DSA analytics, interactive terminal utilities, dual code/preview views,
            and Web Audio API haptics.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono font-bold">
            Key Architecture Features
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/8 bg-[#131b2a] p-4.5 space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h3 className="font-semibold text-xs text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[11px] text-[#a0aab8] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Terminal CLI Cheat Sheet */}
        <section className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
          <h2 className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono font-bold mb-3">
            Terminal CLI Command Suite
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {terminalCommands.map((item) => (
              <div
                key={item.cmd}
                className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5 font-mono text-xs"
              >
                <code className="text-cyan-300 font-bold">{item.cmd}</code>
                <span className="text-[11px] text-white/50">{item.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Two-Column Tech & Copilot Details */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono font-bold">
              Tech Stack
            </h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-[#d6d6d6] font-mono">
              <li>• Next.js 16.2.3 (App Router & Turbopack)</li>
              <li>• React 19.2.4 (Server Actions & Hooks)</li>
              <li>• TypeScript 5.0 (Strict Type Safety)</li>
              <li>• Tailwind CSS v4.0 (Design System & Tokens)</li>
              <li>• Framer Motion 12 (Spring Motion Engine)</li>
              <li>• Web Audio API (Synthesized Haptics)</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono font-bold">
              Keyboard Shortcuts
            </h3>
            <ul className="mt-3 space-y-2 text-xs md:text-sm text-[#d6d6d6] font-mono">
              <li>• <code className="text-cyan-300">Ctrl/Cmd + P</code> - Quick open file / command palette</li>
              <li>• <code className="text-cyan-300">Ctrl/Cmd + B</code> - Toggle sidebar</li>
              <li>• <code className="text-cyan-300">Ctrl/Cmd + `</code> - Toggle terminal panel</li>
              <li>• <code className="text-cyan-300">Ctrl/Cmd + Shift + P</code> - Theme picker dropdown</li>
              <li>• <code className="text-cyan-300">?</code> - Show shortcuts cheat sheet</li>
              <li>• <code className="text-cyan-300">Esc</code> - Close any active overlay or modal</li>
            </ul>
          </div>
        </section>

        {/* Getting Started & Structure */}
        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono font-bold">
              Getting Started
            </h3>
            <pre className="mt-3 overflow-x-auto code-font text-xs text-[#d6d6d6] bg-black/30 p-3.5 rounded-xl border border-white/5">
              {`# Clone and run locally
git clone https://github.com/RajatSharma404/Portfolio.git
cd Portfolio
npm install
npm run dev`}
            </pre>
          </div>

          <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-5">
            <h3 className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono font-bold">
              Project Structure
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-[#d6d6d6] font-mono">
              <li>• <code className="text-cyan-200">src/app/page.tsx</code> - Main IDE shell</li>
              <li>• <code className="text-cyan-200">src/context/</code> - Workspace context state</li>
              <li>• <code className="text-cyan-200">src/components/vscode/</code> - IDE shell UI</li>
              <li>• <code className="text-cyan-200">src/components/sections/</code> - Content views</li>
              <li>• <code className="text-cyan-200">src/lib/sound-effects.ts</code> - Audio engine</li>
            </ul>
          </div>
        </section>
      </article>
    </div>
  );
}
