"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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

  return (
    <motion.article
      className="glass-card will-transform cursor-pointer rounded-xl p-4.5 border border-white/10 hover:border-cyan-400/40 transition-colors"
      role="button"
      tabIndex={0}
      onClick={() => onOpenDetails(project)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenDetails(project);
        }
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.015,
              y: -2,
              boxShadow: "0 16px 28px rgba(6, 182, 212, 0.2)",
            }
      }
      transition={{ duration: reduceMotion ? 0 : 0.16 }}
    >
      <div className="flex items-center justify-between">
        <h4 className="display-font bg-linear-to-r from-violet-400 to-cyan-300 bg-clip-text text-lg font-bold text-transparent">
          {project.title}
        </h4>
        {isLoading ? (
          <span className="h-5 w-12 animate-pulse rounded-full bg-white/10" />
        ) : typeof stars === "number" ? (
          <span className="text-xs bg-white/10 rounded-full px-2 py-0.5 text-[#c9cede] font-mono">
            ★ {stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars}
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cyan-300/80 font-mono">
        {(project.categories ?? [project.category]).join(" · ")}
      </p>
      <p className="mt-1 text-xs md:text-sm text-(--text-muted) leading-relaxed">
        {project.description}
      </p>

      <div className="mt-3 rounded-lg bg-black/20 p-2.5 border border-white/5">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#8f8f8f] font-mono">
          What it solves
        </p>
        <p className="mt-1 text-xs text-[#c9cede] leading-normal">
          {project.impact}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-white/90"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2.5 text-xs pt-3 border-t border-white/5">
        <button
          className="rounded-md border border-white/20 px-2.5 py-1 text-white hover:bg-white/10 transition-colors"
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
          className="rounded-md border border-white/15 px-2.5 py-1 text-[#d8d8d8] hover:text-white hover:bg-white/10 transition-colors"
          aria-label={`${project.title} source code`}
          onClick={(event) => event.stopPropagation()}
        >
          Source
        </a>
        {demoLink ? (
          <a
            href={demoLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-violet-400/40 bg-violet-500/10 px-2.5 py-1 text-violet-200 hover:bg-violet-500/20 transition-colors"
            aria-label={`${project.title} live demo`}
            onClick={(event) => event.stopPropagation()}
          >
            Live Demo
          </a>
        ) : (
          <span className="rounded-md border border-white/10 px-2.5 py-1 text-white/40 text-[11px]">
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
    "Web",
    "Productivity",
    "Finance",
    "AI",
  ];

  return (
    <div className="px-5 py-5 md:px-8">
      <section className="section-card panel-sheen rounded-[28px] p-6 md:p-7">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
          Selected Work
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h3 className="display-font text-3xl text-white md:text-4xl">
            Featured Projects
          </h3>
          <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">
            {filteredProjects.length} projects in focus
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-(--text-muted)">
          A selection of products I engineered and shipped with emphasis on clean
          UX, useful workflows, and real utility.
        </p>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors font-medium ${
                projectFilter === category
                  ? "border-cyan-300/60 bg-cyan-400/15 text-cyan-100 shadow-xs"
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
              ]
            }
            isLoading={githubStatsLoading}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </div>
    </div>
  );
}
