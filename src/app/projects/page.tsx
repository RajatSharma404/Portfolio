import type { Metadata } from "next";
import Link from "next/link";
import { projectItems } from "@/content/site-data";

export const metadata: Metadata = {
  title: "Projects | Rajat Sharma",
  description: "Explore detailed pages for featured projects by Rajat Sharma.",
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-[#0b1018] px-4 py-10 text-[#d5d9e6] md:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <h1 className="text-4xl font-semibold text-white">Projects</h1>
        <p className="mt-3 max-w-2xl text-[#bac5dd]">
          A deeper view into selected projects, with architecture highlights and
          direct source links.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {projectItems.map((project) => (
            <article
              key={project.slug}
              className="rounded-xl border border-white/10 bg-[#121924] p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">
                {(project.categories ?? [project.category]).join(" · ")}
              </p>
              <h2 className="mt-2 text-2xl text-white">{project.title}</h2>
              <p className="mt-2 text-sm text-[#bac5dd]">
                {project.description}
              </p>
              <div className="mt-4">
                <Link
                  href={`/projects/${project.slug}`}
                  className="rounded border border-cyan-300/40 px-3 py-1.5 text-sm text-cyan-100 hover:bg-cyan-500/10"
                >
                  Open Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
