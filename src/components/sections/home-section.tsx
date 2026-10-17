"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useWorkspace } from "@/context/workspace-context";
import { projectItems } from "@/content/site-data";

export function HomeSection() {
  const { openFile } = useWorkspace();
  const reduceMotion = useReducedMotion();

  const roleChips = [
    "Co-Founder @ Pradite",
    "Full Stack & Systems Engineer",
    "500+ LeetCode Solved",
    "Kanpur Institute of Technology",
  ];

  const quickNav = [
    { id: "projects", label: "Projects" },
    { id: "about", label: "About Me" },
    { id: "contact", label: "Contact" },
  ];

  const heroSignals = [
    {
      label: "VENTURE",
      value: "Co-Founder @ Pradite (privacy-first AI developer tools)",
    },
    {
      label: "CURRENTLY BUILDING",
      value: "Ghost AI (real-time architecture studio) & NotebookLM-lite",
    },
    {
      label: "CORE STACK",
      value: "Next.js 16 · React 19 · TypeScript · FastAPI · C++",
    },
    {
      label: "ALGORITHMIC DISCIPLINE",
      value: "500+ LeetCode problems solved (DP, Graphs, Trees)",
    },
  ];

  const heroStats = [
    { label: "Flagship Projects", value: String(projectItems.length) },
    { label: "LeetCode Solved", value: "500+" },
    { label: "Public Repositories", value: "20" },
    { label: "Response Window", value: "< 24h" },
  ];

  const socialLinks = [
    {
      label: "Pradite",
      href: "https://pradite.com",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
    },
    { label: "GitHub", href: "https://github.com/RajatSharma404" },
    { label: "LeetCode", href: "https://leetcode.com/u/RajatSharma404/" },
    { label: "X / Twitter", href: "https://x.com/RajatSharma404" },
    { label: "Email", href: "mailto:rajat.sharma.myid1@gmail.com" },
  ];

  return (
    <div className="relative overflow-hidden px-5 py-6 md:px-8 md:py-8">
      {/* Background glow */}
      <div className="hero-glow pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-80" />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div>
          <p className="code-font text-xs uppercase tracking-[0.28em] text-(--comment)">
            {"// full-stack systems & local-first ai engineer"}
          </p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? false : { opacity: 1, y: 0 }}
            className="mt-3 display-font text-[clamp(3.4rem,10vw,7rem)] leading-[0.86]"
          >
            <span className="block text-[#f4f4f4]">Rajat</span>
            <span className="block text-(--accent)">Sharma</span>
          </motion.h1>

          <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
            {roleChips.map((chip, index) => (
              <span
                key={chip}
                className={`rounded-full border px-3 py-1.5 font-mono ${
                  index === 0
                    ? "border-amber-400/50 bg-amber-400/15 text-amber-200"
                    : index === 1
                      ? "border-[#569cd6]/60 bg-[#569cd6]/12 text-[#dceeff]"
                      : index === 2
                        ? "border-[#ce9178]/60 bg-[#ce9178]/12 text-[#ffe7d9]"
                        : "border-(--border) bg-white/5 text-[#d8d8d8]"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#b1b6c6] md:text-xl">
            Co-Founder at <a href="https://pradite.com" target="_blank" rel="noreferrer" className="text-amber-200 hover:underline font-medium">Pradite</a> and full-stack systems engineer.
            I design high-performance web platforms, local-first AI tools, and algorithmic workstations with Next.js 16, React 19, and TypeScript.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {quickNav.map((item) => (
              <button
                key={item.id}
                onClick={() => openFile(item.id)}
                className={`rounded-full border px-5 py-2.5 transition-transform hover:-translate-y-0.5 cursor-pointer ${
                  item.id === "projects"
                    ? "border-(--accent) bg-(--accent) text-white shadow-lg shadow-purple-500/20"
                    : "border-white/10 bg-white/5 text-[#e6e6e6] hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? false : { opacity: 1, y: 0 }}
                className="metric-card rounded-2xl border border-white/8 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
              >
                <p className="display-font text-2xl text-white md:text-3xl font-bold">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#9aa4bd] font-mono">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="section-card panel-sheen rounded-[28px] p-5 md:p-6 accent-outline">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f] font-mono">
                System Status
              </p>
              <h2 className="display-font mt-2 text-2xl text-white font-bold">
                Portfolio Copilot Online
              </h2>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200 font-mono">
              ACTIVE
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {heroSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-white/8 bg-black/25 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#8f8f8f] font-mono">
                  {signal.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#e5e7eb] font-medium">
                  {signal.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-[#0b0f16] p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f8f8f] font-mono">
              Quick Prompt
            </p>
            <p className="mt-2 code-font text-sm text-[#d7f2ff]">
              /projects &nbsp; /contact &nbsp; /resume &nbsp; /neofetch
            </p>
            <p className="mt-3 text-sm leading-6 text-[#aab2c5]">
              Use the tab explorer above, run commands in the terminal shell below, or click any file on the sidebar.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#d8d8d8] transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white font-mono text-xs"
              >
                {social.label}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
