/**
 * animations.ts
 * Central place for GSAP animation helpers.
 * Phase 1: only subtle text entrance animations.
 * Phase 2/3: add scroll-driven canvas animation helpers here.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins once — safe to call multiple times
export function registerGSAP() {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
}

/**
 * Fade-and-rise entrance for a group of elements.
 * Respects prefers-reduced-motion by skipping the tween.
 */
export function animateTextEntrance(
  targets: gsap.TweenTarget,
  options: {
    delay?: number;
    stagger?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    targets,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: options.stagger ?? 0.12,
      delay: options.delay ?? 0,
      scrollTrigger: options.scrollTrigger,
    }
  );
}
