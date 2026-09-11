"use client";

import { useEffect, useState } from "react";
import type { GitHubCommit, GitHubOverview } from "@/types/vscode";
import type { ProjectLanguageRepoStats } from "@/components/language-skill-chart";

export interface GitHubDataState {
  recentCommits: GitHubCommit[];
  recentCommitsLoading: boolean;
  githubRepoStars: Record<string, number>;
  githubOverview: GitHubOverview | null;
  githubStatsLoading: boolean;
  projectLanguageStats: ProjectLanguageRepoStats[];
  projectLanguageLoading: boolean;
}

export function useGitHubData(): GitHubDataState {
  const [recentCommits, setRecentCommits] = useState<GitHubCommit[]>([]);
  const [recentCommitsLoading, setRecentCommitsLoading] = useState(true);
  const [githubRepoStars, setGithubRepoStars] = useState<Record<string, number>>({});
  const [githubOverview, setGithubOverview] = useState<GitHubOverview | null>(null);
  const [githubStatsLoading, setGithubStatsLoading] = useState(true);
  const [projectLanguageStats, setProjectLanguageStats] = useState<ProjectLanguageRepoStats[]>([]);
  const [projectLanguageLoading, setProjectLanguageLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      setRecentCommitsLoading(true);
      setGithubStatsLoading(true);
      setProjectLanguageLoading(true);

      try {
        const res = await fetch("/api/github");
        if (!res.ok) throw new Error("Failed to load GitHub data");
        const data = await res.json();
        if (!isMounted) return;

        if (data.recentCommits) setRecentCommits(data.recentCommits);
        if (data.githubOverview) setGithubOverview(data.githubOverview);
        if (data.githubRepoStars) setGithubRepoStars(data.githubRepoStars);
        if (data.projectLanguageStats) setProjectLanguageStats(data.projectLanguageStats);
      } catch {
        // Graceful fallback when rate limited or offline
      } finally {
        if (isMounted) {
          setRecentCommitsLoading(false);
          setGithubStatsLoading(false);
          setProjectLanguageLoading(false);
        }
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    recentCommits,
    recentCommitsLoading,
    githubRepoStars,
    githubOverview,
    githubStatsLoading,
    projectLanguageStats,
    projectLanguageLoading,
  };
}
