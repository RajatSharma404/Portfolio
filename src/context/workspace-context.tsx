"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { projectItems, type ProjectCategory, type ProjectItem } from "@/content/site-data";
import type {
  BottomTab,
  ChatMessage,
  ContactFormState,
  FileNode,
  GitHubCommit,
  GitHubOverview,
  MenuItem,
  MenuName,
  SidebarTab,
  ThemeName,
  ViewMode,
} from "@/types/vscode";
import type { ProjectLanguageRepoStats } from "@/components/language-skill-chart";

export const files: FileNode[] = [
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
    id: "resume",
    name: "resume.pdf",
    label: "resume.pdf",
    ext: "pdf",
    folder: "public",
  },
];

export const themes: { value: ThemeName; label: string; dot: string }[] = [
  { value: "dracula", label: "Dracula", dot: "#bd93f9" },
  { value: "darkplus", label: "Dark+", dot: "#007acc" },
  { value: "monokai", label: "Monokai", dot: "#fd971f" },
  { value: "onedark", label: "One Dark Pro", dot: "#61afef" },
  { value: "solarized", label: "Solarized", dot: "#2aa198" },
];

export const menuItems: Record<MenuName, MenuItem[]> = {
  File: [
    { label: "New File", hint: "Ctrl+N" },
    { label: "Open File...", hint: "Ctrl+P", action: "open-file" },
    { section: "FILES", label: "home.tsx", action: "open-home" },
    { label: "about.html", action: "open-about" },
    { label: "projects.js", action: "open-projects" },
    { label: "skills.json", action: "open-skills" },
    { label: "experience.ts", action: "open-education" },
    { label: "contact.css", action: "open-contact" },
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
  ],
  Copilot: [
    { label: "Open Copilot", action: "toggle-copilot" },
    { label: "Ask About Projects", action: "copilot-projects" },
    { label: "Ask About Skills", action: "copilot-skills" },
  ],
};

export const topMenus: MenuName[] = [
  "File",
  "Edit",
  "View",
  "Go",
  "Run",
  "Terminal",
  "Help",
  "Copilot",
];

export const extIcon = (ext: FileNode["ext"]) => {
  if (ext === "tsx") return "TSX";
  if (ext === "html") return "HTML";
  if (ext === "js") return "JS";
  if (ext === "ts") return "TS";
  if (ext === "css") return "CSS";
  if (ext === "json") return "JSON";
  if (ext === "md") return "MD";
  if (ext === "config") return "{}";
  if (ext === "env") return "ENV";
  return "PDF";
};

export const extColor = (ext: FileNode["ext"]) => {
  if (ext === "tsx") return "text-cyan-400";
  if (ext === "html") return "text-orange-400";
  if (ext === "js") return "text-yellow-400";
  if (ext === "ts") return "text-sky-400";
  if (ext === "css") return "text-purple-400";
  if (ext === "json") return "text-amber-300";
  if (ext === "md") return "text-blue-300";
  if (ext === "config") return "text-gray-400";
  if (ext === "env") return "text-emerald-400";
  return "text-rose-400";
};

