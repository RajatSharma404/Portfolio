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
        "  dsa / leetcode- Print 500+ LeetCode problem breakdown",
        "  skills        - Print technical competency matrix",
        "  theme <name>  - Switch theme (e.g. dracula, monokai, onedark, synthwave)",
        "  git <status|log|branch> - Git commands",
        "  whoami        - About developer",
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
        "      / /\\ \\        OS: Next.js 16.2.3 (Turbopack App Router)",
        "     / /  \\ \\       Host: Vercel Cloud Serverless (Edge Runtime)",
        "    / / /\\ \\ \\      Uptime: 24/7 Always Active",
        "   / / /  \\ \\ \\     Shell: zsh 5.9 (x86_64-portfolio)",
        "  /_/ /    \\ \\_\\    Editor: VS Code Web IDE v1.98.0",
        "    \\ \\    / /      Languages: C++, TypeScript, Python, JavaScript",
        "     \\ \\  / /       LeetCode: 500+ Solved (Top 10% Global Rank)",
        "      \\ \\/ /        Primary Focus: Full-Stack Web & AI Tooling",
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
        "  Total Problems Solved : 500+",
        "  Easy                  : 220",
        "  Medium                : 250",
        "  Hard                  : 30+",
        "  Primary Language      : C++",
        "  Global Percentile     : Top 10%",
        "  Active Streak         : 100+ Days Badge Unlocked",
        "  Core Patterns         : DP, Graphs, Trees, Sliding Window",
        "=========================================",
      ],
    };
  }

  if (lower === "skills") {
    return {
      lines: [
        "Core Languages : C++, TypeScript, JavaScript, Python, HTML5, CSS3",
        "Frameworks     : React 19, Next.js 16, FastAPI, Node.js, Express",
        "Databases      : PostgreSQL, SQLite, Prisma ORM",
        "AI & Tooling   : Stockfish 16 Engine, Google Gemini AI, Git",
        "Design Systems : Tailwind CSS v4, Framer Motion, Vanilla CSS",
      ],
    };
  }

  if (lower === "contact") {
    return {
      lines: [
        "Email    : rajat.sharma.myid1@gmail.com",
        "LinkedIn : https://linkedin.com/in/rajat-sharma-9a053128b/",
        "GitHub   : https://github.com/RajatSharma404",
        "LeetCode : https://leetcode.com/u/RajatSharma404/",
      ],
    };
  }

  if (lower === "git status") {
    return {
      lines: [
        "On branch main",
        "Your branch is up to date with 'origin/main'.",
        "",
        "Changes to be committed:",
        "  modified:   src/projects/chess-engine.ts",
        "  modified:   src/skills/leetcode-pulse.json",
        "  new file:   src/components/vscode/terminal-panel.tsx",
      ],
    };
  }

  if (lower === "git log") {
    return {
      lines: [
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
      ],
    };
  }

  if (lower === "git branch") {
    return {
      lines: [
        "* main",
        "  feature/ai-copilot",
        "  hotfix/dsa-grind",
        "  chore/clean-architecture",
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
        `{"status":"success","url":"${url}","data":{"author":"Rajat Sharma"}}`,
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
        "Rajat Sharma - Full Stack Developer | B.Tech student at Kanpur Institute of Technology.",
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
        "Resume Summary: Web development, AI projects, 500+ DSA problems solved, internship-ready.",
      ],
    };
  }

  if (lower === "cat package.json") {
    return {
      lines: [
        '{ "name": "rajat-portfolio", "version": "2.0.0", "framework": "Next.js 16" }',
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
      };
    }
    return {
      lines: [`open: cannot find ${target}`],
    };
  }

  if (lower === "history") {
    return {
      lines: ctx.terminalHistory.map((entry, idx) => `${idx + 1}  ${entry}`),
    };
  }

  if (lower === "play") {
    return {
      openDino: true,
      lines: ["Launching dino game..."],
    };
  }

  if (lower === "clear") {
    return {
      clear: true,
    };
  }

  return {
    lines: [
      `Command not found: "${command}". Type "help" for a list of commands.`,
    ],
  };
}
