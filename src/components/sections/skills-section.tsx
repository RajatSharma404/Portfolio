"use client";

import React, { useState } from "react";
import { Flame, PieChart } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { LanguageSkillChart } from "@/components/language-skill-chart";
import { LeetCodePulse } from "./leetcode-pulse";

export function SkillsSection() {
  const { projectLanguageStats, projectLanguageLoading } = useWorkspace();
  const [activeTab, setActiveTab] = useState<"leetcode" | "github">("leetcode");

  return (
    <div className="px-5 py-5 md:px-8 space-y-5">
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/30 border border-white/10 w-fit">
        <button
          onClick={() => setActiveTab("leetcode")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "leetcode"
              ? "bg-linear-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-200 shadow-md"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Flame size={13} className={activeTab === "leetcode" ? "text-amber-400 fill-amber-400" : ""} />
          <span>LeetCode & DSA Pulse (500+)</span>
        </button>

        <button
          onClick={() => setActiveTab("github")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
            activeTab === "github"
              ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-200 shadow-md"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <PieChart size={13} className={activeTab === "github" ? "text-cyan-400" : ""} />
          <span>GitHub Code Language Map</span>
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === "leetcode" ? (
        <LeetCodePulse />
      ) : (
        <LanguageSkillChart
          repos={projectLanguageStats}
          loading={projectLanguageLoading}
        />
      )}
    </div>
  );
}
