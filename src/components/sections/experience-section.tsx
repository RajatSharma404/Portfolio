"use client";

import React from "react";
import { Sparkles, GraduationCap, Code } from "lucide-react";

export function ExperienceSection() {
  const experienceItems = [
    {
      period: "2025 - Present",
      role: "Co-Founder & Systems Architect",
      org: "Pradite (pradite.com)",
      icon: <Sparkles size={14} className="text-amber-300" />,
      badge: "Venture",
      desc: "Architecting next-generation privacy-first developer tools where code execution remains strictly local and vector memory is client-encrypted. Leading client-side WebAssembly runtimes, zero-telemetry pipelines, and sub-10ms vector retrieval.",
      tags: ["WASM", "React", "TypeScript", "Local-First", "AES-256", "Web Architecture"],
    },
    {
      period: "2024 - Present",
      role: "Open-Source Creator & AI Systems Engineer",
      org: "Independent Products & GitHub",
      icon: <Code size={14} className="text-cyan-300" />,
      badge: "Open-Source",
      desc: "Designed and shipped high-performance AI and developer platforms including Ghost AI (sub-3s fast-path architecture generator with real-time Liveblocks sync), NotebookLM-lite (local-first RAG with SQLite FTS5 BM25 + dense vector search), and DSA-Tracker Mastery (17+ stars).",
      tags: ["Next.js 16", "React 19", "FastAPI", "Python", "SQLite FTS5", "Liveblocks", "Gemini API"],
    },
    {
      period: "2023 - 2027",
      role: "B.Tech in Computer Science & Engineering",
      org: "Kanpur Institute of Technology",
      icon: <GraduationCap size={14} className="text-purple-300" />,
      badge: "Academics & DSA",
      desc: "160+ algorithmic problems solved in C++ on GitHub & LeetCode. Specialized in Dynamic Programming, Graph Theory, Binary Search trees, and Sliding Window algorithms.",
      tags: ["C++", "DSA", "Dynamic Programming", "Graph Theory", "Algorithms", "Complexity Auditing"],
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
            3 Active Tracks
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
