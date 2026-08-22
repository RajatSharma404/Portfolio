"use client";

import React, { useState, useMemo } from "react";
import { Download, Star, Search, ShieldCheck } from "lucide-react";
import { useWorkspace } from "@/context/workspace-context";

type ExtensionItem = {
  id: string;
  name: string;
  version: string;
  publisher: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  verified: boolean;
  relatedFile: string;
};

const baseExtensions: ExtensionItem[] = [
  {
    id: "ts-react",
    name: "TypeScript & React 19 Toolkit",
    version: "v19.2.4",
    publisher: "RajatSharma404",
    description: "Full-stack type-safe frontend engineering with React 19 hooks and state management.",
    category: "Frontend Framework",
    rating: 5.0,
    downloads: "15+ Apps",
    verified: true,
    relatedFile: "projects",
  },
  {
    id: "nextjs-16",
    name: "Next.js 16 Pro Extension",
    version: "v16.2.3",
    publisher: "RajatSharma404",
    description: "Turbopack, App Router, SSG/SSR generation, dynamic metadata, and API routes.",
    category: "Full Stack Web",
    rating: 5.0,
    downloads: "2.4k views",
    verified: true,
    relatedFile: "projects",
  },
  {
    id: "cpp-dsa",
    name: "C++ DSA Master Suite",
    version: "v2026.1",
    publisher: "RajatSharma404",
    description: "500+ LeetCode problems solved. Expertise in Graphs, Trees, DP, and Segment Trees.",
    category: "Algorithms",
    rating: 5.0,
    downloads: "500+ Solved",
    verified: true,
    relatedFile: "skills",
  },
  {
    id: "stockfish-ai",
    name: "Stockfish 16 Chess Engine AI",
    version: "v16.0.0",
    publisher: "RajatSharma404",
    description: "High-performance FastAPI Python backend with deep engine evaluations and real-time visual analysis.",
    category: "AI & Systems",
    rating: 4.9,
    downloads: "Engine Grade",
    verified: true,
    relatedFile: "projects",
  },
  {
    id: "gemini-ai",
    name: "Gemini AI Workflow Integrator",
    version: "v2.5",
    publisher: "RajatSharma404",
    description: "Intelligent workout routines, conversational Copilot assistants, and automated agents.",
    category: "Generative AI",
    rating: 5.0,
    downloads: "AI Powered",
    verified: true,
    relatedFile: "projects",
  },
  {
    id: "tailwind-motion",
    name: "Tailwind CSS v4 & Framer Motion",
    version: "v4.0.0",
    publisher: "RajatSharma404",
    description: "Glassmorphism design system, smooth spring animations, and multi-theme tokens.",
    category: "Styling & UI",
    rating: 5.0,
    downloads: "Production Ready",
    verified: true,
    relatedFile: "contact",
  },
];

export function ExtensionsPanel() {
  const { openFile } = useWorkspace();
  const [query, setQuery] = useState("");
  const [enabledState, setEnabledState] = useState<Record<string, boolean>>({
    "ts-react": true,
    "nextjs-16": true,
    "cpp-dsa": true,
    "stockfish-ai": true,
    "gemini-ai": true,
    "tailwind-motion": true,
  });

  const toggleExtension = (id: string) => {
    setEnabledState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filtered = useMemo(
    () =>
      baseExtensions.filter(
        (ext) =>
          ext.name.toLowerCase().includes(query.toLowerCase()) ||
          ext.description.toLowerCase().includes(query.toLowerCase()) ||
          ext.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="flex h-full flex-col text-xs text-[#cccccc] select-none">
      {/* Search Bar */}
      <div className="p-3 border-b border-white/10 bg-[#1e1e1e]">
        <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5 focus-within:border-cyan-400/60 transition-colors">
          <Search size={13} className="text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Extensions in Marketplace..."
            className="w-full border-none bg-transparent text-xs text-white placeholder:text-white/40 outline-none font-sans"
          />
        </div>
      </div>

      {/* Extensions List */}
      <div className="scroll-thin flex-1 overflow-y-auto p-2 space-y-2">
        <p className="px-2 pt-1 text-[10px] uppercase font-bold tracking-wider text-(--text-muted)">
          Installed ({filtered.length})
        </p>

        {filtered.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-(--text-muted)">
            No extensions found matching &ldquo;{query}&rdquo;.
          </p>
        ) : (
          filtered.map((ext) => {
            const isEnabled = enabledState[ext.id] ?? true;

            return (
              <div
                key={ext.id}
                onClick={() => openFile(ext.relatedFile)}
                className="group rounded-xl border border-white/5 bg-white/3 p-2.5 hover:bg-white/7 hover:border-white/15 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {ext.name}
                      </h4>
                      {ext.verified && (
                        <span title="Verified Developer Extension">
                          <ShieldCheck
                            size={13}
                            className="text-cyan-400"
                          />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[10px] text-white/50 font-mono">
                      {ext.publisher} • {ext.version}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExtension(ext.id);
                    }}
                    className={`rounded px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                      isEnabled
                        ? "bg-white/10 text-emerald-300 hover:bg-emerald-500/20"
                        : "bg-red-500/10 text-red-300 hover:bg-red-500/20"
                    }`}
                  >
                    {isEnabled ? "Enabled" : "Disabled"}
                  </button>
                </div>

                <p className="mt-1.5 text-[11px] text-[#a0aab8] line-clamp-2 leading-relaxed font-sans">
                  {ext.description}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[10px] text-white/60 font-mono pt-1.5 border-t border-white/5">
                  <span className="flex items-center gap-1 text-amber-300">
                    <Star size={11} className="fill-amber-300" />
                    <span>{ext.rating.toFixed(1)}</span>
                  </span>
                  <span className="flex items-center gap-1 text-cyan-200">
                    <Download size={11} />
                    <span>{ext.downloads}</span>
                  </span>
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-white/70 font-sans">
                    {ext.category}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
