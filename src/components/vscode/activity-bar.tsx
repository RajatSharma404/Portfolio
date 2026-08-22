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
import type { SidebarTab } from "@/types/vscode";

export function ActivityBar() {
  const {
    sidebarOpen,
    setSidebarOpen,
    activeSidebarTab,
    setActiveSidebarTab,
    setTerminalOpen,
    openFile,
  } = useWorkspace();

  const handleTabClick = (tab: SidebarTab) => {
    if (activeSidebarTab === tab && sidebarOpen) {
      setSidebarOpen(false);
    } else {
      setActiveSidebarTab(tab);
      setSidebarOpen(true);
    }
  };

  const navItems: Array<{
    id: SidebarTab;
    label: string;
    icon: React.ReactNode;
  }> = [
    {
      id: "explorer",
      label: "Explorer (Ctrl+Shift+E)",
      icon: <FolderOpen size={19} />,
    },
    {
      id: "search",
      label: "Search (Ctrl+Shift+F)",
      icon: <Search size={19} />,
    },
    {
      id: "git",
      label: "Source Control (Ctrl+Shift+G)",
      icon: <GitBranch size={19} />,
    },
    {
      id: "extensions",
      label: "Extensions Marketplace (Ctrl+Shift+X)",
      icon: <Blocks size={19} />,
    },
  ];

  return (
    <aside
      className="hidden w-12 flex-col items-center justify-between border-r border-(--border) bg-[#202225] py-3 text-lg md:flex select-none z-10"
      aria-label="Activity Bar"
    >
      {/* Top Main Tool Icons */}
      <div className="flex flex-col items-center gap-3 w-full">
        {navItems.map((item) => {
          const isActive = sidebarOpen && activeSidebarTab === item.id;

          return (
            <button
              key={item.id}
              aria-label={item.label}
              title={item.label}
              onClick={() => handleTabClick(item.id)}
              className={`relative p-2.5 rounded transition-colors w-full flex justify-center ${
                isActive
                  ? "text-white"
                  : "text-[#858585] hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-(--accent)" />
              )}
              {item.icon}
            </button>
          );
        })}

        {/* Terminal Toggle */}
        <button
          aria-label="Toggle Terminal (Ctrl+`)"
          title="Terminal (Ctrl+`)"
          onClick={() => setTerminalOpen((prev) => !prev)}
          className="relative p-2.5 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
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
          className="relative p-2.5 rounded transition-colors w-full flex justify-center text-[#858585] hover:text-white"
        >
          <UserRound size={19} />
        </button>
      </div>
    </aside>
  );
}
