"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  playClickSound,
  playPopSound,
  playSuccessSound,
  type SoundPreset,
} from "@/lib/sound-effects";

export interface SoundEffectsState {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: () => void;
  soundPreset: SoundPreset;
  setSoundPreset: (preset: SoundPreset) => void;
  cycleSoundPreset: () => void;
  volume: number;
  setVolume: (vol: number) => void;
  playSound: (type: "click" | "success" | "pop") => void;
}

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getEnabledSnapshot(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem("portfolio-sound");
  return stored === null ? true : stored === "true";
}

function getPresetSnapshot(): SoundPreset {
  if (typeof window === "undefined") return "mx-blue";
  const stored = window.localStorage.getItem("portfolio-sound-preset");
  if (stored === "mx-brown" || stored === "classic" || stored === "mx-blue") {
    return stored;
  }
  return "mx-blue";
}

function getVolumeSnapshot(): number {
  if (typeof window === "undefined") return 1.0;
  const stored = window.localStorage.getItem("portfolio-sound-volume");
  if (stored !== null) {
    const val = parseFloat(stored);
    if (!isNaN(val) && val >= 0 && val <= 1) return val;
  }
  return 1.0;
}

export function useSoundEffects(): SoundEffectsState {
  const soundEnabled = useSyncExternalStore(
    subscribe,
    getEnabledSnapshot,
    () => true,
  );

  const soundPreset = useSyncExternalStore(
    subscribe,
    getPresetSnapshot,
    () => "mx-blue" as SoundPreset,
  );

  const volume = useSyncExternalStore(
    subscribe,
    getVolumeSnapshot,
    () => 1.0,
  );

  const setSoundEnabled = useCallback(
    (action: React.SetStateAction<boolean>) => {
      const current = getEnabledSnapshot();
      const next = typeof action === "function" ? action(current) : action;
      if (typeof window !== "undefined") {
        window.localStorage.setItem("portfolio-sound", String(next));
      }
      emitChange();
    },
    [],
  );

  const setSoundPreset = useCallback((preset: SoundPreset) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-sound-preset", preset);
    }
    emitChange();
  }, []);

  const setVolume = useCallback((vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("portfolio-sound-volume", String(clamped));
    }
    emitChange();
  }, []);

  const playSound = useCallback(
    (type: "click" | "success" | "pop") => {
      if (type === "click") playClickSound(soundEnabled, soundPreset, volume);
      else if (type === "success") playSuccessSound(soundEnabled, volume);
      else if (type === "pop") playPopSound(soundEnabled, volume);
    },
    [soundEnabled, soundPreset, volume],
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      if (next) playClickSound(true, soundPreset, volume);
      return next;
    });
  }, [setSoundEnabled, soundPreset, volume]);

  const cycleSoundPreset = useCallback(() => {
    const current = getPresetSnapshot();
    const presets: SoundPreset[] = ["mx-blue", "mx-brown", "classic"];
    const nextIdx = (presets.indexOf(current) + 1) % presets.length;
    const nextPreset = presets[nextIdx] ?? "mx-blue";
    setSoundPreset(nextPreset);
    // Play preview click with the new mechanical tone
    playClickSound(true, nextPreset, volume);
  }, [setSoundPreset, volume]);

  return {
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    soundPreset,
    setSoundPreset,
    cycleSoundPreset,
    volume,
    setVolume,
    playSound,
  };
}
