import type { Metadata } from "next";
import {
  JetBrains_Mono,
  League_Spartan,
  Space_Grotesk,
} from "next/font/google";
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
  title: "Rajat Sharma | Full Stack Developer",
  description:
    "Interactive VS Code-themed portfolio of Rajat Sharma, a Full Stack Developer and B.Tech student from Kanpur Institute of Technology.",
  keywords: [
    "full stack developer",
    "kanpur institute of technology",
    "portfolio",
    "next.js",
    "react",
    "vs code theme",
    "ai learning",
  ],
  icons: {
    icon: "/file.svg",
    apple: "/file.svg",
  },
  openGraph: {
    title: "Rajat Sharma | Portfolio",
    description:
      "Browse files to explore Rajat's projects, skills, education, and contact details.",
    type: "website",
    siteName: "Rajat Sharma Portfolio",
    url: "https://rajat-portfolio.vercel.app",
    images: [
      {
        url: "https://rajat-portfolio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rajat Sharma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajat Sharma | Portfolio",
    description:
      "Interactive VS Code-themed portfolio of Rajat Sharma, a Full Stack Developer and B.Tech student from Kanpur Institute of Technology.",
    images: ["https://rajat-portfolio.vercel.app/og-image.png"],
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
    image: "https://rajat-portfolio.vercel.app/og-image.png",
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
      <body>{children}</body>
    </html>
  );
}
