"use client";

import React from "react";
import { Code2, Columns2, Eye, X } from "lucide-react";
import {
  useWorkspace,
  files,
  extIcon,
  extColor,
} from "@/context/workspace-context";

export function TabBar() {
  const {
    openTabs,
    activeFile,
    setActiveFile,
    closeTab,
    viewMode,
    setViewMode,
  } = useWorkspace();

  return (
    <div
      className="flex items-center justify-between bg-(--bg-tabbar) border-b border-(--border) select-none overflow-hidden"
      role="toolbar"
      aria-label="Editor tab bar and view controls"
    >
      {/* Scrollable Tabs List */}
      <div
        className="scroll-thin flex flex-1 overflow-x-auto"
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

      {/* View Mode Switcher */}
      <div className="flex items-center gap-1 px-2.5 py-1 bg-black/20 border-l border-(--border)">
        {/* Preview Mode Button */}
        <button
          onClick={() => setViewMode("preview")}
          className={`flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium transition-all ${
            viewMode === "preview"
              ? "bg-(--accent) text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          title="Preview Mode (Interactive UI)"
        >
          <Eye size={12} />
          <span className="hidden sm:inline">Preview</span>
        </button>

        {/* Code Mode Button */}
        <button
          onClick={() => setViewMode("code")}
          className={`flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium transition-all ${
            viewMode === "code"
              ? "bg-(--accent) text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          title="Code Mode (Source Syntax View)"
        >
          <Code2 size={12} />
          <span className="hidden sm:inline">Code</span>
        </button>

        {/* Split View Button */}
        <button
          onClick={() => setViewMode("split")}
          className={`hidden md:flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium transition-all ${
            viewMode === "split"
              ? "bg-(--accent) text-white shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          title="Split View (Code + Preview Side-by-Side)"
        >
          <Columns2 size={12} />
          <span>Split</span>
        </button>
      </div>
    </div>
  );
}
