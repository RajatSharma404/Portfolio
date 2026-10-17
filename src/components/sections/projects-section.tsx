"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, GitBranch, Sparkles } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";
import type { ProjectCategory, ProjectItem } from "@/content/site-data";

function ProjectCard({
  project,
  stars,
  isLoading,
  onOpenDetails,
}: {
  project: ProjectItem;
  stars?: number;
  isLoading?: boolean;
  onOpenDetails: (project: ProjectItem) => void;
}) {
  const reduceMotion = useReducedMotion();
  const demoLink =
    project.live && project.live !== project.github ? project.live : null;
  const isVenture =
    project.category === "Venture" ||
    (project.categories && project.categories.includes("Venture"));

  return (
    <motion.article
      className={`glass-card will-transform cursor-pointer rounded-2xl p-5 border transition-all ${
        isVenture
          ? "border-amber-400/35 bg-linear-to-br from-amber-500/10 via-black/40 to-cyan-500/5 hover:border-amber-400/60 shadow-[0_4px_24px_rgba(245,158,11,0.08)]"
          : "border-white/10 bg-black/25 hover:border-cyan-400/40 hover:bg-black/35"
      }`}
      onClick={() => onOpenDetails(project)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.015,
              y: -3,
              boxShadow: isVenture
                ? "0 18px 32px rgba(245, 158, 11, 0.16)"
                : "0 18px 32px rgba(6, 182, 212, 0.18)",
            }
      }
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="display-font bg-linear-to-r from-violet-300 via-cyan-200 to-white bg-clip-text text-xl font-bold text-transparent">
              {project.title}
            </h3>
            {isVenture && (
              <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-amber-200">
                <Sparkles size={11} className="text-amber-300" />
                VENTURE
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cyan-300/80 font-mono">
            {(project.categories ?? [project.category]).join(" · ")}
          </p>
        </div>

        {isLoading ? (
          <span className="h-5 w-12 animate-pulse rounded-full bg-white/10" />
        ) : typeof stars === "number" && stars > 0 ? (
          <span className="text-xs bg-amber-400/15 border border-amber-400/30 rounded-full px-2.5 py-0.5 text-amber-200 font-mono flex items-center gap-1">
            ★ {stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars}
          </span>
        ) : null}
      </div>

      <p className="mt-2.5 text-xs md:text-sm text-(--text-muted) leading-relaxed">
        {project.description}
      </p>

      <div className="mt-3.5 rounded-xl bg-black/35 p-3 border border-white/5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f8f8f] font-mono">
          Architecture & Impact
        </p>
        <p className="mt-1 text-xs text-[#d7deed] leading-relaxed">
          {project.impact}
        </p>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-mono text-white/90"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4.5 flex items-center justify-between gap-2 pt-3.5 border-t border-white/5 text-xs">
        <div className="flex gap-2">
          <button
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-white hover:bg-white/10 transition-colors"
            onClick={(event) => {
              event.stopPropagation();
              onOpenDetails(project);
            }}
            aria-label={`Open details for ${project.title}`}
          >
            Details
          </button>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/15 px-3 py-1.5 text-[#d8d8d8] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
            aria-label={`${project.title} source code`}
            onClick={(event) => event.stopPropagation()}
          >
            <GitBranch size={12} />
            <span>Source</span>
          </a>
        </div>

        {demoLink ? (
          <a
            href={demoLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-cyan-400/40 bg-cyan-500/15 px-3 py-1.5 text-cyan-200 hover:bg-cyan-500/25 transition-colors flex items-center gap-1 font-medium"
            aria-label={`${project.title} live demo`}
            onClick={(event) => event.stopPropagation()}
          >
            <span>Live Demo</span>
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="rounded-lg border border-white/10 px-2.5 py-1 text-white/40 text-[11px]">
            Source only
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const {
    filteredProjects,
    projectFilter,
    setProjectFilter,
    githubRepoStars,
    githubStatsLoading,
    setSelectedProject,
  } = useWorkspace();

  const categories: Array<ProjectCategory | "All"> = [
    "All",
    "AI",
    "Venture",
    "Systems",
    "Productivity",
    "Web",
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <section className="section-card panel-sheen rounded-[28px] p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
          Featured Engineering & Ventures
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className="display-font text-3xl text-white md:text-4xl font-bold">
            Flagship Projects
          </h2>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 font-mono">
            {filteredProjects.length} projects in focus
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-(--text-muted) leading-relaxed">
          Production systems, local-first AI tooling, and venture architecture shipped with Next.js 16, React 19, FastAPI, WebAssembly, and C++.
        </p>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors font-medium ${
                projectFilter === category
                  ? "border-cyan-300/60 bg-cyan-400/20 text-cyan-100 shadow-sm"
                  : "border-white/15 bg-black/20 text-[#b5bfd5] hover:bg-white/10"
              }`}
              onClick={() => setProjectFilter(category)}
              aria-pressed={projectFilter === category}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            stars={
              githubRepoStars[
                project.github.split("/").pop()?.toLowerCase() ?? ""
              ] ?? (project.slug === "dsa-tracker" ? 17 : undefined)
            }
            isLoading={githubStatsLoading}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </div>
    </div>
  );
}
