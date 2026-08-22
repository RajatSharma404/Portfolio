"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  WorkspaceProvider,
  useWorkspace,
} from "@/context/workspace-context";

// VS Code IDE Shell Components
import { TitleBar } from "@/components/vscode/title-bar";
import { MenuBar } from "@/components/vscode/menu-bar";
import { ActivityBar } from "@/components/vscode/activity-bar";
import { ExplorerPanel } from "@/components/vscode/sidebar/explorer-panel";
import { TabBar } from "@/components/vscode/editor/tab-bar";
import { Breadcrumbs } from "@/components/vscode/editor/breadcrumbs";
import { CodeViewer } from "@/components/vscode/editor/code-viewer";
import { StatusBar } from "@/components/vscode/status-bar";
import { TerminalPanel } from "@/components/vscode/terminal/terminal-panel";
import { CopilotChat } from "@/components/vscode/copilot/copilot-chat";
import { CommandPalette } from "@/components/vscode/command-palette";
import { ShortcutsModal } from "@/components/vscode/shortcuts-modal";
import { ProjectModal } from "@/components/vscode/project-modal";

// Modular Section Views
import { HomeSection } from "@/components/sections/home-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ReadmeSection } from "@/components/sections/readme-section";
import { PackageSection } from "@/components/sections/package-section";

function PortfolioIDE() {
  const prefersReducedMotion = useReducedMotion();
  const {
    activeFile,
    windowState,
    handleWindowControl,
    editorRef,
    viewMode,
  } = useWorkspace();

  // Closed window state
  if (windowState === "closed") {
    return (
      <div className="ide-ui flex h-screen items-center justify-center bg-black/90">
        <button
          onClick={() => handleWindowControl("maximize")}
          className="rounded-xl border border-(--border) bg-(--bg-tabbar) px-6 py-3.5 text-sm font-semibold text-(--text-main) hover:bg-(--bg-sidebar) transition-all hover:scale-105 shadow-2xl"
        >
          Reopen Rajat&apos;s Portfolio
        </button>
      </div>
    );
  }

  // Minimized window state
  if (windowState === "minimized") {
    return (
      <div className="ide-ui flex h-screen items-end p-4 bg-black/90">
        <button
          onClick={() => handleWindowControl("maximize")}
          className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--bg-tabbar) px-5 py-2.5 text-xs font-semibold shadow-2xl hover:bg-(--bg-sidebar) transition-all hover:scale-105"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-1 text-(--text-main)">
            Rajat&apos;s Portfolio (minimized)
          </span>
        </button>
      </div>
    );
  }

  const isMaximized = windowState === "maximized";

  const renderSection = () => {
    switch (activeFile) {
      case "home":
        return <HomeSection />;
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "education":
        return <ExperienceSection />;
      case "contact":
        return <ContactSection />;
      case "readme":
        return <ReadmeSection />;
      case "package":
        return <PackageSection />;
      default:
        return (
          <div className="p-8 text-center text-sm text-(--text-muted)">
            Select a file from the explorer sidebar.
          </div>
        );
    }
  };

  return (
    <div
      className={`ide-ui relative h-screen w-full select-text ${
        isMaximized ? "p-0" : "p-2 md:p-4"
      }`}
    >
      <motion.div
        className={`relative flex h-full flex-col overflow-hidden border border-(--border) bg-(--bg-main) shadow-2xl ${
          isMaximized ? "rounded-none" : "rounded-xl"
        }`}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
      >
        {/* Titlebar with window controls & theme picker */}
        <TitleBar />

        {/* Top desktop menu bar */}
        <MenuBar />

        {/* Workspace Body: Activity Bar + Explorer + Editor Pane */}
        <div className="flex min-h-0 flex-1 relative overflow-hidden">
          {/* Left vertical Activity Bar */}
          <ActivityBar />

          {/* Collapsible Sidebar (Explorer) */}
          <ExplorerPanel />

          {/* Main Editor Section */}
          <main
            id="main-content"
            tabIndex={-1}
            aria-label="Editor content"
            className="flex min-w-0 flex-1 flex-col overflow-hidden bg-(--bg-main)"
          >
            {/* Editor Tabs with View Mode Switcher */}
            <TabBar />

            {/* Breadcrumb path */}
            <Breadcrumbs />

            {/* Editor Viewport based on ViewMode */}
            <div
              ref={editorRef}
              className="scroll-thin relative flex-1 overflow-y-auto overflow-x-hidden bg-(--bg-main)"
            >
              {viewMode === "preview" && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`prev-${activeFile}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.15,
                    }}
                    className="min-h-full"
                  >
                    {renderSection()}
                  </motion.div>
                </AnimatePresence>
              )}

              {viewMode === "code" && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`code-${activeFile}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.15,
                    }}
                    className="h-full"
                  >
                    <CodeViewer fileId={activeFile} />
                  </motion.div>
                </AnimatePresence>
              )}

              {viewMode === "split" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-(--border) h-full">
                  <div className="h-full overflow-hidden">
                    <CodeViewer fileId={activeFile} />
                  </div>
                  <div className="h-full overflow-y-auto scroll-thin">
                    {renderSection()}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Bottom Status Bar */}
        <StatusBar />

        {/* Integrated Bottom Terminal Drawer */}
        <TerminalPanel />

        {/* Copilot Assistant Trigger & Chat */}
        <CopilotChat />

        {/* Modals & Overlays */}
        <CommandPalette />
        <ShortcutsModal />
        <ProjectModal />
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <WorkspaceProvider>
      <PortfolioIDE />
    </WorkspaceProvider>
  );
}
