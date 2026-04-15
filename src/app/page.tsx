"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Blocks,
  ChevronRight,
  FolderOpen,
  GitBranch,
  Search,
  Sparkles,
  TerminalSquare,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ThemeName = "darkplus" | "dracula" | "monokai" | "onedark" | "solarized";

type MenuName =
  | "File"
  | "Edit"
  | "View"
  | "Go"
  | "Run"
  | "Terminal"
  | "Help"
  | "Copilot";

type MenuItem = {
  label: string;
  hint?: string;
  section?: string;
  action?: string;
};

type Token = {
  text: string;
  type: "kw" | "fn" | "str" | "com" | "num" | "plain";
};

type FileNode = {
  id: string;
  label: string;
  ext:
    | "tsx"
    | "html"
    | "js"
    | "json"
    | "ts"
    | "css"
    | "md"
    | "config"
    | "env"
    | "pdf";
  folder: "src" | "public" | "config";
};

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const menuItems: Record<MenuName, MenuItem[]> = {
  File: [
    { label: "New File", hint: "Ctrl+N" },
    { label: "Open File...", hint: "Ctrl+P", action: "open-file" },
    { section: "FILES", label: "home.tsx", action: "open-home" },
    { label: "about.html", action: "open-about" },
    { label: "projects.js", action: "open-projects" },
    { label: "skills.json", action: "open-skills" },
    { label: "Download Resume", action: "download-resume" },
  ],
  Edit: [
    { label: "Find...", hint: "Ctrl+P", action: "open-file" },
    { label: "Select All", hint: "Ctrl+A", action: "select-all" },
    { label: "Copy", hint: "Ctrl+C", action: "copy" },
  ],
  View: [
    { label: "Command Palette", hint: "Ctrl+P", action: "open-file" },
    { label: "Toggle Sidebar", hint: "Ctrl+B", action: "toggle-sidebar" },
    { label: "Toggle Terminal", hint: "Ctrl+`", action: "toggle-terminal" },
    {
      label: "Rajat's Copilot",
      hint: "Ctrl+Shift+C",
      action: "toggle-copilot",
    },
    { label: "Enter Full Screen", hint: "F11" },
    { label: "Zoom In", hint: "Ctrl++" },
    { label: "Zoom Out", hint: "Ctrl+-" },
    { label: "Reset Zoom" },
  ],
  Go: [
    { label: "Go to File...", hint: "Ctrl+P", action: "open-file" },
    { section: "FILES", label: "home.tsx", action: "open-home" },
    { label: "about.html", action: "open-about" },
    { label: "projects.js", action: "open-projects" },
    { label: "skills.json", action: "open-skills" },
    { label: "experience.ts", action: "open-education" },
    { label: "contact.css", action: "open-contact" },
    { label: "README.md", action: "open-readme" },
    { label: "resume.pdf", action: "download-resume" },
  ],
  Run: [{ label: "Start Terminal", hint: "Ctrl+`", action: "toggle-terminal" }],
  Terminal: [
    { label: "Start Terminal", hint: "Ctrl+`", action: "toggle-terminal" },
    { label: "Run Last Command", action: "run-last" },
  ],
  Help: [
    { label: "Command Palette", hint: "Ctrl+P", action: "open-file" },
    { section: "KEYBOARD SHORTCUTS", label: "Ctrl+P   Go to file" },
    { label: "Ctrl+B   Toggle sidebar" },
    { label: "Ctrl+`   Toggle terminal" },
    { label: "Ctrl+Shift+C   Toggle Copilot" },
    { label: "Esc   Close overlay" },
    { label: "GitHub ↗", action: "open-github" },
    { label: "About" },
  ],
  Copilot: [
    { label: "Open Copilot", action: "toggle-copilot" },
    { label: "Ask About Projects", action: "copilot-projects" },
    { label: "Ask About Skills", action: "copilot-skills" },
  ],
};

const topMenus: MenuName[] = [
  "File",
  "Edit",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
  "Copilot",
];

const themes: { value: ThemeName; label: string }[] = [
  { value: "darkplus", label: "Dark+" },
  { value: "dracula", label: "Dracula" },
  { value: "monokai", label: "Monokai" },
  { value: "onedark", label: "One Dark Pro" },
  { value: "solarized", label: "Solarized" },
];

const skillGroups = {
  languages: [
    { name: "C++", level: 88, color: "#e879f9" },
    { name: "Java", level: 72, color: "#f97316" },
    { name: "JavaScript", level: 81, color: "#facc15" },
    { name: "TypeScript", level: 76, color: "#38bdf8" },
  ],
  ai: [
    { name: "Prompt Engineering", level: 84, color: "#eab308" },
    { name: "Agentic Workflows", level: 78, color: "#a855f7" },
    { name: "RAG Concepts", level: 75, color: "#22d3ee" },
    { name: "Python for AI", level: 82, color: "#34d399" },
  ],
  backend: [
    { name: "Node.js", level: 83, color: "#22c55e" },
    { name: "Express.js", level: 79, color: "#6366f1" },
    { name: "REST APIs", level: 86, color: "#06b6d4" },
    { name: "SQL", level: 74, color: "#f59e0b" },
  ],
  tools: [
    { name: "Git", level: 90, color: "#f97316" },
    { name: "GitHub", level: 88, color: "#6366f1" },
    { name: "VS Code", level: 92, color: "#38bdf8" },
    { name: "Postman", level: 80, color: "#34d399" },
  ],
};

const files: Array<FileNode & { name: string }> = [
  {
    id: "home",
    name: "home.tsx",
    label: "home.tsx",
    ext: "tsx",
    folder: "src",
  },
  {
    id: "about",
    name: "about.html",
    label: "about.html",
    ext: "html",
    folder: "src",
  },
  {
    id: "projects",
    name: "projects.js",
    label: "projects.js",
    ext: "js",
    folder: "src",
  },
  {
    id: "skills",
    name: "skills.json",
    label: "skills.json",
    ext: "json",
    folder: "src",
  },
  {
    id: "education",
    name: "experience.ts",
    label: "experience.ts",
    ext: "ts",
    folder: "src",
  },
  {
    id: "contact",
    name: "contact.css",
    label: "contact.css",
    ext: "css",
    folder: "src",
  },
  {
    id: "readme",
    name: "README.md",
    label: "README.md",
    ext: "md",
    folder: "public",
  },
  {
    id: "package",
    name: "package.json",
    label: "package.json",
    ext: "config",
    folder: "config",
  },
  {
    id: "env",
    name: ".env.local",
    label: ".env.local",
    ext: "env",
    folder: "config",
  },
  {
    id: "resume",
    name: "resume.pdf",
    label: "resume.pdf",
    ext: "pdf",
    folder: "public",
  },
];

const projectItems = [
  {
    title: "DSA Tracker",
    description:
      "Practice dashboard and progress tracker for DSA problem solving.",
    impact:
      "Tracks solved problems by topic so revision and weak-area review stay organized.",
    stack: ["TypeScript", "React", "Tracking"],
    github: "https://github.com/RajatSharma404/DSA-Tracker",
    live: "https://github.com/RajatSharma404/DSA-Tracker",
  },
  {
    title: "Expense Tracker",
    description:
      "Track and visualize daily expenses with clean TypeScript workflows.",
    impact:
      "Turns daily spending into a clearer category-by-category budgeting habit.",
    stack: ["TypeScript", "Finance", "UI"],
    github: "https://github.com/RajatSharma404/expense-tracker",
    live: "https://github.com/RajatSharma404/expense-tracker",
  },
  {
    title: "Weather Forecast App",
    description:
      "Weather dashboard with intuitive forecasts and city-based lookup.",
    impact:
      "Makes city search and short-range weather checks faster for everyday use.",
    stack: ["JavaScript", "API", "Frontend"],
    github: "https://github.com/RajatSharma404/weather-forecast-app",
    live: "https://github.com/RajatSharma404/weather-forecast-app",
  },
  {
    title: "Finance Track",
    description:
      "Personal finance and tracking workflow project built in TypeScript.",
    impact:
      "Helps structure budgets, recurring expenses, and personal finance routines.",
    stack: ["TypeScript", "Tracker", "Dashboard"],
    github: "https://github.com/RajatSharma404/Finance_track",
    live: "https://github.com/RajatSharma404/Finance_track",
  },
];

