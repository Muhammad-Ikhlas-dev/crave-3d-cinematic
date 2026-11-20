"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CraveButton from "./CraveButton";

gsap.registerPlugin(ScrollTrigger);

// ─── Config ───────────────────────────────────────────────────────────────────
const FRAME_COUNT = 300;
const FRAME_BASE  = "/ref-images/pizza/frames/";

function frameUrl(i: number): string {
  return `${FRAME_BASE}ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function PizzaCanvas({ scrollHeight = 5 }: { scrollHeight?: number }) {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imagesRef   = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const frameIdxRef = useRef(0);
  const rafRef      = useRef<number | null>(null);

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
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Absolute transform — avoids accumulated scale bug
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, w, h);

    // Find nearest loaded frame
    let img: HTMLImageElement | null = imagesRef.current[index] ?? null;
    if (!img || img.naturalWidth === 0) {
      for (let i = index - 1; i >= 0; i--) {
        const f = imagesRef.current[i];
        if (f && f.naturalWidth > 0) { img = f; break; }
      }
    }
    if (!img || img.naturalWidth === 0) {
      for (let i = index + 1; i < FRAME_COUNT; i++) {
        const f = imagesRef.current[i];
        if (f && f.naturalWidth > 0) { img = f; break; }
      }
    }

    if (!img || img.naturalWidth === 0) return;

    // Cover-fit: fill the viewport, centered
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(w / iw, h / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // ── RAF-throttled draw ──────────────────────────────────────────────────────
  const requestDraw = useCallback((index: number) => {
    frameIdxRef.current = index;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      drawFrame(frameIdxRef.current);
    });
  }, [drawFrame]);

  // ── Preloader ───────────────────────────────────────────────────────────────
  useEffect(() => {
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
      img.onerror = () => { /* ignore */ };
      img.src = frameUrl(i);
    };

    // Priority: first 15 frames immediately so frame 0 shows fast
    for (let i = 0; i < Math.min(15, FRAME_COUNT); i++) loadOne(i);

    // Every 6th frame next (skeleton coverage across the timeline)
    const t1 = setTimeout(() => {
      if (cancelled) return;
      for (let i = 15; i < FRAME_COUNT; i += 6) loadOne(i);
    }, 50);

    // All remaining frames after that
    const t2 = setTimeout(() => {
      if (cancelled) return;
      for (let i = 0; i < FRAME_COUNT; i++) loadOne(i);
    }, 300);

    // Periodic forced redraw while frames are still coming in
    const retryInterval = setInterval(() => {
      requestDraw(frameIdxRef.current);
    }, 400);
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

  // ── GSAP ScrollTrigger ─────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.to({ frame: 0 }, {
          frame: FRAME_COUNT - 1,
          ease: "none",
          scrollTrigger: {
            trigger:  wrapperRef.current,
            start:    "top top",
            end:      "bottom bottom",
            scrub:    0.5,
            onUpdate: (self) => {
              const idx = Math.round(
                Math.max(0, Math.min(FRAME_COUNT - 1, self.progress * (FRAME_COUNT - 1)))
              );
              requestDraw(idx);
            },
          },
        });
      }

      gsap.fromTo(
        textRef.current?.querySelectorAll(".pizza-text") ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", once: true },
        }
      );
    });

    const onResize = () => requestDraw(frameIdxRef.current);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [requestDraw]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      id="section-pizza"
      style={{ height: `${scrollHeight * 100}vh` }}
      className="relative"
      aria-label="Pizza animation section"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
          aria-label="Pizza animation"
        />

        {/* Cinematic vignette — left side dark for text readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.7) 35%, rgba(13,13,13,0.2) 65%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[1]"
          aria-hidden="true"
          style={{ background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 100%)" }}
        />

        {/* Text overlay */}
        <div
          ref={textRef}
          className="food-editorial-container absolute inset-0 z-[2] flex flex-col justify-between px-8 py-20 md:px-16 lg:px-24 pointer-events-none"
        >
          <div className="food-editorial-inner my-auto max-w-2xl pt-8 pointer-events-auto">
            <div className="pizza-text food-editorial-badge mb-6 flex items-center gap-3 opacity-0">
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
                01 / 05
              </span>
              <span className="h-px w-8 bg-[#DFBA8F]/50" aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#DDD5CA]">
                PIZZA
              </span>
            </div>

            <h2
              className="pizza-text food-editorial-title mb-7 font-sans font-bold uppercase tracking-[0.06em] leading-[0.96] opacity-0"
              style={{ fontSize: "var(--food-title-size, clamp(2.75rem, 6.5vw, 5.5rem))", color: "#DFBA8F" }}
            >
              MADE TO
              <br />PULL YOU
              <br />CLOSER
            </h2>

            <div className="pizza-text food-editorial-pill mb-7 inline-flex items-center gap-2.5 opacity-0">
              <span className="inline-block text-[10px] leading-none text-[#DFBA8F]" aria-hidden="true">▶</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#DFBA8F]">
                THE ART OF CRUST
              </span>
            </div>

            <p className="pizza-text food-editorial-desc max-w-md text-sm sm:text-base leading-[1.8] text-[#DDD5CA] opacity-0">
              Hand-stretched dough, slow-simmered tomato, and a generous pull of
              melted cheese. Every slice is built to be remembered.
            </p>

            <div className="pizza-text food-editorial-btn-wrap mt-8 opacity-0">
              <CraveButton
                dish={{
                  id: "pizza",
                  course: "01 / 05",
                  name: "Hand-Stretched Pizza",
                  tagline: "The Art of Crust",
                  price: "$24",
                  accentColor: "#DFBA8F",
                }}
              />
            </div>
          </div>

          <div className="pizza-text food-editorial-scroll-indicator flex items-center gap-4 opacity-0" aria-hidden="true">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#DFBA8F]/50">
              <div className="h-5 w-px bg-[#DFBA8F]" />
              <div className="absolute bottom-2 h-1.5 w-1.5 rotate-45 border-b border-r border-[#DFBA8F]" />
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#DFBA8F]/80">
              SCROLL TO EXPLORE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
