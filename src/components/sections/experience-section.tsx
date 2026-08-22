"use client";

import React from "react";

export function ExperienceSection() {
  const experienceItems = [
    {
      period: "2023 - Present",
      role: "B.Tech Student Developer",
      org: "Kanpur Institute of Technology",
      desc: "Solved 500+ LeetCode problems, built 15+ full-stack and AI applications, and actively contributing to open-source while pursuing B.Tech in Computer Science.",
      tags: ["C++", "DSA", "TypeScript", "Node.js", "React", "AI"],
    },
    {
      period: "Current Focus",
      role: "Project Builder",
      org: "Personal Portfolio Projects",
      desc: "Engineering scalable web applications, integrating AI workflows with Gemini/Stockfish, and building productivity trackers with a focus on clean, performant UX.",
      tags: ["Next.js", "AI Workflows", "FastAPI", "System Design"],
    },
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <section className="section-card rounded-3xl p-6">
        <h3 className="display-font text-3xl text-white">
          Experience Timeline
        </h3>
        <p className="mt-2 text-sm text-(--text-muted)">
          Learning by building real-world projects, systems, and product-like workflows.
        </p>
      </section>

      <div className="relative mt-6 space-y-4 border-l-2 border-cyan-400/30 pl-5 ml-2">
        {experienceItems.map((item) => (
          <div
            key={`${item.period}-${item.role}`}
            className="section-card relative rounded-2xl p-5 border border-white/10"
          >
            <span className="absolute -left-[27px] top-5.5 h-3.5 w-3.5 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.8)] border-2 border-[#1e1e1e]" />
            <p className="text-xs uppercase tracking-[0.2em] text-[#8e8e8e] font-mono">
              {item.period}
            </p>
            <h4 className="mt-1 text-lg font-bold text-[#f0f0f0]">
              {item.role}
            </h4>
            <p className="text-sm font-medium text-cyan-200">{item.org}</p>
            <p className="mt-2 text-xs md:text-sm text-[#a8a8a8] leading-relaxed">
              {item.desc}
            </p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-xs text-[#d6d6d6] font-mono"
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