const quickNav = [
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact" },
];

const roleChips = [
  "Full Stack Developer",
  "AI / ML Learner",
  "DSA Enthusiast",
  "@ Kanpur Institute of Technology",
];

const heroSignals = [
  {
    label: "CURRENTLY BUILDING",
    value: "Portfolio, agents, and product workflows",
  },
  { label: "STACK", value: "Next.js · React · TypeScript · Node.js" },
  {
    label: "AVAILABLE",
    value: "Internships, collabs, and interesting problems",
  },
];

const heroStats = [
  { label: "Featured projects", value: "4" },
  { label: "Core focus", value: "Full stack + AI tooling" },
  { label: "DSA practice", value: "Daily" },
  { label: "Response time", value: "< 24h" },
];

const aboutFocusLeft = [
  "Building scalable web projects while in college",
  "Practicing DSA in C++ daily",
  "Learning practical AI workflows and integrations",
];

const aboutFocusRight = [
  "Focused on backend + frontend balance",
  "Improving problem solving and system design",
  "Always learning, always shipping",
];

const experienceItems = [
  {
    period: "2023 - Present",
    role: "B.Tech Student Developer",
    org: "Kanpur Institute of Technology",
    desc: "Building full-stack projects, solving DSA problems, and exploring AI while pursuing B.Tech. Current work includes the DSA Tracker, Expense Tracker, and Weather Forecast App.",
    tags: ["C++", "JavaScript", "TypeScript", "Node.js", "React", "AI"],
  },
  {
    period: "Current Focus",
    role: "Project Builder",
    org: "Personal Portfolio Projects",
    desc: "Shipping trackers, problem-solving tools, and productivity apps with a focus on clean engineering, readable UX, and honest project demos.",
    tags: ["DSA Tracker", "Expense Tracker", "Weather App", "Finance"],
  },
];

const contactCards = [
  {
    title: "EMAIL",
    value: "rajat.sharma.myid1@gmail.com",
    link: "mailto:rajat.sharma.myid1@gmail.com",
  },
  {
    title: "LINKEDIN",
    value: "linkedin.com/in/rajat-sharma-9a053128b",
    link: "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
  },
  {
    title: "GITHUB",
    value: "github.com/RajatSharma404",
    link: "https://github.com/RajatSharma404",
  },
  {
    title: "LEETCODE",
    value: "leetcode.com/u/RajatSharma404",
    link: "https://leetcode.com/u/RajatSharma404/",
  },
  {
    title: "INSTAGRAM",
    value: "instagram.com/btw.rajat625",
    link: "https://www.instagram.com/btw.rajat625/",
  },
];

const skillSections = [
  {
    title: "LANGUAGES",
    items: skillGroups.languages,
  },
  {
    title: "GENERATIVE AI & LLM ENGINEERING",
    items: skillGroups.ai,
  },
  {
    title: "AI • ML • DATA SCIENCE",
    items: [
      { name: "Python", level: 82, color: "#22d3ee" },
      { name: "TensorFlow", level: 70, color: "#f97316" },
      { name: "scikit-learn", level: 74, color: "#facc15" },
      { name: "Pandas", level: 76, color: "#6366f1" },
    ],
  },
  {
    title: "BACKEND & APIS",
    items: skillGroups.backend,
  },
  {
    title: "DATABASES",
    items: [
      { name: "PostgreSQL", level: 74, color: "#38bdf8" },
      { name: "SQLite", level: 78, color: "#ef4444" },
      { name: "Redis", level: 60, color: "#2dd4bf" },
    ],
  },
  {
    title: "DEVOPS & TOOLS",
    items: skillGroups.tools,
  },
  {
    title: "FRONTEND",
    items: [
      { name: "React", level: 80, color: "#38bdf8" },
      { name: "Next.js", level: 72, color: "#a855f7" },
      { name: "TailwindCSS", level: 85, color: "#34d399" },
      { name: "Responsive Design", level: 83, color: "#22c55e" },
    ],
  },
  {
    title: "DESIGN",
    items: [
      { name: "Figma", level: 62, color: "#a855f7" },
      { name: "UX Prototyping", level: 58, color: "#34d399" },
    ],
  },
];

const leetCodeStats = {
  profile: "https://leetcode.com/u/RajatSharma404/",
  username: "RajatSharma404",
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rajat-sharma-9a053128b/",
  },
  { label: "GitHub", href: "https://github.com/RajatSharma404" },
  { label: "LeetCode", href: "https://leetcode.com/u/RajatSharma404/" },
  { label: "Instagram", href: "https://www.instagram.com/btw.rajat625/" },
  { label: "Email", href: "mailto:rajat.sharma.myid1@gmail.com" },
];

const extIcon = (ext: FileNode["ext"]) => {
  if (ext === "tsx") return "TSX";
  if (ext === "html") return "HTML";
  if (ext === "js") return "JS";
  if (ext === "ts") return "TS";
  if (ext === "css") return "CSS";
  if (ext === "md") return "MD";
  if (ext === "env") return "ENV";
  return "PDF";
};

