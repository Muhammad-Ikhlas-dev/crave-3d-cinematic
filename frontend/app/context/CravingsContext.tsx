"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

export interface CravingDish {
  id: string;
  course: string;
  name: string;
  tagline: string;
  price?: string;
  accentColor: string;
  quantity: number;
}

export interface FlyingParticle {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  color: string;
  name: string;
}

interface CravingsContextType {
  cravings: CravingDish[];
  totalCount: number;
  isDrawerOpen: boolean;
  isBadgeBouncing: boolean;
  flyingParticles: FlyingParticle[];
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addCraving: (
    dish: Omit<CravingDish, "quantity">,
    event?: React.MouseEvent<HTMLElement>
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeCraving: (id: string) => void;
  clearCravings: () => void;
  registerTargetRef: (el: HTMLElement | null) => void;
}

const CravingsContext = createContext<CravingsContextType | null>(null);

function playSatisfyingChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Primary bell tone
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now); // A5
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.08); // E6
    gain1.gain.setValueAtTime(0.09, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    // Harmonic sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(1760, now + 0.04); // A6
    gain2.gain.setValueAtTime(0.04, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.4);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.35);
  } catch {
    // Audio autoplay restrictions or unsupported
  }
}

export function CravingsProvider({ children }: { children: React.ReactNode }) {
  const [cravingsMap, setCravingsMap] = useState<Record<string, CravingDish>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBadgeBouncing, setIsBadgeBouncing] = useState(false);
  const [flyingParticles, setFlyingParticles] = useState<FlyingParticle[]>([]);
  const targetElementRef = useRef<HTMLElement | null>(null);
  const particleIdCounter = useRef(0);

  const cravings = Object.values(cravingsMap);
  const totalCount = cravings.reduce((sum, item) => sum + item.quantity, 0);

  const registerTargetRef = useCallback((el: HTMLElement | null) => {
    targetElementRef.current = el;
  }, []);

  const openDrawer = useCallback(() => setIsDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const toggleDrawer = useCallback(() => setIsDrawerOpen((prev) => !prev), []);

  const triggerBadgeBounce = useCallback(() => {
    setIsBadgeBouncing(true);
    setTimeout(() => {
      setIsBadgeBouncing(false);
    }, 600);
  }, []);

  const addCraving = useCallback(
    (
      dish: Omit<CravingDish, "quantity">,
      event?: React.MouseEvent<HTMLElement>
    ) => {
      playSatisfyingChime();

      // Calculate origin coordinates for the particle animation
      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;

      if (event && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        startX = rect.left + rect.width / 2;
        startY = rect.top + rect.height / 2;
      }

      // Calculate destination coordinates ("My Cravings" button in Navbar)
      let targetX = window.innerWidth - 120;
      let targetY = 32;

      if (targetElementRef.current) {
        const targetRect = targetElementRef.current.getBoundingClientRect();
        targetX = targetRect.left + targetRect.width / 2;
        targetY = targetRect.top + targetRect.height / 2;
      }

      // Spawn flying particle
      const newParticleId = ++particleIdCounter.current;
      const particle: FlyingParticle = {
        id: newParticleId,
        startX,
        startY,
        targetX,
        targetY,
        color: dish.accentColor,
        name: dish.name,
      };

      setFlyingParticles((prev) => [...prev, particle]);

      // When the particle completes its flight (~700ms), update the state & bounce the badge
      setTimeout(() => {
        setCravingsMap((prev) => {
          const existing = prev[dish.id];
          return {
            ...prev,
            [dish.id]: {
              ...dish,
              quantity: existing ? existing.quantity + 1 : 1,
            },
          };
        });

        triggerBadgeBounce();

        // Clean up particle
        setFlyingParticles((prev) => prev.filter((p) => p.id !== newParticleId));
      }, 700);
    },
    [triggerBadgeBounce]
  );

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCravingsMap((prev) => {
      const existing = prev[id];
      if (!existing) return prev;
      const newQuantity = existing.quantity + delta;
      if (newQuantity <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return {
        ...prev,
        [id]: {
          ...existing,
          quantity: newQuantity,
        },
      };
    });
  }, []);

  const removeCraving = useCallback((id: string) => {
    setCravingsMap((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, []);

  const clearCravings = useCallback(() => {
    setCravingsMap({});
  }, []);

  return (
    <CravingsContext.Provider
      value={{
        cravings,
        totalCount,
        isDrawerOpen,
        isBadgeBouncing,
        flyingParticles,
        openDrawer,
        closeDrawer,
        toggleDrawer,
        addCraving,
        updateQuantity,
        removeCraving,
        clearCravings,
        registerTargetRef,
      }}
    >
      {children}
    </CravingsContext.Provider>
  );
}

export function useCravings() {
  const context = useContext(CravingsContext);
  if (!context) {
    throw new Error("useCravings must be used within a CravingsProvider");
  }
  return context;
}
