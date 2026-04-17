"use client";

import { useEffect, useRef } from "react";

type DinoGameProps = {
  onScoreUnlock: () => void;
  onStop: () => void;
};

export default function DinoGame({ onScoreUnlock, onStop }: DinoGameProps) {
  const gameRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = gameRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let score = 0;
    let unlocked = false;
    let dinoY = 0;
    let velocityY = 0;
    const gravity = 0.7;
    const jump = -10;
    const obstacles: { x: number; w: number; h: number }[] = [
      { x: 500, w: 22, h: 40 },
    ];

    const keyHandler = (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "ArrowUp") && dinoY === 0) {
        velocityY = jump;
      }
      if (e.key === "Escape") onStop();
    };

    window.addEventListener("keydown", keyHandler);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#d4d4d4";
      ctx.fillRect(0, 120, canvas.width, 2);

      dinoY += velocityY;
      velocityY += gravity;
      if (dinoY > 0) {
        dinoY = 0;
        velocityY = 0;
      }

      ctx.fillStyle = "#7bd88f";
      ctx.fillRect(40, 90 + dinoY, 22, 30);

      obstacles.forEach((o) => {
        o.x -= 5;
        ctx.fillStyle = "#f78c6c";
        ctx.fillRect(o.x, 120 - o.h, o.w, o.h);
      });

      if (
        obstacles[obstacles.length - 1] &&
        obstacles[obstacles.length - 1].x < 300
      ) {
        obstacles.push({
          x: 500 + Math.random() * 120,
          w: 20 + Math.random() * 8,
          h: 30 + Math.random() * 25,
        });
      }
      if (obstacles[0] && obstacles[0].x < -40) obstacles.shift();

      const collision = obstacles.some(
        (o) => o.x < 62 && o.x + o.w > 40 && 90 + dinoY + 30 > 120 - o.h,
      );

      score += 1;
      ctx.fillStyle = "#d4d4d4";
      ctx.font = "14px Cascadia Code";
      ctx.fillText(`Score: ${Math.floor(score / 4)}`, 360, 18);
      ctx.fillText("Space/Up to jump, Esc to quit", 10, 18);

      if (!unlocked && Math.floor(score / 4) >= 50) {
        unlocked = true;
        onScoreUnlock();
      }

      if (!collision) {
        raf = requestAnimationFrame(loop);
      } else {
        ctx.fillStyle = "#ff6b6b";
        ctx.fillText("Game Over - type play to retry", 130, 70);
      }
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [onScoreUnlock, onStop]);

  return (
    <canvas
      ref={gameRef}
      width={520}
      height={140}
      className="mt-2 max-w-full rounded border border-(--border)"
    />
  );
}