const tokenClass: Record<Token["type"], string> = {
  kw: "text-(--keyword)",
  str: "text-(--string)",
  com: "text-(--comment)",
  fn: "text-(--function)",
  num: "text-(--number)",
  plain: "text-(--text-main)",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projectItems)[number];
  index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const url = new URL(project.github);
        const [, owner, repo] = url.pathname.split("/");
        if (!owner || !repo) return;

        const res = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as { stargazers_count?: number };
        setStars(data.stargazers_count ?? 0);
      } catch {
        // silently fail
      }
    };
    fetchStars();
  }, [project.github]);

  return (
    <motion.article
      className="glass-card will-transform rounded-xl p-4"
      style={{
        transform: `perspective(600px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
      }}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3 + index, repeat: Number.POSITIVE_INFINITY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: x * 15, y: -y * 15 });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)" }}
    >
      <h4 className="display-font bg-linear-to-r from-violet-400 to-cyan-300 bg-clip-text text-lg font-semibold text-transparent flex items-center justify-between">
        <span>{project.title}</span>
        {stars !== null && (
          <span className="text-xs bg-white/10 rounded-full px-2 py-1 text-[#c9cede]">
            ★ {stars > 999 ? (stars / 1000).toFixed(1) + "k" : stars}
          </span>
        )}
      </h4>
      <p className="mt-1 text-sm text-(--text-muted)">{project.description}</p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-[#8f8f8f]">
        What it solves
      </p>
      <p className="mt-1 text-sm text-[#c9cede]">{project.impact}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/20 px-2 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-3 flex gap-3 text-sm">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} source code`}
        >
          Source
        </a>
        {project.live !== project.github ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} live demo`}
          >
            Live
          </a>
        ) : (
          <span className="rounded border border-white/10 px-2 py-1 text-xs text-(--text-muted)">
            Demo pending
          </span>
        )}
      </div>
    </motion.article>
  );
}

function DinoGame({
  onScoreUnlock,
  onStop,
}: {
  onScoreUnlock: () => void;
  onStop: () => void;
}) {
  const gameRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = gameRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let score = 0;
    let unlocked = false;
    let dinoY = 0;
    let velocityY = 0;
    const gravity = 0.7;
    const jump = -10;
    const obstacles: { x: number; w: number; h: number }[] = [
      { x: 500, w: 22, h: 40 },
    ];

    const keyHandler = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "ArrowUp") && dinoY === 0)
        velocityY = jump;
      if (e.key === "Escape") onStop();
    };

    window.addEventListener("keydown", keyHandler);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#d4d4d4";
      ctx.fillRect(0, 120, canvas.width, 2);

      dinoY += velocityY;
      velocityY += gravity;
      if (dinoY > 0) {
        dinoY = 0;
        velocityY = 0;
      }

      ctx.fillStyle = "#7bd88f";
      ctx.fillRect(40, 90 + dinoY, 22, 30);

      obstacles.forEach((o) => {
        o.x -= 5;
        ctx.fillStyle = "#f78c6c";
        ctx.fillRect(o.x, 120 - o.h, o.w, o.h);
      });

      if (
        obstacles[obstacles.length - 1] &&
        obstacles[obstacles.length - 1].x < 300
      ) {
        obstacles.push({
          x: 500 + Math.random() * 120,
          w: 20 + Math.random() * 8,
          h: 30 + Math.random() * 25,
        });
      }
      if (obstacles[0] && obstacles[0].x < -40) obstacles.shift();

      const collision = obstacles.some(
        (o) => o.x < 62 && o.x + o.w > 40 && 90 + dinoY + 30 > 120 - o.h,
      );

      score += 1;
      ctx.fillStyle = "#d4d4d4";
      ctx.font = "14px Cascadia Code";
      ctx.fillText(`Score: ${Math.floor(score / 4)}`, 360, 18);
      ctx.fillText("Space/Up to jump, Esc to quit", 10, 18);

      if (!unlocked && Math.floor(score / 4) >= 50) {
        unlocked = true;
        onScoreUnlock();
      }

      if (!collision) {
        raf = requestAnimationFrame(loop);
      } else {
        ctx.fillStyle = "#ff6b6b";
        ctx.fillText("Game Over - type play to retry", 130, 70);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [onScoreUnlock, onStop]);

  return (
    <canvas
      ref={gameRef}
      width={520}
      height={140}
      className="mt-2 max-w-full rounded border border-(--border)"
    />
  );
}

export default function Home() {
  const [booting] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [theme, setTheme] = useState<ThemeName>("darkplus");
  const [activeFile, setActiveFile] = useState("about");
  const [openTabs, setOpenTabs] = useState<string[]>([
    "about",
    "home",
    "projects",
    "skills",
  ]);
  const [folderOpen, setFolderOpen] = useState({
    src: true,
    public: true,
    config: true,
  });
  const [currentLine, setCurrentLine] = useState(23);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState<MenuName | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalPath, setTerminalPath] = useState("~/home");
  const [lastTerminalCommand, setLastTerminalCommand] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Type help for available commands.",
  ]);
  const [showDino, setShowDino] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask me anything about Rajat. Try: tech stack, projects, internships, hobbies.",
    },
  ]);
  const [chatBoost, setChatBoost] = useState(0);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [cursorFx, setCursorFx] = useState({ x: 120, y: 160, visible: false });
  const [windowClosed, setWindowClosed] = useState(false);
  const [windowMinimized, setWindowMinimized] = useState(false);
  const [windowMaximized, setWindowMaximized] = useState(false);
  const [stackCopied, setStackCopied] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const paletteItems = useMemo(
    () => [
      ...files.map((f) => ({ id: f.id, label: f.name, type: "file" as const })),
      {
        id: "cmd-download",
        label: "Download Resume",
        type: "command" as const,
      },
      { id: "cmd-github", label: "Open GitHub", type: "command" as const },
      { id: "cmd-theme", label: "Switch Theme", type: "command" as const },
      { id: "cmd-dino", label: "Play Dino Game", type: "command" as const },
      {
        id: "cmd-toggle-sidebar",
        label: "Toggle Sidebar",
        type: "command" as const,
      },
      {
        id: "cmd-toggle-terminal",
        label: "Toggle Terminal",
        type: "command" as const,
      },
      { id: "cmd-copilot", label: "Toggle Copilot", type: "command" as const },
    ],
    [],
  );

  const filteredPalette = paletteItems.filter((item) =>
    item.label.toLowerCase().includes(paletteQuery.toLowerCase()),
  );

  const openFile = useCallback((id: string) => {
    if (id === "resume") {
      window.open("/resume.pdf", "_blank");
      return;
    }
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveFile(id);
    setMobileSidebar(false);
  }, []);

  const maxMessages = 15 + chatBoost;

  const handleWindowControl = (action: "close" | "minimize" | "maximize") => {
    if (action === "close") {
      setWindowClosed(true);
      setWindowMinimized(false);
      return;
    }
    if (action === "minimize") {
      setWindowMinimized(true);
      setWindowClosed(false);
      return;
    }
    setWindowMaximized((prev) => !prev);
    setWindowClosed(false);
    setWindowMinimized(false);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      "portfolio-theme",
    ) as ThemeName | null;
    const storedTabs = window.localStorage.getItem("portfolio-tabs");
    if (storedTheme) setTheme(storedTheme);
    if (storedTabs) {
      const parsed = JSON.parse(storedTabs) as string[];
      if (parsed.length) setOpenTabs(parsed);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute(
      "data-theme",
      theme === "darkplus" ? "" : theme,
    );
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-tabs", JSON.stringify(openTabs));
  }, [openTabs]);

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "p" && !event.shiftKey) {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
        return;
      }
      if (event.ctrlKey && event.key === "`") {
        event.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }
      if (event.ctrlKey && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setSidebarOpen((prev) => !prev);
        return;
      }
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setThemePickerOpen((prev) => !prev);
        return;
      }
      if (event.key === "Escape") {
        setMenuOpen(null);
        setPaletteOpen(false);
        return;
      }

      if (!paletteOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setPaletteIndex((prev) =>
          Math.min(prev + 1, Math.max(filteredPalette.length - 1, 0)),
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setPaletteIndex((prev) => Math.max(prev - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const selected = filteredPalette[paletteIndex];
        if (!selected) return;

        if (selected.type === "file") {
          openFile(selected.id);
        } else if (selected.id === "cmd-download") {
          window.open("/resume.pdf", "_blank");
        } else if (selected.id === "cmd-github") {
          window.open("https://github.com/RajatSharma404", "_blank");
        } else if (selected.id === "cmd-theme") {
          setThemePickerOpen((prev) => !prev);
        } else if (selected.id === "cmd-dino") {
          setShowDino(true);
          setTerminalOpen(true);
        } else if (selected.id === "cmd-toggle-sidebar") {
          setSidebarOpen((prev) => !prev);
        } else if (selected.id === "cmd-toggle-terminal") {
          setTerminalOpen((prev) => !prev);
        } else if (selected.id === "cmd-copilot") {
          setChatOpen((prev) => !prev);
        }
        setPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [paletteIndex, paletteOpen, filteredPalette, openFile]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    };
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const apply = () => {
      if (media.matches) {
        setSidebarOpen(false);
      }
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const root = editorRef.current;
    if (!root) return;
    const lines = root.querySelectorAll<HTMLElement>("[data-line]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const line = Number(entry.target.getAttribute("data-line"));
            if (line) setCurrentLine(line);
          }
        });
      },
      { threshold: 0.6 },
    );
    lines.forEach((line) => observer.observe(line));
    return () => observer.disconnect();
  }, [activeFile]);

  const closeTab = (id: string) => {
    const updated = openTabs.filter((tabId) => tabId !== id);
    setOpenTabs(updated);
    if (activeFile === id)
      setActiveFile(updated[updated.length - 1] ?? "about");
  };

  const runTerminalCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    setTerminalHistory((prev) => [...prev, raw]);
    setLastTerminalCommand(raw);
    setTerminalLines((prev) => [...prev, `$ ${raw}`]);
    if (command === "help") {
      setTerminalLines((prev) => [
        ...prev,
        "help | whoami | pwd | ls | cd <path> | cat <file> | open <file> | history | date | play | clear",
      ]);
    } else if (command === "whoami") {
      setTerminalLines((prev) => [
        ...prev,
        "Rajat Sharma - Full Stack Developer | B.Tech student at Kanpur Institute of Technology.",
      ]);
    } else if (command === "pwd") {
      setTerminalLines((prev) => [...prev, terminalPath]);
    } else if (command === "date") {
      setTerminalLines((prev) => [...prev, new Date().toString()]);
    } else if (command === "ls") {
      const listing: Record<string, string[]> = {
        "~/home": ["src", "public", "config", "README.md"],
        "~/home/src": [
          "home.tsx",
          "about.html",
          "projects.js",
          "skills.json",
          "experience.ts",
          "contact.css",
        ],
        "~/home/public": ["resume.pdf", "README.md"],
        "~/home/config": ["package.json", ".env"],
      };
      setTerminalLines((prev) => [
        ...prev,
        ...(listing[terminalPath] ?? listing["~/home"]),
      ]);
    } else if (command.startsWith("cd ")) {
      const target = command.replace("cd ", "").trim();
      const paths = ["~/home", "~/home/src", "~/home/public", "~/home/config"];
      const resolved =
        target === ".."
          ? terminalPath.split("/").slice(0, -1).join("/") || "~/home"
          : target.startsWith("~/")
            ? target
            : terminalPath === "~/home"
              ? `~/home/${target}`
              : `${terminalPath}/${target}`;
      if (paths.includes(resolved)) {
        setTerminalPath(resolved);
      } else {
        setTerminalLines((prev) => [
          ...prev,
          `cd: no such file or directory: ${target}`,
        ]);
      }
    } else if (command === "ls projects") {
      setTerminalLines((prev) => [
        ...prev,
        ...projectItems.map((p) => `- ${p.title}`),
      ]);
    } else if (command === "cat resume.pdf" || command === "cat readme.md") {
      setTerminalLines((prev) => [
        ...prev,
        "Resume Summary: Web development, AI projects, internship-ready.",
      ]);
    } else if (command === "cat package.json") {
      setTerminalLines((prev) => [
        ...prev,
        '{ "name": "rajat-portfolio", "version": "2.0.0" }',
      ]);
    } else if (command.startsWith("open ")) {
      const target = command.replace("open ", "").trim();
      const mapped = files.find((f) => f.name.toLowerCase() === target);
      if (mapped) {
        openFile(mapped.id);
      } else {
        setTerminalLines((prev) => [...prev, `open: cannot find ${target}`]);
      }
    } else if (command === "history") {
      setTerminalLines((prev) => [
        ...prev,
        ...terminalHistory.map((entry, idx) => `${idx + 1}  ${entry}`),
      ]);
    } else if (command === "play") {
      setShowDino(true);
      setTerminalLines((prev) => [...prev, "Launching dino game..."]);
    } else if (command === "clear") {
      setTerminalLines([]);
    } else {
      setTerminalLines((prev) => [...prev, `Command not found: ${command}`]);
    }
  };

  const handlePaletteSelect = (id: string) => {
    if (files.some((f) => f.id === id)) {
      openFile(id);
    } else if (id === "cmd-download") {
      window.open("/resume.pdf", "_blank");
    } else if (id === "cmd-github") {
      window.open("https://github.com/RajatSharma404", "_blank");
    } else if (id === "cmd-theme") {
      setThemePickerOpen(true);
    } else if (id === "cmd-dino") {
      setTerminalOpen(true);
      setShowDino(true);
    } else if (id === "cmd-toggle-sidebar") {
      setSidebarOpen((prev) => !prev);
    } else if (id === "cmd-toggle-terminal") {
      setTerminalOpen((prev) => !prev);
    } else if (id === "cmd-copilot") {
      setChatOpen((prev) => !prev);
    }
    setPaletteOpen(false);
  };

  const executeMenuAction = (action?: string) => {
    if (!action) return;
    if (action === "new-tab") {
      openFile("home");
    } else if (action === "open-file") {
      setPaletteOpen(true);
    } else if (action === "close-tab") {
      closeTab(activeFile);
    } else if (action === "close-all-tabs") {
      setOpenTabs(["home"]);
      setActiveFile("home");
    } else if (action === "download-resume") {
      window.open("/resume.pdf", "_blank");
    } else if (action === "toggle-sidebar") {
      setSidebarOpen((prev) => !prev);
    } else if (action === "toggle-terminal") {
      setTerminalOpen((prev) => !prev);
    } else if (action === "toggle-copilot") {
      setChatOpen((prev) => !prev);
    } else if (action === "open-github") {
      window.open("https://github.com/RajatSharma404", "_blank");
    } else if (action === "run-last") {
      if (lastTerminalCommand) runTerminalCommand(lastTerminalCommand);
    } else if (action === "copilot-projects") {
      setChatOpen(true);
      askCopilot("Tell me about your projects");
    } else if (action === "copilot-skills") {
      setChatOpen(true);
      askCopilot("What's your tech stack?");
    } else if (action.startsWith("open-")) {
      const fileId = action.replace("open-", "");
      openFile(fileId);
    }
    setMenuOpen(null);
  };

  const askCopilot = async (question: string) => {
    if (
      !question.trim() ||
      chatMessages.filter((m) => m.role === "user").length >= maxMessages
    )
      return;
    setChatMessages((prev) => [...prev, { role: "user", text: question }]);
    setChatInput("");
    setChatLoading(true);

    let assembled = "";
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setChatMessages((prev) => [...prev, { role: "assistant", text: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assembled += decoder.decode(value, { stream: true });
        setChatMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", text: assembled };
          return next;
        });
      }
    } catch (err) {
      const fallback = question.toLowerCase().includes("tech")
        ? "Stack: React, Next.js, Tailwind, Node.js, Flask, PostgreSQL, Prisma, AI/ML tooling."
        : question.toLowerCase().includes("project")
          ? "Projects include DSA Tracker, Expense Tracker, Weather Forecast App, and Finance Track."
          : question.toLowerCase().includes("intern")
            ? "Yes, available for internships and engineering collaborations."
            : "Outside coding: gym training, problem solving, and building side projects.";
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: fallback },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const renderCodeLine = (
    lineNumber: number,
    tokens: Token[],
    revealChars = Number.POSITIVE_INFINITY,
  ) => {
    let remaining = revealChars;
    return (
      <div
        data-line={lineNumber}
        className={`code-line flex min-h-7 items-start gap-4 px-4 py-0.5 code-font text-sm ${
          currentLine === lineNumber ||
          (activeFile === "about" && lineNumber === 23)
            ? "line-illuminate"
            : ""
        }`}
      >
        <span className="w-8 select-none text-right text-(--text-muted)">
          {lineNumber}
        </span>
        <span className="flex-1 whitespace-pre-wrap wrap-break-word">
          {tokens.map((token, idx) => {
            if (remaining <= 0) return null;
            const visible = token.text.slice(0, remaining);
            remaining -= visible.length;
            return (
              <span
                key={`${lineNumber}-${idx}`}
                className={tokenClass[token.type]}
              >
                {visible}
              </span>
            );
          })}
        </span>
      </div>
    );
  };

  const renderEditorContent = () => {
    if (activeFile === "home") {
      return (
        <div className="relative overflow-hidden px-5 py-6 md:px-8 md:py-8">
          <div className="hero-glow pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-80" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <p className="code-font text-xs uppercase tracking-[0.28em] text-(--comment)">
                {"// hello world !! welcome to my portfolio"}
              </p>

              <div className="mt-3 leading-[0.86]">
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="display-font text-[clamp(3.4rem,10vw,7rem)] text-[#f4f4f4]"
                >
                  Rajat
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="display-font text-[clamp(3.4rem,10vw,7rem)] text-(--accent)"
                >
                  Sharma
                </motion.h1>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs md:text-sm">
                {roleChips.map((chip, index) => (
                  <span
                    key={chip}
                    className={`rounded-full border px-3 py-1.5 ${
                      index === 1
                        ? "border-[#569cd6]/60 bg-[#569cd6]/12 text-[#dceeff]"
                        : index === 2
                          ? "border-[#ce9178]/60 bg-[#ce9178]/12 text-[#ffe7d9]"
                          : "border-(--border) bg-white/3 text-[#d8d8d8]"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#b1b6c6] md:text-xl">
                I build portfolio-grade full-stack apps, AI utilities, and DSA
                tools while studying Computer Science. The goal is simple: ship
                useful products, not just polished screens.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                {quickNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openFile(item.id)}
                    className={`rounded-full border px-5 py-2.5 transition-transform hover:-translate-y-0.5 ${
                      item.id === "projects"
                        ? "border-(--accent) bg-(--accent) text-white"
                        : "border-white/10 bg-white/5 text-[#e6e6e6] hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {heroStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="metric-card rounded-2xl border border-white/8 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.22)]"
                  >
                    <p className="display-font text-2xl text-white md:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-[#9aa4bd]">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="section-card panel-sheen rounded-[28px] p-5 md:p-6 accent-outline">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#8f8f8f]">
                    Status
                  </p>
                  <h2 className="display-font mt-2 text-2xl text-white">
                    Portfolio Copilot Online
                  </h2>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                  LIVE
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {heroSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <p className="text-[10px] uppercase tracking-[0.26em] text-[#8f8f8f]">
                      {signal.label}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#e5e7eb]">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/8 bg-[#0b0f16] p-4">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8f8f8f]">
                  Quick Prompt
                </p>
                <p className="mt-2 code-font text-sm text-[#d7f2ff]">
                  /projects &nbsp; /contact &nbsp; /resume
                </p>
                <p className="mt-3 text-sm leading-6 text-[#aab2c5]">
                  Use the file explorer, or ask Copilot if you want the short
                  path. It will point you at the right tab without the corporate
                  hand-holding.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#d8d8d8] transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      );
    }

    if (activeFile === "about") {
      return (
        <div className="px-5 py-5 md:px-8">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
            <section className="section-card panel-sheen rounded-[28px] p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
                Developer Profile
              </p>
              <h3 className="display-font mt-3 text-3xl text-white md:text-4xl">
                Building reliable products at speed.
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#aeb3c1] md:text-base">
                Full-stack developer and AI enthusiast currently pursuing B.Tech
                in Computer Science. I enjoy turning complex ideas into
                practical products, from algorithmic learning platforms to
                intelligent automation systems.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {aboutFocusLeft.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-[#d7d7d7]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-4">
              <section className="section-card rounded-3xl p-5">
                <h4 className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
                  What I Build
                </h4>
                <div className="mt-3 space-y-2">
                  {aboutFocusRight.map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/8 bg-[#0f1219] px-3 py-2 text-sm text-[#d0d2da]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              <section className="accent-outline rounded-3xl border border-[#569cd6]/35 bg-[#1d222c] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
                  Education
                </p>
                <p className="mt-3 text-base text-white">
                  B.Tech, Computer Science & Engineering
                </p>
                <p className="text-sm text-[#9ca3b8]">
                  Kanpur Institute of Technology • 2023-2027
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#94d2ff]">
                  <span className="h-2 w-2 rounded-full bg-[#4fb3ff]" />
                  Actively exploring full stack, AI systems, and problem
                  solving.
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }

    if (activeFile === "skills") {
      return (
        <div className="px-5 py-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h3 className="display-font text-3xl text-white">
                Skills Matrix
              </h3>
              <p className="mt-2 text-sm text-(--text-muted)">
                Technologies I use to build and ship the projects shown above.
              </p>
            </div>
            <span className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
              practical over hype
            </span>
          </div>

          <a
            href={leetCodeStats.profile}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2.5 transition-colors hover:border-orange-500/60 hover:bg-orange-500/15"
          >
            <span className="text-lg">⚡</span>
            <span className="text-sm font-medium text-orange-100">
              LeetCode: {leetCodeStats.username}
            </span>
            <span className="text-xs text-orange-300/70">→</span>
          </a>

          <button
            onClick={() => {
              const allSkills = skillSections
                .flatMap((section) => section.items.map((item) => item.name))
                .join(", ");
              navigator.clipboard.writeText(allSkills);
              setStackCopied(true);
              setTimeout(() => setStackCopied(false), 2000);
            }}
            className="ml-2 inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/10 px-4 py-2.5 transition-all hover:border-green-500/60 hover:bg-green-500/15"
          >
            <span className="text-lg">{stackCopied ? "✓" : "📋"}</span>
            <span className="text-sm font-medium text-green-100">
              {stackCopied ? "Copied!" : "Share Stack"}
            </span>
          </button>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {skillSections.map((section) => (
              <section
                key={section.title}
                className="section-card rounded-2xl p-4"
                style={{
                  boxShadow: `inset 0 1px 0 ${section.items[0]?.color ?? "rgba(255,255,255,0.05)"}`,
                }}
              >
                <h4 className="text-xs uppercase tracking-[0.25em] text-[#9aa1b5]">
                  {section.title}
                </h4>
                <div className="mt-3 space-y-3">
                  {section.items.map((item) => (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between text-xs text-[#cfcfcf]">
                        <span>{item.name}</span>
                        <span>{item.level}%</span>
                      </div>
                      <div className="h-2 w-full rounded bg-[#1a1f2a]">
                        <div
                          className="h-2 rounded"
                          style={{
                            width: `${item.level}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      );
    }

    if (activeFile === "projects") {
      return (
        <div className="px-5 py-5 md:px-8">
          <section className="section-card panel-sheen rounded-[28px] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
              Selected Work
            </p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
              <h3 className="display-font text-3xl text-white md:text-4xl">
                Featured Projects
              </h3>
              <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs text-fuchsia-200">
                {projectItems.length} projects in focus
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm text-(--text-muted)">
              A selection of products I engineered and shipped with emphasis on
              clean UX, useful workflows, and real utility.
            </p>
          </section>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {projectItems.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      );
    }

    if (activeFile === "education") {
      return (
        <div className="px-5 py-5 md:px-8">
          <section className="section-card rounded-3xl p-6">
            <h3 className="display-font text-3xl text-white">
              Experience Timeline
            </h3>
            <p className="mt-2 text-sm text-(--text-muted)">
              Learning by building projects, systems, and product-like
              workflows.
            </p>
          </section>

          <div className="relative mt-5 space-y-4 border-l border-cyan-400/20 pl-5">
            {experienceItems.map((item) => (
              <div
                key={`${item.period}-${item.role}`}
                className="section-card relative rounded-2xl p-5"
              >
                <span className="absolute -left-6.5 top-5 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                <p className="text-xs uppercase tracking-[0.2em] text-[#8e8e8e]">
                  {item.period}
                </p>
                <p className="mt-1 text-base text-[#f0f0f0]">{item.role}</p>
                <p className="text-sm text-[#b0b0b0]">{item.org}</p>
                <p className="mt-1 text-sm text-[#a8a8a8]">{item.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-[#d6d6d6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeFile === "contact") {
      return (
        <div className="px-5 py-5 md:px-8">
          <section className="section-card rounded-[28px] p-6">
            <h3 className="display-font text-3xl text-white">Contact</h3>
            <p className="mt-2 text-sm text-(--text-muted)">
              Open for collaboration, internships, and interesting engineering
              problems.
            </p>
          </section>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-3">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.link}
                  target="_blank"
                  rel="noreferrer"
                  className="section-card block rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                    {card.title}
                  </p>
                  <p className="mt-1 text-sm text-[#e7e7e7]">{card.value}</p>
                </a>
              ))}
            </div>

            <div className="accent-outline rounded-3xl border border-[#569cd6]/28 bg-[#171b22] p-5 code-font text-sm">
              <p className="text-(--comment)">{`// contact.ts`}</p>
              <p className="mt-2 text-[#d8d8d8]">{`const reachOut = async () => ({`}</p>
              <p className="pl-4 text-[#7ec0ff]">{`name: "your-name",`}</p>
              <p className="pl-4 text-[#7ec0ff]">{`email: "you@email.com",`}</p>
              <p className="pl-4 text-[#7ec0ff]">{`message: "let's build something cool"`}</p>
              <p className="text-[#d8d8d8]">{`});`}</p>

              <button
                aria-label="Run contact action"
                className="mt-5 rounded-full border border-[#6c63ff]/45 bg-[#6c63ff] px-5 py-2 text-white transition hover:brightness-110"
                onClick={() => {
                  setTerminalOpen(true);
                  setTerminalLines((prev) => [
                    ...prev,
                    "> initiating contact request...",
                    "> response ETA: under 24h",
                  ]);
                }}
              >
                Execute Contact Flow
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activeFile === "readme") {
      return (
        <div className="px-5 py-5 md:px-8">
          <article className="space-y-6 rounded-[30px] border border-(--border) bg-[#10151f] p-6 md:p-8">
            <div className="rounded-2xl border border-white/8 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
                README.md
              </p>
              <h1 className="display-font mt-2 text-3xl text-[#f2f2f2] md:text-5xl">
                Rajat&apos;s Portfolio
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#a9a9a9] md:text-base">
                An interactive, VS Code-inspired portfolio for Rajat Sharma. It
                blends a polished developer workspace aesthetic with personal
                branding, project showcases, a terminal, a Copilot-style
                assistant, and smooth motion throughout the site.
              </p>
            </div>

            <section>
              <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f]">
                Highlights
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {[
                  "VS Code-style layout with explorer, tabs, status bar, terminal, and command palette",
                  "Personalized sections for home, about, projects, skills, experience, and contact",
                  "Built-in Copilot assistant with portfolio-aware responses",
                  "Animated interactions powered by Framer Motion",
                  "Responsive design tuned for desktop and mobile",
                  "Dark-first visual system with custom typography and UI theming",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-[#131b2a] px-3 py-3 text-sm text-[#d6d6d6]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-4">
                <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f]">
                  Tech Stack
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[#d6d6d6]">
                  <li>Next.js 16</li>
                  <li>React 19</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS v4</li>
                  <li>Framer Motion</li>
                  <li>Lucide React</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-4">
                <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f]">
                  Copilot Tips
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[#d6d6d6]">
                  <li>/projects - opens the projects section guidance</li>
                  <li>/contact - points to contact details</li>
                  <li>/resume - points to the resume file in the sidebar</li>
                  <li>If asked about dark mode, it stays loyal to Dark+</li>
                </ul>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-4">
                <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f]">
                  Getting Started
                </h2>
                <pre className="mt-3 overflow-x-auto code-font text-sm text-[#d6d6d6]">
                  {`npm install
npm run dev`}
                </pre>
              </div>

              <div className="rounded-2xl border border-white/8 bg-[#131b2a] p-4">
                <h2 className="text-sm uppercase tracking-[0.25em] text-[#8f8f8f]">
                  Project Structure
                </h2>
                <ul className="mt-3 space-y-2 text-sm text-[#d6d6d6]">
                  <li>
                    src/app/page.tsx - main portfolio experience and UI logic
                  </li>
                  <li>
                    src/app/layout.tsx - metadata, fonts, and global shell
                  </li>
                  <li>src/app/globals.css - theme tokens and base styling</li>
                  <li>src/app/api/copilot/route.ts - Copilot assistant API</li>
                </ul>
              </div>
            </section>

            <section className="rounded-2xl border border-white/8 bg-[#131b2a] p-4 text-sm leading-7 text-[#a9a9a9]">
              If you want to expand the project, the best places to start are
              the main page shell in src/app/page.tsx and the assistant logic in
              src/app/api/copilot/route.ts.
            </section>
          </article>
        </div>
      );
    }

    if (activeFile === "package") {
      const packageLines: Token[][] = [
        [{ text: "{", type: "plain" }],
        [{ text: '  "name": "rajat-portfolio",', type: "str" }],
        [{ text: '  "version": "2.0.0",', type: "str" }],
        [
          {
            text: '  "description": "A developer who ships things",',
            type: "str",
          },
        ],
        [
          {
            text: '  "author": "Rajat Sharma <rajat.sharma.myid1@gmail.com>",',
            type: "str",
          },
        ],
        [{ text: '  "skills": {', type: "str" }],
        [
          {
            text: '    "languages": ["C++", "Java", "Python", "JavaScript"],',
            type: "str",
          },
        ],
        [
          {
            text: '    "frameworks": ["React", "Next.js", "Flask", "Express"],',
            type: "str",
          },
        ],
        [{ text: '    "databases": ["PostgreSQL", "SQLite"],', type: "str" }],
        [{ text: '    "tools": ["Git", "Prisma", "Tailwind"]', type: "str" }],
        [{ text: "  },", type: "plain" }],
        [
          {
            text: '  "interests": ["AI", "Full-Stack", "Open Source", "Gym"],',
            type: "str",
          },
        ],
        [
          {
            text: '  "available_for": "internships and collaborations",',
            type: "str",
          },
        ],
        [{ text: '  "license": "MIT"', type: "str" }],
        [{ text: "}", type: "plain" }],
      ];
      return packageLines.map((line, idx) => (
        <div key={`package-line-${idx + 1}`}>
          {renderCodeLine(idx + 1, line)}
        </div>
      ));
    }

    if (activeFile === "env") {
      const envLines: Token[][] = [
        [{ text: "# Local environment", type: "com" }],
        [{ text: "NEXT_PUBLIC_NAME=Rajat Sharma", type: "plain" }],
        [{ text: "NEXT_PUBLIC_ROLE=Full Stack Developer", type: "plain" }],
        [{ text: "NEXT_PUBLIC_LOCATION=Kanpur,India", type: "plain" }],
        [{ text: "NEXT_PUBLIC_GITHUB=RajatSharma404", type: "plain" }],
        [{ text: "NEXT_PUBLIC_LEETCODE=RajatSharma404", type: "plain" }],
        [{ text: "NEXT_PUBLIC_INSTAGRAM=btw.rajat625", type: "plain" }],
        [{ text: "ANTHROPIC_API_KEY=optional_for_chat", type: "plain" }],
      ];
      return envLines.map((line, idx) => (
        <div key={`env-line-${idx + 1}`}>{renderCodeLine(idx + 1, line)}</div>
      ));
    }

    return <div className="p-4">Open a file from the explorer.</div>;
  };

  if (booting) {
    return (
      <motion.div
        className="flex h-screen items-center justify-center bg-black text-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="text-center code-font"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1, 0.95] }}
        >
          <p className="text-2xl text-(--accent)">Visual Studio Code</p>
          <p className="mt-2 text-sm text-gray-400">
            Loading Portfolio Workspace...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  if (windowClosed) {
    return (
      <div className="ide-ui flex h-screen items-center justify-center">
        <button
          onClick={() => setWindowClosed(false)}
          className="rounded-lg border border-(--border) bg-(--bg-tabbar) px-5 py-3 text-sm text-(--text-main) hover:bg-(--bg-sidebar)"
        >
          Reopen Rajat&apos;s Portfolio
        </button>
      </div>
    );
  }

  if (windowMinimized) {
    return (
      <div className="ide-ui flex h-screen items-end p-4">
        <button
          onClick={() => setWindowMinimized(false)}
          className="flex items-center gap-3 rounded-lg border border-(--border) bg-(--bg-tabbar) px-4 py-2 text-sm"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-(--text-main)">
            Rajat&apos;s Portfolio (minimized)
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`ide-ui relative h-screen w-full ${
        windowMaximized ? "p-0" : "p-2 md:p-4"
      }`}
    >
      <motion.div
        className={`relative flex h-full flex-col overflow-hidden border border-(--border) bg-(--bg-main) shadow-2xl ${
          windowMaximized ? "rounded-none" : "rounded-xl"
        }`}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <header className="flex items-center justify-between bg-(--titlebar) px-4 py-1.5 text-sm">
          <div className="flex items-center gap-2">
            <button
              aria-label="Close window"
              title="Close"
              onClick={() => handleWindowControl("close")}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]"
            >
              <span className="relative block h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="absolute left-1/2 top-0 h-2 w-[1.5px] -translate-x-1/2 rotate-45 rounded bg-black/70" />
                <span className="absolute left-1/2 top-0 h-2 w-[1.5px] -translate-x-1/2 -rotate-45 rounded bg-black/70" />
              </span>
            </button>
            <button
              aria-label="Minimize window"
              title="Minimize"
              onClick={() => handleWindowControl("minimize")}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]"
            >
              <span className="block h-[1.5px] w-2 rounded bg-black/70 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
            <button
              aria-label="Maximize window"
              title="Maximize"
              onClick={() => handleWindowControl("maximize")}
              className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#28c840]"
            >
              <span className="relative block h-2 w-2 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-black/70" />
                <span className="absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-black/70" />
              </span>
            </button>
            <button
              className="md:hidden p-2 hover:bg-white/10 rounded transition-colors"
              aria-label="Toggle mobile sidebar"
              onClick={() => setMobileSidebar((prev) => !prev)}
            >
              ☰
            </button>
          </div>
          <div className="flex w-full max-w-85 items-center justify-center rounded-md border border-white/10 bg-[#2a2d2e] px-3 py-1 text-xs text-(--text-muted)">
            <Search size={12} className="mr-2" />
            <span>rajat-sharma : portfolio</span>
            <span className="ml-3 rounded border border-white/20 px-1">
              Ctrl P
            </span>
          </div>
          <div className="w-20" />
        </header>

        <div
          ref={menuRef}
          className="flex gap-5 bg-(--menubar) px-4 py-1 text-xs"
        >
          {topMenus.map((menu) => (
            <div key={menu} className="relative">
              <button
                className="hover:text-white"
                onClick={() =>
                  setMenuOpen((prev) => (prev === menu ? null : menu))
                }
              >
                {menu}
              </button>
              <AnimatePresence>
                {menuOpen === menu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute left-0 top-6 z-50 min-w-56 rounded border border-(--border) bg-[#2c2c2f] py-1 text-[11px] shadow-2xl"
                  >
                    {menuItems[menu].map((item, idx) => (
                      <div key={`${menu}-${item.label}-${idx}`}>
                        {item.section && (
                          <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-(--text-muted)">
                            {item.section}
                          </p>
                        )}
                        <button
                          className="flex w-full items-center justify-between px-4 py-1.5 text-left hover:bg-[#007acc]"
                          onClick={() => executeMenuAction(item.action)}
                        >
                          <span>{item.label}</span>
                          {item.hint && (
                            <span className="text-(--text-muted)">
                              {item.hint}
                            </span>
                          )}
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-12 flex-col items-center gap-4 border-r border-(--border) bg-[#202225] py-3 text-lg md:flex">
            <button aria-label="Explorer" onClick={() => setSidebarOpen(true)}>
              <FolderOpen size={18} />
            </button>
            <button aria-label="Search" onClick={() => setPaletteOpen(true)}>
              <Search size={18} />
            </button>
            <button aria-label="Git">
              <GitBranch size={18} />
            </button>
            <button aria-label="Extensions">
              <Blocks size={18} />
            </button>
            <button aria-label="Profile">
              <UserRound size={18} />
            </button>
          </aside>

          <AnimatePresence>
            {(sidebarOpen || mobileSidebar) && (
              <motion.aside
                className="absolute z-20 h-[calc(100%-60px)] w-72 border-r border-(--border) bg-(--bg-sidebar) md:static md:h-auto"
                initial={{ x: -260, opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -260, opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-center justify-between border-b border-(--border) px-3 py-2 text-xs uppercase tracking-wide">
                  <span>Explorer</span>
                  <button
                    aria-label="Toggle sidebar"
                    onClick={() => setSidebarOpen((prev) => !prev)}
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="scroll-thin h-full overflow-y-auto p-3 text-sm">
                  <p className="mb-2 font-semibold">PORTFOLIO</p>
                  {(["src", "public", "config"] as const).map((folder) => (
                    <div key={folder}>
                      <button
                        aria-label={`toggle ${folder}`}
                        className="flex w-full items-center gap-1 py-1 text-left"
                        onClick={() =>
                          setFolderOpen((prev) => ({
                            ...prev,
                            [folder]: !prev[folder],
                          }))
                        }
                      >
                        <motion.span
                          animate={{ rotate: folderOpen[folder] ? 90 : 0 }}
                        >
                          <ChevronRight size={12} />
                        </motion.span>
                        <span>{folder}</span>
                      </button>
                      <AnimatePresence>
                        {folderOpen[folder] && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            {files
                              .filter((file) => file.folder === folder)
                              .map((file) => (
                                <button
                                  key={file.id}
                                  aria-label={`open ${file.name}`}
                                  onClick={() => openFile(file.id)}
                                  className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left ${
                                    activeFile === file.id
                                      ? "bg-(--line-highlight)"
                                      : "hover:bg-white/5"
                                  }`}
                                >
                                  <span className="w-8 text-[10px] text-(--text-muted)">
                                    {extIcon(file.ext)}
                                  </span>
                                  <span>{file.name}</span>
                                </button>
                              ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <button
                    className="mt-6 flex w-full items-center justify-between rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm text-violet-300 hover:bg-violet-500/20"
                    onClick={() => setChatOpen((prev) => !prev)}
                  >
                    <span className="flex items-center gap-1">
                      <Sparkles size={14} /> Rajat&apos;s Copilot
                    </span>
                    <span className="text-[10px] opacity-70">AI</span>
                  </button>

                  <div className="mt-3 rounded-lg border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-[11px] leading-5 text-cyan-300">
                    <p className="font-semibold uppercase tracking-wider mb-1">
                      Shortcuts
                    </p>
                    <p className="text-[10px] opacity-75">
                      Ctrl+P search • Ctrl+` terminal • Ctrl+Shift+C copilot
                    </p>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <section className="flex min-w-0 flex-1 flex-col">
            <div className="scroll-thin flex overflow-x-auto bg-(--bg-tabbar)">
              {openTabs.map((tab) => {
                const f = files.find((node) => node.id === tab);
                if (!f) return null;
                const modified = tab === "contact" || tab === "projects";
                return (
                  <button
                    key={tab}
                    className={`group flex min-w-40 items-center justify-between border-r border-(--border) px-3 py-2 text-sm ${
                      activeFile === tab ? "bg-(--bg-tab-active)" : "opacity-90"
                    }`}
                    style={{
                      borderTop:
                        activeFile === tab
                          ? "2px solid var(--accent)"
                          : "2px solid transparent",
                    }}
                    onClick={() => setActiveFile(tab)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-[10px] text-(--text-muted)">
                        {extIcon(f.ext)}
                      </span>
                      {f.name}
                      {modified && <span className="text-(--accent)">●</span>}
                    </span>
                    <span
                      className="ml-2 hidden rounded px-1 group-hover:block"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab);
                      }}
                    >
                      <X size={12} />
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              ref={editorRef}
              className="scroll-thin relative flex-1 overflow-auto bg-(--bg-main)"
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setCursorFx({
                  x: event.clientX - rect.left,
                  y: event.clientY - rect.top,
                  visible: true,
                });
              }}
              onMouseLeave={() =>
                setCursorFx((prev) => ({ ...prev, visible: false }))
              }
            >
              <AnimatePresence>
                {cursorFx.visible && (
                  <motion.div
                    className="pointer-events-none absolute z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: cursorFx.x - 24,
                      y: cursorFx.y - 24,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  >
                    <div className="relative h-12 w-12 border border-cyan-200/50 bg-cyan-400/5">
                      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_#fff]" />
                      <span className="absolute left-1/2 -top-1.75 h-1.5 w-px -translate-x-1/2 bg-white/60" />
                      <span className="absolute left-1/2 -bottom-1.75 h-1.5 w-px -translate-x-1/2 bg-white/60" />
                      <span className="absolute -left-1.75 top-1/2 h-px w-1.5 -translate-y-1/2 bg-white/60" />
                      <span className="absolute -right-1.75 top-1/2 h-px w-1.5 -translate-y-1/2 bg-white/60" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFile}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderEditorContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </div>

        <footer className="relative flex items-center justify-between bg-(--statusbar) px-3 py-1 text-xs text-white">
          <div className="flex gap-4">
            <span>⚠ 0</span>
            <span className="flex items-center gap-1">
              <GitBranch size={12} /> main
            </span>
            <span>🔄 Rajat Sharma&apos;s Portfolio</span>
            <span>Copilot</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setThemePickerOpen((prev) => !prev)}
              aria-label="Open theme picker"
            >
              {themes.find((item) => item.value === theme)?.label}
            </button>
            <span>UTF-8</span>
            <span>TypeScript React</span>
          </div>
          <AnimatePresence>
            {themePickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute bottom-8 right-3 z-30 w-56 rounded border border-(--border) bg-[#1f2229] p-2"
              >
                {themes.map((item) => (
                  <button
                    key={item.value}
                    className="block w-full rounded px-2 py-1 text-left hover:bg-white/10"
                    onClick={() => {
                      setTheme(item.value);
                      setThemePickerOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      </motion.div>

      <button
        onClick={() => setTerminalOpen((prev) => !prev)}
        className="absolute bottom-16 left-4 rounded border border-(--border) bg-[#1f222a] px-3 py-1 text-xs"
        aria-label="Toggle terminal"
      >
        <span className="flex items-center gap-1">
          <TerminalSquare size={14} /> Terminal
        </span>
      </button>

      <AnimatePresence>
        {terminalOpen && (
          <motion.section
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className="terminal-glow absolute inset-x-2 bottom-2 z-30 rounded-lg border border-(--border) bg-[#111317] p-3 code-font md:inset-x-8"
          >
            <div className="scroll-thin max-h-44 overflow-y-auto text-sm">
              {terminalLines.map((line, idx) => (
                <p key={`${line}-${idx}`}>{line}</p>
              ))}
              {showDino && (
                <>
                  <DinoGame
                    onStop={() => setShowDino(false)}
                    onScoreUnlock={() => {
                      setTerminalLines((prev) => [
                        ...prev,
                        "Achievement Unlocked: unlock_chatbot_boost",
                      ]);
                      setChatBoost((prev) => (prev >= 5 ? prev : prev + 5));
                    }}
                  />
                </>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runTerminalCommand(terminalInput);
                setTerminalInput("");
              }}
              className="mt-2 flex items-center gap-2"
            >
              <span>{terminalPath}$</span>
              <input
                aria-label="terminal command input"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="flex-1 border-none bg-transparent outline-none"
              />
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        aria-label="Open Copilot assistant"
        className="absolute bottom-16 right-2 sm:right-4 rounded-full border border-cyan-400/40 bg-[#1f2430] px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:border-cyan-400/60 hover:bg-[#253548] transition-colors"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <span className="hidden sm:inline">Ask Rajat&apos;s Copilot</span>
        <span className="sm:hidden">Ask Copilot</span>
      </button>

      <AnimatePresence>
        {chatOpen && (
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-24 right-2 z-40 flex h-96 w-80 flex-col rounded-xl border border-(--border) bg-[#11161f] sm:bottom-28 sm:right-4 sm:h-107.5 sm:w-82.5"
          >
            <div className="border-b border-(--border) px-3 py-2 text-sm">
              Rajat&apos;s Copilot Chat
            </div>
            <div className="scroll-thin flex-1 space-y-2 overflow-y-auto p-3 text-sm">
              {chatMessages.map((msg, idx) => (
                <p
                  key={`${msg.role}-${idx}`}
                  className={`rounded p-2 ${msg.role === "assistant" ? "bg-[#1d2230]" : "bg-[#2a3449]"}`}
                >
                  {msg.text}
                </p>
              ))}
              {chatLoading && <p className="text-(--text-muted)">typing...</p>}
              <div className="flex flex-wrap gap-2">
                {[
                  "What's your tech stack?",
                  "Tell me about your projects",
                  "Are you available for internships?",
                  "What are your hobbies?",
                ].map((q) => (
                  <button
                    key={q}
                    className="rounded border border-(--border) px-2 py-1.5 sm:py-1 text-xs hover:bg-white/5 transition-colors active:bg-white/10"
                    onClick={() => askCopilot(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <form
              className="flex gap-2 border-t border-(--border) p-3"
              onSubmit={(e) => {
                e.preventDefault();
                askCopilot(chatInput);
              }}
            >
              <input
                aria-label="Copilot question"
                className="flex-1 rounded border border-(--border) bg-[#0f131a] px-2 py-1"
                placeholder="Ask me anything about Rajat..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="rounded bg-(--accent) px-3 py-1 text-white">
                Send
              </button>
            </form>
            <p className="px-3 pb-2 text-[11px] text-(--text-muted)">
              Messages left:{" "}
              {Math.max(
                0,
                maxMessages -
                  chatMessages.filter((m) => m.role === "user").length,
              )}
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paletteOpen && (
          <motion.div
            className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-[92%] max-w-2xl rounded-lg border border-(--border) bg-[#1f2229]">
              <div className="border-b border-(--border) p-3">
                <input
                  aria-label="Command palette"
                  autoFocus
                  value={paletteQuery}
                  onChange={(e) => {
                    setPaletteQuery(e.target.value);
                    setPaletteIndex(0);
                  }}
                  placeholder="> Search sections, files, commands..."
                  className="w-full border-none bg-transparent code-font outline-none"
                />
              </div>
              <div className="max-h-72 overflow-y-auto p-2 text-sm">
                {filteredPalette.map((item, index) => (
                  <button
                    key={item.id}
                    className={`block w-full rounded px-3 py-2 text-left ${index === paletteIndex ? "bg-white/10" : "hover:bg-white/5"}`}
                    onClick={() => handlePaletteSelect(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
