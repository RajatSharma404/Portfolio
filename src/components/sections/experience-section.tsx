"use client";

import React from "react";
import { Sparkles, GraduationCap, Code } from "lucide-react";

export function ExperienceSection() {
  const experienceItems = [
    {
      period: "June 2026 - Present",
      role: "Co-Founder & Frontend Engineer",
      org: "Pradite (Kanpur / New Delhi, India)",
      icon: <Sparkles size={14} className="text-amber-300" />,
      badge: "Co-Founder",
      desc: "Co-founded an in-browser code editor; engineered the core editor interface integrating Monaco Editor with token-stream parsing in React 19 and TypeScript. Built client-side cancellation tokens so user interrupts sever the WebSocket, preventing redundant model API consumption. Diagnosed and resolved UI memory leaks, eliminating frame drops during multi-file tab switching. Authored automated Vitest unit/integration test suites to enforce modular component contracts.",
      tags: ["React 19", "TypeScript", "Monaco Editor", "WebSockets", "Vitest", "In-Browser IDE"],
    },
    {
      period: "May 2026 - July 2026",
      role: "Software Engineer Intern",
      org: "Sparqor Technologies (Remote)",
      icon: <Code size={14} className="text-cyan-300" />,
      badge: "Internship",
      desc: "Shipped responsive client interfaces with automated session handling and Gemini AI integrations across production web platforms. Diagnosed and patched critical client runtime crashes, resolving asynchronous data-fetch exceptions to improve platform stability. Participated in system design and peer code reviews, ensuring strict TypeScript typing standards and clean component architecture.",
      tags: ["TypeScript", "React", "Gemini AI", "Session Handling", "Architecture", "Code Review"],
    },
    {
      period: "2025 - 2026",
      role: "Full-Stack Systems Creator",
      org: "Ghost AI, FitFlow & 3D Portfolio",
      icon: <Sparkles size={14} className="text-emerald-300" />,
      badge: "Flagship Projects",
      desc: "Engineered Ghost AI (real-time collaborative DAG canvas using Next.js 16, React Flow, and Liveblocks WebSockets), FitFlow (progression platform with Monaco Editor custom Vim keybindings, Prisma, and Docker Compose), and Interactive 3D Portfolio with Three.js WebGL and GSAP.",
      tags: ["Next.js 16", "React 19", "Three.js", "Monaco Editor", "Liveblocks", "Prisma", "Docker"],
    },
    {
      period: "2023 - 2027",
      role: "B.Tech in Computer Science & Engineering",
      org: "Kanpur Institute of Technology (CGPA: 7.2 / 10.0)",
      icon: <GraduationCap size={14} className="text-purple-300" />,
      badge: "Academics & DSA",
      desc: "Solved 160+ data structures and algorithms challenges across LeetCode and Codeforces focusing on Dynamic Programming, Graphs, Trees, and Sliding Window techniques. Authored DSA-Tracker Pro on GitHub (17 organic stars) and National Hackathon Finalist.",
      tags: ["C++", "DSA", "Dynamic Programming", "Graph Theory", "Algorithms", "CGPA 7.2"],
    },
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <section className="section-card panel-sheen rounded-[28px] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f] font-mono">
          Career & Venture Path
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="display-font text-3xl text-white md:text-4xl font-bold">
            Experience Timeline
          </h2>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 font-mono">
            4 Verified Milestones
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-(--text-muted) leading-relaxed">
          From venture co-founding to open-source systems engineering and competitive algorithmic problem-solving.
        </p>
      </section>

      <div className="relative mt-7 space-y-5 border-l-2 border-cyan-400/30 pl-5 ml-2 md:ml-4">
        {experienceItems.map((item) => (
          <div
            key={`${item.period}-${item.role}`}
            className="section-card relative rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 transition-all bg-black/25"
          >
            <span className="absolute -left-[27px] top-6 h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)] border-2 border-[#121924]" />
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8e8e8e] font-mono">
                {item.period}
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-cyan-200 flex items-center gap-1.5">
                {item.icon}
                {item.badge}
              </span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-white">
              {item.role}
            </h3>
            <p className="text-sm font-medium text-cyan-300 mt-0.5">{item.org}</p>

            <p className="mt-3 text-xs md:text-sm text-[#c9cede] leading-relaxed">
              {item.desc}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-xs text-[#d6d6d6] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
