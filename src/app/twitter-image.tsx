import { ImageResponse } from "next/og";
import { SocialPreview } from "@/components/social-preview";

export const alt = "Rajat Sharma portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <SocialPreview
      title="Rajat Sharma"
      subtitle="Full Stack Developer | AI/ML Learner | DSA Enthusiast"
      detail="Interactive VS Code-inspired portfolio with projects, skills, terminal interactions, and direct contact paths."
      footer="rajat-portfolio.vercel.app"
      accent="#22d3ee"
      glow="rgba(34, 211, 238, 0.22)"
    />,
    size,
  );
}
