"use client";

import React from "react";
import { useWorkspace } from "@/context/workspace-context";

export function AboutSection() {
  const {
    githubOverview,
    githubStatsLoading,
    recentCommits,
    recentCommitsLoading,
  } = useWorkspace();

  const aboutFocusLeft = [
    "Building scalable web projects while in college",
    "Practicing DSA in C++ daily",
    "Learning practical AI workflows and integrations",
  ];

  const aboutFocusRight = [
    "Focused on backend + frontend balance",
    "Improving problem solving and system design",
    "Always learning, always shipping",
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="section-card panel-sheen rounded-[28px] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
            Developer Profile
          </p>
          <h3 className="display-font mt-3 text-3xl text-white md:text-4xl">
            Building reliable products at speed.
          </h3>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#aeb3c1] md:text-base">
            Full-stack developer and AI enthusiast currently pursuing B.Tech in
            Computer Science at Kanpur Institute of Technology. I enjoy turning
            complex ideas into practical products, from algorithmic learning
            platforms to intelligent automation systems.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {aboutFocusLeft.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#d7d7d7]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-4">
          <section className="section-card rounded-3xl p-5">
            <h4 className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
              What I Build
            </h4>
            <div className="mt-3 space-y-2">
              {aboutFocusRight.map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/8 bg-[#0f1219] px-3 py-2 text-sm text-[#d0d2da]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="accent-outline rounded-3xl border border-[#569cd6]/35 bg-[#1d222c] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
              Education
            </p>
            <p className="mt-3 text-base text-white">
              B.Tech, Computer Science & Engineering
            </p>
            <p className="text-sm text-[#9ca3b8]">
              Kanpur Institute of Technology • 2023-2027
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#94d2ff]">
              <span className="h-2 w-2 rounded-full bg-[#4fb3ff]" />
              Actively exploring full stack, AI systems, and problem solving.
            </div>
          </section>

          <section className="rounded-3xl border border-cyan-400/25 bg-cyan-500/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
              GitHub Pulse
            </p>
            {githubStatsLoading ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
                <div className="h-14 animate-pulse rounded-xl bg-white/10" />
              </div>
            ) : githubOverview ? (
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Followers
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold">
                    {githubOverview.followers}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Public Repos
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold">
                    {githubOverview.publicRepos}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Following
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold">
                    {githubOverview.following}
                  </p>
                </div>
                <div className="rounded-xl border border-cyan-400/20 bg-[#101827] px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">
                    Featured Stars
                  </p>
                  <p className="mt-1 text-cyan-100 font-semibold">
                    {githubOverview.totalStars}
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
              <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
                Recently Building
              </p>
              <div className="mt-3 space-y-2">
                <div className="h-16 animate-pulse rounded-xl bg-green-500/10" />
                <div className="h-16 animate-pulse rounded-xl bg-green-500/10" />
              </div>
            </section>
          ) : recentCommits.length > 0 ? (
            <section className="rounded-3xl border border-green-500/25 bg-green-500/5 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
                Recently Building
              </p>
              <div className="mt-3 space-y-2">
                {recentCommits.slice(0, 3).map((commit) => (
                  <div
                    key={commit.sha}
                    className="rounded-xl border border-green-500/20 bg-green-500/5 px-3 py-2 text-xs"
                  >
                    <p className="font-mono text-green-300">{commit.sha}</p>
                    <p className="mt-1 text-green-200 line-clamp-1">
                      {commit.message}
                    </p>
                    <p className="mt-1 text-green-300/60 text-[10px]">
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
