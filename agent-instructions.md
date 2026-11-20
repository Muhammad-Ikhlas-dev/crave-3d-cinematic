# AGENT INSTRUCTIONS & VIBE CODING SYSTEM SPEC
## Project: CRAVE — 60 FPS Scroll-Driven 3D Food Experience

> **Note for the AI Agent (Antigravity / Cursor / Claude Code):**  
> You are acting as my **Lead Graphics & Frontend Engineer**. I am the **Product Architect & Creative Director**.  
> We are building **CRAVE**—a high-end, 60 FPS scroll-driven cinematic food experience.  
> Read every phase, technical invariant, and verification rule in this document carefully before writing code. We work in **Spec-Driven Loops**: plan, implement, verify against constraints, and maintain zero regressions.

---

## 0. AGENT CORE OPERATING PRINCIPLES (LOOP ENGINEERING)

To prevent hallucination, memory leaks, and layout regressions, you must follow this **Execution Loop** on every single task:

```text
[My Prompt / Direction]
       ↓
1. DISCOVERY & CONTEXT CHECK: Inspect existing components, DPR scaling, and GSAP timelines.
       ↓
2. ATOMIC IMPLEMENTATION: Write clean, scoped, modular code. Touch only the relevant component.
       ↓
3. STATIC VERIFICATION GATE: Run `npx tsc --noEmit`. Zero TypeScript errors allowed.
       ↓
4. INVARIANT & REGRESSION ASSERTION:
   - Does it maintain 60 FPS?
   - Is the video ratio preserved without distortion or artificial border blur?
   - Does it work on laptop screens (height <= 850px) WITHOUT altering large XL desktop screens?
       ↓
[Done & Report Back]
```

### Strict Rules You Must Never Break:
1. **Never mutate working sections**: When optimizing or styling one section, never break or re-style adjacent canvas sections.
2. **Never use fake border blurs**: If a 16:9 video is letterboxed on ultrawide or mobile, fill the letterbox with clean `#0d0d0d` background. Do not add hacky CSS blurs or canvas glow fills on the sides.
3. **Dual-Axis Viewport Awareness**: Never rely on width-only media queries (`xl:` / `min-width: 1280px`). Laptops are wide ($1366\text{px}$–$1920\text{px}$) but vertically short ($650\text{px}$–$750\text{px}$). Always check both width AND height so interactive buttons are never pushed off-screen.
4. **Memory Safety**: We have 10 image sequences (~3,000 frames total). Never load 3,000 full-res images into memory simultaneously. Always use the 3-tier staggered loading protocol.

---

## PHASE 1: Architectural Foundation & Smooth Virtual Scroll

We are building a premium, cinematic food experience website for brand **CRAVE**.

### 1. Technology Stack
- Next.js (App Router) + React 19 + TypeScript (Strict)
- Tailwind CSS v4
- GSAP 3 + ScrollTrigger + `@gsap/react`
- Lenis Smooth Scroll
- Lucide React

### 2. Design System & Aesthetics
- **Background**: Deep obsidian `#11100E` and canvas background `#0d0d0d`.
- **Accents**: Champagne gold (`#DFBA8F`), warm flame (`#E8A87C`), golden saffron (`#E8C547`, `#F4C842`), molten chocolate (`#D48A67`).
- **Typography**: Ultra-clean uppercase sans-serif paired with large editorial headline clamp sizes.
- **Inspiration**: Apple product launch storytelling, high-end food commercial cinematography.

### 3. Deliverables for Phase 1
- Set up Lenis smooth scrolling and tie it to the GSAP ScrollTrigger ticker.
- Build sticky full-screen viewport skeletons (`h-screen w-full overflow-hidden`).
- Build minimal fixed luxury navigation (Brand logo, story link, menu CTA, cravings counter).
- Prepare placeholder containers for future Canvas-driven food sequences.
- Keep components modular and strictly type-safe.

---

## PHASE 2: Asset Pipeline & Slicing [MY PART — DO NOT TOUCH]

