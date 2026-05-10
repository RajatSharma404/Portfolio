import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { SocialPreview } from "@/components/social-preview";
import { projectItems } from "@/content/site-data";

type ProjectImageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

const findProject = (slug: string) =>
  projectItems.find((project) => project.slug === slug);

export const alt = "Project preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function ProjectTwitterImage({
  params,
}: ProjectImageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    <SocialPreview
      title={project.title}
      subtitle={project.category}
      detail={project.impact}
      footer={`${project.stack.slice(0, 3).join(" · ")} · rajat-portfolio.vercel.app/projects/${project.slug}`}
      accent="#a78bfa"
      glow="rgba(167, 139, 250, 0.22)"
    />,
    size,
  );
}
