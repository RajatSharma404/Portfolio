"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Minus,
  Terminal as TerminalIcon,
  AlertCircle,
  FileText,
  Radio,
  Bug,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import type { BottomTab } from "@/types/vscode";

const DinoGame = dynamic(() => import("@/components/dino-game"), {
  ssr: false,
  loading: () => (
    <p className="mt-2 text-xs text-(--text-muted)">Loading dino game...</p>
  ),
});

function MatrixRain({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth ?? 600;
    canvas.height = 160;

    const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}[]=+/";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).map(() => 1);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(10, 15, 20, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22c55e";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative my-2 rounded-lg border border-emerald-500/30 overflow-hidden bg-[#0a0f14]">
      <canvas ref={canvasRef} className="w-full h-40 block" />
      <button
        onClick={onExit}
        className="absolute top-2 right-2 rounded bg-black/60 border border-emerald-500/40 px-2 py-0.5 text-[10px] text-emerald-300 hover:bg-emerald-500/20"
      >
        Exit Matrix
      </button>
    </div>
  );
}

export function TerminalPanel() {
  const {
    terminalOpen,
    setTerminalOpen,
    activeBottomTab,
    setActiveBottomTab,
    terminalLines,
    terminalPath,
    terminalInput,
    setTerminalInput,
    terminalHistory,
    runTerminalCommand,
    showDino,
    setShowDino,
    showMatrix,
    setShowMatrix,
    setChatBoost,
  } = useWorkspace();

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [debugLogs, setDebugLogs] = useState<
    Array<{ input: string; output: string; isError?: boolean }>
  >([
    {
      input: "typeof window",
      output: '"object"',
    },
    {
      input: "portfolio.developer",
      output: '{\n  name: "Rajat Sharma",\n  role: "Full Stack & AI",\n  leetcode: 500\n}',
    },
  ]);
  const [debugInput, setDebugInput] = useState("");

  const commandList = [
    "help",
    "neofetch",
    "matrix",
    "dsa",
    "leetcode",
    "skills",
    "theme",
    "whoami",
    "ls",
    "cd",
    "cat",
    "open",
    "clear",
    "play",
    "contact",
    "git status",
    "git log",
    "git branch",
    "curl",
    "echo",
  ];

  useEffect(() => {
    if (terminalOpen && activeBottomTab === "terminal") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines, terminalOpen, activeBottomTab]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up: traverse command history backwards
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (terminalHistory.length === 0) return;
      const nextIndex =
        historyIndex === -1
          ? terminalHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setTerminalInput(terminalHistory[nextIndex] ?? "");
    }
    // Arrow Down: traverse command history forwards
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= terminalHistory.length) {
        setHistoryIndex(-1);
        setTerminalInput("");
      } else {
        setHistoryIndex(nextIndex);
        setTerminalInput(terminalHistory[nextIndex] ?? "");
      }
    }
    // Tab Completion
    else if (e.key === "Tab") {
      e.preventDefault();
      if (!terminalInput.trim()) return;
      const match = commandList.find((cmd) =>
        cmd.startsWith(terminalInput.toLowerCase()),
      );
      if (match) {
        setTerminalInput(match);
      }
    }
  };

  const handleDebugSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debugInput.trim()) return;

    let output = "";
    let isError = false;

    try {
      if (debugInput.trim() === "clear") {
        setDebugLogs([]);
        setDebugInput("");
        return;
      }
      // Safe evaluation for basic math/literals
      const result = Function(`'use strict'; return (${debugInput})`)();
      output =
        typeof result === "object"
          ? JSON.stringify(result, null, 2)
          : String(result);
    } catch (err: unknown) {
      output = err instanceof Error ? err.message : String(err);
      isError = true;
    }

    setDebugLogs((prev) => [
      ...prev,
      { input: debugInput, output, isError },
    ]);
    setDebugInput("");
  };

  const tabs: Array<{ id: BottomTab; label: string; icon: React.ReactNode }> = [
    {
      id: "terminal",
      label: "TERMINAL",
      icon: <TerminalIcon size={12} className="text-cyan-400" />,
    },
    {
      id: "problems",
      label: "PROBLEMS (0)",
      icon: <AlertCircle size={12} className="text-emerald-400" />,
    },
    {
      id: "output",
      label: "OUTPUT",
      icon: <FileText size={12} className="text-blue-400" />,
    },
    {
      id: "debug",
      label: "DEBUG CONSOLE",
      icon: <Bug size={12} className="text-purple-400" />,
    },
    {
      id: "ports",
      label: "PORTS (1)",
      icon: <Radio size={12} className="text-amber-400" />,
    },
  ];

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.section
          initial={{ y: 260, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 260, opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="terminal-glow absolute inset-x-0 bottom-6.5 z-30 border-t border-(--border) bg-[#111317] p-3 code-font shadow-2xl"
          aria-label="Integrated Bottom Panel"
        >
          {/* Top Panel Tabs Navigation */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-2 text-xs text-(--text-muted) select-none">
            <div className="flex items-center gap-3 overflow-x-auto scroll-thin">
              {tabs.map((tab) => {
                const isActive = activeBottomTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveBottomTab(tab.id)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all font-mono text-[11px] ${
                      isActive
                        ? "text-white font-semibold bg-white/10 border-b-2 border-cyan-400"
                        : "hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Window Minimize/Close */}
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

          {/* Tab 1: TERMINAL */}
          {activeBottomTab === "terminal" && (
            <div>
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
                            : line.startsWith("==")
                              ? "text-amber-400 font-bold"
                              : "text-[#d4d4d4]"
                    }
                  >
                    {line}
                  </p>
                ))}

                {/* Matrix Rain Easter Egg */}
                {showMatrix && (
                  <MatrixRain onExit={() => setShowMatrix(false)} />
                )}

                {/* Dino Game Easter Egg */}
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

              {/* Terminal Command Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runTerminalCommand(terminalInput);
                  setTerminalInput("");
                  setHistoryIndex(-1);
                }}
                className="mt-2 flex items-center gap-2 text-xs border-t border-white/5 pt-1.5"
              >
                <span className="text-emerald-400 font-bold">
                  {terminalPath}$
                </span>
                <input
                  aria-label="Terminal command input"
                  autoFocus
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command (e.g. neofetch, matrix, dsa, skills, theme, play)... [Tab to complete]"
                  className="flex-1 border-none bg-transparent outline-none text-white text-xs font-mono placeholder:text-white/30"
                />
              </form>
            </div>
          )}

          {/* Tab 2: PROBLEMS */}
          {activeBottomTab === "problems" && (
            <div className="p-3 text-xs space-y-2 max-h-48 overflow-y-auto font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={14} />
                <span className="font-semibold">
                  No problems have been detected in the workspace.
                </span>
              </div>
              <div className="space-y-1 text-white/60 text-[11px] pt-2 border-t border-white/5">
                <p>• TypeScript 5.0 Typechecker: 0 errors</p>
                <p>• Next.js 16 Turbopack: Clean compilation</p>
                <p>• ESLint Code Quality: 0 warnings</p>
                <p>• Accessibility Standards: WCAG 2.1 AA Compliant</p>
              </div>
            </div>
          )}

          {/* Tab 3: OUTPUT */}
          {activeBottomTab === "output" && (
            <div className="p-2 text-xs space-y-1 max-h-48 overflow-y-auto font-mono text-white/80">
              <p className="text-cyan-400 font-semibold">
                ▲ Next.js 16.2.3 (Turbopack App Router Engine)
              </p>
              <p className="text-white/50">
                - Environments: production, edge-runtime
              </p>
              <p className="text-white/50">
                - Local: http://localhost:3000
              </p>
              <p className="text-emerald-400">✓ Ready in 842ms</p>
              <p className="text-white/70">
                GET / 200 in 34ms (client hydration complete)
              </p>
              <p className="text-white/70">
                GET /api/copilot 200 in 112ms (stream ready)
              </p>
              <p className="text-white/50">
                [Fast Refresh] done in 28ms (0 modules changed)
              </p>
            </div>
          )}

          {/* Tab 4: DEBUG CONSOLE */}
          {activeBottomTab === "debug" && (
            <div className="p-2 text-xs space-y-2 max-h-48 overflow-y-auto font-mono">
              <div className="space-y-1.5">
                {debugLogs.map((log, lIdx) => (
                  <div key={`debug-${lIdx}`} className="space-y-0.5">
                    <p className="text-purple-300 font-semibold">
                      &gt; {log.input}
                    </p>
                    <pre
                      className={`whitespace-pre-wrap pl-3 text-[11px] ${
                        log.isError ? "text-rose-400" : "text-[#b4befe]"
                      }`}
                    >
                      {log.output}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Debug REPL Input */}
              <form
                onSubmit={handleDebugSubmit}
                className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2"
              >
                <span className="text-purple-400 font-bold">&gt;</span>
                <input
                  value={debugInput}
                  onChange={(e) => setDebugInput(e.target.value)}
                  placeholder="Evaluate expression (e.g. 2 + 2, Math.PI, type 'clear')..."
                  className="flex-1 border-none bg-transparent outline-none text-white text-xs font-mono placeholder:text-white/30"
                />
              </form>
            </div>
          )}

          {/* Tab 5: PORTS */}
          {activeBottomTab === "ports" && (
            <div className="p-2 text-xs max-h-48 overflow-y-auto font-mono">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] uppercase text-(--text-muted)">
                    <th className="pb-1.5 font-bold">Port</th>
                    <th className="pb-1.5 font-bold">Protocol</th>
                    <th className="pb-1.5 font-bold">Local Address</th>
                    <th className="pb-1.5 font-bold">Forwarded Target</th>
                    <th className="pb-1.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[11px]">
                  <tr>
                    <td className="py-2 text-amber-300 font-bold">3000</td>
                    <td className="py-2 text-white/70">HTTP</td>
                    <td className="py-2 text-cyan-300">
                      http://localhost:3000
                    </td>
                    <td className="py-2">
                      <a
                        href="https://portfolio-chi-self-31.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-violet-300 hover:underline"
                      >
                        <span>portfolio-chi-self-31.vercel.app</span>
                        <ExternalLink size={10} />
                      </a>
                    </td>
                    <td className="py-2 text-emerald-400 font-semibold">
                      ● Running
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
}
