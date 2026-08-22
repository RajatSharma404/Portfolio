"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, GitBranch, X } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

export function ProjectModal() {
  const { selectedProject, setSelectedProject } = useWorkspace();

  if (!selectedProject) return null;

  const demoLink =
    selectedProject.live && selectedProject.live !== selectedProject.github
      ? selectedProject.live
      : null;

  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project details dialog"
        >
          <motion.article
            className="w-full max-w-2xl rounded-2xl border border-white/15 bg-[#121924] p-6 shadow-2xl overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/80 font-mono">
                  {(
                    selectedProject.categories ?? [selectedProject.category]
                  ).join(" · ")}
                </p>
                <h3 className="display-font mt-1.5 text-2xl md:text-3xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-sm text-[#b2bdd2] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
              <button
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
              >
                <X size={16} />
              </button>
            </div>

            {/* Impact / Problem solved */}
            <div className="mt-4 rounded-xl bg-black/30 border border-white/5 p-3.5">
              <p className="text-[10px] uppercase tracking-wider text-[#8f8f8f] font-mono">
                Impact & Solution
              </p>
              <p className="mt-1 text-xs md:text-sm text-[#d7deed] leading-relaxed">
                {selectedProject.impact}
              </p>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {selectedProject.stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/90 font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key Highlights */}
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-wider text-[#8f8f8f] font-mono mb-2">
                Key Highlights
              </p>
              <ul className="list-disc space-y-1.5 pl-5 text-xs md:text-sm text-[#cdd6e9]">
                {selectedProject.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs">
              <Link
                href={`/projects/${selectedProject.slug}`}
                className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3.5 py-2 font-medium text-cyan-100 hover:bg-cyan-500/20 transition-colors flex items-center gap-1.5"
              >
                <span>Standalone Page</span>
              </Link>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/20 bg-white/5 px-3.5 py-2 font-medium text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <GitBranch size={13} />
                <span>View Source</span>
              </a>

              {demoLink ? (
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-violet-400/40 bg-violet-500/10 px-3.5 py-2 font-medium text-violet-100 hover:bg-violet-500/20 transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>Live Demo</span>
                </a>
              ) : (
                <span className="rounded-lg border border-white/10 px-3 py-2 text-white/50">
                  Source Only
                </span>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
