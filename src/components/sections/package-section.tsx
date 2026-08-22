"use client";

import React from "react";
import type { Token } from "@/types/vscode";

export function PackageSection() {
  const tokenClass: Record<Token["type"], string> = {
    kw: "text-(--keyword)",
    str: "text-(--string)",
    com: "text-(--comment)",
    fn: "text-(--function)",
    num: "text-(--number)",
    plain: "text-(--text-main)",
  };

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
        text: '    "languages": ["C++", "Java", "Python", "JavaScript", "TypeScript"],',
        type: "str",
      },
    ],
    [
      {
        text: '    "frameworks": ["React", "Next.js", "FastAPI", "Express", "Node.js"],',
        type: "str",
      },
    ],
    [{ text: '    "databases": ["PostgreSQL", "SQLite", "Prisma"],', type: "str" }],
    [{ text: '    "tools": ["Git", "Tailwind CSS", "Framer Motion", "Docker"]', type: "str" }],
    [{ text: "  },", type: "plain" }],
    [
      {
        text: '  "interests": ["AI/ML Agents", "Full-Stack Web", "DSA", "Open Source"],',
        type: "str",
      },
    ],
    [
      {
        text: '  "available_for": "Internships, Collaborations, and Engineering Roles",',
        type: "str",
      },
    ],
    [{ text: '  "license": "MIT"', type: "str" }],
    [{ text: "}", type: "plain" }],
  ];

  return (
    <div className="p-6 font-mono text-xs md:text-sm bg-(--bg-main) min-h-full">
      <div className="rounded-xl bg-black/20 border border-white/5 p-4 space-y-1">
        {packageLines.map((line, lineIdx) => (
          <div
            key={`pkg-${lineIdx + 1}`}
            className="flex items-start gap-4 py-0.5 hover:bg-white/5 rounded px-2"
          >
            <span className="w-6 select-none text-right text-(--text-muted) text-xs">
              {lineIdx + 1}
            </span>
            <span className="flex-1 whitespace-pre-wrap">
              {line.map((token, tokenIdx) => (
                <span
                  key={`token-${lineIdx}-${tokenIdx}`}
                  className={tokenClass[token.type]}
                >
                  {token.text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
