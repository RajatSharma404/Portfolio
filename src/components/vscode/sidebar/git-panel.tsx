"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, Check, ArrowUpRight, RefreshCw } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function GitPanel() {
  const { recentCommits, recentCommitsLoading, runTerminalCommand } = useWorkspace();
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [commitMsg, setCommitMsg] = useState("");
  const [committedToast, setCommittedToast] = useState(false);

  const branches = [
    "main",
    "feature/ai-copilot",
    "hotfix/dsa-grind",
    "chore/clean-architecture",
  ];

  const stagedChanges = [
    { file: "src/projects/chess-engine.ts", status: "M", color: "text-amber-400" },
    { file: "src/skills/leetcode-pulse.json", status: "M", color: "text-amber-400" },
    { file: "src/components/code-viewer.tsx", status: "A", color: "text-emerald-400" },
    { file: "src/context/workspace-context.tsx", status: "M", color: "text-amber-400" },
  ];

  const handleCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitMsg.trim()) return;

    runTerminalCommand(`git commit -m "${commitMsg}" && git push origin ${selectedBranch}`);
    setCommitMsg("");
    setCommittedToast(true);
    setTimeout(() => setCommittedToast(false), 2500);
  };

  return (
    <div className="flex h-full flex-col text-xs text-[#cccccc] select-none p-3 space-y-3 font-mono">
      {/* Branch Selector */}
      <div className="rounded-xl border border-white/10 bg-black/30 p-2.5 space-y-1.5">
        <p className="text-[10px] uppercase font-bold text-(--text-muted) tracking-wider">
          Current Branch
        </p>
        <div className="flex items-center gap-2">
          <GitBranch size={13} className="text-cyan-400" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white outline-none cursor-pointer font-sans"
          >
            {branches.map((b) => (
              <option key={b} value={b} className="bg-[#1f2229] text-white">
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Commit Box */}
      <form onSubmit={handleCommit} className="space-y-2">
        <textarea
          value={commitMsg}
          onChange={(e) => setCommitMsg(e.target.value)}
          placeholder="Message (Ctrl+Enter to commit)"
          className="w-full h-16 rounded-lg border border-white/15 bg-black/40 p-2 text-xs text-white placeholder:text-white/40 outline-none focus:border-cyan-400/60 resize-none font-sans"
        />
        <button
          type="submit"
          disabled={!commitMsg.trim()}
          className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#007acc] py-1.5 text-xs font-semibold text-white hover:bg-[#0062a3] disabled:opacity-40 transition-colors shadow-xs"
        >
          <Check size={12} />
          <span>Commit & Push</span>
        </button>
        {committedToast && (
          <p className="text-center text-[11px] text-emerald-300 animate-pulse font-sans">
            ✓ Committed & pushed to origin/{selectedBranch}!
          </p>
        )}
      </form>

      {/* Changes list */}
      <div className="space-y-1 pt-1 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-(--text-muted) font-bold">
          <span>Staged Changes ({stagedChanges.length})</span>
          <span className="text-cyan-300">Ready</span>
        </div>
        <div className="space-y-1">
          {stagedChanges.map((item) => (
            <div
              key={item.file}
              className="flex items-center justify-between py-1 px-1.5 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className="truncate text-white/80 text-[11px]">
                {item.file.split("/").pop()}
              </span>
              <span className={`text-[10px] font-bold ${item.color}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live GitHub Commits Timeline */}
      <div className="scroll-thin flex-1 overflow-y-auto space-y-1.5 pt-2 border-t border-white/10">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-(--text-muted) font-bold">
          <span>GitHub Commits</span>
          <a
            href="https://github.com/RajatSharma404/Portfolio/commits/main"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-0.5 text-cyan-400 hover:underline"
          >
            <span>view</span>
            <ArrowUpRight size={10} />
          </a>
        </div>

        {recentCommitsLoading ? (
          <div className="p-3 text-center text-white/40 text-xs">
            <RefreshCw size={14} className="animate-spin mx-auto mb-1 text-cyan-400" />
            Loading GitHub commits...
          </div>
        ) : recentCommits.length === 0 ? (
          <p className="text-[11px] text-white/40">No recent commits loaded.</p>
        ) : (
          recentCommits.map((commit) => (
            <div
              key={commit.sha}
              className="rounded-lg border border-white/5 bg-white/2 p-2 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1 text-[11px] text-cyan-300 font-bold">
                  <GitCommit size={11} />
                  <span>{commit.sha}</span>
                </span>
                <span className="text-[10px] text-white/40">{commit.date}</span>
              </div>
              <p className="mt-1 text-[11px] text-white/80 line-clamp-1 font-sans">
                {commit.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
