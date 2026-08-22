"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWorkspace } from "@/context/workspace-context";
import { projectItems } from "@/content/site-data";

export function HomeSection() {
  const { openFile } = useWorkspace();

  const roleChips = [
    "Full Stack Developer",
    "AI / ML Learner",
    "DSA Enthusiast",
    "@ Kanpur Institute of Technology",
  ];

  const quickNav = [
    { id: "projects", label: "Projects" },
    { id: "about", label: "About Me" },
    { id: "contact", label: "Contact" },
  ];

  const heroSignals = [
    {
      label: "CURRENTLY BUILDING",
      value: "Portfolio, agents, and product workflows",
    },
    { label: "STACK", value: "Next.js · React · TypeScript · Node.js" },
    {
      label: "AVAILABLE",
      value: "Internships, collabs, and interesting problems",
    },
  ];

  const heroStats = [
    { label: "Featured projects", value: String(projectItems.length) },
    { label: "Core focus", value: "Full stack + AI tooling" },
    { label: "DSA practice", value: "Daily (500+ Solved)" },
    { label: "Response time", value: "< 24h" },
  ];

  const socialLinks = [
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
            {"// hello world !! welcome to my portfolio"}
          </p>

          <div className="mt-3 leading-[0.86]">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="display-font text-[clamp(3.4rem,10vw,7rem)] text-[#f4f4f4]"
            >
              Rajat
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="display-font text-[clamp(3.4rem,10vw,7rem)] text-(--accent)"
            >
              Sharma
            </motion.h1>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
            {roleChips.map((chip, index) => (
              <span
                key={chip}
                className={`rounded-full border px-3 py-1.5 ${
                  index === 1
                    ? "border-[#569cd6]/60 bg-[#569cd6]/12 text-[#dceeff]"
                    : index === 2
                      ? "border-[#ce9178]/60 bg-[#ce9178]/12 text-[#ffe7d9]"
                      : "border-(--border) bg-white/3 text-[#d8d8d8]"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#b1b6c6] md:text-xl">
            I build portfolio-grade full-stack apps, AI utilities, and DSA
            tools while studying Computer Science. The goal is simple: ship
            useful products, not just polished screens.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {quickNav.map((item) => (
              <button
                key={item.id}
                onClick={() => openFile(item.id)}
                className={`rounded-full border px-5 py-2.5 transition-transform hover:-translate-y-0.5 ${
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="metric-card rounded-2xl border border-white/8 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
              >
                <p className="display-font text-2xl text-white md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#9aa4bd]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <aside className="section-card panel-sheen rounded-[28px] p-5 md:p-6 accent-outline">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f]">
                Status
              </p>
              <h2 className="display-font mt-2 text-2xl text-white">
                Portfolio Copilot Online
              </h2>
            </div>
            <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
              LIVE
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {heroSignals.map((signal) => (
              <div
                key={signal.label}
                className="rounded-2xl border border-white/8 bg-black/20 p-4"
              >
                <p className="text-[10px] uppercase tracking-[0.26em] text-[#8f8f8f]">
                  {signal.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#e5e7eb]">
                  {signal.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/8 bg-[#0b0f16] p-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f8f8f]">
              Quick Prompt
            </p>
            <p className="mt-2 code-font text-sm text-[#d7f2ff]">
              /projects &nbsp; /contact &nbsp; /resume
            </p>
            <p className="mt-3 text-sm leading-6 text-[#aab2c5]">
              Use the file explorer, or ask Copilot if you want the short path.
              It will point you at the right tab without the corporate
              hand-holding.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#d8d8d8] transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
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
