"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import {
  useWorkspace,
  files,
  extIcon,
  extColor,
} from "@/context/workspace-context";
import { ExtensionsPanel } from "./extensions-panel";
import { GitPanel } from "./git-panel";
import { SearchPanel } from "./search-panel";

export function ExplorerPanel() {
  const {
    sidebarOpen,
    setSidebarOpen,
    mobileSidebar,
    activeSidebarTab,
    folderOpen,
    setFolderOpen,
    activeFile,
    openFile,
  } = useWorkspace();

  const getTitle = () => {
    switch (activeSidebarTab) {
      case "search":
        return "Search";
      case "git":
        return "Source Control";
      case "extensions":
        return "Extensions: Marketplace";
      default:
        return "Explorer";
    }
  };

  return (
    <AnimatePresence>
      {(sidebarOpen || mobileSidebar) && (
        <motion.aside
          className="absolute z-20 h-[calc(100%-60px)] w-72 border-r border-(--border) bg-(--bg-sidebar) md:static md:h-auto select-none flex flex-col overflow-hidden"
          initial={{ x: -260, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -260, opacity: 0 }}
          transition={{ duration: 0.22 }}
          aria-label={getTitle()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-(--border) px-3 py-2 text-xs uppercase tracking-wide text-(--text-muted) bg-[#1e1e1e]">
            <span className="font-semibold text-white/90">{getTitle()}</span>
            <button
              aria-label="Close sidebar"
              onClick={() => setSidebarOpen(false)}
              className="p-0.5 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Dynamic Panel Content */}
          <div className="flex-1 overflow-hidden">
            {activeSidebarTab === "search" && <SearchPanel />}
            {activeSidebarTab === "git" && <GitPanel />}
            {activeSidebarTab === "extensions" && <ExtensionsPanel />}

            {activeSidebarTab === "explorer" && (
              <div className="scroll-thin h-full overflow-y-auto p-3 text-sm">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-(--text-muted) px-1 font-mono">
                  PORTFOLIO
                </p>

                {(["src", "public", "config"] as const).map((folder) => (
                  <div key={folder} className="mb-1">
                    {/* Folder Row */}
                    <button
                      aria-label={`Toggle folder ${folder}`}
                      className="flex w-full items-center gap-1.5 py-1 px-1 text-left text-xs font-semibold text-white/90 hover:bg-white/5 rounded transition-colors"
                      onClick={() =>
                        setFolderOpen((prev) => ({
                          ...prev,
                          [folder]: !prev[folder],
                        }))
                      }
                    >
                      <motion.span
                        animate={{ rotate: folderOpen[folder] ? 90 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-white/60"
                      >
                        <ChevronRight size={13} />
                      </motion.span>
                      <span>{folder}</span>
                    </button>

                    {/* File List */}
                    <AnimatePresence>
                      {folderOpen[folder] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden pl-3"
                        >
                          {files
                            .filter((file) => file.folder === folder)
                            .map((file) => {
                              const isActive = activeFile === file.id;
                              return (
                                <button
                                  key={file.id}
                                  aria-label={`Open ${file.name}`}
                                  onClick={() => openFile(file.id)}
                                  className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-xs transition-all ${
                                    isActive
                                      ? "bg-(--line-highlight) text-white font-medium shadow-xs"
                                      : "text-[#cccccc] hover:bg-white/5 hover:text-white hover:translate-x-0.5"
                                  }`}
                                >
                                  <span
                                    className={`w-7 text-[10px] font-mono font-bold ${extColor(
                                      file.ext,
                                    )}`}
                                  >
                                    {extIcon(file.ext)}
                                  </span>
                                  <span className="truncate">{file.name}</span>
                                </button>
                              );
                            })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
