"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  useWorkspace,
  topMenus,
  menuItems,
} from "@/context/workspace-context";

export function MenuBar() {
  const { menuRef, menuOpen, setMenuOpen, executeMenuAction } = useWorkspace();

  return (
    <nav
      ref={menuRef}
      className="flex gap-5 bg-(--menubar) px-4 py-1 text-xs select-none border-b border-black/10"
      aria-label="Window Menu"
    >
      {topMenus.map((menu) => (
        <div key={menu} className="relative">
          <button
            className="text-[#cccccc] hover:text-white transition-colors"
            onClick={() =>
              setMenuOpen((prev) => (prev === menu ? null : menu))
            }
          >
            {menu}
          </button>
          <AnimatePresence>
            {menuOpen === menu && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute left-0 top-6 z-50 min-w-56 rounded border border-(--border) bg-[#2c2c2f] py-1 text-[11px] shadow-2xl"
              >
                {menuItems[menu].map((item, idx) => (
                  <div key={`${menu}-${item.label}-${idx}`}>
                    {item.section && (
                      <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-(--text-muted)">
                        {item.section}
                      </p>
                    )}
                    <button
                      className="flex w-full items-center justify-between px-4 py-1.5 text-left text-white hover:bg-[#007acc] transition-colors"
                      onClick={() => executeMenuAction(item.action)}
                    >
                      <span>{item.label}</span>
                      {item.hint && (
                        <span className="text-(--text-muted) text-[10px]">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
