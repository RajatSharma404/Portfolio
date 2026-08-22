"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { useWorkspace, files, extIcon, extColor } from "@/context/workspace-context";
import { rawCodeRegistry } from "@/content/code-raw-content";
import type { FileNode } from "@/types/vscode";

type MatchResult = {
  fileId: string;
  filename: string;
  ext: FileNode["ext"];
  matches: Array<{ lineNum: number; lineText: string }>;
};

export function SearchPanel() {
  const { openFile, setCurrentLine } = useWorkspace();
  const [query, setQuery] = useState("");
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>({});

  const toggleCollapse = (fileId: string) => {
    setCollapsedFiles((prev) => ({ ...prev, [fileId]: !prev[fileId] }));
  };

  const results: MatchResult[] = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const list: MatchResult[] = [];

    files.forEach((file) => {
      const rawData = rawCodeRegistry[file.id];
      if (!rawData) return;

      const fileMatches: Array<{ lineNum: number; lineText: string }> = [];

      rawData.lines.forEach((lineTokens, lineIdx) => {
        const fullLine = lineTokens.map((t) => t.text).join("");
        if (fullLine.toLowerCase().includes(lowerQuery)) {
          fileMatches.push({
            lineNum: lineIdx + 1,
            lineText: fullLine.trim(),
          });
        }
      });

      if (fileMatches.length > 0) {
        list.push({
          fileId: file.id,
          filename: file.name,
          ext: file.ext,
          matches: fileMatches,
        });
      }
    });

    return list;
  }, [query]);

  const totalMatches = results.reduce((sum, r) => sum + r.matches.length, 0);

  const handleMatchClick = (fileId: string, lineNum: number) => {
    openFile(fileId);
    setCurrentLine(lineNum);
  };

  return (
    <div className="flex h-full flex-col text-xs text-[#cccccc] select-none p-3 space-y-3 font-mono">
      {/* Search Bar */}
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase font-bold text-(--text-muted) tracking-wider">
          Search Workspace
        </p>
        <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-2.5 py-1.5 focus-within:border-cyan-400/60 transition-colors">
          <Search size={13} className="text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords (e.g. LeetCode, React, Stockfish)..."
            className="w-full border-none bg-transparent text-xs text-white placeholder:text-white/40 outline-none font-sans"
          />
        </div>
      </div>

      {/* Results Header */}
      {query.trim() && (
        <div className="flex items-center justify-between text-[11px] text-(--text-muted) pt-1 border-t border-white/5">
          <span>
            {totalMatches} match{totalMatches === 1 ? "" : "es"} across {results.length} file{results.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      {/* Results List */}
      <div className="scroll-thin flex-1 overflow-y-auto space-y-2">
        {!query.trim() ? (
          <p className="text-center py-6 text-xs text-(--text-muted) font-sans">
            Type any term above to search across all workspace files & projects.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center py-6 text-xs text-(--text-muted) font-sans">
            No results found for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          results.map((item) => {
            const isCollapsed = collapsedFiles[item.fileId] ?? false;

            return (
              <div
                key={item.fileId}
                className="rounded-lg border border-white/5 bg-white/2 overflow-hidden"
              >
                {/* File Header */}
                <button
                  onClick={() => toggleCollapse(item.fileId)}
                  className="flex w-full items-center justify-between p-2 text-left bg-white/3 hover:bg-white/7 transition-colors"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {isCollapsed ? (
                      <ChevronRight size={12} className="text-white/40" />
                    ) : (
                      <ChevronDown size={12} className="text-white/40" />
                    )}
                    <span className={`text-[10px] font-bold ${extColor(item.ext)}`}>
                      {extIcon(item.ext)}
                    </span>
                    <span className="font-semibold text-white/90 truncate">
                      {item.filename}
                    </span>
                  </div>
                  <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] text-white/60">
                    {item.matches.length}
                  </span>
                </button>

                {/* Match lines */}
                {!isCollapsed && (
                  <div className="p-1 space-y-0.5 border-t border-white/5">
                    {item.matches.map((match, mIdx) => (
                      <div
                        key={`${item.fileId}-${match.lineNum}-${mIdx}`}
                        onClick={() => handleMatchClick(item.fileId, match.lineNum)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-cyan-500/10 hover:text-cyan-200 transition-colors cursor-pointer group"
                      >
                        <span className="w-5 text-right text-[10px] text-(--text-muted) group-hover:text-cyan-300">
                          {match.lineNum}:
                        </span>
                        <span className="truncate text-[11px] text-white/80 group-hover:text-white">
                          {match.lineText}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
