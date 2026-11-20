"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FoodItem } from "../data/foods";

gsap.registerPlugin(ScrollTrigger);

interface FoodSectionProps {
  food: FoodItem;
  isLast?: boolean;
}

export default function FoodSection({ food, isLast = false }: FoodSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        gsap.set(".food-text-animate", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        textGroupRef.current?.querySelectorAll(".food-text-animate") ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.11,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`section-${food.slug}`}
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0d0d0d]"
      aria-label={`${food.name} section`}
    >
      {/* Top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2a2420] to-transparent"
        aria-hidden="true"
      />

      {/* Subtle ambient glow per food's accent color */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 65% 50%, ${food.accentColor}0a 0%, transparent 70%)`,
        }}
      />

      {/* Layout grid */}
      <div className="relative z-10 grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-8 md:grid-cols-2 md:gap-0 md:px-16 lg:px-20">

        {/* ── Left: Text content ── */}
        <div ref={textGroupRef} className="order-2 md:order-1">
          {/* Index + rule */}
          <div className="food-text-animate mb-5 flex items-center gap-4 opacity-0">
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
              {food.number}
            </span>
            <span className="h-px w-8 bg-[#DFBA8F]/40" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#DDD5CA]">
              {food.name}
            </span>
          </div>

          <h2
            className="food-text-animate mb-4 font-serif font-light leading-[0.95] tracking-tight text-[#F5EFEB] opacity-0"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
          >
            {food.name}
          </h2>

          <p
            className="food-text-animate mb-5 text-[12px] font-bold uppercase tracking-[0.28em] opacity-0"
            style={{ color: food.accentColor }}
          >
            {food.tagline}
          </p>

          <p className="food-text-animate max-w-[360px] text-sm leading-[1.85] text-[#DDD5CA] opacity-0">
            {food.description}
          </p>
        </div>

        {/* ── Right: Visual placeholder ──
            PHASE 3: Replace contents with <canvas> for image-sequence animation.
            The .food-visual-container wrapper stays — only the internals change.
        ── */}
        <div className="food-visual-container order-1 flex items-center justify-center md:order-2">
          <div
            className="relative flex h-72 w-72 items-center justify-center overflow-hidden md:h-[400px] md:w-[400px]"
            aria-label={`${food.name} visual placeholder`}
          >
            {/* Glow backdrop */}
            <div
              className="absolute inset-0 rounded-full opacity-[0.12]"
              style={{
                background: `radial-gradient(circle, ${food.accentColor} 0%, transparent 70%)`,
                filter: "blur(48px)",
              }}
              aria-hidden="true"
            />

            {/* Outer ring */}
            <div
              className="relative flex h-56 w-56 items-center justify-center rounded-full border border-[#222018] md:h-72 md:w-72"
              aria-hidden="true"
            >
              {/* Inner dashed ring */}
              <div
                className="h-40 w-40 rounded-full border border-dashed md:h-52 md:w-52"
                style={{ borderColor: `${food.accentColor}25` }}
              />
              {/* Centre dot */}
              <div
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: food.accentColor, opacity: 0.4 }}
              />
            </div>

            {/* Food name watermark */}
            <span
              className="pointer-events-none absolute select-none font-serif font-light uppercase tracking-widest opacity-[0.035]"
              style={{
                color: food.accentColor,
                fontSize: "clamp(3rem, 8vw, 5rem)",
              }}
              aria-hidden="true"
            >
              {food.name}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {!isLast && (
        <div
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden="true"
        >
          <div className="h-7 w-px animate-pulse bg-gradient-to-b from-[#8E8272] to-transparent" />
        </div>
      )}

      {/* Large decorative number */}
      <span
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-serif font-light leading-none tracking-tighter text-[#f0ebe3] opacity-[0.025] md:right-12"
        style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
        aria-hidden="true"
      >
        {food.id.toString().padStart(2, "0")}
      </span>
    </section>
  );
}
