"use client";

import React, { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function CopilotChat() {
  const {
    chatOpen,
    setChatOpen,
    chatInput,
    setChatInput,
    chatLoading,
    chatMessages,
    askCopilot,
    chatBoost,
  } = useWorkspace();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const maxMessages = 15 + chatBoost;
  const userMessageCount = chatMessages.filter((m) => m.role === "user").length;

  useEffect(() => {
    if (chatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, chatOpen]);

  const quickPrompts = [
    "What's your tech stack?",
    "Tell me about your projects",
    "Are you available for internships?",
    "What are your hobbies?",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        aria-label="Open Copilot assistant"
        className="fixed bottom-12 right-6 sm:right-10 z-40 rounded-full border border-cyan-400/40 bg-[#1f2430] px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-white shadow-xl shadow-cyan-500/20 hover:border-cyan-400/70 hover:bg-[#253548] transition-all hover:scale-105 flex items-center gap-2"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <motion.span
          key={chatMessages.length}
          initial={{ boxShadow: "0 0 0px #22d3ee00" }}
          animate={
            chatMessages.length > 1
              ? {
                  boxShadow: [
                    "0 0 0px #22d3ee00",
                    "0 0 20px #22d3ee80",
                    "0 0 0px #22d3ee00",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
        />
        <Sparkles size={14} className="text-cyan-300 animate-pulse" />
        <span className="hidden sm:inline font-medium">
          Ask Rajat&apos;s Copilot
        </span>
        <span className="sm:hidden font-medium">Copilot</span>
      </button>

      {/* Slide-Up Chat Drawer */}
      <AnimatePresence>
        {chatOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 flex h-105 w-[92vw] max-w-90 flex-col rounded-2xl border border-(--border) bg-[#11161f]/95 backdrop-blur-md shadow-2xl overflow-hidden"
            role="dialog"
            aria-label="Copilot Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-[#161c28]">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-cyan-400" />
                <span className="text-sm font-semibold text-white">
                  Rajat&apos;s Copilot
                </span>
                <span className="text-[10px] rounded-full bg-cyan-400/10 border border-cyan-400/30 px-2 py-0.5 text-cyan-200">
                  AI
                </span>
              </div>
              <button
                aria-label="Close Copilot"
                onClick={() => setChatOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Message Feed */}
            <div className="scroll-thin flex-1 space-y-3 overflow-y-auto p-4 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={`${msg.role}-${idx}`}
                  className={`flex ${
                    msg.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-5 ${
                      msg.role === "assistant"
                        ? "bg-[#1d2331] text-[#e0e0e0] border border-white/5"
                        : "bg-[#007acc] text-white font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Streaming / Typing Skeleton */}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl p-3 bg-[#1d2331] space-y-2 border border-white/5 max-w-[85%] w-60">
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="h-2.5 bg-cyan-400/20 rounded w-3/4"
                    />
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      className="h-2.5 bg-cyan-400/20 rounded w-full"
                    />
                  </div>
                </div>
              )}

              {/* Quick Prompts */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-400/30 transition-colors"
                    onClick={() => askCopilot(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              className="flex gap-2 border-t border-white/10 p-3 bg-[#0d1117]"
              onSubmit={(e) => {
                e.preventDefault();
                if (userMessageCount < maxMessages && chatInput.trim()) {
                  askCopilot(chatInput);
                }
              }}
            >
              <input
                aria-label="Copilot question"
                className="flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs text-white placeholder:text-white/40 outline-none focus:border-cyan-400/60 disabled:opacity-50"
                placeholder={
                  userMessageCount >= maxMessages
                    ? "Question limit reached"
                    : "Ask anything about Rajat..."
                }
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={userMessageCount >= maxMessages || chatLoading}
              />
              <button
                type="submit"
                disabled={
                  userMessageCount >= maxMessages ||
                  chatLoading ||
                  !chatInput.trim()
                }
                className="rounded-lg bg-[#007acc] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#0062a3] disabled:opacity-50 transition-colors flex items-center justify-center"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
