import { NextResponse } from "next/server";
import { projectItems } from "@/content/site-data";

export const revalidate = 3600; // Cache on Vercel/Next.js edge for 1 hour

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "RajatSharma-Portfolio",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const [commitsRes, profileRes, reposRes] = await Promise.allSettled([
      fetch(
        "https://api.github.com/repos/RajatSharma404/Portfolio/commits?per_page=5",
        { headers, next: { revalidate: 3600 } },
      ),
      fetch("https://api.github.com/users/RajatSharma404", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        "https://api.github.com/users/RajatSharma404/repos?per_page=100&sort=updated",
        { headers, next: { revalidate: 3600 } },
      ),
    ]);

    // 1. Commits
    let recentCommits: Array<{ message: string; date: string; sha: string }> = [];
    if (commitsRes.status === "fulfilled" && commitsRes.value.ok) {
      const data = (await commitsRes.value.json()) as Array<{
        commit: { message: string; author: { date: string } };
        sha: string;
      }>;
      recentCommits = data.map((item) => ({
        message: item.commit.message.split("\n")[0],
        date: new Date(item.commit.author.date).toLocaleDateString(),
        sha: item.sha.slice(0, 7),
      }));
    }

    // 2. Stars & Profile Overview
    const starsByRepo: Record<string, number> = {};
    const githubOverview = {
      followers: 12,
      publicRepos: 18,
      following: 15,
      totalStars: 24,
    };

    if (profileRes.status === "fulfilled" && profileRes.value.ok) {
      const profile = (await profileRes.value.json()) as {
        followers: number;
        public_repos: number;
        following: number;
      };
      githubOverview.followers = profile.followers;
      githubOverview.publicRepos = profile.public_repos;
      githubOverview.following = profile.following;
    }

    if (reposRes.status === "fulfilled" && reposRes.value.ok) {
      const repos = (await reposRes.value.json()) as Array<{
        name: string;
        stargazers_count: number;
      }>;
      repos.forEach((repo) => {
        starsByRepo[repo.name.toLowerCase()] = repo.stargazers_count;
      });

      const featuredStars = projectItems.reduce((total, project) => {
        const repoName = project.github.split("/").pop()?.toLowerCase() ?? "";
        return total + (starsByRepo[repoName] ?? 0);
      }, 0);

      githubOverview.totalStars = featuredStars;
    }

    // 3. Project Languages
    const languageStatsPromises = projectItems.map(async (project) => {
      const urlParts = project.github.replace(/\/+$/, "").split("/");
      const repoName = urlParts.length >= 5 ? urlParts.pop() : null;

      if (!repoName || repoName.toLowerCase() === "rajatsharma404") {
        return {
          slug: project.slug,
          title: project.title,
          github: project.github,
          languages: {},
        };
      }

      try {
        const res = await fetch(
          `https://api.github.com/repos/RajatSharma404/${repoName}/languages`,
          { headers, next: { revalidate: 3600 } },
        );
        if (res.ok) {
          const languages = await res.json();
          return {
            slug: project.slug,
            title: project.title,
            github: project.github,
            languages,
          };
        }
      } catch {
        // Fallback to empty
      }

      return {
        slug: project.slug,
        title: project.title,
        github: project.github,
        languages: {},
      };
    });

    const projectLanguageStats = await Promise.all(languageStatsPromises);

    return NextResponse.json(
      {
        recentCommits,
        githubOverview,
        githubRepoStars: starsByRepo,
        projectLanguageStats,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Error aggregating GitHub stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch aggregated GitHub data" },
      { status: 500 },
    );
  }
}
