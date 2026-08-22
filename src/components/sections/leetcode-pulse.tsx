"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, Flame, Layers, Sparkles, Terminal } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function LeetCodePulse() {
  const reduceMotion = useReducedMotion();
  const { openFile } = useWorkspace();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const stats = {
    total: 500,
    easy: 220,
    medium: 250,
    hard: 30,
    totalQuestions: 3100,
    streak: "100+ Days",
    rating: "Top 10%",
    language: "C++ (Primary)",
    handle: "RajatSharma404",
    profileUrl: "https://leetcode.com/u/RajatSharma404/",
  };

  const topics = [
    {
      name: "Arrays & Sliding Window",
      solved: 120,
      total: 130,
      color: "from-cyan-500 to-blue-500",
      description: "Two pointers, prefix sums, kadane's, and variable windows",
    },
    {
      name: "Dynamic Programming",
      solved: 90,
      total: 100,
      color: "from-purple-500 to-indigo-500",
      description: "0/1 Knapsack, LCS, LIS, grid DP, and bitmask state compression",
    },
    {
      name: "Trees & Binary Search",
      solved: 80,
      total: 90,
      color: "from-emerald-500 to-teal-500",
      description: "BST, segment trees, tries, and lowest common ancestor",
    },
    {
      name: "Graphs & Disjoint Sets",
      solved: 75,
      total: 85,
      color: "from-amber-500 to-orange-500",
      description: "Dijkstra, topological sort, BFS/DFS, and union-find",
    },
    {
      name: "Heaps & Monotonic Stack",
      solved: 50,
      total: 60,
      color: "from-rose-500 to-pink-500",
      description: "Next greater element, priority queues, and sliding window maximum",
    },
    {
      name: "Backtracking & Greedy",
      solved: 45,
      total: 50,
      color: "from-fuchsia-500 to-pink-500",
      description: "N-queens, subset partitioning, and interval scheduling",
    },
  ];

  // Concentric SVG circle math
  const size = 200;
  const strokeWidth = 10;
  const center = size / 2;

  const easyRadius = center - 16;
  const easyCircumference = 2 * Math.PI * easyRadius;
  const easyDashoffset = easyCircumference * (1 - stats.easy / 700);

  const medRadius = center - 32;
  const medCircumference = 2 * Math.PI * medRadius;
  const medDashoffset = medCircumference * (1 - stats.medium / 700);

  const hardRadius = center - 48;
  const hardCircumference = 2 * Math.PI * hardRadius;
  const hardDashoffset = hardCircumference * (1 - stats.hard / 200);

  return (
    <section className="section-card panel-sheen rounded-4xl p-5 md:p-7 select-none">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-200">
              <Flame size={12} className="text-amber-400 fill-amber-400" />
              <span>DSA Mastery Pulse</span>
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-mono text-cyan-200">
              {stats.language}
            </span>
          </div>
          <h3 className="display-font mt-2 text-3xl text-white md:text-4xl font-bold">
            LeetCode 500+ Solved
          </h3>
          <p className="mt-1 max-w-2xl text-xs md:text-sm text-(--text-muted) leading-relaxed">
            Consistent algorithmic problem solving with strong foundations in Data
            Structures, Graph algorithms, and Dynamic Programming.
          </p>
        </div>

        <a
          href={stats.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 hover:border-amber-400/50 hover:text-amber-200 transition-all shadow-xs"
        >
          <span>@{stats.handle}</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Main Grid: Difficulty Donut + Topic Clusters */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Left: Concentric Difficulty Rings & Stats */}
        <div className="rounded-3xl border border-white/10 bg-black/25 p-5 flex flex-col items-center justify-between">
          <div className="relative flex items-center justify-center my-2">
            <svg
              width={size}
              height={size}
              className="rotate-[-90deg] overflow-visible"
            >
              {/* Easy Track & Fill */}
              <circle
                cx={center}
                cy={center}
                r={easyRadius}
                fill="transparent"
                stroke="rgba(34, 197, 94, 0.15)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={center}
                cy={center}
                r={easyRadius}
                fill="transparent"
                stroke="#22c55e"
                strokeWidth={strokeWidth}
                strokeDasharray={easyCircumference}
                strokeDashoffset={easyDashoffset}
                strokeLinecap="round"
              />

              {/* Medium Track & Fill */}
              <circle
                cx={center}
                cy={center}
                r={medRadius}
                fill="transparent"
                stroke="rgba(245, 158, 11, 0.15)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={center}
                cy={center}
                r={medRadius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth={strokeWidth}
                strokeDasharray={medCircumference}
                strokeDashoffset={medDashoffset}
                strokeLinecap="round"
              />

              {/* Hard Track & Fill */}
              <circle
                cx={center}
                cy={center}
                r={hardRadius}
                fill="transparent"
                stroke="rgba(239, 68, 68, 0.15)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={center}
                cy={center}
                r={hardRadius}
                fill="transparent"
                stroke="#ef4444"
                strokeWidth={strokeWidth}
                strokeDasharray={hardCircumference}
                strokeDashoffset={hardDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#8f8f8f] font-mono">
                TOTAL SOLVED
              </p>
              <p className="display-font text-3xl font-extrabold text-white">
                500+
              </p>
              <p className="text-[10px] text-emerald-400 font-mono font-semibold">
                ★ Top 10%
              </p>
            </div>
          </div>

          {/* Difficulty Metrics Pills */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4">
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2.5 text-center">
              <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold font-mono">
                Easy
              </p>
              <p className="text-lg font-bold text-white mt-0.5">
                {stats.easy}
              </p>
              <span className="text-[10px] text-white/50 font-mono">Solved</span>
            </div>

            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-2.5 text-center">
              <p className="text-[10px] uppercase tracking-wider text-amber-300 font-bold font-mono">
                Medium
              </p>
              <p className="text-lg font-bold text-white mt-0.5">
                {stats.medium}
              </p>
              <span className="text-[10px] text-white/50 font-mono">Solved</span>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-2.5 text-center">
              <p className="text-[10px] uppercase tracking-wider text-rose-300 font-bold font-mono">
                Hard
              </p>
              <p className="text-lg font-bold text-white mt-0.5">
                {stats.hard}+
              </p>
              <span className="text-[10px] text-white/50 font-mono">Solved</span>
            </div>
          </div>

          {/* Badges Footer */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 w-full pt-3 border-t border-white/5 text-[11px] text-white/70 font-mono">
            <span className="flex items-center gap-1">
              <Award size={13} className="text-amber-400" />
              <span>100-Day Streak</span>
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-cyan-400" />
              <span>Daily Active</span>
            </span>
          </div>
        </div>

        {/* Right: Algorithmic Topic Clusters */}
        <div className="rounded-3xl border border-white/10 bg-black/25 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm text-white flex items-center gap-1.5">
              <Layers size={14} className="text-cyan-400" />
              <span>Topic Mastery & Pattern Breakdown</span>
            </h4>
            <span className="text-[10px] font-mono text-(--text-muted)">
              6 Major Patterns
            </span>
          </div>

          <div className="space-y-2.5 pt-1">
            {topics.map((topic) => {
              const percentage = Math.round((topic.solved / topic.total) * 100);
              const isHovered = activeCategory === topic.name;

              return (
                <motion.div
                  key={topic.name}
                  onMouseEnter={() => setActiveCategory(topic.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                  whileHover={reduceMotion ? undefined : { scale: 1.01 }}
                  className={`rounded-2xl border p-3 transition-all cursor-pointer ${
                    isHovered
                      ? "border-white/30 bg-white/10 shadow-lg"
                      : "border-white/5 bg-white/2 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-xs text-white">
                      {topic.name}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-200">
                      {topic.solved}+ Solved ({percentage}%)
                    </span>
                  </div>

                  <p className="text-[11px] text-white/50 mt-1 font-sans line-clamp-1">
                    {topic.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2.5 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${topic.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick CTA to DSA Tracker project */}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] text-(--text-muted)">
              Built a custom tracking dashboard
            </span>
            <button
              onClick={() => openFile("projects")}
              className="flex items-center gap-1 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-100 hover:bg-cyan-400/20 transition-colors font-mono"
            >
              <Terminal size={11} />
              <span>DSA Tracker Project</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
