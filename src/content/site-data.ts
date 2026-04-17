export type ProjectCategory = "Web" | "Productivity" | "Finance" | "AI";

export type ProjectItem = {
  slug: string;
  title: string;
  description: string;
  impact: string;
  stack: string[];
  github: string;
  live: string;
  category: ProjectCategory;
  highlights: string[];
  featured: boolean;
};

export const projectItems: ProjectItem[] = [
  {
    slug: "dsa-tracker",
    title: "DSA Tracker",
    description:
      "Practice dashboard and progress tracker for DSA problem solving.",
    impact:
      "Tracks solved problems by topic so revision and weak-area review stay organized.",
    stack: ["TypeScript", "React", "Tracking"],
    github: "https://github.com/RajatSharma404/DSA-Tracker",
    live: "https://github.com/RajatSharma404/DSA-Tracker",
    category: "Productivity",
    highlights: [
      "Topic-wise tracking and revision flow",
      "Progress-first dashboard UX",
      "Built for daily consistency",
    ],
    featured: true,
  },
  {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description:
      "Track and visualize daily expenses with clean TypeScript workflows.",
    impact:
      "Turns daily spending into a clearer category-by-category budgeting habit.",
    stack: ["TypeScript", "Finance", "UI"],
    github: "https://github.com/RajatSharma404/expense-tracker",
    live: "https://github.com/RajatSharma404/expense-tracker",
    category: "Finance",
    highlights: [
      "Category-first expense logging",
      "Budget clarity and spending trends",
      "Simple day-to-day workflow",
    ],
    featured: true,
  },
  {
    slug: "weather-forecast-app",
    title: "Weather Forecast App",
    description:
      "Weather dashboard with intuitive forecasts and city-based lookup.",
    impact:
      "Makes city search and short-range weather checks faster for everyday use.",
    stack: ["JavaScript", "API", "Frontend"],
    github: "https://github.com/RajatSharma404/weather-forecast-app",
    live: "https://github.com/RajatSharma404/weather-forecast-app",
    category: "Web",
    highlights: [
      "Fast city lookup experience",
      "Readable short-range forecast UI",
      "API-driven live weather data",
    ],
    featured: true,
  },
  {
    slug: "finance-track",
    title: "Finance Track",
    description:
      "Personal finance and tracking workflow project built in TypeScript.",
    impact:
      "Helps structure budgets, recurring expenses, and personal finance routines.",
    stack: ["TypeScript", "Tracker", "Dashboard"],
    github: "https://github.com/RajatSharma404/Finance_track",
    live: "https://github.com/RajatSharma404/Finance_track",
    category: "Finance",
    highlights: [
      "Recurring-expense aware structure",
      "Planning and review friendly design",
      "Built for personal finance discipline",
    ],
    featured: true,
  },
];

export const siteMeta = {
  deployedOn: "Vercel",
  lastUpdated: "2026-04-17",
};
