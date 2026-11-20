"use client";

import { useState } from "react";
import { useCravings, CravingDish } from "../context/CravingsContext";
import { Sparkles, Flame, Check } from "lucide-react";

interface CraveButtonProps {
  dish: Omit<CravingDish, "quantity">;
  className?: string;
}

export default function CraveButton({ dish, className = "" }: CraveButtonProps) {
  const { addCraving, cravings } = useCravings();
  const [justCraved, setJustCraved] = useState(false);

  const existing = cravings.find((c) => c.id === dish.id);
  const currentQuantity = existing?.quantity || 0;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addCraving(dish, e);

    setJustCraved(true);
    setTimeout(() => {
      setJustCraved(false);
    }, 1200);
  };

  return (
    <div className={`pointer-events-auto inline-block ${className}`}>
      <button
        onClick={handleClick}
        aria-label={`I Crave It — ${dish.name}`}
        className="group relative flex items-center gap-3 overflow-hidden rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-150 ease-out hover:scale-[1.03] hover:brightness-125 active:scale-[0.98] focus-visible:outline-none cursor-pointer"
        style={{
          borderColor: justCraved ? dish.accentColor : `${dish.accentColor}55`,
          background: justCraved
            ? `radial-gradient(circle at center, ${dish.accentColor}33 0%, rgba(20, 18, 16, 0.95) 100%)`
            : "rgba(22, 19, 16, 0.85)",
          boxShadow: justCraved
            ? `0 0 25px ${dish.accentColor}66, inset 0 0 12px ${dish.accentColor}33`
            : `0 4px 20px rgba(0,0,0,0.5)`,
          backdropFilter: "blur(12px)",
          color: justCraved ? "#FFFFFF" : "#F5EFEB",
        }}
      >
        {/* Shimmer sweep effect */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full"
          aria-hidden="true"
        />

        {/* Icon */}
        <span
          className="relative flex h-5 w-5 items-center justify-center transition-transform duration-150 ease-out group-hover:scale-115"
          style={{ color: dish.accentColor }}
        >
          {justCraved ? (
            <Check size={16} className="text-[#34D399] animate-bounce" />
          ) : (
            <Flame
              size={15}
              className="transition-transform duration-150 ease-out group-hover:rotate-12"
            />
          )}
        </span>

        {/* Button Text */}
        <span className="relative font-bold">
          {justCraved ? "Craved! ✨" : "I Crave It"}
        </span>

        {/* Quantity count pill if already craved */}
        {currentQuantity > 0 && !justCraved && (
          <span
            className="relative flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black text-[#11100E] shadow-sm transition-transform duration-150 ease-out group-hover:scale-110"
            style={{ backgroundColor: dish.accentColor }}
          >
            x{currentQuantity}
          </span>
        )}

        {/* Micro sparkle indicator on hover */}
        <Sparkles
          size={12}
          className="relative text-[#E8A87C] opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100"
          style={{ color: dish.accentColor }}
        />
      </button>
    </div>
  );
}
