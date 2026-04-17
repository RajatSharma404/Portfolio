import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectItems } from "@/content/site-data";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const findProject = (slug: string) =>
  projectItems.find((project) => project.slug === slug);

export async function generateStaticParams() {
  return projectItems.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Rajat Sharma`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Rajat Sharma`,
      description: project.impact,
      type: "article",
      url: `https://rajat-portfolio.vercel.app/projects/${project.slug}`,
      images: [
        {
          url: `https://rajat-portfolio.vercel.app/og-image.png?project=${project.slug}`,
          width: 1200,
          height: 630,
          alt: `${project.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Rajat Sharma`,
      description: project.description,
      images: [
        `https://rajat-portfolio.vercel.app/og-image.png?project=${project.slug}`,
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0b1018] px-4 py-10 text-[#d5d9e6] md:px-8">
      <article className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-[#121924] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300/70">
          {project.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          {project.title}
        </h1>
        <p className="mt-4 text-base text-[#bac5dd]">{project.description}</p>
        <p className="mt-3 text-sm text-[#d9e0f1]">{project.impact}</p>

        <section className="mt-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8f9ab2]">
            Highlights
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#d5d9e6]">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8f9ab2]">
            Stack
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-cyan-300/40 px-4 py-2 text-cyan-100 hover:bg-cyan-500/10"
          >
            View Source
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-violet-300/40 px-4 py-2 text-violet-100 hover:bg-violet-500/10"
          >
            Open Demo
          </a>
          <Link
            href="/"
            className="rounded border border-white/20 px-4 py-2 text-white hover:bg-white/10"
          >
            Back to Portfolio
          </Link>
        </div>
      </article>
    </main>
  );
}
