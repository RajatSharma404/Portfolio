"use client";

import React from "react";
import { X } from "lucide-react";
import {
  useWorkspace,
  files,
  extIcon,
  extColor,
} from "@/context/workspace-context";

export function TabBar() {
  const { openTabs, activeFile, setActiveFile, closeTab } = useWorkspace();

  return (
    <div
      className="scroll-thin flex overflow-x-auto bg-(--bg-tabbar) border-b border-(--border) select-none"
      role="tablist"
      aria-label="Editor tabs"
    >
      {openTabs.map((tab) => {
        const file = files.find((node) => node.id === tab);
        if (!file) return null;
        const isActive = activeFile === tab;
        const isModified = tab === "contact" || tab === "projects";

        return (
          <div
            key={tab}
            role="tab"
            aria-selected={isActive}
            className={`group flex min-w-36 max-w-56 items-center justify-between border-r border-(--border) px-3 py-2 text-xs transition-colors cursor-pointer ${
              isActive
                ? "bg-(--bg-tab-active) text-white font-medium shadow-xs"
                : "text-[#969696] hover:bg-white/5 hover:text-[#e0e0e0]"
            }`}
            style={{
              borderTop: isActive
                ? "2px solid var(--accent)"
                : "2px solid transparent",
            }}
            onClick={() => setActiveFile(tab)}
          >
            <span className="flex items-center gap-2 truncate">
              <span
                className={`text-[10px] font-mono font-bold ${extColor(
                  file.ext,
                )}`}
              >
                {extIcon(file.ext)}
              </span>
              <span className="truncate">{file.name}</span>
              {isModified && (
                <span className="text-(--accent) text-xs scale-75">●</span>
              )}
            </span>

            {/* Tab Close Button */}
            <button
              aria-label={`Close tab ${file.name}`}
              className="ml-2 rounded p-0.5 opacity-0 group-hover:opacity-100 hover:bg-white/15 transition-opacity text-white/70 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab);
              }}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
