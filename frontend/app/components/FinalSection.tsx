"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set(".final-animate", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        sectionRef.current?.querySelectorAll(".final-animate") ?? [],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="final"
      className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#11100E] px-6 text-center"
      aria-label="Closing section"
    >
      {/* Top divider */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2a2420] to-transparent"
        aria-hidden="true"
      />

      {/* Warm ambient glow — consistent with hero */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(180,90,30,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <p className="final-animate mb-7 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#E8A87C] opacity-0">
          CRAVE.
        </p>

        <h2
          className="final-animate mb-6 font-serif font-light leading-tight tracking-tight text-[#F5EFEB] opacity-0"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
        >
          Your cravings,
          <br />
          <em className="not-italic text-[#E8A87C]">our craft.</em>
        </h2>

        <p className="final-animate mx-auto mb-10 max-w-sm text-sm leading-[1.85] text-[#DDD5CA] opacity-0">
          Every dish is a promise. Come hungry, leave transformed.
        </p>

        <button
          onClick={scrollToTop}
          className="final-animate group inline-flex items-center gap-3 border border-[#5A4E40] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5EFEB] opacity-0 transition-all duration-150 ease-out hover:border-[#E8A87C] hover:text-[#E8A87C] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A87C] cursor-pointer"
        >
          <ArrowUp
            size={14}
            className="transition-transform duration-150 ease-out group-hover:-translate-y-1"
          />
          Explore Again
        </button>
      </div>
    </section>
  );
}
