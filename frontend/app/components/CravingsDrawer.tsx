"use client";

import { useEffect } from "react";
import { useCravings } from "../context/CravingsContext";
import { X, Plus, Minus, Trash2, Sparkles, ArrowRight } from "lucide-react";

export default function CravingsDrawer() {
  const {
    isDrawerOpen,
    closeDrawer,
    cravings,
    totalCount,
    updateQuantity,
    removeCraving,
    clearCravings,
  } = useCravings();

  // Close on Escape key
  useEffect(() => {
    if (!isDrawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="My Cravings Drawer"
    >
      {/* Dimmed backdrop */}
      <button
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer"
        onClick={closeDrawer}
        aria-label="Close cravings drawer"
      />

      {/* Slide-out Panel */}
      <div
        className="relative flex h-full max-h-screen w-full flex-col justify-between overflow-y-auto border-l border-[#241e17] bg-[#11100E] px-7 py-9 md:w-[480px] shadow-2xl"
        style={{
          animation: "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#241e17]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8A87C]">
                Your Private Tasting List
              </p>
              <h2 className="mt-1 font-serif text-3xl font-light text-[#f0ebe3]">
                My Cravings{" "}
                <span className="text-xl text-[#E8A87C] font-mono">
                  ({totalCount})
                </span>
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2e261f] text-[#C4BAAC] transition-all duration-150 ease-out hover:border-[#E8A87C] hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Close drawer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cravings List */}
          <div className="mt-6 flex flex-col gap-4">
            {cravings.length === 0 ? (
              <div className="py-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#2e261f] bg-[#161310] text-[#E8A87C]">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-serif text-xl font-light text-[#f0ebe3]">
                  Your Palate Awaits
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-[#A89E90]">
                  You haven&apos;t craved any dishes yet. Scroll through our 5
                  cinematic courses and tap{" "}
                  <strong className="text-[#E8A87C] font-semibold">
                    &ldquo;I Crave It&rdquo;
                  </strong>{" "}
                  on whatever catches your eye.
                </p>
                <a
                  href="#food-sections"
                  onClick={closeDrawer}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#5A4E40] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#F5EFEB] transition-all duration-150 ease-out hover:border-[#E8A87C] hover:text-[#E8A87C] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            ) : (
              cravings.map((item) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-between rounded-xl border border-[#241e17] bg-[#161412]/80 p-4 transition-colors duration-150 hover:border-[#382f25]"
                >
                  {/* Left: Dish info */}
                  <div className="flex flex-col pr-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: item.accentColor }}
                      >
                        {item.course}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#554a3e]" />
                      <span className="text-[10px] uppercase tracking-wider text-[#9E9485]">
                        {item.tagline}
                      </span>
                    </div>

                    <h4 className="mt-1 text-sm font-bold uppercase tracking-wider text-[#F5EFEB]">
                      {item.name}
                    </h4>

                    {item.price && (
                      <span className="mt-0.5 text-xs text-[#E8A87C] font-mono">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Right: Quantity Controls & Remove */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-[#2e261f] bg-[#0f0e0c] px-1 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-7 w-7 items-center justify-center text-[#A89E90] transition-colors duration-100 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#f0ebe3]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-7 w-7 items-center justify-center text-[#A89E90] transition-colors duration-100 hover:text-white hover:bg-white/10 rounded cursor-pointer"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeCraving(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7A6F62] transition-colors duration-100 hover:text-[#EF4444] hover:bg-red-500/10 cursor-pointer"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Actions */}
        {cravings.length > 0 && (
          <div className="mt-8 border-t border-[#241e17] pt-6">
            <div className="mb-4 flex items-center justify-between text-xs">
              <span className="uppercase tracking-wider text-[#A89E90]">
                Courses Selected
              </span>
              <span className="font-semibold text-[#E8A87C]">
                {cravings.length} of 5 Courses
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="#final"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 rounded-full border border-[#E8A87C] bg-[#E8A87C] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-[#11100E] shadow-lg shadow-[#E8A87C]/20 transition-all duration-150 ease-out hover:bg-white hover:border-white hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
              >
                <span>Order My Cravings</span>
                <ArrowRight size={14} />
              </a>

              <button
                onClick={clearCravings}
                className="text-center text-[11px] uppercase tracking-widest text-[#7A6F62] transition-colors duration-150 ease-out hover:text-[#D4CCC0] cursor-pointer"
              >
                Clear All Cravings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
