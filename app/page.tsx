"use client";

import { useEffect, useRef } from "react";

type Snowflake = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
};

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const snowflakes: Snowflake[] = [];
    const SNOW_COUNT = 120;

    // Initialize snowflakes
    for (let i = 0; i < SNOW_COUNT; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random(),
      });
    }

    const drawSnow = () => {
      ctx.clearRect(0, 0, width, height);

      for (const snow of snowflakes) {
        ctx.beginPath();
        ctx.arc(snow.x, snow.y, snow.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${snow.opacity})`;
        ctx.fill();
      }
    };

    const updateSnow = () => {
      for (const snow of snowflakes) {
        snow.y += snow.speed;

        if (snow.y > height) {
          snow.y = -10;
          snow.x = Math.random() * width;
        }
      }
    };

    let animationId: number;

    const animate = () => {
      drawSnow();
      updateSnow();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Snow Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Hello World ❄️</h1>
      </div>
    </main>
  );
}
