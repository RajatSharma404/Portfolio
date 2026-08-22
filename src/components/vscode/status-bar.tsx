"use client";

import React from "react";
import { AlertTriangle, Check, GitBranch, Volume2, VolumeX } from "lucide-react";
import { useWorkspace, files } from "@/context/workspace-context";

export function StatusBar() {
  const {
    activeFile,
    currentLine,
    setTerminalOpen,
    setActiveBottomTab,
    soundEnabled,
    toggleSound,
  } = useWorkspace();
  const currentFileNode = files.find((f) => f.id === activeFile);

  const getLanguageLabel = (ext?: string) => {
    if (ext === "tsx") return "TypeScript React";
    if (ext === "ts") return "TypeScript";
    if (ext === "html") return "HTML";
    if (ext === "js") return "JavaScript";
    if (ext === "css") return "CSS";
    if (ext === "json" || ext === "config") return "JSON";
    if (ext === "md") return "Markdown";
    return "Plain Text";
  };

  const handleProblemsClick = () => {
    setTerminalOpen(true);
    setActiveBottomTab("problems");
  };

  return (
    <footer
      className="flex items-center justify-between bg-(--statusbar) px-3 py-0.5 text-[11px] text-white/90 select-none border-t border-black/20 z-20 font-mono"
      aria-label="Status Bar"
    >
      {/* Left side */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Branch */}
        <a
          href="https://github.com/RajatSharma404/Portfolio"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:bg-white/20 px-1.5 py-0.5 rounded transition-colors"
          title="Git Branch: main"
        >
          <GitBranch size={12} />
          <span>main</span>
        </a>

        {/* Problems Diagnostics */}
        <button
          onClick={handleProblemsClick}
          className="flex items-center gap-1 hover:bg-white/20 px-1.5 py-0.5 rounded transition-colors"
          title="0 Errors, 0 Warnings (Click to open diagnostics)"
        >
          <AlertTriangle size={12} className="text-yellow-300" />
          <span>0</span>
          <Check size={12} className="text-emerald-300 ml-1" />
          <span>0</span>
        </button>

        {/* Portfolio Status */}
        <span className="hidden sm:inline text-white/70">
          Rajat Sharma&apos;s Workspace
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {/* Sound Haptics Toggle */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-1 hover:bg-white/20 px-1.5 py-0.5 rounded transition-colors"
          title={soundEnabled ? "Sound Effects: ON (Click to mute)" : "Sound Effects: OFF (Click to unmute)"}
        >
          {soundEnabled ? (
            <>
              <Volume2 size={12} className="text-cyan-200" />
              <span className="hidden md:inline text-[10px]">Sound: ON</span>
            </>
          ) : (
            <>
              <VolumeX size={12} className="text-white/50" />
              <span className="hidden md:inline text-[10px] text-white/50">Sound: OFF</span>
            </>
          )}
        </button>

        <span className="text-white/80">
          Ln {currentLine}, Col 1
        </span>
        <span className="hidden sm:inline text-white/80">UTF-8</span>
        <span className="hover:bg-white/20 px-1.5 py-0.5 rounded transition-colors">
          {getLanguageLabel(currentFileNode?.ext)}
        </span>
        <span className="hidden md:inline text-white/80">Prettier: ✓</span>
      </div>
    </footer>
  );
}
