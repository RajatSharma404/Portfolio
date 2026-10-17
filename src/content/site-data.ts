export type ProjectCategory = "All" | "Web" | "Productivity" | "Finance" | "AI" | "Venture" | "Systems";

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  impact: string;
  stack: string[];
  github: string;
  live: string;
  category: "Web" | "Productivity" | "Finance" | "AI" | "Venture" | "Systems";
  categories?: ("Web" | "Productivity" | "Finance" | "AI" | "Venture" | "Systems")[];
  highlights: string[];
  featured: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    slug: "pradite",
    title: "Pradite",
    description:
      "Privacy-first AI developer tools where code never leaves the client and memory is user-encrypted.",
    impact:
      "Guarantees zero IP leakage for enterprise and security-sensitive developers through client-side WASM execution and AES-256 local-encrypted vector memory.",
    stack: ["React", "TypeScript", "WASM", "Local-First", "Web Architecture", "Encryption"],
    github: "https://github.com/RajatSharma404",
    live: "https://pradite.com",
    category: "Venture",
    categories: ["Venture", "AI", "Systems"],
    highlights: [
      "Co-Founder & Core Systems Architect",
      "Zero-telemetry client-side inference pipeline",
      "User-encrypted local vector storage with sub-10ms lookup",
      "Cross-platform developer tooling suite"
    ],
    featured: true,
  },
  {
    slug: "ghost-ai",
    title: "Ghost AI",
    description:
      "Real-time AI architecture design platform with sub-3s fast-path execution, interactive canvas, live multiplayer sync, and IaC generation.",
    impact:
      "Transforms plain English system requirements into production-ready cloud architecture diagrams, Terraform IaC, and cost projections in under 3 seconds.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Liveblocks", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/RajatSharma404/ghost-ai",
    live: "https://ghost-ai-omega-ten.vercel.app",
    category: "AI",
    categories: ["AI", "Web", "Systems"],
    highlights: [
      "Sub-3s fast-path execution pipeline with streaming UI",
      "Real-time multiplayer canvas with Liveblocks WebSockets",
      "Automated multi-cloud Terraform & CloudFormation generation",
      "Built with Next.js 16 Turbopack & React 19 Server Actions"
    ],
    featured: true,
  },
  {
    slug: "notebooklm-lite",
    title: "NotebookLM-lite",
    description:
      "Local-first scholarly research notebook with dense-sparse hybrid search, SQLite FTS5, cross-encoder re-ranking, and concurrent two-host audio overviews.",
    impact:
      "Brings Google NotebookLM's podcast and deep synthesis capabilities to local machines with complete data privacy and sub-15ms BM25+vector retrieval.",
    stack: ["Python", "FastAPI", "React 18", "TypeScript", "SQLite FTS5", "Cross-Encoder", "Web Audio"],
    github: "https://github.com/RajatSharma404/NotebookLM-lite",
    live: "https://github.com/RajatSharma404/NotebookLM-lite",
    category: "AI",
    categories: ["AI", "Systems"],
    highlights: [
      "Dense-sparse hybrid search combining vector embeddings with SQLite FTS5 BM25",
      "Cross-encoder re-ranking reducing hallucination by ~42% on long academic papers",
      "Synthesized dual-host conversational audio overviews with natural turn-taking",
      "Local-first SQLite WAL mode storage with instant offline indexing"
    ],
    featured: true,
  },
  {
    slug: "dsa-tracker",
    title: "DSA Tracker Mastery",
    description:
      "Algorithmic problem-solving workstation with spaced repetition, velocity analytics, pattern clusters, and time/space complexity audits.",
    impact:
      "Engineered to overcome problem-solving plateaus, tracking 500+ LeetCode problems across 18 algorithmic patterns with automated revision intervals.",
    stack: ["TypeScript", "React", "Node.js", "Chart.js", "Tailwind CSS", "DSA Patterns"],
    github: "https://github.com/RajatSharma404/DSA-Tracker",
    live: "https://github.com/RajatSharma404/DSA-Tracker",
    category: "Productivity",
    categories: ["Productivity", "Systems"],
    highlights: [
      "17+ GitHub stars from competitive programmers",
      "Spaced repetition scheduling based on difficulty and review velocity",
      "Topic-wise mastery breakdown covering DP, Graphs, Trees, and Sliding Window",
      "Built and tested with 500+ solved algorithmic solutions in C++"
    ],
    featured: true,
  },
  {
    slug: "chess-eval",
    title: "ChessEval",
    description:
      "High-performance chess evaluation and position analysis platform powered by Stockfish 17 (WASM) and AI engine recommendations.",
    impact:
      "Runs engine-grade depth 24+ move analysis directly inside the browser using WebAssembly threads with zero server roundtrips.",
    stack: ["TypeScript", "React", "Stockfish 17 WASM", "Web Workers", "Tailwind CSS"],
    github: "https://github.com/RajatSharma404/Chess-Eval",
    live: "https://github.com/RajatSharma404/Chess-Eval",
    category: "AI",
    categories: ["AI", "Systems"],
    highlights: [
      "Stockfish 17 compiled to WebAssembly with multi-threaded Web Workers",
      "Real-time dynamic advantage bar and blunder detection",
      "PGN parse & export with move-by-move accuracy scoring",
      "Zero server latency via full client-side evaluation"
    ],
    featured: true,
  },
  {
    slug: "fitness-roadmap",
    title: "FitFlow (Fitness Roadmap)",
    description:
      "Evidence-based RPG progression platform with gamified habit streaks, adaptive macro tracking, and volume load calculations.",
    impact:
      "Combines sports science periodization algorithms with RPG mechanics to drive workout consistency and prevent overtraining plateaus.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/RajatSharma404/Fitness-Roadmap",
    live: "https://github.com/RajatSharma404/Fitness-Roadmap",
    category: "Web",
    categories: ["Web", "Productivity"],
    highlights: [
      "Dynamic volume load calculation tracking weekly hypertrophy sets",
      "Gamified XP, streak badges, and level progression mechanics",
      "Built with Next.js 16 App Router and Prisma relational models"
    ],
    featured: true,
  },
  {
    slug: "interactive-portfolio",
    title: "VS Code Interactive Portfolio",
    description:
      "VS Code-inspired developer operating system featuring embedded terminal, AI copilot, Web Audio haptics, and dual code/preview engines.",
    impact:
      "Eliminated generic portfolio formats with an interactive browser-based IDE that lets recruiters inspect raw source code, test live terminals, and evaluate real skills.",
    stack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "Web Audio API", "TypeScript"],
    github: "https://github.com/RajatSharma404/Portfolio",
    live: "https://portfolio-chi-self-31.vercel.app",
    category: "Web",
    categories: ["Web", "Systems"],
    highlights: [
      "8 iconic VS Code themes with zero-latency CSS variable swapping",
      "Synthesized mechanical switch audio feedback via Web Audio API",
      "Real-time GitHub telemetry and interactive terminal with Neofetch & Matrix mode",
      "Full Split Screen & Dual View architecture with responsive touch controls"
    ],
    featured: true,
  },
  {
    slug: "skillsync",
    title: "SkillSync",
    description:
      "Personal performance scientist analyzing cross-domain metrics (coding velocity, fitness adherence, cognitive load) for actionable life insights.",
    impact:
      "Correlates deep work sessions with physical recovery metrics to identify optimal productivity windows and burn-out warning signs.",
    stack: ["TypeScript", "React", "Node.js", "AI Analytics", "Tailwind CSS"],
    github: "https://github.com/RajatSharma404/SkillSync",
    live: "https://github.com/RajatSharma404/SkillSync",
    category: "AI",
    categories: ["AI", "Productivity"],
    highlights: [
      "Multi-stream telemetry aggregation across GitHub, LeetCode, and habits",
      "Predictive cognitive load scoring using heuristic correlation",
      "Clean modular TypeScript architecture"
    ],
    featured: true,
  },
  {
    slug: "agentic-ai",
    title: "Agentic AI",
    description:
      "Fully local autonomous AI reasoning agent executing multi-step tool use, code execution, and web research with Ollama and FastAPI.",
    impact:
      "Demonstrates zero-cost, private agentic workflows without third-party API dependencies or cloud subscription costs.",
    stack: ["Python", "FastAPI", "Ollama", "Local LLMs", "Tool Routing"],
    github: "https://github.com/RajatSharma404/Agentic-AI",
    live: "https://github.com/RajatSharma404/Agentic-AI",
    category: "AI",
    categories: ["AI", "Systems"],
    highlights: [
      "Autonomous ReAct reasoning loop with dynamic tool dispatch",
      "Strict local privacy running with Ollama local model backends",
      "FastAPI async endpoint streaming execution steps in real-time"
    ],
    featured: true,
  },
];

export const siteMeta = {
  deployedOn: "Vercel",
  lastUpdated: "2026-10-17",
};
