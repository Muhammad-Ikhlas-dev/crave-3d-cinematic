"use client";

import { useCravings } from "../context/CravingsContext";
import { Sparkles, Flame } from "lucide-react";

export default function FlyingCravingOverlay() {
  const { flyingParticles } = useCravings();

  if (flyingParticles.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {flyingParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute -left-6 -top-6 flex items-center gap-2 will-change-transform"
          style={
            {
              "--start-x": `${particle.startX}px`,
              "--start-y": `${particle.startY}px`,
              "--target-x": `${particle.targetX}px`,
              "--target-y": `${particle.targetY}px`,
              animation: "cravingFlight 0.72s cubic-bezier(0.22, 1, 0.36, 1) forwards",
            } as React.CSSProperties
          }
        >
          {/* Main glowing orb */}
          <div
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-[#141210] shadow-2xl"
            style={{
              borderColor: particle.color,
              boxShadow: `0 0 25px ${particle.color}, inset 0 0 12px ${particle.color}80`,
            }}
          >
            <Flame
              size={18}
              className="animate-pulse"
              style={{ color: particle.color }}
            />
            {/* Pulsing aura ring */}
            <span
              className="absolute -inset-1.5 animate-ping rounded-full opacity-60"
              style={{ borderColor: particle.color, borderWidth: "1px" }}
            />
          </div>

          {/* Floating pill badge beside orb */}
          <div
            className="flex items-center gap-1.5 rounded-full border border-[#E8A87C]/50 bg-[#161311]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFF2E0] shadow-lg backdrop-blur-md"
            style={{
              borderColor: particle.color,
              animation: "cravingBadgeFade 0.72s ease-in-out forwards",
            }}
          >
            <Sparkles size={11} style={{ color: particle.color }} />
            <span>+1 Craved</span>
          </div>
        </div>
      ))}
    </div>
  );
}
