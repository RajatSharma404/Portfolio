"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Keyboard } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function ShortcutsModal() {
  const { shortcutHelpOpen, setShortcutHelpOpen } = useWorkspace();

  const shortcuts = [
    { key: "Ctrl + P", desc: "Open Command Palette / Go to file" },
    { key: "Ctrl + B", desc: "Toggle Explorer Sidebar" },
    { key: "Ctrl + `", desc: "Toggle Integrated Terminal" },
    { key: "Ctrl + Shift + P", desc: "Open Theme Switcher" },
    { key: "Ctrl + Shift + C", desc: "Toggle Rajat's Copilot" },
    { key: "?", desc: "Show this Keyboard Shortcuts panel" },
    { key: "Escape", desc: "Close any open dialog / overlay" },
  ];

  return (
    <AnimatePresence>
      {shortcutHelpOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShortcutHelpOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard Shortcuts"
        >
          <motion.section
            className="w-full max-w-md rounded-2xl border border-white/15 bg-[#121924] p-6 shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Keyboard size={18} className="text-cyan-400" />
                <h3 className="display-font text-xl font-bold text-white">
                  Keyboard Shortcuts
                </h3>
              </div>
              <button
                aria-label="Close shortcuts dialog"
                className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                onClick={() => setShortcutHelpOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <ul className="mt-4 space-y-2.5 text-xs text-[#ccd4e6]">
              {shortcuts.map((item) => (
                <li
                  key={item.key}
                  className="flex items-center justify-between p-1.5 rounded-lg bg-black/20 border border-white/5"
                >
                  <span className="text-[#a0aec0]">{item.desc}</span>
                  <kbd className="rounded-md border border-white/20 bg-white/10 px-2 py-1 font-mono text-[11px] text-cyan-200 font-semibold shadow-xs">
                    {item.key}
                  </kbd>
                </li>
              ))}
            </ul>

            <button
              className="mt-5 w-full rounded-lg border border-white/20 bg-white/5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
              onClick={() => setShortcutHelpOpen(false)}
            >
              Close Shortcuts
            </button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
