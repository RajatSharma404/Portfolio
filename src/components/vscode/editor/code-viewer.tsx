"use client";

import React, { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import { rawCodeRegistry } from "@/content/code-raw-content";
import type { Token } from "@/types/vscode";

export function CodeViewer({ fileId }: { fileId?: string }) {
  const { activeFile, currentLine } = useWorkspace();
  const targetId = fileId ?? activeFile;
  const rawData = rawCodeRegistry[targetId] ?? rawCodeRegistry.home;
  const [copied, setCopied] = useState(false);

  const tokenClass: Record<Token["type"], string> = {
    kw: "text-(--keyword)",
    str: "text-(--string)",
    com: "text-(--comment)",
    fn: "text-(--function)",
    num: "text-(--number)",
    plain: "text-(--text-main)",
  };

  const handleCopy = () => {
    if (!rawData) return;
    navigator.clipboard.writeText(rawData.rawString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col bg-(--bg-main) font-mono text-xs md:text-sm overflow-hidden select-text">
      {/* Code Header Action Bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 bg-[#171a20]/90 select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
            <FileCode size={14} className="text-cyan-400" />
            <span>{rawData.filename}</span>
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-cyan-200">
            {rawData.language}
          </span>
          <span className="hidden sm:inline text-[11px] text-(--text-muted)">
            {rawData.lines.length} lines
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/90 hover:bg-white/10 hover:border-cyan-400/40 hover:text-cyan-100 transition-all"
          title="Copy source code to clipboard"
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="text-emerald-300 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Lines Container */}
      <div className="scroll-thin flex-1 overflow-auto p-3 md:p-4">
        <div className="min-w-fit space-y-0.5">
          {rawData.lines.map((lineTokens, lineIdx) => {
            const lineNum = lineIdx + 1;
            const isHighlighted = currentLine === lineNum;

            return (
              <div
                key={`line-${targetId}-${lineNum}`}
                data-line={lineNum}
                className={`flex items-start gap-4 px-2 py-0.5 rounded transition-colors ${
                  isHighlighted
                    ? "bg-white/10 line-illuminate"
                    : "hover:bg-white/5"
                }`}
              >
                {/* Line Number */}
                <span className="w-8 select-none text-right text-[11px] text-(--text-muted) opacity-60 font-mono">
                  {lineNum}
                </span>

                {/* Tokens */}
                <span className="flex-1 whitespace-pre-wrap leading-5">
                  {lineTokens.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    lineTokens.map((token, tokenIdx) => (
                      <span
                        key={`tok-${lineNum}-${tokenIdx}`}
                        className={tokenClass[token.type] ?? "text-(--text-main)"}
                      >
                        {token.text}
                      </span>
                    ))
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
