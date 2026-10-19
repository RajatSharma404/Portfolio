import type { ThemeName } from "@/types/vscode";

export interface TerminalExecutionContext {
  activeThemeLabel: string;
  terminalPath: string;
  terminalHistory: string[];
  availableFiles: Array<{ id: string; name: string }>;
  projectTitles: string[];
}

export interface TerminalExecutionResult {
  lines?: string[];
  clear?: boolean;
  newPath?: string;
  newTheme?: ThemeName;
  toggleMatrix?: boolean;
  openDino?: boolean;
  openFileId?: string;
}

const VALID_THEMES: ThemeName[] = [
  "dracula",
  "darkplus",
  "monokai",
  "onedark",
  "solarized",
  "synthwave",
  "tokyonight",
  "githubdark",
];

const DIRECTORY_LISTINGS: Record<string, string[]> = {
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

export function executeTerminalCommand(
  raw: string,
  ctx: TerminalExecutionContext,
): TerminalExecutionResult {
  const command = raw.trim();
  const lower = command.toLowerCase();
  if (!command) return {};

  if (lower === "help") {
    return {
      lines: [
        "Available Commands:",
        "  neofetch      - Display system & developer specifications",
        "  matrix        - Toggle digital matrix rain effect",
        "  dsa / leetcode- Print 160+ algorithmic problem breakdown",
        "  skills        - Print technical competency matrix",
        "  projects      - List all flagship projects and ventures",
        "  theme <name>  - Switch theme (e.g. dracula, monokai, onedark, synthwave)",
        "  git <status|log|branch> - Git commands",
        "  whoami        - About developer & venture background",
        "  ls / cd / cat - File system navigation",
        "  contact       - Developer reach-out links",
        "  play          - Launch dino runner easter egg",
        "  clear         - Clear terminal buffer",
      ],
    };
  }

  if (lower === "neofetch") {
    return {
      lines: [
        "        /\\          rajat@portfolio",
        "       /  \\         ---------------",
        "      / /\\ \\        Role: Co-Founder @ Pradite | Full-Stack Systems Engineer",
        "     / /  \\ \\       OS: Next.js 16.2.3 (Turbopack App Router)",
        "    / / /\\ \\ \\      Host: Vercel Cloud Serverless (Edge Runtime)",
        "   / / /  \\ \\ \\     Shell: zsh 5.9 (x86_64-portfolio)",
        "  /_/ /    \\ \\_\\    Editor: VS Code Web IDE v1.98.0",
        "    \\ \\    / /      Languages: C++, TypeScript, Python, JavaScript, SQL",
        "     \\ \\  / /       LeetCode & GitHub: 160+ Solved",
        "      \\ \\/ /        Ventures: Pradite (https://pradite.com)",
        `       \\  /         Theme: ${ctx.activeThemeLabel}`,
        "        \\/          Memory: 4096MB / 8192MB Allocated",
      ],
    };
  }

  if (lower === "matrix") {
    return {
      toggleMatrix: true,
      lines: ["Toggling digital matrix stream... (type 'matrix' again to exit)"],
    };
  }

  if (lower.startsWith("theme ")) {
    const themeArg = lower.replace("theme ", "").trim().toLowerCase();
    if (VALID_THEMES.includes(themeArg as ThemeName)) {
      return {
        newTheme: themeArg as ThemeName,
        lines: [`✓ Theme switched to "${themeArg}"`],
      };
    }
    return {
      lines: [
        `Unknown theme: "${themeArg}". Valid options: ${VALID_THEMES.join(", ")}`,
      ],
    };
  }

  if (lower === "dsa" || lower === "leetcode") {
    return {
      lines: [
        "=========================================",
        "  LEETCODE PULSE: @RajatSharma404",
        "=========================================",
        "  Total Problems Solved : 160+",
        "  Easy                  : 85",
        "  Medium                : 65",
        "  Hard                  : 10+",
        "  Primary Language      : C++",
        "  Global Percentile     : Consistent Grind",
        "  Active Streak         : 100+ Days Badge Unlocked",
        "  Core Patterns         : DP, Graphs, Trees, Sliding Window",
        "=========================================",
      ],
    };
  }

  if (lower === "skills") {
    return {
      lines: [
        "Languages   : C++, TypeScript, JavaScript, Python, SQL, HTML5, CSS3",
        "Frameworks  : React 19, Next.js 16 (App Router), FastAPI, Node.js",
        "Systems & DB: WebAssembly (WASM), Web Workers, SQLite FTS5, PostgreSQL, Prisma",
        "AI & Tooling: Google Gemini API, Ollama Local Agents, Stockfish 17 WASM, Liveblocks",
        "Ventures    : Co-Founder @ Pradite (privacy-first AI developer tools)",
        "Design      : Tailwind CSS v4, Framer Motion, Vanilla CSS Tokens",
      ],
    };
  }

  if (lower === "contact") {
    return {
      lines: [
        "Venture  : https://pradite.com",
        "Email    : rajat.sharma.myid1@gmail.com",
        "LinkedIn : https://linkedin.com/in/rajat-sharma-9a053128b/",
        "GitHub   : https://github.com/RajatSharma404",
        "LeetCode : https://leetcode.com/u/RajatSharma404/",
        "X/Twitter: https://x.com/RajatSharma404",
      ],
    };
  }

  if (lower === "projects") {
    return {
      lines: [
        "Flagship Projects & Ventures:",
        "  1. Pradite (Venture)      - Privacy-first AI developer tools (pradite.com)",
        "  2. Ghost AI (Live)        - Sub-3s real-time AI architecture design platform",
        "  3. NotebookLM-lite (AI)   - Local-first research notebook with SQLite FTS5 RAG",
        "  4. DSA Tracker Mastery    - Spaced-repetition problem solver (17+ stars)",
        "  5. ChessEval (AI/WASM)    - Stockfish 17 WebAssembly chess evaluator",
        "  6. FitFlow (Fitness)      - Evidence-based RPG workout and progression system",
        "  7. Interactive Portfolio  - VS Code developer OS in Next.js 16 & React 19",
      ],
    };
  }

  if (lower === "git status") {
    return {
      lines: [
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "",
        "Tracking Repositories:",
        "  RajatSharma404/Portfolio        [main]",
        "  RajatSharma404/ghost-ai         [main]",
        "  RajatSharma404/NotebookLM-lite  [main]",
        "  RajatSharma404/DSA-Tracker      [main ★17]",
        "",
        "Working tree clean.",
      ],
    };
  }

  if (lower === "git log") {
    return {
      lines: [
        "commit e7a31b4 (HEAD -> main, origin/main)",
        "Author: Rajat Sharma <rajat.sharma.myid1@gmail.com>",
        "Date:   Sat Oct 17 2026",
        "",
        "    feat(portfolio): align with Pradite venture & flagship GitHub architecture",
        "",
        "commit a9f20c1",
        "Author: Rajat Sharma <rajat.sharma.myid1@gmail.com>",
        "Date:   Sat Oct 17 2026",
        "",
        "    feat(dsa): update 160+ questions pulse metrics & C++ patterns",
      ],
    };
  }

  if (lower === "git branch") {
    return {
      lines: [
        "* main",
        "  feature/pradite-integration",
        "  feature/ghost-ai-sync",
        "  hotfix/dsa-grind",
      ],
    };
  }

  if (lower.startsWith("sudo")) {
    return {
      lines: [
        "[sudo] password for rajat: **********",
        "Permission denied: Rajat is the only root administrator.",
      ],
    };
  }

  if (lower.startsWith("curl ")) {
    const url = command.replace(/curl /i, "").trim();
    return {
      lines: [
        "HTTP/1.1 200 OK",
        "Content-Type: application/json",
        "Server: Next.js/16.2.3",
        `{"status":"success","url":"${url}","data":{"author":"Rajat Sharma","venture":"Pradite"}}`,
      ],
    };
  }

  if (lower.startsWith("echo ")) {
    return {
      lines: [command.replace(/echo /i, "")],
    };
  }

  if (lower === "whoami") {
    return {
      lines: [
        "Rajat Sharma - Co-Founder @ Pradite | Full-Stack Systems & AI Engineer | B.Tech CSE @ KIT.",
      ],
    };
  }

  if (lower === "pwd") {
    return {
      lines: [ctx.terminalPath],
    };
  }

  if (lower === "date") {
    return {
      lines: [new Date().toString()],
    };
  }

  if (lower === "ls") {
    return {
      lines: DIRECTORY_LISTINGS[ctx.terminalPath] ?? DIRECTORY_LISTINGS["~/home"],
    };
  }

  if (lower.startsWith("cd ")) {
    const target = lower.replace("cd ", "").trim();
    const paths = ["~/home", "~/home/src", "~/home/public", "~/home/config"];
    const resolved =
      target === ".."
        ? ctx.terminalPath.split("/").slice(0, -1).join("/") || "~/home"
        : target.startsWith("~/")
          ? target
          : ctx.terminalPath === "~/home"
            ? `~/home/${target}`
            : `${ctx.terminalPath}/${target}`;

    if (paths.includes(resolved)) {
      return {
        newPath: resolved,
      };
    }
    return {
      lines: [`cd: no such file or directory: ${target}`],
    };
  }

  if (lower === "ls projects") {
    return {
      lines: ctx.projectTitles.map((title) => `- ${title}`),
    };
  }

  if (lower === "cat resume.pdf" || lower === "cat readme.md") {
    return {
      lines: [
        "Rajat Sharma: Co-Founder @ Pradite, full-stack systems engineer, 160+ algorithmic problems solved in C++.",
      ],
    };
  }

  if (lower === "cat package.json") {
    return {
      lines: [
        '{ "name": "rajat-portfolio", "version": "2.1.0", "framework": "Next.js 16 (Turbopack)" }',
      ],
    };
  }

  if (lower.startsWith("open ")) {
    const target = lower.replace("open ", "").trim();
    const mapped = ctx.availableFiles.find(
      (f) => f.name.toLowerCase() === target,
    );
    if (mapped) {
      return {
        openFileId: mapped.id,
        lines: [`Opened "${mapped.name}" in editor`],
      };
    }
    return {
      lines: [`open: cannot find file "${target}"`],
    };
  }

  if (lower.startsWith("cat ")) {
    const target = lower.replace("cat ", "").trim();
    return {
      lines: [
        `/* Content for ${target} preview: use "open ${target}" to view with full syntax highlighting. */`,
      ],
    };
  }

  if (lower === "play" || lower === "game" || lower === "dino") {
    return {
      openDino: true,
      lines: [
        "🕹️ Launching Dino Runner in bottom panel... Press [Space] or [ArrowUp] to jump!",
      ],
    };
  }

  if (lower === "clear") {
    return { clear: true };
  }

  return {
    lines: [
      `zsh: command not found: ${command}. Type "help" for a list of available commands.`,
    ],
  };
}
