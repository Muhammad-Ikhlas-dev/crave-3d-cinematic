"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Entrance text and CTA animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReduced) {
        gsap.fromTo(
          ".hero-animate",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.15,
          }
        );
      } else {
        gsap.set(".hero-animate", { opacity: 1, y: 0 });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleExploreKitchen = () => {
    const target = document.getElementById("section-kitchen");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      suppressHydrationWarning
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#11100E] text-center"
      aria-label="CRAVE Hero"
    >
      {/* ── 1. Full-screen Cinematic Master Kitchen Background ── */}
      <div
        suppressHydrationWarning
        className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center pointer-events-none"
      >
        <div
          suppressHydrationWarning
          className="relative w-full h-full min-w-[calc(100vh*1024/572)] min-h-[calc(100vw*572/1024)] aspect-[1024/572]"
        >
          <Image
            src="/assets/kitchen.webp"
            alt="CRAVE master kitchen"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            suppressHydrationWarning
          />
        </div>
      </div>

      {/* ── 2. Atmospheric Lighting & Vignettes ── */}
      {/* Top subtle vignette for clear navbar legibility */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, rgba(17,16,14,0.9) 0%, rgba(17,16,14,0.4) 60%, transparent 100%)",
        }}
      />

      {/* Cinematic peripheral vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 95% 75% at 50% 35%, transparent 40%, rgba(17,16,14,0.4) 75%, rgba(17,16,14,0.85) 100%)",
        }}
      />

      {/* Bottom floor gradient for high contrast editorial typography */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.95) 45%, rgba(17,16,14,0.5) 80%, transparent 100%)",
        }}
      />

      {/* ── 3. Editorial Text & "Explore Kitchen" CTA ── */}
      {/* Spacer pushing content to lower floor area */}
      <div className="relative z-10 w-full flex-1 pointer-events-none min-h-[46vh] sm:min-h-[50vh] md:min-h-[54vh]" />

      <div className="relative z-10 flex w-full flex-col items-center px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-2xl text-center">
          {/* Eyebrow */}
          <p className="hero-animate mb-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
            The Art of Craving
          </p>

          {/* Headline */}
          <h1 className="hero-animate mb-3 font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-[#F5EFEB]">
            Food is an{" "}
            <em className="italic font-normal text-[#E8A87C]">experience.</em>
          </h1>

          {/* Supporting text */}
          <p className="hero-animate mx-auto mb-6 max-w-md text-xs sm:text-sm leading-relaxed text-[#DDD5CA]/90">
            Five dishes. Five stories. Step into our world and experience the
            craft behind every creation.
          </p>

          {/* ── Explore Kitchen Button ── */}
          <div className="hero-animate">
            <button
              onClick={handleExploreKitchen}
              aria-label="Explore Kitchen"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#E8A87C]/60 bg-[#141210]/85 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-[#F5EFEB] backdrop-blur-md shadow-[0_0_25px_rgba(232,168,124,0.22)] transition-all duration-200 hover:border-[#E8A87C] hover:bg-[#E8A87C] hover:text-[#11100E] hover:shadow-[0_0_35px_rgba(232,168,124,0.45)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer focus-visible:outline-none"
            >
              {/* Shimmer sweep */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 ease-out group-hover:translate-x-full"
                aria-hidden="true"
              />

              <Sparkles
                size={14}
                className="text-[#E8A87C] transition-all duration-200 group-hover:text-[#11100E] group-hover:rotate-12"
              />

              <span>Explore Kitchen</span>

              <ChevronDown
                size={14}
                className="text-[#E8A87C] transition-all duration-200 group-hover:text-[#11100E] group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