interface WorkspaceContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  activeThemeLabel: string;
  themeDotColor: string;
  themePickerOpen: boolean;
  setThemePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeFile: string;
  setActiveFile: (id: string) => void;
  openTabs: string[];
  openFile: (id: string) => void;
  closeTab: (id: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebar: boolean;
  setMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: (tab: SidebarTab) => void;
  folderOpen: { src: boolean; public: boolean; config: boolean };
  setFolderOpen: React.Dispatch<
    React.SetStateAction<{ src: boolean; public: boolean; config: boolean }>
  >;
  currentLine: number;
  setCurrentLine: (line: number) => void;
  paletteOpen: boolean;
  setPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paletteQuery: string;
  setPaletteQuery: (query: string) => void;
  paletteIndex: number;
  setPaletteIndex: React.Dispatch<React.SetStateAction<number>>;
  filteredPalette: Array<{ id: string; label: string; type: string }>;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
  handlePaletteSelect: (id: string) => void;
  menuOpen: MenuName | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<MenuName | null>>;
  executeMenuAction: (action?: string) => void;
  terminalOpen: boolean;
  setTerminalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  terminalInput: string;
  setTerminalInput: (val: string) => void;
  terminalPath: string;
  terminalLines: string[];
  terminalHistory: string[];
  lastTerminalCommand: string;
  runTerminalCommand: (cmd: string) => void;
  showDino: boolean;
  setShowDino: React.Dispatch<React.SetStateAction<boolean>>;
  showMatrix: boolean;
  setShowMatrix: React.Dispatch<React.SetStateAction<boolean>>;
  activeBottomTab: BottomTab;
  setActiveBottomTab: (tab: BottomTab) => void;
  chatOpen: boolean;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatInput: string;
  setChatInput: (val: string) => void;
  chatLoading: boolean;
  chatMessages: ChatMessage[];
  chatBoost: number;
  setChatBoost: React.Dispatch<React.SetStateAction<number>>;
  askCopilot: (q: string) => Promise<void>;
  shortcutHelpOpen: boolean;
  setShortcutHelpOpen: React.Dispatch<React.SetStateAction<boolean>>;
  windowState: "normal" | "minimized" | "maximized" | "closed";
  handleWindowControl: (action: "close" | "minimize" | "maximize") => void;
  emailCopied: boolean;
  copyEmailAddress: () => void;
  projectFilter: ProjectCategory | "All";
  setProjectFilter: (category: ProjectCategory | "All") => void;
  filteredProjects: ProjectItem[];
  selectedProject: ProjectItem | null;
  setSelectedProject: (item: ProjectItem | null) => void;
  recentCommits: GitHubCommit[];
  recentCommitsLoading: boolean;
  githubRepoStars: Record<string, number>;
  githubOverview: GitHubOverview | null;
  githubStatsLoading: boolean;
  projectLanguageStats: ProjectLanguageRepoStats[];
  projectLanguageLoading: boolean;
  contactForm: ContactFormState;
  setContactForm: React.Dispatch<React.SetStateAction<ContactFormState>>;
  contactSubmitting: boolean;
  contactFeedback: string | null;
  submitContactForm: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  editorRef: React.RefObject<HTMLDivElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("dracula");
  const [activeFile, setActiveFile] = useState("home");
  const [openTabs, setOpenTabs] = useState<string[]>(["home"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>("explorer");
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
  const [terminalBooted, setTerminalBooted] = useState(false);
  const [showDino, setShowDino] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTab>("terminal");

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatBoost, setChatBoost] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask me anything about Rajat. Try: tech stack, projects, internships, hobbies.",
    },
  ]);

  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [shortcutHelpOpen, setShortcutHelpOpen] = useState(false);
  const [windowState, setWindowState] = useState<
    "normal" | "minimized" | "maximized" | "closed"
  >("normal");
  const [emailCopied, setEmailCopied] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectCategory | "All">("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const [recentCommits, setRecentCommits] = useState<GitHubCommit[]>([]);
  const [recentCommitsLoading, setRecentCommitsLoading] = useState(true);
  const [githubRepoStars, setGithubRepoStars] = useState<Record<string, number>>({});
  const [githubOverview, setGithubOverview] = useState<GitHubOverview | null>(null);
  const [githubStatsLoading, setGithubStatsLoading] = useState(true);
  const [projectLanguageStats, setProjectLanguageStats] = useState<ProjectLanguageRepoStats[]>([]);
  const [projectLanguageLoading, setProjectLanguageLoading] = useState(true);

  const [contactForm, setContactForm] = useState<ContactFormState>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactFeedback, setContactFeedback] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("preview");

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) =>
      prev === "preview" ? "code" : prev === "code" ? "split" : "preview",
    );
  }, []);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const activeThemeObj = themes.find((item) => item.value === theme);
  const activeThemeLabel = activeThemeObj?.label ?? "Dracula";
  const themeDotColor = activeThemeObj?.dot ?? "#bd93f9";

  const paletteItems = useMemo(
    () => [
      ...files.map((f) => ({ id: f.id, label: f.name, type: "file" as const })),
      ...themes.map((t) => ({
        id: `theme-${t.value}`,
        label: `Theme: ${t.label}`,
        type: "theme" as const,
      })),
      { id: "action-terminal", label: "Toggle Terminal", type: "action" as const },
      { id: "action-copilot", label: "Open Copilot Chat", type: "action" as const },
      { id: "action-resume", label: "View Resume (PDF)", type: "action" as const },
      { id: "action-dino", label: "Play Dino Runner", type: "action" as const },
    ],
    [],
  );

  const filteredPalette = useMemo(() => {
    if (!paletteQuery) return paletteItems;
    return paletteItems.filter((item) =>
      item.label.toLowerCase().includes(paletteQuery.toLowerCase()),
    );
  }, [paletteItems, paletteQuery]);

  const filteredProjects = useMemo(
    () =>
      projectFilter === "All"
        ? projectItems
        : projectItems.filter((project) =>
            (project.categories ?? [project.category]).includes(projectFilter),
          ),
    [projectFilter],
  );

  const copyEmailAddress = useCallback(() => {
    navigator.clipboard.writeText("rajat.sharma.myid1@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, []);

  const openFile = useCallback((id: string) => {
    setActiveFile(id);
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      setOpenTabs((prev) => {
        const next = prev.filter((t) => t !== id);
        if (next.length === 0) return ["home"];
        if (activeFile === id) {
          const nextActive = next[next.length - 1] ?? "home";
          setActiveFile(nextActive);
        }
        return next;
      });
    },
    [activeFile],
  );

  const openPalette = useCallback(() => {
    setPaletteOpen(true);
    setPaletteQuery("");
    setPaletteIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
  }, []);

  const togglePalette = useCallback(() => {
    setPaletteOpen((prev) => !prev);
    setPaletteQuery("");
    setPaletteIndex(0);
  }, []);

  const runPaletteSelection = useCallback(
    (id: string) => {
      if (id.startsWith("theme-")) {
        const themeName = id.replace("theme-", "") as ThemeName;
        setTheme(themeName);
        return;
      }
      if (id === "action-terminal") {
        setTerminalOpen((prev) => !prev);
        return;
      }
      if (id === "action-copilot") {
        setChatOpen(true);
        return;
      }
      if (id === "action-resume") {
        openFile("resume");
        return;
      }
      if (id === "action-dino") {
        setTerminalOpen(true);
        setShowDino(true);
        return;
      }
      openFile(id);
    },
    [openFile],
  );

  const handlePaletteSelect = useCallback(
    (id: string) => {
      runPaletteSelection(id);
      closePalette();
    },
    [closePalette, runPaletteSelection],
  );

  const handleWindowControl = (action: "close" | "minimize" | "maximize") => {
    if (action === "close") {
      setWindowState("closed");
      return;
    }
    if (action === "minimize") {
      setWindowState("minimized");
      return;
    }
    setWindowState((prev) => (prev === "maximized" ? "normal" : "maximized"));
  };

  const runTerminalCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      const lower = command.toLowerCase();
      if (!command) return;

      setTerminalHistory((prev) => [...prev, raw]);
      setLastTerminalCommand(raw);
      setTerminalLines((prev) => [...prev, `$ ${raw}`]);

      if (lower === "help") {
        setTerminalLines((prev) => [
          ...prev,
          "Available Commands:",
          "  neofetch      - Display system & developer specifications",
          "  matrix        - Toggle digital matrix rain effect",
          "  dsa / leetcode- Print 500+ LeetCode problem breakdown",
          "  skills        - Print technical competency matrix",
          "  theme <name>  - Switch theme (e.g. dracula, monokai, onedark, synthwave)",
          "  git <status|log|branch> - Git commands",
          "  whoami        - About developer",
          "  ls / cd / cat - File system navigation",
          "  contact       - Developer reach-out links",
          "  play          - Launch dino runner easter egg",
          "  clear         - Clear terminal buffer",
        ]);
      } else if (lower === "neofetch") {
        setTerminalLines((prev) => [
          ...prev,
          "        /\\          rajat@portfolio",
          "       /  \\         ---------------",
          "      / /\\ \\        OS: Next.js 16.2.3 (Turbopack App Router)",
          "     / /  \\ \\       Host: Vercel Cloud Serverless (Edge Runtime)",
          "    / / /\\ \\ \\      Uptime: 24/7 Always Active",
          "   / / /  \\ \\ \\     Shell: zsh 5.9 (x86_64-portfolio)",
          "  /_/ /    \\ \\_\\    Editor: VS Code Web IDE v1.98.0",
          "    \\ \\    / /      Languages: C++, TypeScript, Python, JavaScript",
          "     \\ \\  / /       LeetCode: 500+ Solved (Top 10% Global Rank)",
          "      \\ \\/ /        Primary Focus: Full-Stack Web & AI Tooling",
          `       \\  /         Theme: ${activeThemeLabel}`,
          "        \\/          Memory: 4096MB / 8192MB Allocated",
        ]);
      } else if (lower === "matrix") {
        setShowMatrix((prev) => !prev);
        setTerminalLines((prev) => [
          ...prev,
          "Toggling digital matrix stream... (type 'matrix' again to exit)",
        ]);
      } else if (lower.startsWith("theme ")) {
        const themeArg = lower.replace("theme ", "").trim().toLowerCase();
        const validThemes: ThemeName[] = [
          "dracula",
          "darkplus",
          "monokai",
          "onedark",
          "solarized",
          "synthwave",
          "tokyonight",
          "githubdark",
        ];
        if (validThemes.includes(themeArg as ThemeName)) {
          setTheme(themeArg as ThemeName);
          setTerminalLines((prev) => [
            ...prev,
            `✓ Theme switched to "${themeArg}"`,
          ]);
        } else {
          setTerminalLines((prev) => [
            ...prev,
            `Unknown theme: "${themeArg}". Valid options: ${validThemes.join(", ")}`,
          ]);
        }
      } else if (lower === "dsa" || lower === "leetcode") {
        setTerminalLines((prev) => [
          ...prev,
          "=========================================",
          "  LEETCODE PULSE: @RajatSharma404",
          "=========================================",
          "  Total Problems Solved : 500+",
          "  Easy                  : 220",
          "  Medium                : 250",
          "  Hard                  : 30+",
          "  Primary Language      : C++",
          "  Global Percentile     : Top 10%",
          "  Active Streak         : 100+ Days Badge Unlocked",
          "  Core Patterns         : DP, Graphs, Trees, Sliding Window",
          "=========================================",
        ]);
      } else if (lower === "skills") {
        setTerminalLines((prev) => [
          ...prev,
          "Core Languages : C++, TypeScript, JavaScript, Python, HTML5, CSS3",
          "Frameworks     : React 19, Next.js 16, FastAPI, Node.js, Express",
          "Databases      : PostgreSQL, SQLite, Prisma ORM",
          "AI & Tooling   : Stockfish 16 Engine, Google Gemini AI, Git",
          "Design Systems : Tailwind CSS v4, Framer Motion, Vanilla CSS",
        ]);
      } else if (lower === "contact") {
        setTerminalLines((prev) => [
          ...prev,
          "Email    : rajat.sharma.myid1@gmail.com",
          "LinkedIn : https://linkedin.com/in/rajat-sharma-9a053128b/",
          "GitHub   : https://github.com/RajatSharma404",
          "LeetCode : https://leetcode.com/u/RajatSharma404/",
        ]);
      } else if (lower === "git status") {
        setTerminalLines((prev) => [
          ...prev,
          "On branch main",
          "Your branch is up to date with 'origin/main'.",
          "",
          "Changes to be committed:",
          "  modified:   src/projects/chess-engine.ts",
          "  modified:   src/skills/leetcode-pulse.json",
          "  new file:   src/components/vscode/terminal-panel.tsx",
        ]);
      } else if (lower === "git log") {
        setTerminalLines((prev) => [
          ...prev,
          "commit e7a31b4 (HEAD -> main, origin/main)",
          "Author: Rajat Sharma <rajat.sharma.myid1@gmail.com>",
          "Date:   Sat Aug 22 2026",
          "",
          "    feat: add multi-tab bottom panel & interactive CLI",
          "",
          "commit a9f20c1",
          "Author: Rajat Sharma <rajat.sharma.myid1@gmail.com>",
          "Date:   Sat Aug 22 2026",
          "",
          "    feat: add LeetCode Pulse & DSA Mastery showcase",
        ]);
      } else if (lower === "git branch") {
        setTerminalLines((prev) => [
          ...prev,
          "* main",
          "  feature/ai-copilot",
          "  hotfix/dsa-grind",
          "  chore/clean-architecture",
        ]);
      } else if (lower.startsWith("sudo")) {
        setTerminalLines((prev) => [
          ...prev,
          "[sudo] password for rajat: **********",
          "Permission denied: Rajat is the only root administrator.",
        ]);
      } else if (lower.startsWith("curl ")) {
        const url = command.replace(/curl /i, "").trim();
        setTerminalLines((prev) => [
          ...prev,
          `HTTP/1.1 200 OK`,
          `Content-Type: application/json`,
          `Server: Next.js/16.2.3`,
          `{"status":"success","url":"${url}","data":{"author":"Rajat Sharma"}}`,
        ]);
      } else if (lower.startsWith("echo ")) {
        setTerminalLines((prev) => [...prev, command.replace(/echo /i, "")]);
      } else if (lower === "whoami") {
        setTerminalLines((prev) => [
          ...prev,
          "Rajat Sharma - Full Stack Developer | B.Tech student at Kanpur Institute of Technology.",
        ]);
      } else if (lower === "pwd") {
        setTerminalLines((prev) => [...prev, terminalPath]);
      } else if (lower === "date") {
        setTerminalLines((prev) => [...prev, new Date().toString()]);
      } else if (lower === "ls") {
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
      } else if (lower.startsWith("cd ")) {
        const target = lower.replace("cd ", "").trim();
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
      } else if (lower === "ls projects") {
        setTerminalLines((prev) => [
          ...prev,
          ...projectItems.map((p) => `- ${p.title}`),
        ]);
      } else if (lower === "cat resume.pdf" || lower === "cat readme.md") {
        setTerminalLines((prev) => [
          ...prev,
          "Resume Summary: Web development, AI projects, 500+ DSA problems solved, internship-ready.",
        ]);
      } else if (lower === "cat package.json") {
        setTerminalLines((prev) => [
          ...prev,
          '{ "name": "rajat-portfolio", "version": "2.0.0", "framework": "Next.js 16" }',
        ]);
      } else if (lower.startsWith("open ")) {
        const target = lower.replace("open ", "").trim();
        const mapped = files.find((f) => f.name.toLowerCase() === target);
        if (mapped) {
          openFile(mapped.id);
        } else {
          setTerminalLines((prev) => [...prev, `open: cannot find ${target}`]);
        }
      } else if (lower === "history") {
        setTerminalLines((prev) => [
          ...prev,
          ...terminalHistory.map((entry, idx) => `${idx + 1}  ${entry}`),
        ]);
      } else if (lower === "play") {
        setShowDino(true);
        setTerminalLines((prev) => [...prev, "Launching dino game..."]);
      } else if (lower === "clear") {
        setTerminalLines([]);
      } else {
        setTerminalLines((prev) => [
          ...prev,
          `Command not found: "${command}". Type "help" for a list of commands.`,
        ]);
      }
    },
    [activeThemeLabel, openFile, setTheme, terminalHistory, terminalPath],
  );

  const maxMessages = 15 + chatBoost;

  const askCopilot = useCallback(
    async (question: string) => {
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

        if (!res.ok) throw new Error(`API error: ${res.status}`);
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
      } catch {
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
    },
    [chatMessages, maxMessages],
  );

  const executeMenuAction = useCallback(
    (action?: string) => {
      if (!action) return;
      if (action === "open-file") {
        openPalette();
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
    },
    [
      askCopilot,
      lastTerminalCommand,
      openFile,
      openPalette,
      runTerminalCommand,
    ],
  );

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactSubmitting) return;

    setContactSubmitting(true);
    setContactFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const payload = (await res.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };
      if (!res.ok || !payload.ok) {
        setContactFeedback(payload.error ?? "Unable to send message right now.");
        return;
      }

      setContactFeedback(payload.message ?? "Message sent successfully.");
      setContactForm({ name: "", email: "", message: "", website: "" });
    } catch {
      setContactFeedback("Network error. Please try again in a moment.");
    } finally {
      setContactSubmitting(false);
    }
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(
      "portfolio-theme",
    ) as ThemeName | null;
    if (storedTheme && themes.some((t) => t.value === storedTheme)) {
      setTheme(storedTheme);
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
    if (terminalOpen && !terminalBooted) {
      setTerminalBooted(true);
      setTerminalLines([]);
      const sequence = [
        "> rajat-portfolio@2.0.0 dev",
        "> next dev",
        "",
        "  ▲ Next.js 16.2.3",
        "  - Local:        http://localhost:3000",
        "  - Environments: loaded",
        "",
        " ✓ Ready in 950ms",
        "Type help for available commands.",
      ];

      let i = 0;
      const interval = setInterval(() => {
        if (i < sequence.length) {
          setTerminalLines((prev) => [...prev, sequence[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 120);

      return () => clearInterval(interval);
    }
  }, [terminalOpen, terminalBooted]);

  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === "p" && !event.shiftKey) {
        event.preventDefault();
        togglePalette();
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
      if (event.key === "?" && !paletteOpen) {
        event.preventDefault();
        setShortcutHelpOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setMenuOpen(null);
        closePalette();
        setShortcutHelpOpen(false);
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
        handlePaletteSelect(selected.id);
      }
    };

    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [
    closePalette,
    filteredPalette,
    handlePaletteSelect,
    paletteIndex,
    paletteOpen,
    togglePalette,
  ]);

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
    const fetchRecentCommits = async () => {
      setRecentCommitsLoading(true);
      try {
        const res = await fetch(
          "https://api.github.com/repos/RajatSharma404/Portfolio/commits?per_page=5",
        );
        if (!res.ok) return;
        const data = (await res.json()) as Array<{
          commit: { message: string; author: { date: string } };
          sha: string;
        }>;
        setRecentCommits(
          data.map((commit) => ({
            message: commit.commit.message.split("\n")[0],
            date: new Date(commit.commit.author.date).toLocaleDateString(),
            sha: commit.sha.slice(0, 7),
          })),
        );
      } catch {
        console.log("Failed to fetch commits");
      } finally {
        setRecentCommitsLoading(false);
      }
    };

    const fetchGithubOverview = async () => {
      setGithubStatsLoading(true);
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/RajatSharma404"),
          fetch(
            "https://api.github.com/users/RajatSharma404/repos?per_page=100&sort=updated",
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) return;
        const profile = (await profileRes.json()) as {
          followers: number;
          public_repos: number;
          following: number;
        };
        const repos = (await reposRes.json()) as Array<{
          name: string;
          stargazers_count: number;
        }>;
        const starsByRepo: Record<string, number> = {};

        repos.forEach((repo) => {
          starsByRepo[repo.name.toLowerCase()] = repo.stargazers_count;
        });

        const featuredStars = projectItems.reduce((total, project) => {
          const repoName = project.github.split("/").pop()?.toLowerCase() ?? "";
          return total + (starsByRepo[repoName] ?? 0);
        }, 0);

        setGithubRepoStars(starsByRepo);
        setGithubOverview({
          followers: profile.followers,
          publicRepos: profile.public_repos,
          following: profile.following,
          totalStars: featuredStars,
        });
      } catch {
        console.log("Failed to fetch GitHub overview");
      } finally {
        setGithubStatsLoading(false);
      }
    };

    const fetchProjectLanguageStats = async () => {
      setProjectLanguageLoading(true);
      try {
        const stats = await Promise.all(
          projectItems.map(async (project) => {
            const repoName = project.github.split("/").pop();
            if (!repoName) {
              return {
                slug: project.slug,
                title: project.title,
                github: project.github,
                languages: {},
              };
            }

            const response = await fetch(
              `https://api.github.com/repos/RajatSharma404/${repoName}/languages`,
            );
            if (!response.ok) {
              return {
                slug: project.slug,
                title: project.title,
                github: project.github,
                languages: {},
              };
            }

            const languages = await response.json();
            return {
              slug: project.slug,
              title: project.title,
              github: project.github,
              languages,
            };
          }),
        );
        setProjectLanguageStats(stats);
      } catch {
        console.log("Failed to fetch GitHub language stats");
      } finally {
        setProjectLanguageLoading(false);
      }
    };

    fetchRecentCommits();
    fetchGithubOverview();
    fetchProjectLanguageStats();
  }, []);

  const value = {
    theme,
    setTheme,
    activeThemeLabel,
    themeDotColor,
    themePickerOpen,
    setThemePickerOpen,
    activeFile,
    setActiveFile,
    openTabs,
    openFile,
    closeTab,
    sidebarOpen,
    setSidebarOpen,
    mobileSidebar,
    setMobileSidebar,
    activeSidebarTab,
    setActiveSidebarTab,
    folderOpen,
    setFolderOpen,
    currentLine,
    setCurrentLine,
    paletteOpen,
    setPaletteOpen,
    paletteQuery,
    setPaletteQuery,
    paletteIndex,
    setPaletteIndex,
    filteredPalette,
    openPalette,
    closePalette,
    togglePalette,
    handlePaletteSelect,
    menuOpen,
    setMenuOpen,
    executeMenuAction,
    terminalOpen,
    setTerminalOpen,
    terminalInput,
    setTerminalInput,
    terminalPath,
    terminalLines,
    terminalHistory,
    lastTerminalCommand,
    runTerminalCommand,
    showDino,
    setShowDino,
    showMatrix,
    setShowMatrix,
    activeBottomTab,
    setActiveBottomTab,
    chatOpen,
    setChatOpen,
    chatInput,
    setChatInput,
    chatLoading,
    chatMessages,
    chatBoost,
    setChatBoost,
    askCopilot,
    shortcutHelpOpen,
    setShortcutHelpOpen,
    windowState,
    handleWindowControl,
    emailCopied,
    copyEmailAddress,
    projectFilter,
    setProjectFilter,
    filteredProjects,
    selectedProject,
    setSelectedProject,
    recentCommits,
    recentCommitsLoading,
    githubRepoStars,
    githubOverview,
    githubStatsLoading,
    projectLanguageStats,
    projectLanguageLoading,
    contactForm,
    setContactForm,
    contactSubmitting,
    contactFeedback,
    submitContactForm,
    viewMode,
    setViewMode,
    toggleViewMode,
    editorRef,
    menuRef,
  };

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}
