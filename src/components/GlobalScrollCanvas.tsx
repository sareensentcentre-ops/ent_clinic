import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;

function getFrameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(6, '0');
  return `/frames/frame_${frameNumber}.jpg`;
}

export const GlobalScrollCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    let loadedCount = 0;
    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnActualIndex = -1;
    let animationFrameId: number;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      lastDrawnActualIndex = -1;
      drawFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame))));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawImageProp(img: HTMLImageElement) {
      if (!ctx || !canvas || !img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) * 0.5;
      const cy = (ch - nh) * 0.5;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, cx, cy, nw, nh);
    }

    function getBestFrameWithIndex(index: number) {
      if (frames[index] && frames[index]!.complete && frames[index]!.naturalWidth > 0) {
        return { img: frames[index]!, actualIndex: index };
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && frames[prev] && frames[prev]!.complete && frames[prev]!.naturalWidth > 0) {
          return { img: frames[prev]!, actualIndex: prev };
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && frames[next] && frames[next]!.complete && frames[next]!.naturalWidth > 0) {
          return { img: frames[next]!, actualIndex: next };
        }
      }
      return null;
    }

    function drawFrame(index: number) {
      const result = getBestFrameWithIndex(index);
      if (result && result.img) {
        if (result.actualIndex !== lastDrawnActualIndex) {
          drawImageProp(result.img);
          lastDrawnActualIndex = result.actualIndex;
        }
      }
    }

    const onScroll = () => {
      // Complete page scroll height mapping from top to bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetFrame = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const loop = () => {
      const diff = targetFrame - currentFrame;
      if (Math.abs(diff) > 0.001) {
        currentFrame += diff * 0.12;
      } else {
        currentFrame = targetFrame;
      }

      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
      drawFrame(frameIndex);

      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    function loadSingleFrame(index: number): Promise<HTMLImageElement | null> {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          frames[index] = img;
          loadedCount++;

          const currentIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
          if (Math.abs(index - currentIndex) < Math.abs(lastDrawnActualIndex - currentIndex)) {
            drawFrame(currentIndex);
          }

          const percent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
          setLoadPercent(percent);
          if (loadedCount >= TOTAL_FRAMES) {
            setTimeout(() => setIsLoaded(true), 300);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
        img.src = getFrameUrl(index);
      });
    }

    async function preloadAll() {
      // 1. First frame immediately
      const first = await loadSingleFrame(0);
      if (first) {
        drawFrame(0);
      }

      // 2. Keyframes pass across 240 frames
      const skeletonIndices: number[] = [];
      for (let i = 8; i < TOTAL_FRAMES; i += 8) {
        skeletonIndices.push(i);
      }
      await Promise.all(skeletonIndices.map(loadSingleFrame));

      // 3. Fill remaining frames with concurrency pool
      const remaining: number[] = [];
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        if (!frames[i]) remaining.push(i);
      }

      const CONCURRENCY = 12;
      let cursor = 0;
      async function worker() {
        while (cursor < remaining.length) {
          const nextIdx = remaining[cursor++];
          await loadSingleFrame(nextIdx);
        }
      }

      const workers: Promise<void>[] = [];
      for (let c = 0; c < CONCURRENCY; c++) {
        workers.push(worker());
      }
      await Promise.all(workers);
    }

    preloadAll();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Top Hairline Progress Bar */}
      <div
        className={`fixed top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 z-50 transition-all duration-300 pointer-events-none ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ width: `${loadPercent}%` }}
      />

      {/* Fixed Fullscreen Background Canvas */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-slate-950">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block"
        />
        {/* Subtle Dark Vignette & Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />
      </div>
    </>
  );
};
