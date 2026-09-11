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
import type { SoundPreset } from "@/lib/sound-effects";
import { useGitHubData } from "@/hooks/use-github-data";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { executeTerminalCommand } from "@/lib/terminal-commands";

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
  { value: "synthwave", label: "SynthWave '84", dot: "#ff7edb" },
  { value: "tokyonight", label: "Tokyo Night", dot: "#7aa2f7" },
  { value: "githubdark", label: "GitHub Dark", dot: "#58a6ff" },
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
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: () => void;
  soundPreset: SoundPreset;
  setSoundPreset: (preset: SoundPreset) => void;
  cycleSoundPreset: () => void;
  volume: number;
  setVolume: (vol: number) => void;
  playSound: (type: "click" | "success" | "pop") => void;
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

  const {
    recentCommits,
    recentCommitsLoading,
    githubRepoStars,
    githubOverview,
    githubStatsLoading,
    projectLanguageStats,
    projectLanguageLoading,
  } = useGitHubData();

  const {
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    soundPreset,
    setSoundPreset,
    cycleSoundPreset,
    volume,
    setVolume,
    playSound,
  } = useSoundEffects();

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



  const copyEmailAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("rajat.sharma.myid1@gmail.com");
      setEmailCopied(true);
      playSound("success");
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Gracefully ignore in restricted environments
    }
  }, [playSound]);

  const openFile = useCallback(
    (id: string) => {
      setActiveFile(id);
      setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
      playSound("click");
    },
    [playSound],
  );

  const closeTab = useCallback(
    (id: string) => {
      playSound("click");
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
    [activeFile, playSound],
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

  const handleWindowControl = useCallback(
    (action: "close" | "minimize" | "maximize") => {
      if (action === "close") {
        setWindowState("closed");
        return;
      }
      if (action === "minimize") {
        setWindowState("minimized");
        return;
      }
      setWindowState((prev) => (prev === "maximized" ? "normal" : "maximized"));
    },
    [],
  );

  const runTerminalCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      setTerminalHistory((prev) => [...prev, raw]);
      setLastTerminalCommand(raw);
      setTerminalLines((prev) => [...prev, `$ ${raw}`]);

      const result = executeTerminalCommand(raw, {
        activeThemeLabel,
        terminalPath,
        terminalHistory,
        availableFiles: files,
        projectTitles: projectItems.map((p) => p.title),
      });

      if (result.clear) {
        setTerminalLines([]);
        return;
      }

      if (result.newPath) {
        setTerminalPath(result.newPath);
      }

      if (result.newTheme) {
        setTheme(result.newTheme);
      }

      if (result.toggleMatrix) {
        setShowMatrix((prev) => !prev);
      }

      if (result.openDino) {
        setShowDino(true);
      }

      if (result.openFileId) {
        openFile(result.openFileId);
      }

      if (result.lines && result.lines.length > 0) {
        setTerminalLines((prev) => [...prev, ...result.lines!]);
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

      try {
        const res = await fetch("/api/copilot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });

        const fullAnswer = await res.text();
        setChatMessages((prev) => [...prev, { role: "assistant", text: "" }]);

        // Smooth client-side typewriter effect (zero serverless hold time)
        let index = 0;
        const stepSize = Math.max(3, Math.floor(fullAnswer.length / 28));
        await new Promise<void>((resolve) => {
          const timer = setInterval(() => {
            index += stepSize;
            if (index >= fullAnswer.length) {
              clearInterval(timer);
              setChatMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", text: fullAnswer };
                return next;
              });
              resolve();
            } else {
              const currentSlice = fullAnswer.slice(0, index);
              setChatMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { role: "assistant", text: currentSlice };
                return next;
              });
            }
          }, 18);
        });
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

  const submitContactForm = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
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
    },
    [contactForm, contactSubmitting],
  );

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
      const isModifier = event.ctrlKey || event.metaKey;
      const targetTag = (event.target as HTMLElement)?.tagName;
      const isInputFocused =
        targetTag === "INPUT" ||
        targetTag === "TEXTAREA" ||
        targetTag === "SELECT" ||
        (event.target as HTMLElement)?.isContentEditable;

      if (isModifier && event.key.toLowerCase() === "p" && !event.shiftKey) {
        event.preventDefault();
        togglePalette();
        return;
      }
      if (isModifier && event.key === "`") {
        event.preventDefault();
        setTerminalOpen((prev) => !prev);
        return;
      }
      if (isModifier && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setSidebarOpen((prev) => !prev);
        return;
      }
      if (isModifier && event.shiftKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setThemePickerOpen((prev) => !prev);
        return;
      }
      if (event.key === "?" && !paletteOpen && !isInputFocused) {
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



  const value = useMemo(
    () => ({
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
      soundEnabled,
      setSoundEnabled,
      toggleSound,
      soundPreset,
      setSoundPreset,
      cycleSoundPreset,
      volume,
      setVolume,
      playSound,
      editorRef,
      menuRef,
    }),
    [
      theme,
      setTheme,
      activeThemeLabel,
      themeDotColor,
      themePickerOpen,
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
      currentLine,
      paletteOpen,
      paletteQuery,
      paletteIndex,
      filteredPalette,
      openPalette,
      closePalette,
      togglePalette,
      handlePaletteSelect,
      menuOpen,
      executeMenuAction,
      terminalOpen,
      terminalInput,
      terminalPath,
      terminalLines,
      terminalHistory,
      lastTerminalCommand,
      runTerminalCommand,
      showDino,
      showMatrix,
      activeBottomTab,
      chatOpen,
      chatInput,
      chatLoading,
      chatMessages,
      chatBoost,
      askCopilot,
      shortcutHelpOpen,
      windowState,
      handleWindowControl,
      emailCopied,
      copyEmailAddress,
      projectFilter,
      filteredProjects,
      selectedProject,
      recentCommits,
      recentCommitsLoading,
      githubRepoStars,
      githubOverview,
      githubStatsLoading,
      projectLanguageStats,
      projectLanguageLoading,
      contactForm,
      contactSubmitting,
      contactFeedback,
      submitContactForm,
      viewMode,
      setViewMode,
      toggleViewMode,
      soundEnabled,
      setSoundEnabled,
      toggleSound,
      soundPreset,
      setSoundPreset,
      cycleSoundPreset,
      volume,
      setVolume,
      playSound,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}
