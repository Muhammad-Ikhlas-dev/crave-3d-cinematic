# CRAVE // 60 FPS Scroll-Driven Cinematic 3D Food Experience

<p align="center">
  <img src="./public/favicon.ico" alt="CRAVE Logo" width="64" height="64" />
</p>

<p align="center">
  <strong>An award-caliber, scroll-driven interactive culinary web experience.</strong><br>
  Built with <strong>Next.js 15</strong>, <strong>React 19</strong>, <strong>GSAP ScrollTrigger</strong>, <strong>HTML5 Canvas</strong>, and <strong>Lenis Smooth Scroll</strong>.<br>
  <em>Engineered and vibe coded using autonomous agent loop protocols.</em>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#the-10-canvas-pipeline">Canvas Pipeline</a> •
  <a href="#agentic-vibe-coding">Vibe Coding Spec</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

## Overview

**CRAVE** is an immersive digital culinary showcase where scrolling controls the continuous playback of high-speed macro food cinematography. Across a $4,500\text{vh}$ timeline, users journey through 10 seamless visual stages—interleaving master kitchen fly-through transitions with hero food stations.

Every frame sequence is scrubbed dynamically on hardware-accelerated **HTML5 Canvas 2D contexts**, locked at **60 FPS**, fully responsive across ultra-wide monitors, laptops, and mobile screens.

---

## Key Features

- **60 FPS Scroll Scrubbing**: Sub-pixel virtual scroll synchronization between **Lenis** and **GSAP ScrollTrigger**.
- **10 Sequential Canvas Stations**: 5 Hero dishes (Pizza, Double Smash Burger, Mango Lassi, Golden Fries, Molten Lava Cake) interleaved with 5 cinematic kitchen transition fly-throughs.
- **3-Tier Staggered Image Hydration**: Prevents GPU memory spikes across 3,000+ uncompressed $1080\text{p}$ frames via tiered preloading (Instant Tier 1 $\rightarrow$ Skeleton Step-6 Cadence $\rightarrow$ Background Hydration).
- **DPR-Aware Canvas Scaling**: Automatic compensation for high-density Retina and 4K displays (`window.devicePixelRatio` capped at 2.0).
- **Mathematical Contain-Fit (No Fake Blurs)**: Strict `scale = Math.min(w/iw, h/ih)` geometry rendering over pure `#0d0d0d` obsidian background—eliminating ugly artificial blurs or letterbox cropping.
- **Dual-Axis Breakpoint Engineering**: Custom `@media (min-width: 1280px) and (min-height: 875px)` architecture ensuring the "I Crave It" button is 100% visible and centered on compact laptop viewports ($650\text{px}$–$750\text{px}$ height) while preserving spacious editorial layouts on desktop XL displays.
- **Interactive Cravings Order System**: Optimistic cart state with sound-wave audio feedback, micro-sparkle button morphs, and slide-out cravings drawer.
- **Motion Safety (A11y)**: Built-in `prefers-reduced-motion: reduce` detection disabling scrub hijacking in favor of static high-resolution hero stills.

---

## The 10-Canvas Timeline Pipeline

```text
[00: Master Kitchen Entry]        ➔ 400vh  — Deep zoom through culinary prep line
  ↓
[01: Hand-Stretched Pizza]       ➔ 500vh  — Macro cheese pull & wood-fired crust
  ↓
[1.5: Burger Kitchen Transition]  ➔ 400vh  — Station pan to grill
  ↓
[02: Brioche Smash Burger]       ➔ 500vh  — Flame-kissed smash & melting cheddar
  ↓
[2.5: Beverage Bar Transition]   ➔ 400vh  — Fly-through to chilled prep counter
  ↓
[03: Alphonso Mango Lassi]       ➔ 500vh  — Golden pour vortex into glass
  ↓
[3.5: Fryer Station Transition]  ➔ 400vh  — Fast zoom to frying station
  ↓
[04: Golden Hand-Cut Fries]      ➔ 500vh  — Crisp seasoning & double-fry crunch
  ↓
[4.5: Dessert Station Fly-Through] ➔ 400vh  — Transition to pastry counter
  ↓
[05: Molten Dark Lava Cake]      ➔ 500vh  — Dark chocolate shell & molten core flow
```

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 15 (App Router)** | Concurrent rendering, server component boundaries, static optimization |
| **React 19** | Modern hooks, optimistic UI state, concurrent hydration |
| **TypeScript (Strict)** | Strict null checks, timeline parameter typing, zero compile errors |
| **GSAP 3.12 + ScrollTrigger** | Scroll-driven timeline scrubbing, pinned viewport mechanics |
| **Lenis** | Smooth virtual scroll normalization |
| **HTML5 Canvas 2D** | Hardware-accelerated DPR-scaled frame rasterization |
| **Tailwind CSS v4** | Scoped CSS variables, dual-axis media queries |
| **Lucide React** | Editorial luxury iconography |

---

## Agentic "Vibe Coding" Protocol

This codebase was built using **Spec-Driven Loop Engineering** rather than unstructured chat prompts.

For full technical specifications on how autonomous AI agents were orchestrated to build this project—including invariant preservation, dual-axis viewport math, memory management, and static verification loops—read the complete specification:

📄 **[Read `agent-instructions.md`](./agent-instructions.md)**

---

## Getting Started

### Prerequisites
- **Node.js**: v18.18.0 or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crave-3d-cinematic.git
   cd crave-3d-cinematic/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Check & Verification
Run strict static analysis across all canvas components and animations:
```bash
npx tsc --noEmit
```

---

## Project Structure

```text
frontend/
├── app/
│   ├── components/
│   │   ├── KitchenCanvas.tsx            # Master kitchen sequence
│   │   ├── PizzaCanvas.tsx              # 01 Pizza sequence + editorial overlay
│   │   ├── BurgerKitchenCanvas.tsx      # Burger kitchen transition sequence
│   │   ├── BurgerCanvas.tsx             # 02 Burger sequence + editorial overlay
│   │   ├── JuiceKitchenCanvas.tsx       # Juice kitchen transition sequence
│   │   ├── JuiceCanvas.tsx              # 03 Mango Lassi sequence + overlay
│   │   ├── FriesKitchenCanvas.tsx       # Fries kitchen transition sequence
│   │   ├── FriesCanvas.tsx              # 04 Fries sequence + overlay
│   │   ├── LavaCakeKitchenCanvas.tsx    # Lava cake transition sequence
│   │   ├── LavaCakeCanvas.tsx           # 05 Lava Cake sequence + overlay
│   │   ├── CraveButton.tsx              # Interactive CTA with haptics & particles
│   │   ├── CravingsDrawer.tsx           # Slide-out cart drawer & sound-wave visualizer
│   │   ├── Navbar.tsx                   # Luxury fixed navigation
│   │   ├── Hero.tsx                     # Entrance hero section
│   │   └── FoodExperience.tsx           # Master container orchestrating all 10 timelines
│   ├── context/
│   │   └── CravingsContext.tsx          # React Context for cart state & fly-to-cart
│   ├── globals.css                      # Design tokens & dual-axis responsive rules
│   ├── layout.tsx                       # Root layout with fonts & Lenis wrapper
│   └── page.tsx                         # Page entry point
├── public/
│   └── ref-images/                      # 10 frame sequences (300 frames each)
├── agent-instructions.md                # Autonomous Agent System Specification
├── package.json
└── tsconfig.json
```

---

## License

MIT © CRAVE Culinary Lab. All rights reserved.
