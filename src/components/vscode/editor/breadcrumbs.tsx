"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useWorkspace, files, extIcon, extColor } from "@/context/workspace-context";
import { rawCodeRegistry } from "@/content/code-raw-content";

export function Breadcrumbs() {
  const { activeFile } = useWorkspace();
  const fileNode = files.find((f) => f.id === activeFile);
  const rawData = rawCodeRegistry[activeFile];

  if (!fileNode) return null;

  return (
    <div
      className="flex items-center gap-1 bg-[#1e1e1e]/90 px-4 py-1 text-[11px] text-[#969696] select-none border-b border-white/5 font-mono overflow-x-auto scroll-thin"
      aria-label="Breadcrumb navigation"
    >
      <span className="hover:text-white transition-colors cursor-pointer">
        portfolio
      </span>
      <ChevronRight size={11} className="text-white/30" />
      <span className="hover:text-white transition-colors cursor-pointer">
        {fileNode.folder}
      </span>
      <ChevronRight size={11} className="text-white/30" />
      <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[#cccccc]">
        <span
          className={`text-[9px] font-bold ${extColor(fileNode.ext)}`}
        >
          {extIcon(fileNode.ext)}
        </span>
        <span>{fileNode.name}</span>
      </span>

      {rawData?.symbol && (
        <>
          <ChevronRight size={11} className="text-white/30" />
          <span className="text-cyan-300/80 truncate font-semibold">
            {rawData.symbol}
          </span>
        </>
      )}
    </div>
  );
}
