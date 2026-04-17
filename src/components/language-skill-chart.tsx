"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

export type ProjectLanguageRepoStats = Readonly<{
  slug: string;
  title: string;
  github: string;
  languages: Readonly<Record<string, number>>;
}>;

export type LanguageSkillChartProps = Readonly<{
  repos: readonly ProjectLanguageRepoStats[];
  loading: boolean;
}>;

type LanguageSlice = {
  name: string;
  bytes: number;
  share: number;
  color: string;
  projectCount: number;
};

type SliceLayout = LanguageSlice & {
  startAngle: number;
  endAngle: number;
  midAngle: number;
};

const MIN_VISIBLE_SLICE_PERCENT = 3;

const colorPalette = [
  "#38bdf8",
  "#a855f7",
  "#f97316",
  "#22c55e",
  "#facc15",
  "#f472b6",
  "#06b6d4",
  "#fb7185",
  "#60a5fa",
];

const knownLanguageColors: Record<string, string> = {
  TypeScript: "#38bdf8",
  JavaScript: "#facc15",
  CSS: "#8b5cf6",
  HTML: "#f97316",
  PowerShell: "#22c55e",
  Shell: "#14b8a6",
  Batchfile: "#f472b6",
  Python: "#60a5fa",
  Other: "#6b7280",
};

function hashToPaletteIndex(name: string) {
  let hash = 0;
  for (let index = 0; index < name.length; index += 1) {
    hash = (hash << 5) - hash + name.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash) % colorPalette.length;
}

function getLanguageColor(name: string) {
  return knownLanguageColors[name] ?? colorPalette[hashToPaletteIndex(name)];
}

function polarToCartesian(radius: number, angleInDegrees: number) {
  const radians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: radius * Math.cos(radians),
    y: radius * Math.sin(radians),
  };
}

