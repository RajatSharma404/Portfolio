"use client";

import React from "react";
import {
  useWorkspace,
  topMenus,
  menuItems,
} from "@/context/workspace-context";

export function MenuBar() {
  const { menuRef, menuOpen, setMenuOpen, executeMenuAction, playSound } =
    useWorkspace();

  return (
    <nav
      ref={menuRef as React.RefObject<HTMLElement | null>}
      className="relative z-40 flex items-center gap-1 bg-(--menubar) px-3 py-0.5 text-xs select-none border-b border-black/20 overflow-visible"
      aria-label="Window Menu"
    >
      {topMenus.map((menu) => {
        const isOpen = menuOpen === menu;
        return (
          <div key={menu} className="relative">
            <button
              type="button"
              className={`rounded px-2 py-0.5 text-xs transition-colors cursor-pointer ${
                isOpen
                  ? "bg-white/15 text-white shadow-xs"
                  : "text-[#cccccc] hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => {
                playSound("click");
                setMenuOpen((prev) => (prev === menu ? null : menu));
              }}
              onMouseEnter={() => {
                if (menuOpen !== null && menuOpen !== menu) {
                  setMenuOpen(menu);
                }
              }}
            >
              {menu}
            </button>
            {isOpen && (
              <div
                className="absolute left-0 top-full mt-1 z-50 min-w-56 rounded-md border border-(--border) bg-[#252526] py-1 text-[11px] shadow-2xl backdrop-blur-md"
              >
                {menuItems[menu].map((item, idx) => (
                  <div key={`${menu}-${item.label}-${idx}`}>
                    {item.section && (
                      <p className="px-3 pt-1.5 pb-0.5 text-[9px] font-semibold uppercase tracking-widest text-(--text-muted)">
                        {item.section}
                      </p>
                    )}
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[#cccccc] hover:bg-[#007acc] hover:text-white transition-colors cursor-pointer"
                      onClick={() => executeMenuAction(item.action)}
                    >
                      <span>{item.label}</span>
                      {item.hint && (
                        <span className="text-(--text-muted) text-[10px] ml-4 font-mono">
                          {item.hint}
                        </span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

