import type { Token } from "@/types/vscode";

export type RawFileContent = {
  id: string;
  filename: string;
  language: string;
  symbol: string;
  lines: Token[][];
  rawString: string;
};

export const rawCodeRegistry: Record<string, RawFileContent> = {
  home: {
    id: "home",
    filename: "home.tsx",
    language: "TypeScript JSX",
    symbol: "export default function HomeHero()",
    lines: [
      [
        { text: 'import React from "react";', type: "kw" },
      ],
      [
        { text: 'import { motion } from "framer-motion";', type: "kw" },
      ],
      [
        { text: 'import { projectItems } from "@/content/site-data";', type: "kw" },
      ],
      [],
      [
        { text: "export default function HomeHero() {", type: "kw" },
      ],
      [
        { text: "  const developer = {", type: "plain" },
      ],
      [
        { text: '    name: "Rajat Sharma",', type: "str" },
      ],
      [
        { text: '    role: "Full Stack Developer & AI Enthusiast",', type: "str" },
      ],
      [
        { text: '    university: "Kanpur Institute of Technology",', type: "str" },
      ],
      [
        { text: '    dsaStatus: "500+ LeetCode Problems Solved",', type: "str" },
      ],
      [
        { text: "    availableFor: [", type: "plain" },
        { text: '"Internships", ', type: "str" },
        { text: '"Engineering Roles", ', type: "str" },
        { text: '"AI Tooling"]', type: "str" },
      ],
      [
        { text: "  };", type: "plain" },
      ],
      [],
      [
        { text: "  return (", type: "kw" },
      ],
      [
        { text: '    <section className="hero-container relative">', type: "plain" },
      ],
      [
        { text: '      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>', type: "plain" },
      ],
      [
        { text: "        {developer.name}", type: "fn" },
      ],
      [
        { text: "      </motion.h1>", type: "plain" },
      ],
      [
        { text: '      <p className="hero-bio text-muted">', type: "plain" },
      ],
      [
        { text: "        I build portfolio-grade full-stack apps, AI utilities, and DSA tools.", type: "str" },
      ],
      [
        { text: "      </p>", type: "plain" },
      ],
      [
        { text: "      <div className=\"stats-grid\">", type: "plain" },
      ],
      [
        { text: "        {projectItems.length} Featured Projects · Response Time < 24h", type: "str" },
      ],
      [
        { text: "      </div>", type: "plain" },
      ],
      [
        { text: "    </section>", type: "plain" },
      ],
      [
        { text: "  );", type: "plain" },
      ],
      [
        { text: "}", type: "kw" },
      ],
    ],
    rawString: `import React from "react";
import { motion } from "framer-motion";
import { projectItems } from "@/content/site-data";

export default function HomeHero() {
  const developer = {
    name: "Rajat Sharma",
    role: "Full Stack Developer & AI Enthusiast",
    university: "Kanpur Institute of Technology",
    dsaStatus: "500+ LeetCode Problems Solved",
    availableFor: ["Internships", "Engineering Roles", "AI Tooling"]
  };

  return (
    <section className="hero-container relative">
      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        {developer.name}
      </motion.h1>
      <p className="hero-bio text-muted">
        I build portfolio-grade full-stack apps, AI utilities, and DSA tools.
      </p>
      <div className="stats-grid">
        {projectItems.length} Featured Projects · Response Time < 24h
      </div>
    </section>
  );
}`,
  },
  about: {
    id: "about",
    filename: "about.html",
    language: "HTML5",
    symbol: "<section id='about-developer'>",
    lines: [
      [
        { text: "<!DOCTYPE html>", type: "com" },
      ],
      [
        { text: '<section id="about-developer" class="developer-profile">', type: "kw" },
      ],
      [
        { text: '  <header class="section-title">', type: "plain" },
      ],
      [
        { text: "    <h2>Building reliable products at speed.</h2>", type: "str" },
      ],
      [
        { text: "    <p>Full-stack developer and AI learner at Kanpur Institute of Technology (2023-2027).</p>", type: "str" },
      ],
      [
        { text: "  </header>", type: "plain" },
      ],
      [],
      [
        { text: '  <div class="focus-areas">', type: "plain" },
      ],
      [
        { text: '    <article class="focus-card">Building scalable web projects with Next.js 16 & React 19</article>', type: "str" },
      ],
      [
        { text: '    <article class="focus-card">Practicing daily Data Structures & Algorithms in C++</article>', type: "str" },
      ],
      [
        { text: '    <article class="focus-card">Designing AI-powered workflows with Stockfish & Gemini APIs</article>', type: "str" },
      ],
      [
        { text: "  </div>", type: "plain" },
      ],
      [],
      [
        { text: '  <!-- GitHub Pulse Stats -->', type: "com" },
      ],
      [
        { text: '  <aside class="github-pulse-widget" data-live-api="https://api.github.com/users/RajatSharma404">', type: "kw" },
      ],
      [
        { text: "    <span>Followers: Live</span> | <span>Public Repos: Live</span> | <span>Featured Stars: Live</span>", type: "str" },
      ],
      [
        { text: "  </aside>", type: "plain" },
      ],
      [
        { text: "</section>", type: "kw" },
      ],
    ],
    rawString: `<!DOCTYPE html>
<section id="about-developer" class="developer-profile">
  <header class="section-title">
    <h2>Building reliable products at speed.</h2>
    <p>Full-stack developer and AI learner at Kanpur Institute of Technology (2023-2027).</p>
  </header>

  <div class="focus-areas">
    <article class="focus-card">Building scalable web projects with Next.js 16 & React 19</article>
    <article class="focus-card">Practicing daily Data Structures & Algorithms in C++</article>
    <article class="focus-card">Designing AI-powered workflows with Stockfish & Gemini APIs</article>
  </div>

  <!-- GitHub Pulse Stats -->
  <aside class="github-pulse-widget" data-live-api="https://api.github.com/users/RajatSharma404">
    <span>Followers: Live</span> | <span>Public Repos: Live</span> | <span>Featured Stars: Live</span>
  </aside>
</section>`,
  },
  projects: {
    id: "projects",
    filename: "projects.js",
    language: "JavaScript",
    symbol: "export const projectItems",
    lines: [
      [
        { text: "// Selected featured engineering projects", type: "com" },
      ],
      [
        { text: "export const projectItems = [", type: "kw" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "dsa-tracker",', type: "str" },
      ],
      [
        { text: '    title: "DSA Tracker",', type: "str" },
      ],
      [
        { text: '    category: "Productivity",', type: "str" },
      ],
      [
        { text: '    stack: ["TypeScript", "React", "Tracking"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404/DSA-Tracker"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "chess-engine",', type: "str" },
      ],
      [
        { text: '    title: "Chess Engine Evaluator",', type: "str" },
      ],
      [
        { text: '    category: "AI",', type: "str" },
      ],
      [
        { text: '    stack: ["FastAPI", "Python", "Stockfish", "React", "TypeScript"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "adaptive-fitness",', type: "str" },
      ],
      [
        { text: '    title: "Adaptive Fitness Planner",', type: "str" },
      ],
      [
        { text: '    category: "AI",', type: "str" },
      ],
      [
        { text: '    stack: ["Next.js", "Prisma", "Gemini AI", "Tailwind", "TypeScript"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404"', type: "str" },
      ],
      [
        { text: "  }", type: "plain" },
      ],
      [
        { text: "];", type: "kw" },
      ],
    ],
    rawString: `// Selected featured engineering projects
export const projectItems = [
  {
    slug: "dsa-tracker",
    title: "DSA Tracker",
    category: "Productivity",
    stack: ["TypeScript", "React", "Tracking"],
    github: "https://github.com/RajatSharma404/DSA-Tracker"
  },
  {
    slug: "chess-engine",
    title: "Chess Engine Evaluator",
    category: "AI",
    stack: ["FastAPI", "Python", "Stockfish", "React", "TypeScript"],
    github: "https://github.com/RajatSharma404"
  },
  {
    slug: "adaptive-fitness",
    title: "Adaptive Fitness Planner",
    category: "AI",
    stack: ["Next.js", "Prisma", "Gemini AI", "Tailwind", "TypeScript"],
    github: "https://github.com/RajatSharma404"
  }
];`,
  },
  skills: {
    id: "skills",
    filename: "skills.json",
    language: "JSON",
    symbol: '"skills_matrix"',
    lines: [
      [
        { text: "{", type: "plain" },
      ],
      [
        { text: '  "name": "Rajat Sharma - Skills Matrix",', type: "str" },
      ],
      [
        { text: '  "core_competencies": {', type: "str" },
      ],
      [
        { text: '    "languages": ["TypeScript", "JavaScript", "C++", "Python", "HTML", "CSS"],', type: "str" },
      ],
      [
        { text: '    "frameworks": ["React 19", "Next.js 16", "FastAPI", "Node.js", "Express"],', type: "str" },
      ],
      [
        { text: '    "databases": ["PostgreSQL", "SQLite", "Prisma ORM"],', type: "str" },
      ],
      [
        { text: '    "ai_tooling": ["Gemini AI API", "Stockfish 16 Engine", "Agentic Workflows"],', type: "str" },
      ],
      [
        { text: '    "styling_and_motion": ["Tailwind CSS v4", "Framer Motion", "Vanilla CSS"]', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: '  "dsa_mastery": {', type: "str" },
      ],
      [
        { text: '    "leetcode_handle": "RajatSharma404",', type: "str" },
      ],
      [
        { text: '    "total_solved": 500,', type: "num" },
      ],
      [
        { text: '    "difficulty_breakdown": { "easy": 220, "medium": 250, "hard": 30 },', type: "str" },
      ],
      [
        { text: '    "primary_language": "C++",', type: "str" },
      ],
      [
        { text: '    "global_ranking": "Top 10%",', type: "str" },
      ],
      [
        { text: '    "core_patterns": [', type: "str" },
      ],
      [
        { text: '      "Dynamic Programming (0/1 Knapsack, LCS, Grid DP)",', type: "str" },
      ],
      [
        { text: '      "Graphs (Dijkstra, BFS/DFS, TopoSort, Union-Find)",', type: "str" },
      ],
      [
        { text: '      "Trees & Binary Search (Segment Tree, Trie, LCA)",', type: "str" },
      ],
      [
        { text: '      "Arrays & Sliding Window (Two Pointers, Kadane\'s)"', type: "str" },
      ],
      [
        { text: '    ]', type: "plain" },
      ],
      [
        { text: "  }", type: "plain" },
      ],
      [
        { text: "}", type: "plain" },
      ],
    ],
    rawString: `{
  "name": "Rajat Sharma - Skills Matrix",
  "core_competencies": {
    "languages": ["TypeScript", "JavaScript", "C++", "Python", "HTML", "CSS"],
    "frameworks": ["React 19", "Next.js 16", "FastAPI", "Node.js", "Express"],
    "databases": ["PostgreSQL", "SQLite", "Prisma ORM"],
    "ai_tooling": ["Gemini AI API", "Stockfish 16 Engine", "Agentic Workflows"],
    "styling_and_motion": ["Tailwind CSS v4", "Framer Motion", "Vanilla CSS"]
  },
  "dsa_mastery": {
    "leetcode_handle": "RajatSharma404",
    "total_solved": 500,
    "difficulty_breakdown": { "easy": 220, "medium": 250, "hard": 30 },
    "primary_language": "C++",
    "global_ranking": "Top 10%",
    "core_patterns": [
      "Dynamic Programming (0/1 Knapsack, LCS, Grid DP)",
      "Graphs (Dijkstra, BFS/DFS, TopoSort, Union-Find)",
      "Trees & Binary Search (Segment Tree, Trie, LCA)",
      "Arrays & Sliding Window (Two Pointers, Kadane's)"
    ]
  }
}`,
  },
  education: {
    id: "education",
    filename: "experience.ts",
    language: "TypeScript",
    symbol: "export const experienceTimeline: ExperienceItem[]",
    lines: [
      [
        { text: "export interface ExperienceItem {", type: "kw" },
      ],
      [
        { text: "  period: string;", type: "kw" },
      ],
      [
        { text: "  role: string;", type: "kw" },
      ],
      [
        { text: "  organization: string;", type: "kw" },
      ],
      [
        { text: "  description: string;", type: "kw" },
      ],
      [
        { text: "  tags: string[];", type: "kw" },
      ],
      [
        { text: "}", type: "kw" },
      ],
      [],
      [
        { text: "export const experienceTimeline: ExperienceItem[] = [", type: "kw" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    period: "2023 - Present",', type: "str" },
      ],
      [
        { text: '    role: "B.Tech Student Developer",', type: "str" },
      ],
      [
        { text: '    organization: "Kanpur Institute of Technology",', type: "str" },
      ],
      [
        { text: '    description: "Solved 500+ LeetCode problems, built 15+ full-stack and AI apps.",', type: "str" },
      ],
      [
        { text: '    tags: ["C++", "DSA", "TypeScript", "Node.js", "React", "AI"]', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    period: "Current Focus",', type: "str" },
      ],
      [
        { text: '    role: "Project Builder",', type: "str" },
      ],
      [
        { text: '    organization: "Personal Portfolio Projects",', type: "str" },
      ],
      [
        { text: '    description: "Engineering scalable web apps, AI workflows, and productivity trackers.",', type: "str" },
      ],
      [
        { text: '    tags: ["Next.js", "AI Workflows", "FastAPI", "System Design"]', type: "str" },
      ],
      [
        { text: "  }", type: "plain" },
      ],
      [
        { text: "];", type: "kw" },
      ],
    ],
    rawString: `export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  description: string;
  tags: string[];
}

export const experienceTimeline: ExperienceItem[] = [
  {
    period: "2023 - Present",
    role: "B.Tech Student Developer",
    organization: "Kanpur Institute of Technology",
    description: "Solved 500+ LeetCode problems, built 15+ full-stack and AI apps.",
    tags: ["C++", "DSA", "TypeScript", "Node.js", "React", "AI"]
  },
  {
    period: "Current Focus",
    role: "Project Builder",
    organization: "Personal Portfolio Projects",
    description: "Engineering scalable web apps, AI workflows, and productivity trackers.",
    tags: ["Next.js", "AI Workflows", "FastAPI", "System Design"]
  }
];`,
  },
  contact: {
    id: "contact",
    filename: "contact.css",
    language: "CSS",
    symbol: ".contact-form-container",
    lines: [
      [
        { text: "/* Rajat Sharma Contact Styling & Reach-Out Tokens */", type: "com" },
      ],
      [
        { text: ".contact-form-container {", type: "kw" },
      ],
      [
        { text: "  display: grid;", type: "fn" },
      ],
      [
        { text: "  grid-template-columns: 1fr 1.2fr;", type: "fn" },
      ],
      [
        { text: "  gap: 1.5rem;", type: "fn" },
      ],
      [
        { text: "  background: var(--bg-sidebar);", type: "fn" },
      ],
      [
        { text: "  border-radius: 1.5rem;", type: "fn" },
      ],
      [
        { text: "}", type: "kw" },
      ],
      [],
      [
        { text: ".reach-out-direct {", type: "kw" },
      ],
      [
        { text: "  color: var(--keyword);", type: "fn" },
      ],
      [
        { text: '  email: "rajat.sharma.myid1@gmail.com";', type: "str" },
      ],
      [
        { text: '  linkedin: "https://linkedin.com/in/rajat-sharma-9a053128b";', type: "str" },
      ],
      [
        { text: '  github: "https://github.com/RajatSharma404";', type: "str" },
      ],
      [
        { text: "  response-time: immediate-within-24h;", type: "fn" },
      ],
      [
        { text: "}", type: "kw" },
      ],
    ],
    rawString: `/* Rajat Sharma Contact Styling & Reach-Out Tokens */
.contact-form-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 1.5rem;
  background: var(--bg-sidebar);
  border-radius: 1.5rem;
}

.reach-out-direct {
  color: var(--keyword);
  email: "rajat.sharma.myid1@gmail.com";
  linkedin: "https://linkedin.com/in/rajat-sharma-9a053128b";
  github: "https://github.com/RajatSharma404";
  response-time: immediate-within-24h;
}`,
  },
  readme: {
    id: "readme",
    filename: "README.md",
    language: "Markdown",
    symbol: "# Rajat's VS Code Portfolio",
    lines: [
      [
        { text: "# Rajat Sharma | Interactive VS Code Portfolio", type: "kw" },
      ],
      [],
      [
        { text: "> Full Stack Developer & B.Tech Student at Kanpur Institute of Technology", type: "str" },
      ],
      [],
      [
        { text: "## Key Features", type: "kw" },
      ],
      [
        { text: "- Dual View Engine: [Preview], [Code], and [Split View] modes", type: "plain" },
      ],
      [
        { text: "- LeetCode Pulse: Concentric SVG difficulty rings for 500+ solved problems", type: "plain" },
      ],
      [
        { text: "- Multi-View Sidebar: File Explorer, Global Search, Git Source Control & Extensions Store", type: "plain" },
      ],
      [
        { text: "- 5-Tab Bottom Console: Terminal (neofetch, matrix, git), Problems, Output, Debug, Ports", type: "plain" },
      ],
      [
        { text: "- 8 Visual Themes: Dracula, Dark+, Monokai, One Dark, Solarized, SynthWave, Tokyo Night, GitHub Dark", type: "plain" },
      ],
      [
        { text: "- Web Audio API Haptics: Synthesized mechanical clicks and harmonic chimes", type: "plain" },
      ],
      [],
      [
        { text: "## Tech Stack", type: "kw" },
      ],
      [
        { text: "Next.js 16.2.3 · React 19.2.4 · TypeScript 5.0 · Tailwind CSS v4 · Framer Motion 12", type: "fn" },
      ],
      [],
      [
        { text: "## Getting Started", type: "kw" },
      ],
      [
        { text: "npm install && npm run dev", type: "str" },
      ],
    ],
    rawString: `# Rajat Sharma | Interactive VS Code Portfolio

> Full Stack Developer & B.Tech Student at Kanpur Institute of Technology

## Key Features
- Dual View Engine: [Preview], [Code], and [Split View] modes
- LeetCode Pulse: Concentric SVG difficulty rings for 500+ solved problems
- Multi-View Sidebar: File Explorer, Global Search, Git Source Control & Extensions Store
- 5-Tab Bottom Console: Terminal (neofetch, matrix, git), Problems, Output, Debug, Ports
- 8 Visual Themes: Dracula, Dark+, Monokai, One Dark, Solarized, SynthWave, Tokyo Night, GitHub Dark
- Web Audio API Haptics: Synthesized mechanical clicks and harmonic chimes

## Tech Stack
Next.js 16.2.3 · React 19.2.4 · TypeScript 5.0 · Tailwind CSS v4 · Framer Motion 12

## Getting Started
npm install && npm run dev`,
  },
  package: {
    id: "package",
    filename: "package.json",
    language: "JSON",
    symbol: '"dependencies"',
    lines: [
      [
        { text: "{", type: "plain" },
      ],
      [
        { text: '  "name": "rajat-portfolio",', type: "str" },
      ],
      [
        { text: '  "version": "2.0.0",', type: "str" },
      ],
      [
        { text: '  "private": true,', type: "kw" },
      ],
      [
        { text: '  "scripts": {', type: "str" },
      ],
      [
        { text: '    "dev": "next dev",', type: "str" },
      ],
      [
        { text: '    "build": "next build",', type: "str" },
      ],
      [
        { text: '    "start": "next start"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: '  "dependencies": {', type: "str" },
      ],
      [
        { text: '    "next": "^16.2.3",', type: "str" },
      ],
      [
        { text: '    "react": "^19.2.4",', type: "str" },
      ],
      [
        { text: '    "framer-motion": "^12.38.0",', type: "str" },
      ],
      [
        { text: '    "lucide-react": "^1.8.0",', type: "str" },
      ],
      [
        { text: '    "tailwindcss": "^4.0.0"', type: "str" },
      ],
      [
        { text: "  }", type: "plain" },
      ],
      [
        { text: "}", type: "plain" },
      ],
    ],
    rawString: `{
  "name": "rajat-portfolio",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^16.2.3",
    "react": "^19.2.4",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.8.0",
    "tailwindcss": "^4.0.0"
  }
}`,
  },
};
