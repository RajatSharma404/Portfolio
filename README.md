# 💻 Rajat Sharma | Interactive VS Code Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.38-FF0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![LeetCode](https://img.shields.io/badge/LeetCode-500+_Solved-FFA116?style=for-the-badge&logo=leetcode)](https://leetcode.com/u/RajatSharma404/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://portfolio-chi-self-31.vercel.app/)

> An authentic, feature-packed **VS Code IDE-themed developer portfolio** engineered with Next.js 16, React 19, and Tailwind CSS v4. It features a complete desktop workspace layout with multi-panel sidebars, a dual code/preview split engine, an interactive terminal CLI with easter eggs, real-time GitHub & LeetCode telemetry, and Web Audio API haptics.

---

## 🌐 Live Application

* **Production URL:** [https://portfolio-chi-self-31.vercel.app/](https://portfolio-chi-self-31.vercel.app/)
* **Developer:** **Rajat Sharma** (B.Tech Computer Science, Kanpur Institute of Technology)
* **Status:** 🚀 Production Ready & Actively Maintained

---

## ✨ Key Features & Architecture Breakdown

### 1. 🖥️ Dual View Engine & Split Mode
* **`[ 👁️ Preview ]`**: High-engagement interactive UI views (Hero, About, Projects Grid, Skills, Experience, Contact Form).
* **`[ </> Code ]`**: Syntax-highlighted source code with real line numbers, hover illumination, and a 1-click **"Copy Code"** button.
* **`[ ◫ Split View ]`**: Side-by-side view (screens ≥ 1024px) presenting the raw TypeScript/React source on the left and the rendered interactive UI on the right simultaneously.
* **🧭 Breadcrumbs Bar**: Displays hierarchical file structure (`portfolio > src > [file] > [exported symbol]`) with custom extension badges.

---

### 2. 📂 Interactive Multi-Panel Sidebar & Activity Bar
* **📁 File Explorer**: Accordion tree (`src/`, `public/`, `config/`) with accurate color-coded badges (`TSX`, `HTML`, `JS`, `JSON`, `TS`, `CSS`, `MD`, `{}`).
* **🔍 Global Workspace Search**: Instant full-text search across all 8 files with match counts, collapsible file groups, and click-to-line navigation.
* **🌿 Source Control (Git)**: Branch switcher (`main`, `feature/ai-copilot`, `hotfix/dsa-grind`), staged changes list, simulated "Commit & Push", and live GitHub commit history.
* **🧩 Extensions Marketplace**: Rajat's core proficiencies packaged as VS Code extensions (React 19, Next.js 16, C++ DSA, Stockfish AI, Tailwind, Gemini AI) with ratings, downloads, and search.

---

### 3. ⚡ LeetCode Pulse & DSA Mastery Card
* **Concentric SVG Donut Rings**: Visual circular difficulty rings for Easy (220 solved), Medium (250 solved), and Hard (30+ solved).
* **500+ Solved Center**: Glowing focal point displaying Top 10% global ranking and C++ primary badge.
* **Topic Mastery Clusters**: Problem counts and progress meters for:
  - *Dynamic Programming & Recursion* (90+ solved · 0/1 Knapsack, LCS, Grid DP)
  - *Trees & Binary Search* (80+ solved · Segment Trees, Trie, LCA)
  - *Graphs & BFS/DFS* (75+ solved · Dijkstra, Topological Sort, Union-Find)
  - *Arrays & Sliding Window* (120+ solved · Two Pointers, Kadane's)
  - *Heaps & Monotonic Queues* (50+ solved)
  - *Backtracking & Greedy* (45+ solved)
* **Skills Sub-Tabs**: Instant toggling between the **LeetCode & DSA Pulse (500+)** and the live **GitHub Code Language Map** SVG donut.

---

### 4. 💻 5-Tab Integrated Bottom Panel & Interactive CLI
* **`TERMINAL`**: Rich shell emulator with command history traversal (`ArrowUp` / `ArrowDown`) and tab auto-completion (`Tab`).
* **`PROBLEMS (0)`**: Diagnostic health view confirming 0 TypeScript errors, 0 ESLint warnings, and WCAG AA accessibility compliance.
* **`OUTPUT`**: Next.js 16 Turbopack live stream and fast-refresh logs.
* **`DEBUG CONSOLE`**: Live JavaScript REPL evaluator for testing code snippets and expressions directly in the browser.
* **`PORTS (1)`**: Forwarded ports table displaying active `localhost:3000` listener and production `portfolio-chi-self-31.vercel.app` target.

#### ⌨️ Terminal Command Suite
| Command | Description |
| :--- | :--- |
| `neofetch` | Displays ASCII developer specs (OS, Host, Shell, LeetCode, Theme, Memory) |
| `matrix` | Toggles animated raining digital green matrix stream |
| `dsa` / `leetcode` | Prints formatted 500+ problem difficulty and pattern metrics |
| `skills` | Prints full-stack competency matrix |
| `theme <name>` | Switches theme directly from the CLI (`theme synthwave`, `theme monokai`, etc.) |
| `git status` | Displays working tree & staged changes status |
| `git log` | Prints recent commit history |
| `git branch` | Lists available local and feature branches |
| `whoami` | Developer identity and summary |
| `ls [path]` | Lists files in virtual file system |
| `cd <path>` | Navigates virtual file directories |
| `cat <file>` | Prints file contents |
| `open <file>` | Opens any workspace file in the editor |
| `play` | Launches embedded Dino runner easter egg game |
| `contact` | Displays developer reach-out links |
| `sudo` | Humorous permission denial easter egg |
| `clear` | Clears terminal log buffer |

---

### 5. 🎨 8 Iconic Visual Themes
Switch themes anytime via the TitleBar dropdown, command palette (`Ctrl+Shift+P`), or terminal CLI:
1. **Dracula** (`#bd93f9` accent)
2. **Dark+** (Classic VS Code Dark `#007acc`)
3. **Monokai** (`#fd971f` vibrant amber)
4. **One Dark Pro** (`#61afef` Atom blue)
5. **Solarized Dark** (`#2aa198` teal)
6. **SynthWave '84** (`#ff7edb` neon retro glow)
7. **Tokyo Night** (`#7aa2f7` navy & purple)
8. **GitHub Dark** (`#58a6ff` slate blue)

---

### 6. 🔊 Web Audio API Haptics Engine
* Pure zero-latency browser-synthesized audio:
  - Mechanical switch click on tab, file, or theme changes.
  - Ascending 3-tone harmonic chime (`C5` → `E5` → `G5`) on contact submission or code copy.
* **Status Bar Toggle**: `🔊 Sound: ON` / `🔇 Sound: OFF` quick toggle with `localStorage` persistence.

---

### 7. 🤖 Portfolio-Aware Copilot AI
* Built-in streaming conversational drawer powered by Next.js API routes (`/api/copilot`).
* Recruiter-focused prompt engineering for instant answers regarding Rajat's stack, projects, internship availability, and DSA accomplishments.

---

## 📂 Project Structure

```
d:\Portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts      # Contact form submission API with anti-spam
│   │   │   └── copilot/route.ts      # Streaming Copilot assistant API
│   │   ├── projects/
│   │   │   ├── page.tsx              # Standalone projects index route
│   │   │   └── [slug]/page.tsx       # Dynamic project detail routes with SSG
│   │   ├── globals.css               # Design tokens, themes & typography
│   │   ├── layout.tsx                # Root layout, fonts & metadata
│   │   └── page.tsx                  # Modular IDE shell orchestrator
│   │
│   ├── components/
│   │   ├── sections/                 # Content views for workspace files
│   │   │   ├── home-section.tsx      # home.tsx view (Hero & metrics)
│   │   │   ├── about-section.tsx     # about.html view (Bio & GitHub pulse)
│   │   │   ├── projects-section.tsx  # projects.js view (Category filter & cards)
│   │   │   ├── skills-section.tsx    # skills.json view (Dual-tab DSA + Language map)
│   │   │   ├── leetcode-pulse.tsx    # LeetCode 500+ concentric rings & clusters
│   │   │   ├── experience-section.tsx# experience.ts view (Timeline nodes)
│   │   │   ├── contact-section.tsx   # contact.css view (Direct message API form)
│   │   │   ├── readme-section.tsx    # README.md formatted documentation view
│   │   │   └── package-section.tsx   # package.json tokenized syntax view
│   │   │
│   │   ├── vscode/                   # VS Code IDE Shell Components
│   │   │   ├── title-bar.tsx         # Traffic lights, search bar & theme dropdown
│   │   │   ├── menu-bar.tsx          # Top desktop menu strip
│   │   │   ├── activity-bar.tsx      # Left vertical tool strip
│   │   │   ├── status-bar.tsx        # Bottom branch, diagnostics & sound toggle
│   │   │   ├── command-palette.tsx   # Fuzzy file & action search overlay
│   │   │   ├── shortcuts-modal.tsx   # Keyboard shortcuts cheat sheet
│   │   │   ├── project-modal.tsx     # Project detail modal dialog
│   │   │   ├── sidebar/
│   │   │   │   ├── explorer-panel.tsx# Unified sidebar container
│   │   │   │   ├── search-panel.tsx  # Global full-text search
│   │   │   │   ├── git-panel.tsx     # Branch selector & live GitHub commits
│   │   │   │   └── extensions-panel.tsx # Extensions marketplace
│   │   │   ├── editor/
│   │   │   │   ├── tab-bar.tsx       # File tabs & View Mode switcher
│   │   │   │   ├── breadcrumbs.tsx   # Hierarchical path bar
│   │   │   │   └── code-viewer.tsx   # Syntax-highlighted code inspector
│   │   │   ├── terminal/
│   │   │   │   └── terminal-panel.tsx# 5-tab bottom developer drawer
│   │   │   └── copilot/
│   │   │       └── copilot-chat.tsx  # Streaming AI assistant drawer
│   │   │
│   │   ├── dino-game.tsx             # Dino runner game easter egg
│   │   └── language-skill-chart.tsx  # Interactive SVG donut language chart
│   │
│   ├── context/
│   │   └── workspace-context.tsx     # Centralized React Context state management
│   │
│   ├── content/
│   │   ├── site-data.ts              # CMS-like data model for projects & profile
│   │   └── code-raw-content.ts       # Raw source code schemas for Code View
│   │
│   ├── lib/
│   │   └── sound-effects.ts          # Web Audio API sound synthesis engine
│   │
│   └── types/
│       └── vscode.ts                 # Shared TypeScript interfaces & types
│
├── public/
│   ├── resume.pdf                    # Downloadable PDF resume
│   └── og-image.png                  # Social share card
│
├── package.json                      # Project manifest & dependencies
└── README.md                         # Project documentation
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>P</kbd> | Open Command Palette / File Quick Open |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd> | Toggle Left Sidebar |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>`</kbd> | Toggle Bottom Terminal Drawer |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> | Open Color Theme Dropdown |
| <kbd>?</kbd> | Show Keyboard Shortcuts Cheat Sheet (when not in inputs) |
| <kbd>Esc</kbd> | Close any active modal, palette, or menu overlay |
| <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> | Cycle through terminal command history |
| <kbd>Tab</kbd> | Auto-complete command name in terminal |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v20.0.0` or higher
* **npm**: `v10.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RajatSharma404/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

5. **Run ESLint quality checks:**
   ```bash
   npm run lint
   ```

---

## 📬 Contact & Connect

* **Email:** [rajat.sharma.myid1@gmail.com](mailto:rajat.sharma.myid1@gmail.com)
* **LinkedIn:** [linkedin.com/in/rajat-sharma-9a053128b](https://www.linkedin.com/in/rajat-sharma-9a053128b/)
* **GitHub:** [github.com/RajatSharma404](https://github.com/RajatSharma404)
* **LeetCode:** [leetcode.com/u/RajatSharma404](https://leetcode.com/u/RajatSharma404/)
* **Portfolio:** [portfolio-chi-self-31.vercel.app](https://portfolio-chi-self-31.vercel.app/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
