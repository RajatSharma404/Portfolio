"use client";

import React from "react";
import {
  Blocks,
  FolderOpen,
  GitBranch,
  Search,
  TerminalSquare,
  UserRound,
} from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function ActivityBar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeSidebarTab,
    setActiveSidebarTab,
    togglePalette,
    setTerminalOpen,
    openFile,
  } = useWorkspace();

  const handleTabClick = (tab: "explorer" | "search" | "git" | "extensions") => {
    if (tab === "search") {
      togglePalette();
      return;
    }
    if (tab === "git") {
      window.open("https://github.com/RajatSharma404", "_blank");
      return;
    }
    if (activeSidebarTab === tab && sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setActiveSidebarTab(tab);
      setSidebarOpen(true);
    }
  };

  return (
    <aside
      className="hidden w-12 flex-col items-center justify-between border-r border-(--border) bg-[#202225] py-3 text-lg md:flex select-none z-10"
      aria-label="Activity Bar"
    >
      <div className="flex flex-col items-center gap-4 w-full">
        {/* Explorer */}
        <button
          aria-label="Explorer (Ctrl+Shift+E)"
          title="Explorer"
          onClick={() => handleTabClick("explorer")}
          className={`relative p-2 rounded transition-colors w-full flex justify-center ${
            sidebarOpen && activeSidebarTab === "explorer"
              ? "text-white"
              : "text-[#858585] hover:text-white"
          }`}
        >
          {sidebarOpen && activeSidebarTab === "explorer" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-(--accent)" />
          )}
          <FolderOpen size={19} />
        </button>

        {/* Search */}
        <button
          aria-label="Search (Ctrl+Shift+F)"
          title="Search (Ctrl+P)"
          onClick={() => handleTabClick("search")}
          className="relative p-2 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <Search size={19} />
        </button>

        {/* Source Control (Git) */}
        <button
          aria-label="Source Control"
          title="Source Control (GitHub)"
          onClick={() => handleTabClick("git")}
          className="relative p-2 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <GitBranch size={19} />
        </button>

        {/* Extensions */}
        <button
          aria-label="Extensions"
          title="Extensions / Skills"
          onClick={() => openFile("skills")}
          className="relative p-2 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <Blocks size={19} />
        </button>

        {/* Terminal Toggle */}
        <button
          aria-label="Toggle Terminal (Ctrl+`)"
          title="Terminal (Ctrl+`)"
          onClick={() => setTerminalOpen((prev) => !prev)}
          className="relative p-2 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <TerminalSquare size={19} />
        </button>
      </div>

      {/* Profile / Contact at bottom */}
      <div className="flex flex-col items-center gap-2 w-full">
        <button
          aria-label="Profile / Contact"
          title="Contact Rajat"
          onClick={() => openFile("contact")}
          className="relative p-2 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <UserRound size={19} />
        </button>
      </div>
    </aside>
  );
}
