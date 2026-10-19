"use client";

import React, { useState } from "react";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Cpu,
  Trophy,
  Mail,
  Phone,
  MapPin,
  FileText,
  Eye,
  CheckCircle2,
} from "lucide-react";

export function ResumeSection() {
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Rajat_Sharma_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 1500);
  };

  return (
    <div className="px-4 py-5 md:px-8 max-w-6xl mx-auto space-y-6">
      {/* Top Banner & Action Controls */}
      <div className="section-card panel-sheen rounded-3xl p-5 md:p-6 border border-white/10 bg-black/35 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-[11px] font-mono text-amber-200 flex items-center gap-1">
              <FileText size={12} className="text-amber-400" />
              <span>Official Resume</span>
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-mono text-cyan-200">
              Verified 2026
            </span>
          </div>
          <h1 className="display-font text-2xl md:text-3xl font-bold text-white">
            Rajat Sharma &mdash; Resume
          </h1>
          <p className="text-xs md:text-sm text-(--text-muted) mt-1">
            B.Tech CSE @ Kanpur Institute of Technology &middot; Co-Founder @ Pradite &middot; SDE Intern @ Sparqor
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
            <button
              onClick={() => setViewMode("interactive")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "interactive"
                  ? "bg-amber-400/20 border border-amber-400/40 text-amber-200 shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Eye size={13} />
              <span>Interactive</span>
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === "pdf"
                  ? "bg-cyan-400/20 border border-cyan-400/40 text-cyan-200 shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <FileText size={13} />
              <span>PDF Viewer</span>
            </button>
          </div>

          {/* Download & External Open */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-(--accent) hover:brightness-110 text-white px-4 py-2 text-xs font-semibold shadow-lg shadow-purple-500/20 transition-all hover:scale-102 cursor-pointer"
          >
            {downloading ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-300" />
                <span>Downloaded</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span>Download PDF</span>
              </>
            )}
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/90 px-3.5 py-2 text-xs font-semibold transition-all shadow-xs"
          >
            <span>New Tab</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Conditional Rendering: PDF Embed vs. Interactive Structured Resume */}
      {viewMode === "pdf" ? (
        <div className="section-card rounded-3xl p-3 border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
          <div className="rounded-2xl overflow-hidden bg-[#24292e] border border-white/10 min-h-[750px]">
            <iframe
              src="/resume.pdf#toolbar=1"
              title="Rajat Sharma Resume"
              className="w-full h-[780px] border-none"
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-xs text-white/60 font-mono">
            <span>Embedded PDF preview rendered via browser PDF engine</span>
            <a
              href="/resume.pdf"
              download="Rajat_Sharma_Resume.pdf"
              className="text-amber-300 hover:underline inline-flex items-center gap-1"
            >
              Trouble viewing? Download directly <Download size={11} />
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Info Banner */}
          <div className="section-card rounded-2xl p-5 border border-white/10 bg-black/25">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-white/80 font-mono">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-400" />
                <span>Kanpur, UP, India</span>
              </span>
              <a
                href="mailto:rajat.sharma.myid1@gmail.com"
                className="flex items-center gap-1.5 hover:text-amber-200 transition-colors"
              >
                <Mail size={14} className="text-cyan-400" />
                <span>rajat.sharma.myid1@gmail.com</span>
              </a>
              <span className="flex items-center gap-1.5">
                <Phone size={14} className="text-emerald-400" />
                <span>+91 9810895404</span>
              </span>
              <a
                href="https://linkedin.com/in/rajat-sharma-9a053128b/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-200 transition-colors text-cyan-300"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/RajatSharma404"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
              <a
                href="https://leetcode.com/u/RajatSharma404/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-300 transition-colors text-amber-400"
              >
                LeetCode ↗
              </a>
            </div>
          </div>

          {/* Education */}
          <div className="section-card rounded-3xl p-6 border border-white/10 bg-black/25">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap size={18} className="text-purple-400" />
              <h2 className="display-font text-lg font-bold uppercase tracking-wider text-white">
                Education
              </h2>
            </div>
            <div className="flex flex-wrap items-start justify-between gap-2 border-l-2 border-purple-400/40 pl-4 ml-1">
              <div>
                <h3 className="text-base font-bold text-white">
                  Kanpur Institute of Technology (AKTU)
                </h3>
                <p className="text-xs md:text-sm text-[#b0b7c9]">
                  Bachelor of Technology in Computer Science &amp; Engineering &middot;{" "}
                  <span className="text-amber-300 font-semibold font-mono">CGPA: 7.2 / 10.0</span>
                </p>
              </div>
              <span className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                2023 &ndash; 2027 &middot; Kanpur, India
              </span>
            </div>
          </div>

          {/* Work Experience */}
          <div className="section-card rounded-3xl p-6 border border-white/10 bg-black/25 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={18} className="text-amber-400" />
              <h2 className="display-font text-lg font-bold uppercase tracking-wider text-white">
                Work Experience
              </h2>
            </div>

            {/* Pradite */}
            <div className="border-l-2 border-amber-400/50 pl-4 ml-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Pradite</span>
                    <span className="text-xs font-mono font-medium text-amber-300 border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 rounded-full">
                      Co-Founder &amp; Frontend Engineer
                    </span>
                  </h3>
                  <p className="text-xs text-white/50 font-mono">Kanpur / New Delhi, India</p>
                </div>
                <span className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                  June 2026 &ndash; Present
                </span>
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm text-[#c9cede] leading-relaxed list-disc list-inside">
                <li>
                  Co-founded an in-browser code editor; engineered the core editor interface integrating Monaco Editor with token-stream parsing in React 19 and TypeScript.
                </li>
                <li>
                  Built client-side cancellation tokens so user interrupts or keystrokes immediately sever the WebSocket, avoiding redundant model API consumption.
                </li>
                <li>
                  Diagnosed and resolved memory leaks in UI state subscribers, eliminating frame drops during rapid multi-file tab switching.
                </li>
                <li>
                  Authored automated unit and integration test suites using Vitest to enforce modular component contracts and prevent UI regressions.
                </li>
              </ul>
            </div>

            {/* Sparqor Technologies */}
            <div className="border-l-2 border-cyan-400/50 pl-4 ml-1 space-y-2 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Sparqor Technologies</span>
                    <span className="text-xs font-mono font-medium text-cyan-300 border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                      Software Engineer Intern
                    </span>
                  </h3>
                  <p className="text-xs text-white/50 font-mono">Remote</p>
                </div>
                <span className="text-xs font-mono text-white/60 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                  May 2026 &ndash; July 2026
                </span>
              </div>
              <ul className="space-y-1.5 text-xs md:text-sm text-[#c9cede] leading-relaxed list-disc list-inside">
                <li>
                  Shipped responsive client interfaces with automated session handling and Gemini AI integrations across production web platforms.
                </li>
                <li>
                  Diagnosed and patched critical client runtime crashes, resolving asynchronous data-fetch exceptions to improve platform stability.
                </li>
                <li>
                  Participated in system design reviews and peer code reviews, ensuring strict TypeScript typing standards and clean component architecture.
                </li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="section-card rounded-3xl p-6 border border-white/10 bg-black/25 space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <FolderGit2 size={18} className="text-cyan-400" />
              <h2 className="display-font text-lg font-bold uppercase tracking-wider text-white">
                Projects
              </h2>
            </div>

            {/* Ghost AI */}
            <div className="border-l-2 border-cyan-400/40 pl-4 ml-1 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Ghost AI: Collaborative Visual Cloud Architecture Canvas</span>
                  <a
                    href="https://github.com/RajatSharma404/ghost-ai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:text-white inline-flex items-center gap-0.5 text-xs font-mono"
                  >
                    <span>repo</span> <ExternalLink size={10} />
                  </a>
                </h3>
                <span className="text-xs font-mono text-white/60">2025</span>
              </div>
              <p className="text-xs font-mono text-amber-200/80">
                Next.js 16, React 19, TypeScript, Liveblocks WebSockets, React Flow
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-[#c9cede] list-disc list-inside">
                <li>
                  Engineered an interactive 2D node canvas converting natural-language requirements into visual Directed Acyclic Graph (DAG) system topologies using React Flow and Next.js 16.
                </li>
                <li>
                  Implemented real-time multi-user state synchronization across WebSockets using Liveblocks, eliminating state divergence during concurrent collaborative node editing.
                </li>
                <li>
                  Integrated streaming Google Gemini AI APIs with adaptive retry backoff mechanisms to stream structured graph topologies without blocking the main UI thread.
                </li>
              </ul>
            </div>

            {/* FitFlow */}
            <div className="border-l-2 border-emerald-400/40 pl-4 ml-1 space-y-1.5 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>FitFlow: Progression &amp; Embedded Code Editor Platform</span>
                  <a
                    href="https://github.com/RajatSharma404/Fitness-Roadmap"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:text-white inline-flex items-center gap-0.5 text-xs font-mono"
                  >
                    <span>repo</span> <ExternalLink size={10} />
                  </a>
                </h3>
                <span className="text-xs font-mono text-white/60">2026</span>
              </div>
              <p className="text-xs font-mono text-emerald-200/80">
                Next.js 16, React 19, TypeScript, Monaco Editor, Prisma, PostgreSQL, Docker
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-[#c9cede] list-disc list-inside">
                <li>
                  Integrated Monaco Editor with custom Vim keybinding modes and syntax highlighting directly into a modular React 19 and Next.js 16 client workspace.
                </li>
                <li>
                  Designed relational database models in Prisma ORM connected to PostgreSQL, managing structured progression roadmaps and user progression logs.
                </li>
                <li>
                  Configured reproducible multi-container developer environments with Docker Compose and established automated test suites using Vitest.
                </li>
              </ul>
            </div>

            {/* Interactive 3D Portfolio */}
            <div className="border-l-2 border-purple-400/40 pl-4 ml-1 space-y-1.5 pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Interactive 3D Portfolio: WebGL &amp; Systems Showcase</span>
                  <a
                    href="https://github.com/RajatSharma404/Portfolio"
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-300 hover:text-white inline-flex items-center gap-0.5 text-xs font-mono"
                  >
                    <span>repo</span> <ExternalLink size={10} />
                  </a>
                </h3>
                <span className="text-xs font-mono text-white/60">2026</span>
              </div>
              <p className="text-xs font-mono text-purple-200/80">
                Next.js 16, React 19, TypeScript, Three.js, GSAP, Tailwind CSS
              </p>
              <ul className="space-y-1 text-xs md:text-sm text-[#c9cede] list-disc list-inside">
                <li>
                  Architected a responsive interactive developer portfolio incorporating Three.js WebGL rendering, GSAP micro-animations, and Next.js 16 App Router architecture.
                </li>
                <li>
                  Optimized client rendering cycles and asset loading to eliminate frame drops and maintain smooth 60fps animations across mobile and desktop viewports.
                </li>
                <li>
                  Validated component rendering and DOM state persistence using Vitest and React Testing Library.
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="section-card rounded-3xl p-6 border border-white/10 bg-black/25">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={18} className="text-rose-400" />
              <h2 className="display-font text-lg font-bold uppercase tracking-wider text-white">
                Technical Skills
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-[#0f1219] p-4">
                <p className="text-[11px] uppercase tracking-wider font-mono font-semibold text-cyan-300">
                  Languages
                </p>
                <p className="mt-1 text-xs md:text-sm text-white/90">
                  TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#0f1219] p-4">
                <p className="text-[11px] uppercase tracking-wider font-mono font-semibold text-purple-300">
                  Frontend &amp; UI
                </p>
                <p className="mt-1 text-xs md:text-sm text-white/90">
                  React 19, Next.js 16, Tailwind CSS, Monaco Editor, React Flow, Zustand
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#0f1219] p-4">
                <p className="text-[11px] uppercase tracking-wider font-mono font-semibold text-amber-300">
                  State &amp; Telemetry
                </p>
                <p className="mt-1 text-xs md:text-sm text-white/90">
                  WebSockets (Liveblocks), Recharts, Server-Sent Events, Fetch API
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#0f1219] p-4">
                <p className="text-[11px] uppercase tracking-wider font-mono font-semibold text-emerald-300">
                  Developer Tools
                </p>
                <p className="mt-1 text-xs md:text-sm text-white/90">
                  Vitest, Docker, Git, GitHub Actions, Postman, Linux
                </p>
              </div>
            </div>
          </div>

          {/* Key Achievements */}
          <div className="section-card rounded-3xl p-6 border border-white/10 bg-black/25">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-amber-400" />
              <h2 className="display-font text-lg font-bold uppercase tracking-wider text-white">
                Key Achievements
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs md:text-sm text-[#c9cede] leading-relaxed list-disc list-inside">
              <li>
                <strong className="text-white">Algorithmic Problem Solving:</strong> Solved 160+ data structures and algorithms challenges across LeetCode and Codeforces focusing on Dynamic Programming, Graphs, Trees, and Sliding Window techniques.
              </li>
              <li>
                <strong className="text-white">Open-Source Repository Adoption:</strong> Authored and open-sourced DSA-Tracker Pro on GitHub (17 organic stars), providing an automated interview preparation engine with Docker Compose and CI workflows.
              </li>
              <li>
                <strong className="text-white">National Hackathon Finalist:</strong> Built and deployed a full-stack functional web prototype under tight time constraints at the Chandigarh University National Hackathon.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