*(I will generate high-speed macro food videos and slice them into optimized sequential 16:9 JPEG frames at 60 FPS. You do not need to generate fake animations or mock assets.)*

**Extracted Asset Directories:**
- `/ref-images/master-kitchen/frames/` (300 frames — Entry sequence into master kitchen)
- `/ref-images/pizza/frames/` (300 frames — 01: Hand-Stretched Pizza cheese pull)
- `/ref-images/burger-kitchen/frames/` (300 frames — Transition sequence into grill station)
- `/ref-images/burger/frames/` (300 frames — 02: Double Brioche Smash Burger)
- `/ref-images/juice-kitchen/frames/` (300 frames — Transition sequence into beverage bar)
- `/ref-images/mango-lassi/frames/` (300 frames — 03: Alphonso Mango Lassi pour)
- `/ref-images/fries-kitchen/frames/` (300 frames — Transition sequence into frying station)
- `/ref-images/french-fries/frames/` (300 frames — 04: Golden Hand-Cut Fries)
- `/ref-images/lava-cake-kitchen/frames/` (300 frames — Transition sequence into pastry station)
- `/ref-images/lava-cake/frames/` (300 frames — 05: Molten Dark Chocolate Lava Cake)

---

## PHASE 3: Core Canvas Scrubbing Engine (Pizza Station Prototype)

Now that the pizza assets are in `/ref-images/pizza/frames/`, build the production-grade Canvas scrubbing engine.

### Requirements:
1. **HTML5 Canvas 2D**: Draw frames dynamically based on scroll progress via GSAP ScrollTrigger.
2. **DPR Awareness**: Scale canvas dimensions by `window.devicePixelRatio` (capped at `2.0` for GPU efficiency) to ensure razor-sharp rendering on Retina/4K displays.
3. **Scrub Sync**:
   - Scrolling down advances the sequence.
   - Scrolling up reverses the sequence.
   - Stopping freezes the exact current frame smoothly.
4. **Staggered 3-Tier Preloading (Memory Invariant)**:
   - **Tier 1 (Instant)**: Load the first 15 frames immediately so frame 0 renders with zero delay.
   - **Tier 2 (Skeleton)**: Load every 6th frame (`step = 6`) after 50ms so user can scrub immediately with a smooth preview.
   - **Tier 3 (Full)**: Hydrate all remaining frames in the background after 300ms.
5. **Clean Canvas Disposal**: On unmount, cancel all `requestAnimationFrame` loops, clear intervals, and call `ctx.revert()`.

---

## PHASE 4: Multi-Station Pipeline (10 Interleaved Canvases)

Scale the prototype into a continuous 10-section culinary master journey. Interleave a kitchen transition fly-through before each hero food item.

### The 10-Station Timeline Sequence:
```text
[00: Master Kitchen Entry]      — scrollHeight: 4  (400vh)
  ↓
[01: Pizza Station]             — scrollHeight: 5  (500vh)
  ↓
[1.5: Burger Kitchen Fly-Through] — scrollHeight: 4  (400vh)
  ↓
[02: Burger Station]            — scrollHeight: 5  (500vh)
  ↓
[2.5: Juice Kitchen Fly-Through]  — scrollHeight: 4  (400vh)
  ↓
[03: Mango Lassi Station]       — scrollHeight: 5  (500vh)
  ↓
[3.5: Fries Kitchen Fly-Through]  — scrollHeight: 4  (400vh)
  ↓
[04: French Fries Station]      — scrollHeight: 5  (500vh)
  ↓
[4.5: Lava Cake Fly-Through]    — scrollHeight: 4  (400vh)
  ↓
[05: Chocolate Lava Cake]       — scrollHeight: 5  (500vh)
```

### Seam Vignette Standards:
- Seamlessly blend incoming and outgoing camera motions using subtle linear vignette overlays (`rgba(13,13,13,0.85)`).
- Vignette height must remain subtle (`h-10 sm:h-14`) so it does not obscure the food or camera action.

