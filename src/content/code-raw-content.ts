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
        { text: '    role: "Co-Founder @ Pradite | Full-Stack Systems Engineer",', type: "str" },
      ],
      [
        { text: '    venture: "Pradite (https://pradite.com)",', type: "str" },
      ],
      [
        { text: '    university: "Kanpur Institute of Technology",', type: "str" },
      ],
      [
        { text: '    dsaStatus: "160+ Questions Solved (LeetCode & GitHub)",', type: "str" },
      ],
      [
        { text: "    focusAreas: [", type: "plain" },
        { text: '"Local-First AI", ', type: "str" },
        { text: '"Web Systems", ', type: "str" },
        { text: '"Algorithmic Workstations"]', type: "str" },
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
        { text: "        Co-Founder @ Pradite. Designing privacy-first AI developer tools and real-time systems.", type: "str" },
      ],
      [
        { text: "      </p>", type: "plain" },
      ],
      [
        { text: '      <div className="stats-grid">', type: "plain" },
      ],
      [
        { text: "        {projectItems.length} Flagship Projects · 160+ Questions Solved · Response < 24h", type: "str" },
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
    role: "Co-Founder @ Pradite | Full-Stack Systems Engineer",
    venture: "Pradite (https://pradite.com)",
    university: "Kanpur Institute of Technology",
    dsaStatus: "160+ Questions Solved (LeetCode & GitHub)",
    focusAreas: ["Local-First AI", "Web Systems", "Algorithmic Workstations"]
  };

  return (
    <section className="hero-container relative">
      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        {developer.name}
      </motion.h1>
      <p className="hero-bio text-muted">
        Co-Founder @ Pradite. Designing privacy-first AI developer tools and real-time systems.
      </p>
      <div className="stats-grid">
        {projectItems.length} Flagship Projects · 160+ Questions Solved · Response < 24h
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
        { text: "    <h2>Engineering real systems, not just pretty screens.</h2>", type: "str" },
      ],
      [
        { text: "    <p>Co-Founder at Pradite & Computer Science student at Kanpur Institute of Technology (2023-2027).</p>", type: "str" },
      ],
      [
        { text: "  </header>", type: "plain" },
      ],
      [
        { text: '  <article class="bio-content">', type: "kw" },
      ],
      [
        { text: "    <p>", type: "plain" },
      ],
      [
        { text: "      Building privacy-first AI developer tools with WebAssembly and local-first memory.", type: "str" },
      ],
      [
        { text: "      Specialized in real-time collaboration with Liveblocks, hybrid vector search (SQLite FTS5), and C++ algorithms.", type: "str" },
      ],
      [
        { text: "    </p>", type: "plain" },
      ],
      [
        { text: "  </article>", type: "kw" },
      ],
      [
        { text: '  <aside class="github-stats">', type: "plain" },
      ],
      [
        { text: "    <span>Followers: Live</span> | <span>Public Repos: 20</span> | <span>DSA Stars: 17+</span>", type: "str" },
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
    <h2>Engineering real systems, not just pretty screens.</h2>
    <p>Co-Founder at Pradite & Computer Science student at Kanpur Institute of Technology (2023-2027).</p>
  </header>
  <article class="bio-content">
    <p>
      Building privacy-first AI developer tools with WebAssembly and local-first memory.
      Specialized in real-time collaboration with Liveblocks, hybrid vector search (SQLite FTS5), and C++ algorithms.
    </p>
  </article>
  <aside class="github-stats">
    <span>Followers: Live</span> | <span>Public Repos: 20</span> | <span>DSA Stars: 17+</span>
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
        { text: "// Flagship engineering projects & ventures", type: "com" },
      ],
      [
        { text: "export const projectItems = [", type: "kw" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "pradite",', type: "str" },
      ],
      [
        { text: '    title: "Pradite (Venture)",', type: "str" },
      ],
      [
        { text: '    category: "Venture",', type: "str" },
      ],
      [
        { text: '    stack: ["React", "TypeScript", "WASM", "Local-First", "Encryption"],', type: "str" },
      ],
      [
        { text: '    live: "https://pradite.com"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "ghost-ai",', type: "str" },
      ],
      [
        { text: '    title: "Ghost AI",', type: "str" },
      ],
      [
        { text: '    category: "AI",', type: "str" },
      ],
      [
        { text: '    stack: ["Next.js 16", "React 19", "Liveblocks", "Gemini API"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404/ghost-ai",', type: "str" },
      ],
      [
        { text: '    live: "https://ghost-ai-omega-ten.vercel.app"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "notebooklm-lite",', type: "str" },
      ],
      [
        { text: '    title: "NotebookLM-lite",', type: "str" },
      ],
      [
        { text: '    category: "AI",', type: "str" },
      ],
      [
        { text: '    stack: ["Python", "FastAPI", "SQLite FTS5", "Cross-Encoder"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404/NotebookLM-lite"', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    slug: "dsa-tracker",', type: "str" },
      ],
      [
        { text: '    title: "DSA Tracker Mastery",', type: "str" },
      ],
      [
        { text: '    category: "Productivity",', type: "str" },
      ],
      [
        { text: '    stack: ["TypeScript", "React", "Chart.js", "DSA Patterns"],', type: "str" },
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
        { text: '    slug: "chess-eval",', type: "str" },
      ],
      [
        { text: '    title: "ChessEval",', type: "str" },
      ],
      [
        { text: '    category: "AI",', type: "str" },
      ],
      [
        { text: '    stack: ["TypeScript", "Stockfish 17 WASM", "Web Workers"],', type: "str" },
      ],
      [
        { text: '    github: "https://github.com/RajatSharma404/Chess-Eval"', type: "str" },
      ],
      [
        { text: "  }", type: "plain" },
      ],
      [
        { text: "];", type: "kw" },
      ],
    ],
    rawString: `// Flagship engineering projects & ventures
export const projectItems = [
  {
    slug: "pradite",
    title: "Pradite (Venture)",
    category: "Venture",
    stack: ["React", "TypeScript", "WASM", "Local-First", "Encryption"],
    live: "https://pradite.com"
  },
  {
    slug: "ghost-ai",
    title: "Ghost AI",
    category: "AI",
    stack: ["Next.js 16", "React 19", "Liveblocks", "Gemini API"],
    github: "https://github.com/RajatSharma404/ghost-ai",
    live: "https://ghost-ai-omega-ten.vercel.app"
  },
  {
    slug: "notebooklm-lite",
    title: "NotebookLM-lite",
    category: "AI",
    stack: ["Python", "FastAPI", "SQLite FTS5", "Cross-Encoder"],
    github: "https://github.com/RajatSharma404/NotebookLM-lite"
  },
  {
    slug: "dsa-tracker",
    title: "DSA Tracker Mastery",
    category: "Productivity",
    stack: ["TypeScript", "React", "Chart.js", "DSA Patterns"],
    github: "https://github.com/RajatSharma404/DSA-Tracker"
  },
  {
    slug: "chess-eval",
    title: "ChessEval",
    category: "AI",
    stack: ["TypeScript", "Stockfish 17 WASM", "Web Workers"],
    github: "https://github.com/RajatSharma404/Chess-Eval"
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
        { text: '    "languages": ["C++", "TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],', type: "str" },
      ],
      [
        { text: '    "frameworks": ["Next.js 16 (App Router)", "React 19", "FastAPI", "Node.js", "Express"],', type: "str" },
      ],
      [
        { text: '    "systems_and_db": ["WebAssembly (WASM)", "Web Workers", "SQLite FTS5", "PostgreSQL", "Prisma ORM"],', type: "str" },
      ],
      [
        { text: '    "ai_and_realtime": ["Google Gemini API", "Ollama Local Agents", "Stockfish 17 WASM", "Liveblocks Sync"],', type: "str" },
      ],
      [
        { text: '    "styling_and_motion": ["Tailwind CSS v4", "Framer Motion", "Vanilla CSS Design Tokens"]', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: '  "ventures": {', type: "str" },
      ],
      [
        { text: '    "company": "Pradite",', type: "str" },
      ],
      [
        { text: '    "url": "https://pradite.com",', type: "str" },
      ],
      [
        { text: '    "focus": "Privacy-first AI developer tools with client-side execution"', type: "str" },
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
        { text: '    "total_solved": 160,', type: "num" },
      ],
      [
        { text: '    "difficulty_breakdown": { "easy": 85, "medium": 65, "hard": 10 },', type: "str" },
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
    "languages": ["C++", "TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"],
    "frameworks": ["Next.js 16 (App Router)", "React 19", "FastAPI", "Node.js", "Express"],
    "systems_and_db": ["WebAssembly (WASM)", "Web Workers", "SQLite FTS5", "PostgreSQL", "Prisma ORM"],
    "ai_and_realtime": ["Google Gemini API", "Ollama Local Agents", "Stockfish 17 WASM", "Liveblocks Sync"],
    "styling_and_motion": ["Tailwind CSS v4", "Framer Motion", "Vanilla CSS Design Tokens"]
  },
  "ventures": {
    "company": "Pradite",
    "url": "https://pradite.com",
    "focus": "Privacy-first AI developer tools with client-side execution"
  },
  "dsa_mastery": {
    "leetcode_handle": "RajatSharma404",
    "total_solved": 160,
    "difficulty_breakdown": { "easy": 85, "medium": 65, "hard": 10 },
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
        { text: '    period: "2025 - Present",', type: "str" },
      ],
      [
        { text: '    role: "Co-Founder & Systems Architect",', type: "str" },
      ],
      [
        { text: '    organization: "Pradite (https://pradite.com)",', type: "str" },
      ],
      [
        { text: '    description: "Architecting privacy-first developer tools with zero-telemetry client execution and local vector memory.",', type: "str" },
      ],
      [
        { text: '    tags: ["WASM", "React", "TypeScript", "Local-First", "Encryption"]', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    period: "2024 - Present",', type: "str" },
      ],
      [
        { text: '    role: "Open-Source Creator & Systems Engineer",', type: "str" },
      ],
      [
        { text: '    organization: "Ghost AI, NotebookLM-lite & DSA-Tracker",', type: "str" },
      ],
      [
        { text: '    description: "Designed sub-3s real-time architecture platforms and local RAG with SQLite FTS5.",', type: "str" },
      ],
      [
        { text: '    tags: ["Next.js 16", "React 19", "FastAPI", "Python", "SQLite FTS5", "Liveblocks"]', type: "str" },
      ],
      [
        { text: "  },", type: "plain" },
      ],
      [
        { text: "  {", type: "plain" },
      ],
      [
        { text: '    period: "2023 - 2027",', type: "str" },
      ],
      [
        { text: '    role: "B.Tech in Computer Science & Engineering",', type: "str" },
      ],
      [
        { text: '    organization: "Kanpur Institute of Technology",', type: "str" },
      ],
      [
        { text: '    description: "160+ algorithmic problems solved in C++ on GitHub & LeetCode. DP, Graphs, and Trees.",', type: "str" },
      ],
      [
        { text: '    tags: ["C++", "DSA", "Dynamic Programming", "Graph Theory", "Algorithms"]', type: "str" },
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
    period: "2025 - Present",
    role: "Co-Founder & Systems Architect",
    organization: "Pradite (https://pradite.com)",
    description: "Architecting privacy-first developer tools with zero-telemetry client execution and local vector memory.",
    tags: ["WASM", "React", "TypeScript", "Local-First", "Encryption"]
  },
  {
    period: "2024 - Present",
    role: "Open-Source Creator & Systems Engineer",
    organization: "Ghost AI, NotebookLM-lite & DSA-Tracker",
    description: "Designed sub-3s real-time architecture platforms and local RAG with SQLite FTS5.",
    tags: ["Next.js 16", "React 19", "FastAPI", "Python", "SQLite FTS5", "Liveblocks"]
  },
  {
    period: "2023 - 2027",
    role: "B.Tech in Computer Science & Engineering",
    organization: "Kanpur Institute of Technology",
    description: "160+ algorithmic problems solved in C++ on GitHub & LeetCode. DP, Graphs, and Trees.",
    tags: ["C++", "DSA", "Dynamic Programming", "Graph Theory", "Algorithms"]
  }
];`,
  },
  contact: {
    id: "contact",
    filename: "contact.css",
    language: "CSS",
    symbol: ".reach-out-container",
    lines: [
      [
        { text: "/* Connect with Rajat Sharma */", type: "com" },
      ],
      [
        { text: ".reach-out-container {", type: "plain" },
      ],
      [
        { text: "  --developer-email: 'rajat.sharma.myid1@gmail.com';", type: "str" },
      ],
      [
        { text: "  --venture-url: 'https://pradite.com';", type: "str" },
      ],
      [
        { text: "  --github-profile: 'https://github.com/RajatSharma404';", type: "str" },
      ],
      [
        { text: "  --linkedin-url: 'https://linkedin.com/in/rajat-sharma-9a053128b/';", type: "str" },
      ],
      [
        { text: "  --leetcode-pulse: 'https://leetcode.com/u/RajatSharma404/';", type: "str" },
      ],
      [
        { text: "  --response-window: '< 24h';", type: "str" },
      ],
      [
        { text: "  --preferred-inquiries: 'Ventures, Engineering Roles, Systems Architecture';", type: "str" },
      ],
      [
        { text: "}", type: "plain" },
      ],
    ],
    rawString: `/* Connect with Rajat Sharma */
.reach-out-container {
  --developer-email: 'rajat.sharma.myid1@gmail.com';
  --venture-url: 'https://pradite.com';
  --github-profile: 'https://github.com/RajatSharma404';
  --linkedin-url: 'https://linkedin.com/in/rajat-sharma-9a053128b/';
  --leetcode-pulse: 'https://leetcode.com/u/RajatSharma404/';
  --response-window: '< 24h';
  --preferred-inquiries: 'Ventures, Engineering Roles, Systems Architecture';
}`,
  },
  readme: {
    id: "readme",
    filename: "README.md",
    language: "Markdown",
    symbol: "# Rajat Sharma — Portfolio OS",
    lines: [
      [
        { text: "# Rajat Sharma — Portfolio OS", type: "kw" },
      ],
      [],
      [
        { text: "> Co-Founder @ Pradite | Full-Stack Systems Engineer", type: "str" },
      ],
      [],
      [
        { text: "### Stack & Architecture", type: "kw" },
      ],
      [
        { text: "- **Framework**: Next.js 16.2.3 (App Router with Turbopack)", type: "plain" },
      ],
      [
        { text: "- **UI Engine**: React 19, Tailwind CSS v4, Framer Motion", type: "plain" },
      ],
      [
        { text: "- **Audio Synthesis**: Web Audio API synthesized mechanical switch haptics", type: "plain" },
      ],
      [
        { text: "- **Telemetry**: Real-time GitHub REST API integration & LeetCode Pulse", type: "plain" },
      ],
      [
        { text: "- **Dual-View**: Instant switching between Live Preview, Syntax-Highlighted Code, and Split View", type: "plain" },
      ],
      [
        { text: "- **Terminal**: 5-Tab Developer Console with Neofetch, Matrix, Git, and Dino Runner", type: "plain" },
      ],
    ],
    rawString: `# Rajat Sharma — Portfolio OS

> Co-Founder @ Pradite | Full-Stack Systems Engineer

### Stack & Architecture
- **Framework**: Next.js 16.2.3 (App Router with Turbopack)
- **UI Engine**: React 19, Tailwind CSS v4, Framer Motion
- **Audio Synthesis**: Web Audio API synthesized mechanical switch haptics
- **Telemetry**: Real-time GitHub REST API integration & LeetCode Pulse
- **Dual-View**: Instant switching between Live Preview, Syntax-Highlighted Code, and Split View
- **Terminal**: 5-Tab Developer Console with Neofetch, Matrix, Git, and Dino Runner`,
  },
  package: {
    id: "package",
    filename: "package.json",
    language: "JSON",
    symbol: '"portfolio-site"',
    lines: [
      [
        { text: "{", type: "plain" },
      ],
      [
        { text: '  "name": "portfolio-site",', type: "str" },
      ],
      [
        { text: '  "version": "2.1.0",', type: "str" },
      ],
      [
        { text: '  "private": true,', type: "kw" },
      ],
      [
        { text: '  "author": "Rajat Sharma <rajat.sharma.myid1@gmail.com>",', type: "str" },
      ],
      [
        { text: '  "dependencies": {', type: "str" },
      ],
      [
        { text: '    "next": "16.2.3",', type: "str" },
      ],
      [
        { text: '    "react": "19.2.4",', type: "str" },
      ],
      [
        { text: '    "framer-motion": "^12.38.0",', type: "str" },
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
  "name": "portfolio-site",
  "version": "2.1.0",
  "private": true,
  "author": "Rajat Sharma <rajat.sharma.myid1@gmail.com>",
  "dependencies": {
    "next": "16.2.3",
    "react": "19.2.4",
    "framer-motion": "^12.38.0",
    "tailwindcss": "^4.0.0"
  }
}`,
  },
};
