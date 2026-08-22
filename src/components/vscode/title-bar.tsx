"use client";

import React from "react";
import { Search } from "lucide-react";
import { useWorkspace, themes } from "@/context/workspace-context";
import { AnimatePresence, motion } from "framer-motion";

export function TitleBar() {
  const {
    handleWindowControl,
    setMobileSidebar,
    togglePalette,
    themePickerOpen,
    setThemePickerOpen,
    themeDotColor,
    activeThemeLabel,
    setTheme,
    playSound,
  } = useWorkspace();

  return (
    <header className="relative flex items-center justify-between bg-(--titlebar) px-4 py-1.5 text-sm select-none border-b border-black/20">
      <div className="flex items-center gap-2">
        {/* Traffic Light Window Controls */}
        <button
          aria-label="Close window"
          title="Close"
          onClick={() => handleWindowControl("close")}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]"
        >
          <span className="relative block h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="absolute left-1/2 top-0 h-2 w-[1.5px] -translate-x-1/2 rotate-45 rounded bg-black/70" />
            <span className="absolute left-1/2 top-0 h-2 w-[1.5px] -translate-x-1/2 -rotate-45 rounded bg-black/70" />
          </span>
        </button>
        <button
          aria-label="Minimize window"
          title="Minimize"
          onClick={() => handleWindowControl("minimize")}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]"
        >
          <span className="block h-[1.5px] w-2 rounded bg-black/70 opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
        <button
          aria-label="Maximize window"
          title="Maximize"
          onClick={() => handleWindowControl("maximize")}
          className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840]"
        >
          <span className="relative block h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-black/70" />
            <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-black/70" />
          </span>
        </button>

        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          className="md:hidden p-1 hover:bg-white/10 rounded transition-colors text-white/80"
          aria-label="Toggle mobile sidebar"
          onClick={() => setMobileSidebar((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Central Command Palette Trigger */}
      <button
        onClick={togglePalette}
        className="flex w-full max-w-85 items-center justify-center rounded-md border border-white/10 bg-[#2a2d2e] px-3 py-1 text-xs text-(--text-muted) hover:bg-white/10 hover:border-white/20 transition-colors"
      >
        <Search size={12} className="mr-2 text-white/60" />
        <span className="text-white/80">rajat-sharma : portfolio</span>
        <span className="ml-3 rounded border border-white/20 px-1 text-[10px] text-white/60">
          Ctrl P
        </span>
      </button>

      {/* Theme Picker Trigger */}
      <div className="relative flex w-40 justify-end">
        <button
          onClick={() => setThemePickerOpen((prev) => !prev)}
          aria-label="Open theme picker"
          className="inline-flex h-7 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-white/10 bg-[#2a2d2e] px-2 text-[11px] text-white hover:bg-white/10 transition-colors"
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: themeDotColor }}
          />
          <span>{activeThemeLabel}</span>
        </button>

        {/* Theme Picker Dropdown */}
        <AnimatePresence>
          {themePickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute top-9 right-0 z-50 w-56 rounded border border-(--border) bg-[#1f2229] p-2 shadow-2xl"
            >
              <p className="px-2 py-1 text-[10px] uppercase tracking-wider text-(--text-muted)">
                Select Color Theme
              </p>
              {themes.map((item) => (
                <button
                  key={item.value}
                  className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-xs text-white hover:bg-[#007acc] transition-colors"
                  onClick={() => {
                    setTheme(item.value);
                    playSound("click");
                    setThemePickerOpen(false);
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.dot }}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
