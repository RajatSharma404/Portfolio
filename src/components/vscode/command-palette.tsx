"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function CommandPalette() {
  const {
    paletteOpen,
    closePalette,
    paletteQuery,
    setPaletteQuery,
    paletteIndex,
    setPaletteIndex,
    filteredPalette,
    handlePaletteSelect,
  } = useWorkspace();

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-xs pt-16 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePalette}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette overlay"
        >
          <motion.div
            initial={{ y: -15, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -15, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-2xl rounded-xl border border-(--border) bg-[#1f2229] shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-2 border-b border-white/10 p-3.5 bg-[#171a20]">
              <Search size={16} className="text-white/60" />
              <input
                aria-label="Command palette query"
                autoFocus
                value={paletteQuery}
                onChange={(e) => {
                  setPaletteQuery(e.target.value);
                  setPaletteIndex(0);
                }}
                placeholder="> Type a command or search files..."
                className="w-full border-none bg-transparent code-font text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>

            {/* Results list */}
            <div className="max-h-72 overflow-y-auto p-2 text-sm scroll-thin">
              {filteredPalette.length === 0 ? (
                <p className="px-3 py-4 text-center text-xs text-(--text-muted)">
                  No matches found. Try typing a filename, section, or action.
                </p>
              ) : (
                filteredPalette.map((item, index) => (
                  <button
                    key={item.id}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      index === paletteIndex
                        ? "bg-[#007acc] text-white font-medium"
                        : "text-[#d0d0d0] hover:bg-white/5"
                    }`}
                    onClick={() => handlePaletteSelect(item.id)}
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-wider">
                      {item.type}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