---

## PHASE 5: Viewport Math & Dual-Axis Hardening (Crucial)

Fix the real-world display issues discovered during device testing.

### Issue 1: Video Aspect Ratio Clipping
- **Problem**: When using `cover` scaling (`Math.max(w/iw, h/ih)`), laptops and mobile screens crop the top/bottom or sides of the video.
- **Your Solution**: Use strict **contain scaling**:
  ```typescript
  const scale = Math.min(w / iw, h / ih);
  const dw = Math.round(iw * scale);
  const dh = Math.round(ih * scale);
  const dx = Math.round((w - dw) / 2);
  const dy = Math.round((h - dh) / 2);
  ctx.fillStyle = "#0d0d0d";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, dx, dy, dw, dh);
  ```
- **Constraint**: No blur effects on borders. Keep the canvas background a solid `#0d0d0d`.

### Issue 2: "I CRAVE IT" Button Hidden on Laptops
- **Problem**: On large XL desktop screens ($1440\text{p}$, $4\text{K}$, $1080\text{p}$ monitors), the text layout and "I Crave It" button fit easily. But on laptops ($1366\times 768$, $1536\times 864$), browser tabs and the taskbar reduce viewport height to $650\text{px}$–$750\text{px}$. The massive headlines push the button off-screen.
- **Your Solution**: Implement a **Dual-Axis Responsive System** in `globals.css`:
  - Default / Laptop mode (`height < 875px`): Dynamically scale title font-size with `clamp(1.75rem, 4.2vh, 2.85rem)`, reduce padding (`py-6`), tighten margins, and hide the bottom scroll indicator.
  - Large Screen mode (`min-width: 1280px` AND `min-height: 875px`): Restore 100% of the spacious original editorial design (`clamp(2.75rem, 6.5vw, 5.5rem)`, `py-20`, `pt-8`, full indicator).
- **Invariant**: **DO NOT touch or shrink the layout on large XL monitors.** The fix must target laptops specifically without regressing large desktop monitors.

---

## PHASE 6: Reactive Cart State & Audio-Visual Micro-Interactions

Bridge the cinematic canvas visuals with an interactive ordering workflow.

### Requirements:
1. **Cravings Context (`useCravings`)**:
   - Track craved items with quantities, prices, course numbers, and dish tags.
   - Persist cravings in React state with optimistic updates.
2. **Interactive Crave Button (`<CraveButton />`)**:
   - Visual states: Normal $\rightarrow$ Hover (micro-sparkle) $\rightarrow$ Active (haptic bounce + "Craved! ✨" badge morph).
   - Radial glow matching each dish's signature color.
   - Quantity pill (`x1`, `x2`) if already in cart.
3. **Cravings Drawer & Sound Bar Animation**:
   - Slide-out drawer displaying selected dishes with total price calculation and item removal.
   - Interactive sound bar wave animation with randomized CSS bar timing.
4. **Motion Safety**:
   - Wrap all GSAP animations in `window.matchMedia("(prefers-reduced-motion: reduce)")`.
   - On reduced-motion systems, render static high-res hero frames without forced scroll hijacking.

---

## 7. STATIC VERIFICATION CHECKLIST (RUN BEFORE CONCLUDING ANY TURN)

Whenever you make any change, execute these verification commands:

```bash
# 1. Type check the entire codebase
cd frontend && npx tsc --noEmit

# 2. Check for layout shift or unhandled exceptions
# (Ensure exit code 0 on all components)
```

**Acceptance Criteria for Completion:**
- [x] All 10 canvas sequences scrub at 60 FPS.
- [x] Contain math shows 100% of the video frame on mobile, laptop, and ultra-wide.
- [x] "I CRAVE IT" button is 100% visible and centered on laptop screens.
- [x] Large desktop screens ($> 875\text{px}$ height and $\ge 1280\text{px}$ width) retain full spacious luxury proportions.
- [x] No console warnings, no memory leaks, zero TypeScript errors.
