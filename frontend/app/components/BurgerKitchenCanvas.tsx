"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Frame Sequence Configuration ──────────────────────────────────────────
const FRAME_COUNT = 300;
const FRAME_BASE = "/ref-images/burger-kitchen/frames/";

function frameUrl(i: number): string {
  return `${FRAME_BASE}ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
}

export default function BurgerKitchenCanvas({
  scrollHeight = 4,
}: {
  scrollHeight?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const frameIdxRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // ── Draw ────────────────────────────────────────────────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w <= 0 || h <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, w, h);

    if (FRAME_COUNT <= 0) return;

    // Find nearest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[index] ?? null;
    if (!img || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        const f = imagesRef.current[i];
        if (f && f.naturalWidth > 0) {
          img = f;
          break;
        }
      }
    }
    if (!img || img.naturalWidth === 0) {
      for (let i = index + 1; i < FRAME_COUNT; i++) {
        const f = imagesRef.current[i];
        if (f && f.naturalWidth > 0) {
          img = f;
          break;
        }
      }
    }

    if (!img || img.naturalWidth === 0) return;

    // Cover-fit: fill viewport centered
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  const requestDraw = useCallback(
    (index: number) => {
      frameIdxRef.current = index;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        drawFrame(frameIdxRef.current);
      });
    },
    [drawFrame]
  );

  // ── Preloader ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (FRAME_COUNT <= 0) {
      requestDraw(0);
      return;
    }

    let cancelled = false;

    const loadOne = (i: number) => {
      if (cancelled || (imagesRef.current[i]?.naturalWidth ?? 0) > 0) return;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        imagesRef.current[i] = img;
        if (Math.abs(i - frameIdxRef.current) <= 5) {
          requestDraw(frameIdxRef.current);
        }
      };
      img.onerror = () => {
        /* ignore */
      };
      img.src = frameUrl(i);
    };

    // Priority: first 20 frames immediately
    for (let i = 0; i < Math.min(20, FRAME_COUNT); i++) loadOne(i);

    // Every 5th frame next (skeleton timeline coverage)
    const t1 = setTimeout(() => {
      if (cancelled) return;
      for (let i = 20; i < FRAME_COUNT; i += 5) loadOne(i);
    }, 50);

    // All remaining frames
    const t2 = setTimeout(() => {
      if (cancelled) return;
      for (let i = 0; i < FRAME_COUNT; i++) loadOne(i);
    }, 250);

    const retryInterval = setInterval(() => {
      requestDraw(frameIdxRef.current);
    }, 350);
    const retryStop = setTimeout(() => clearInterval(retryInterval), 8000);

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(retryInterval);
      clearTimeout(retryStop);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [requestDraw]);

  // ── GSAP ScrollTrigger Scrubbing ───────────────────────────────────────────
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced && FRAME_COUNT > 0) {
        gsap.to(
          { frame: 0 },
          {
            frame: FRAME_COUNT - 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
              onUpdate: (self) => {
                const idx = Math.round(
                  Math.max(
                    0,
                    Math.min(FRAME_COUNT - 1, self.progress * (FRAME_COUNT - 1))
                  )
                );
                requestDraw(idx);
              },
            },
          }
        );
      }
    });

    const onResize = () => requestDraw(frameIdxRef.current);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [requestDraw]);

  return (
    <div
      ref={wrapperRef}
      id="section-burger-kitchen"
      style={{ height: `${scrollHeight * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
          aria-label="Burger kitchen transition 3D animation sequence"
        />

        {/* Seamless blend vignettes for top and bottom transitions */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,13,13,0.85) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
