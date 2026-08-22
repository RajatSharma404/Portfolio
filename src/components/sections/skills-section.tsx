"use client";

import React from "react";
import { useWorkspace } from "@/context/workspace-context";
import { LanguageSkillChart } from "@/components/language-skill-chart";

export function SkillsSection() {
  const { projectLanguageStats, projectLanguageLoading } = useWorkspace();

  return (
    <div className="px-5 py-5 md:px-8">
      <LanguageSkillChart
        repos={projectLanguageStats}
        loading={projectLanguageLoading}
      />
    </div>
  );
}
