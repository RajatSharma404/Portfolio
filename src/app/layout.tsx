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
  openGraph: {
    title: "Rajat Sharma | Portfolio",
    description:
      "Browse files to explore Rajat's projects, skills, education, and contact details.",
    type: "website",
    siteName: "Rajat Sharma Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Rajat Sharma | Portfolio",
    description:
      "Interactive VS Code-themed portfolio of Rajat Sharma, a Full Stack Developer and B.Tech student from Kanpur Institute of Technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${uiSans.variable} ${uiMono.variable} ${uiDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
