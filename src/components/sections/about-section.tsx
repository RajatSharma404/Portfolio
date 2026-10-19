"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function AboutSection() {
  const {
    githubOverview,
    githubStatsLoading,
    recentCommits,
    recentCommitsLoading,
  } = useWorkspace();

  const aboutFocusLeft = [
    "Co-Founding Pradite: Privacy-first developer tools with zero-telemetry client execution",
    "Real-time architecture design & fast-path streaming (Ghost AI)",
    "Local-first RAG systems with dense-sparse hybrid search & SQLite FTS5 (NotebookLM-lite)",
    "Rigorous algorithmic problem solving in C++ (160+ questions solved on GitHub & LeetCode)",
  ];

  const aboutFocusRight = [
    "Systems: WebAssembly (WASM), Web Workers, local encryption",
    "Frontend: Next.js 16 App Router, React 19, Tailwind CSS v4, Framer Motion",
    "Backend: FastAPI, Node.js, SQLite WAL, PostgreSQL, Prisma",
    "AI & ML: Gemini API, Ollama local agents, Stockfish 17 WASM",
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="section-card panel-sheen rounded-[28px] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f] font-mono">
            Developer Profile
          </p>
          <h2 className="display-font mt-3 text-3xl text-white md:text-4xl font-bold">
            Engineering real systems, not just pretty screens.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#c9cede] md:text-base">
            I am a full-stack systems engineer and Co-Founder at <a href="https://pradite.com" target="_blank" rel="noreferrer" className="text-amber-200 hover:underline font-medium inline-flex items-center gap-1">Pradite <ExternalLink size={12} /></a>, currently pursuing my B.Tech in Computer Science at Kanpur Institute of Technology (2023–2027).
            My work centers on building privacy-first developer tools, high-speed AI platforms, and algorithmic workstations with Next.js 16, React 19, FastAPI, and C++.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {aboutFocusLeft.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3.5 text-xs md:text-sm text-[#d7deed] leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <section className="section-card rounded-3xl p-5 border border-white/10 bg-black/25">
            <h3 className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
              Core Technical Competencies
            </h3>
            <div className="mt-3 space-y-2">
              {aboutFocusRight.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/8 bg-[#0f1219] px-3.5 py-2.5 text-xs md:text-sm text-[#d0d2da]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="accent-outline rounded-3xl border border-[#569cd6]/35 bg-[#1d222c] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
              Education & Campus
            </p>
            <p className="mt-2.5 text-base font-bold text-white">
              B.Tech, Computer Science & Engineering
            </p>
            <p className="text-sm text-[#9ca3b8]">
              Kanpur Institute of Technology • 2023–2027
            </p>
            <div className="mt-3.5 flex items-center gap-2 text-xs text-[#94d2ff] font-mono">
              <span className="h-2 w-2 rounded-full bg-[#4fb3ff] animate-ping" />
              <span>160+ algorithmic questions solved · C++ & DSA</span>
            </div>
          </section>

          <section className="rounded-3xl border border-cyan-400/25 bg-cyan-500/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
              GitHub Telemetry
            </p>
            {githubStatsLoading ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
              </div>
            ) : githubOverview ? (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm font-mono">
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Followers
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold text-base">
                    {githubOverview.followers}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Public Repos
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold text-base">
                    {githubOverview.publicRepos}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Following
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold text-base">
                    {githubOverview.following}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    DSA Stars
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold text-base">
                    17+
                  </p>
                </div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#a9b6cc]">
                Unable to load GitHub stats right now.
              </p>
            )}
          </section>

          {recentCommitsLoading ? (
            <section className="rounded-3xl border border-green-500/25 bg-green-500/5 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
                Recently Building
              </p>
              <div className="mt-3 space-y-2">
                <div className="h-16 animate-pulse rounded-xl bg-green-500/10" />
                <div className="h-16 animate-pulse rounded-xl bg-green-500/10" />
              </div>
            </section>
          ) : recentCommits.length > 0 ? (
            <section className="rounded-3xl border border-green-500/25 bg-green-500/5 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
                Live Commit Stream
              </p>
              <div className="mt-3 space-y-2">
                {recentCommits.slice(0, 3).map((commit) => (
                  <div
                    key={commit.sha}
                    className="rounded-xl border border-green-500/20 bg-green-500/5 px-3 py-2 text-xs"
                  >
                    <p className="font-mono text-green-300 font-bold">{commit.sha}</p>
                    <p className="mt-1 text-green-200 line-clamp-1">
                      {commit.message}
                    </p>
                    <p className="mt-1 text-green-300/60 text-[10px] font-mono">
                      {commit.date}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
