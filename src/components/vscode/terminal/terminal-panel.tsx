"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Terminal as TerminalIcon } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

const DinoGame = dynamic(() => import("@/components/dino-game"), {
  ssr: false,
  loading: () => (
    <p className="mt-2 text-xs text-(--text-muted)">Loading dino game...</p>
  ),
});

export function TerminalPanel() {
  const {
    terminalOpen,
    setTerminalOpen,
    terminalLines,
    terminalPath,
    terminalInput,
    setTerminalInput,
    runTerminalCommand,
    showDino,
    setShowDino,
    setChatBoost,
  } = useWorkspace();

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines, terminalOpen]);

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.section
          initial={{ y: 260, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 260, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="terminal-glow absolute inset-x-0 bottom-6.5 z-30 border-t border-(--border) bg-[#111317] p-3 code-font shadow-2xl"
          aria-label="Integrated Terminal"
        >
          {/* Terminal Tabs / Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-xs text-(--text-muted)">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-white font-medium">
                <TerminalIcon size={13} className="text-cyan-400" />
                <span>TERMINAL</span>
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                PROBLEMS (0)
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                OUTPUT
              </span>
              <span className="hover:text-white transition-colors cursor-pointer">
                DEBUG CONSOLE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Minimize terminal"
                onClick={() => setTerminalOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white"
              >
                <Minus size={12} />
              </button>
              <button
                aria-label="Close terminal"
                onClick={() => setTerminalOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white/70 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Terminal Output Log */}
          <div className="scroll-thin max-h-44 overflow-y-auto text-xs space-y-1">
            {terminalLines.map((line, idx) => (
              <p
                key={`${line}-${idx}`}
                className={
                  line.startsWith(">")
                    ? "text-cyan-300/90"
                    : line.startsWith(" ✓")
                      ? "text-emerald-400 font-semibold"
                      : line.startsWith("$")
                        ? "text-yellow-300 font-medium"
                        : "text-[#d4d4d4]"
                }
              >
                {line}
              </p>
            ))}

            {/* Embedded Dino Game Easter Egg */}
            {showDino && (
              <div className="my-2">
                <DinoGame
                  onStop={() => setShowDino(false)}
                  onScoreUnlock={() => {
                    setChatBoost((prev) => (prev >= 5 ? prev : prev + 5));
                  }}
                />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Command Prompt Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runTerminalCommand(terminalInput);
              setTerminalInput("");
            }}
            className="mt-2 flex items-center gap-2 text-xs border-t border-white/5 pt-1.5"
          >
            <span className="text-emerald-400 font-bold">{terminalPath}$</span>
            <input
              aria-label="Terminal command input"
              autoFocus
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type a command (e.g. help, whoami, ls, play)..."
              className="flex-1 border-none bg-transparent outline-none text-white text-xs font-mono placeholder:text-white/30"
            />
          </form>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
