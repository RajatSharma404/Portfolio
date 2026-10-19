import type { Metadata } from "next";
import {
  JetBrains_Mono,
  League_Spartan,
  Space_Grotesk,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const uiSans = Space_Grotesk({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

const uiMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const uiDisplay = League_Spartan({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-chi-self-31.vercel.app"),
  title: "Rajat Sharma | Co-Founder @ Pradite & Full-Stack Systems Engineer",
  description:
    "Interactive VS Code developer operating system of Rajat Sharma — Co-Founder @ Pradite, full-stack systems engineer, 160+ algorithmic problems solved, and creator of Ghost AI & NotebookLM-lite.",
  keywords: [
    "Rajat Sharma",
    "Pradite",
    "Full Stack Developer",
    "Systems Engineer",
    "Ghost AI",
    "NotebookLM-lite",
    "DSA Tracker",
    "LeetCode 160+",
    "DSA 160+",
    "Kanpur Institute of Technology",
    "Next.js 16",
    "React 19",
    "WebAssembly",
    "FastAPI",
    "VS Code Portfolio",
  ],
  icons: {
    icon: "/file.svg",
    apple: "/file.svg",
  },
  openGraph: {
    title: "Rajat Sharma | Co-Founder @ Pradite & Systems Engineer",
    description:
      "Interactive VS Code portfolio: explore Rajat's flagship ventures, local-first AI systems, 160+ LeetCode & DSA pulse, and terminal CLI.",
    type: "website",
    siteName: "Rajat Sharma Portfolio",
    url: "https://portfolio-chi-self-31.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajat Sharma | Co-Founder @ Pradite & Systems Engineer",
    description:
      "Interactive VS Code developer operating system of Rajat Sharma — Co-Founder @ Pradite, full-stack systems engineer, and creator of Ghost AI & NotebookLM-lite.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rajat Sharma",
    url: "https://rajat-portfolio.vercel.app",
    image: "https://rajat-portfolio.vercel.app/opengraph-image",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Personal Projects",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Kanpur Institute of Technology",
    },
    sameAs: [
      "https://github.com/RajatSharma404",
      "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
      "https://leetcode.com/u/RajatSharma404/",
    ],
    knowsAbout: [
      "Full Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AI/ML",
      "DSA",
    ],
  };

  return (
    <html
      lang="en"
      className={`${uiSans.variable} ${uiMono.variable} ${uiDisplay.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-9999 focus:rounded focus:bg-black focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
