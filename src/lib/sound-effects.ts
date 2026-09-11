let audioCtx: AudioContext | null = null;

export type SoundPreset = "mx-blue" | "mx-brown" | "classic";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound(
  enabled: boolean = true,
  preset: SoundPreset = "mx-blue",
  volume: number = 1.0,
) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseVol = Math.max(0, Math.min(1, volume));

    if (preset === "mx-blue") {
      // Cherry MX Blue: Crisp, high-frequency click with subtle micro-transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.08 * baseVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.026);

      // Micro click release tick
      const tickOsc = ctx.createOscillator();
      const tickGain = ctx.createGain();
      tickOsc.type = "triangle";
      tickOsc.frequency.setValueAtTime(2400, ctx.currentTime + 0.006);
      tickGain.gain.setValueAtTime(0.03 * baseVol, ctx.currentTime + 0.006);
      tickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.016);
      tickOsc.connect(tickGain);
      tickGain.connect(ctx.destination);
      tickOsc.start(ctx.currentTime + 0.006);
      tickOsc.stop(ctx.currentTime + 0.017);
    } else if (preset === "mx-brown") {
      // Cherry MX Brown: Soft, dampened tactile bump
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06 * baseVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.042);
    } else {
      // Classic: Smooth sine click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06 * baseVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.036);
    }
  } catch {
    // Graceful fallback if Web Audio is blocked
  }
}

export function playSuccessSound(enabled: boolean = true, volume: number = 1.0) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseVol = Math.max(0, Math.min(1, volume));
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 chord
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.08 * baseVol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.19);
    });
  } catch {
    // Graceful fallback
  }
}

export function playPopSound(enabled: boolean = true, volume: number = 1.0) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseVol = Math.max(0, Math.min(1, volume));
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(350, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.07 * baseVol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.041);
  } catch {
    // Graceful fallback
  }
}