function buildSlicePath(startAngle: number, endAngle: number, radius: number) {
  const start = polarToCartesian(radius, endAngle);
  const end = polarToCartesian(radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    "M 0 0",
    `L ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
    "Z",
  ].join(" ");
}

function formatBytes(bytes: number) {
  if (bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes.toLocaleString()} B`;
  const kib = bytes / 1024;
  if (kib < 1024) return `${kib.toFixed(kib >= 10 ? 0 : 1)} KB`;
  const mib = kib / 1024;
  return `${mib.toFixed(mib >= 10 ? 0 : 1)} MB`;
}

export function LanguageSkillChart({
  repos,
  loading,
}: Readonly<LanguageSkillChartProps>) {
  const reducedMotion = useReducedMotion();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);

  const slices = useMemo(() => {
    const totals = new Map<string, number>();
    const projectCounts = new Map<string, number>();

    repos.forEach((repo) => {
      Object.entries(repo.languages).forEach(([language, bytes]) => {
        totals.set(language, (totals.get(language) ?? 0) + bytes);
        projectCounts.set(language, (projectCounts.get(language) ?? 0) + 1);
      });
    });

    const grandTotal = [...totals.values()].reduce(
      (sum, value) => sum + value,
      0,
    );
    const raw = [...totals.entries()]
      .sort((left, right) => right[1] - left[1])
      .map(([name, bytes]) => ({
        name,
        bytes,
        share: grandTotal > 0 ? (bytes / grandTotal) * 100 : 0,
        color: getLanguageColor(name),
        projectCount: projectCounts.get(name) ?? 0,
      }));

    const major = raw.filter(
      (slice) => slice.share >= MIN_VISIBLE_SLICE_PERCENT,
    );
    const minor = raw.filter(
      (slice) => slice.share < MIN_VISIBLE_SLICE_PERCENT,
    );

    const otherLanguages = new Set<string>();
    const list: LanguageSlice[] = [...major];

    if (minor.length > 0) {
      minor.forEach((slice) => otherLanguages.add(slice.name));
      const otherBytes = minor.reduce((sum, slice) => sum + slice.bytes, 0);
      const otherShare = grandTotal > 0 ? (otherBytes / grandTotal) * 100 : 0;
      const otherProjectCount = repos.filter((repo) =>
        Object.keys(repo.languages).some((language) =>
          otherLanguages.has(language),
        ),
      ).length;

      list.push({
        name: "Other",
        bytes: otherBytes,
        share: otherShare,
        color: getLanguageColor("Other"),
        projectCount: otherProjectCount,
      });
    }

    return {
      grandTotal,
      list,
      otherLanguages,
    };
  }, [repos]);

  const activeLanguage =
    selectedLanguage &&
    slices.list.some((item) => item.name === selectedLanguage)
      ? selectedLanguage
      : (slices.list[0]?.name ?? "");

  const selectedSlice =
    slices.list.find((item) => item.name === activeLanguage) ?? slices.list[0];

  const otherLanguageList = useMemo(
    () =>
      [...slices.otherLanguages].sort((left, right) =>
        left.localeCompare(right),
      ),
    [slices.otherLanguages],
  );

  const sliceLayout = useMemo<SliceLayout[]>(() => {
    const total = slices.grandTotal || 1;
    return slices.list.reduce(
      (state, slice) => {
        const startAngle = (state.consumed / total) * 360;
        const nextConsumed = state.consumed + slice.bytes;
        const endAngle = (nextConsumed / total) * 360;

        return {
          consumed: nextConsumed,
          layout: [
            ...state.layout,
            {
              ...slice,
              startAngle,
              endAngle,
              midAngle: (startAngle + endAngle) / 2,
            },
          ],
        };
      },
      { consumed: 0, layout: [] as SliceLayout[] },
    ).layout;
  }, [slices]);

  const selectedLanguageProjects = useMemo(() => {
    if (!selectedSlice) return [];

    return repos
      .map((repo) => {
        const projectBytes = Object.values(repo.languages).reduce(
          (sum, value) => sum + value,
          0,
        );

        const languageBytes =
          selectedSlice.name === "Other"
            ? Object.entries(repo.languages).reduce(
                (sum, [language, bytes]) => {
                  return slices.otherLanguages.has(language)
                    ? sum + bytes
                    : sum;
                },
                0,
              )
            : (repo.languages[selectedSlice.name] ?? 0);

        const share =
          projectBytes > 0 ? (languageBytes / projectBytes) * 100 : 0;

        return {
          ...repo,
          projectBytes,
          languageBytes,
          share,
        };
      })
      .sort((left, right) => right.languageBytes - left.languageBytes);
  }, [repos, selectedSlice, slices.otherLanguages]);

  const selectedColor = selectedSlice?.color ?? colorPalette[0];

  return (
    <section className="section-card panel-sheen rounded-4xl p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#8f8f8f]">
            GitHub language map
          </p>
          <h3 className="display-font text-3xl text-white md:text-4xl">
            Skills by project language
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-(--text-muted)">
            Cleaner view of language usage across your repositories. Click a
            slice to focus details for that language.
          </p>
        </div>
        <span className="rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
          {loading ? "loading repos" : `${repos.length} projects analyzed`}
        </span>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),rgba(0,0,0,0))] p-4">
          {loading ? (
            <div className="flex min-h-85 items-center justify-center rounded-3xl border border-dashed border-white/10 text-sm text-(--text-muted)">
              Pulling GitHub language data...
            </div>
          ) : slices.list.length === 0 ? (
            <div className="flex min-h-85 items-center justify-center rounded-3xl border border-dashed border-white/10 text-sm text-(--text-muted)">
              No language data found for these repositories.
            </div>
          ) : (
            <>
              <div className="relative mx-auto aspect-square w-full max-w-85">
                <svg
                  viewBox="0 0 300 300"
                  className="h-full w-full overflow-visible"
                >
                  <g transform="translate(150 150)">
                    {sliceLayout.map((slice) => {
                      const isSelected = activeLanguage === slice.name;
                      const isHovered = hoveredLanguage === slice.name;
                      const isActive = isSelected || isHovered;
                      const offsetRadius = isActive ? (isSelected ? 10 : 6) : 0;
                      const offset = polarToCartesian(
                        offsetRadius,
                        slice.midAngle,
                      );

                      return (
                        <motion.g
                          key={slice.name}
                          onHoverStart={() => setHoveredLanguage(slice.name)}
                          onHoverEnd={() => setHoveredLanguage(null)}
                          onClick={() => setSelectedLanguage(slice.name)}
                          animate={{
                            x: reducedMotion ? 0 : offset.x,
                            y: reducedMotion ? 0 : offset.y,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 24,
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <path
                            d={buildSlicePath(
                              slice.startAngle,
                              slice.endAngle,
                              112,
                            )}
                            fill={slice.color}
                            stroke="rgba(7, 11, 20, 0.95)"
                            strokeWidth={isActive ? 2.5 : 1.5}
                            opacity={isSelected || isHovered ? 1 : 0.9}
                            style={{
                              filter: isActive
                                ? "drop-shadow(0 8px 16px rgba(0,0,0,0.28))"
                                : undefined,
                            }}
                          />
                        </motion.g>
                      );
                    })}

                    <circle r="56" fill="rgba(7,11,20,0.92)" />
                    <circle
                      r="56"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                    />
                  </g>
                </svg>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-white/10 bg-[#070b14]/70 px-5 py-4 text-center shadow-[0_26px_50px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#8f8f8f]">
                      Total code
                    </p>
                    <p className="mt-1 display-font text-3xl text-white">
                      {formatBytes(slices.grandTotal)}
                    </p>
                    <p className="mt-1 text-xs text-[#aab3c8]">
                      {selectedSlice?.name ?? "Select a slice"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {slices.list.map((slice) => (
                  <button
                    key={slice.name}
                    type="button"
                    onClick={() => setSelectedLanguage(slice.name)}
                    className={`rounded-2xl border px-3 py-2 text-left transition-colors ${
                      activeLanguage === slice.name
                        ? "border-white/25 bg-white/12 text-white"
                        : "border-white/10 bg-black/15 text-[#b7bfd2] hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-2 text-xs">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: slice.color }}
                        />
                        {slice.name}
                      </span>
                      <span className="text-xs text-[#b9c3db]">
                        {slice.share.toFixed(1)}%
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
          <AnimatePresence mode="wait">
            {loading || !selectedSlice ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="flex min-h-85 items-center justify-center rounded-3xl border border-dashed border-white/10 text-sm text-(--text-muted)"
              >
                Loading language breakdown...
              </motion.div>
            ) : (
              <motion.div
                key={selectedSlice.name}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#8f8f8f]">
                      Selected language
                    </p>
                    <h4 className="display-font mt-2 text-3xl text-white">
                      {selectedSlice.name}
                    </h4>
                  </div>
                  <div className="rounded-2xl border border-white/10 px-3 py-2 text-right">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                      Share
                    </p>
                    <p className="mt-1 text-lg text-white">
                      {selectedSlice.share.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f8f8f]">
                      Total bytes
                    </p>
                    <p className="mt-2 display-font text-2xl text-white">
                      {formatBytes(selectedSlice.bytes)}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f8f8f]">
                      Projects
                    </p>
                    <p className="mt-2 display-font text-2xl text-white">
                      {selectedSlice.projectCount}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f8f8f]">
                      Top project
                    </p>
                    <p className="mt-2 display-font text-2xl text-white">
                      {selectedLanguageProjects.find(
                        (item) => item.languageBytes > 0,
                      )?.title ?? "None"}
                    </p>
                  </div>
                </div>

                {selectedSlice.name === "Other" &&
                otherLanguageList.length > 0 ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#8f8f8f]">
                      Languages in Other
                    </p>
                    <p className="mt-2 text-sm text-[#d0d7e8]">
                      {otherLanguageList.join(" • ")}
                    </p>
                  </div>
                ) : null}

                <div className="mt-5 space-y-3">
                  {selectedLanguageProjects.map((repo) => {
                    const hasLanguage = repo.languageBytes > 0;
                    return (
                      <div
                        key={repo.slug}
                        className="rounded-2xl border border-white/10 bg-black/20 p-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm text-white">{repo.title}</p>
                            <p className="text-xs text-[#8f8f8f]">
                              {hasLanguage
                                ? `${formatBytes(repo.languageBytes)} in this repo`
                                : "Not used in this repo"}
                            </p>
                          </div>
                          <span
                            className={`text-xs ${hasLanguage ? "text-cyan-200" : "text-[#7f879a]"}`}
                          >
                            {repo.share.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-[#1a1f2a]">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${Math.max(repo.share, hasLanguage ? 4 : 0)}%`,
                              background: `linear-gradient(90deg, ${selectedColor}, rgba(255,255,255,0.3))`,
                              opacity: hasLanguage ? 1 : 0.3,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
