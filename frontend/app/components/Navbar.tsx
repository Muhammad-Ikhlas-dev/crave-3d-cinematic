"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Menu, X, Mail, Phone, Copy, Check, Flame } from "lucide-react";
import { useCravings } from "../context/CravingsContext";
import CravingsDrawer from "./CravingsDrawer";
import FlyingCravingOverlay from "./FlyingCravingOverlay";

// ── Contact panel sub-component ───────────────────────────────────────────────
function ContactPanel({ onClose }: { onClose: () => void }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string, type: "email" | "phone") => {
      try {
        await navigator.clipboard.writeText(text);
        if (type === "email") {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        } else {
          setCopiedPhone(true);
          setTimeout(() => setCopiedPhone(false), 2000);
        }
      } catch {
        // clipboard not available — silent fail
      }
    },
    []
  );

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock body scroll while panel is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] flex items-end justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Contact panel"
    >
      {/* Dimmed backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close contact panel"
        tabIndex={0}
      />

      {/* Panel */}
      <div
        className="contact-panel relative flex h-full max-h-screen w-full flex-col justify-between overflow-y-auto border-l border-[#1e1a16] bg-[#11100E] px-8 py-10 md:w-[480px]"
        style={{
          animation: "slideInRight 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-7 top-7 text-[#C4BAAC] transition-colors hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Top content */}
        <div>
          {/* Eyebrow */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E8A87C]">
            Get in Touch
          </p>

          {/* Heading */}
          <h2 className="mb-4 font-serif text-4xl font-light leading-tight tracking-tight text-[#f0ebe3] md:text-5xl">
            Let&apos;s Talk
            <br />
            <em className="not-italic text-[#E8A87C]">Food.</em>
          </h2>

          <p className="mb-10 max-w-sm text-sm leading-relaxed text-[#D4CCC0]">
            Whether it&apos;s a collaboration, a reservation, or just a craving
            you need to share — we&apos;re all ears.
          </p>

          {/* Divider */}
          <div className="mb-10 h-px bg-gradient-to-r from-[#44382d] to-transparent" />

          {/* Email */}
          <div className="mb-8 group">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8A87C]">
              Email
            </p>
            <div className="flex items-center justify-between">
              <a
                href="mailto:hello@crave.example.com"
                className="text-base font-medium text-[#F5EFEB] transition-colors hover:text-[#E8A87C]"
              >
                hello@crave.example.com
              </a>
              <button
                onClick={() =>
                  copyToClipboard("hello@crave.example.com", "email")
                }
                className="ml-4 flex-shrink-0 text-[#C4BAAC] transition-colors hover:text-[#E8A87C]"
                aria-label="Copy email address"
              >
                {copiedEmail ? (
                  <Check size={16} className="text-[#E8A87C]" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="mb-10">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#E8A87C]">
              Phone
            </p>
            <div className="flex items-center justify-between">
              <a
                href="tel:+12025550147"
                className="text-base font-medium text-[#F5EFEB] transition-colors hover:text-[#E8A87C]"
              >
                +1 (202) 555-0147
              </a>
              <button
                onClick={() => copyToClipboard("+12025550147", "phone")}
                className="ml-4 flex-shrink-0 text-[#C4BAAC] transition-colors hover:text-[#E8A87C]"
                aria-label="Copy phone number"
              >
                {copiedPhone ? (
                  <Check size={16} className="text-[#E8A87C]" />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Quick-action links */}
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@crave.example.com"
              className="inline-flex items-center gap-3 border border-[#44382d] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#F5EFEB] transition-all duration-300 hover:border-[#E8A87C] hover:text-[#E8A87C]"
            >
              <Mail size={14} />
              Send an email
            </a>
            <a
              href="tel:+12025550147"
              className="inline-flex items-center gap-3 border border-[#44382d] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#F5EFEB] transition-all duration-300 hover:border-[#E8A87C] hover:text-[#E8A87C]"
            >
              <Phone size={14} />
              Call us
            </a>
          </div>
        </div>

        {/* Bottom mark */}
        <p className="mt-16 text-[11px] font-medium uppercase tracking-[0.2em] text-[#8E8272]">
          CRAVE. &mdash; 2026
        </p>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { totalCount, isBadgeBouncing, openDrawer, registerTargetRef } =
    useCravings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <>
      <header
        suppressHydrationWarning
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#1e1a16] bg-[#11100E]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          suppressHydrationWarning
          className="relative mx-auto flex items-center justify-between px-6 py-4"
          aria-label="Main navigation"
        >
          {/* Leftmost: Brand logo */}
          <div className="flex items-center">
            <a href="/" aria-label="CRAVE home" suppressHydrationWarning>
              <Image
                src="/brand-logo.jpg"
                alt="CRAVE logo"
                width={124}
                height={34}
                className="h-16 w-auto object-contain"
                priority
                suppressHydrationWarning
              />
            </a>
          </div>

          {/* Center: 3 Navigation Options */}
          <ul className="absolute left-1/2 -translate-x-1/2 hidden items-center gap-10 text-[12px] font-semibold uppercase tracking-widest text-[#D4CCC0] md:flex">
            <li>
              <a
                href="#food-sections"
                className="transition-colors duration-150 ease-out hover:text-white"
              >
                Experience
              </a>
            </li>
            <li>
              <a
                href="#final"
                className="transition-colors duration-150 ease-out hover:text-white"
              >
                Our Story
              </a>
            </li>
            <li>
              <button
                onClick={() => setContactOpen(true)}
                className="transition-colors duration-150 ease-out hover:text-white cursor-pointer"
              >
                LET'S TALK
              </button>
            </li>
          </ul>

          {/* Rightmost: 2 Action Buttons (+ mobile hamburger) */}
          <div className="flex items-center gap-3">
            {/* 1. "My Cravings" Button (Cart-like with live notification badge) */}
            <button
              ref={registerTargetRef}
              onClick={openDrawer}
              aria-label={`View My Cravings (${totalCount} dishes craved)`}
              className="group relative flex items-center gap-2 rounded-full border border-[#5A4E40] bg-[#191512]/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#F5EFEB] backdrop-blur-md transition-all duration-150 ease-out hover:border-[#E8A87C] hover:text-[#E8A87C] hover:shadow-[0_0_18px_rgba(232,168,124,0.25)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A87C] cursor-pointer"
            >
              <Flame
                size={14}
                className={`transition-colors duration-150 ease-out ${
                  totalCount > 0 ? "text-[#E8A87C] animate-pulse" : "text-[#9E9282]"
                }`}
              />
              <span className="hidden sm:inline">My Cravings</span>

              {/* Notification count badge */}
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-black transition-all duration-150 ease-out ${
                  totalCount > 0
                    ? "bg-[#E8A87C] text-[#11100E] shadow-[0_0_10px_rgba(232,168,124,0.7)]"
                    : "bg-[#29221a] text-[#8E8272]"
                } ${isBadgeBouncing ? "animate-craving-pop scale-125" : ""}`}
              >
                {totalCount}
              </span>
            </button>

            {/* 2. Order Now Button */}
            <a
              href="#final"
              className="hidden border border-[#5A4E40] px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#F5EFEB] transition-all duration-150 ease-out hover:border-[#E8A87C] hover:text-[#E8A87C] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8A87C] md:block cursor-pointer"
            >
              Order Now
            </a>

            <button
              suppressHydrationWarning
              className="text-[#D4CCC0] transition-colors hover:text-white md:hidden cursor-pointer"
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="border-t border-[#2e261f] bg-[#11100E]/98 px-6 pb-6 pt-4 md:hidden">
            <ul className="flex flex-col gap-5 text-sm font-semibold uppercase tracking-widest text-[#D4CCC0]">
              <li>
                <a
                  href="#food-sections"
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors hover:text-white cursor-pointer"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#final"
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors hover:text-white cursor-pointer"
                >
                  Our Story
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setContactOpen(true);
                  }}
                  className="block transition-colors hover:text-white cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openDrawer();
                  }}
                  className="flex items-center justify-between w-full transition-colors text-[#E8A87C] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Flame size={16} />
                    My Cravings
                  </span>
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E8A87C] px-1.5 text-[10px] font-black text-[#11100E]">
                    {totalCount}
                  </span>
                </button>
              </li>
              <li>
                <a
                  href="#final"
                  onClick={() => setMenuOpen(false)}
                  className="block transition-colors text-[#E8A87C] cursor-pointer"
                >
                  Order Now
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Contact panel (portal-like, rendered at root level) */}
      {contactOpen && <ContactPanel onClose={closeContact} />}

      {/* Cravings drawer */}
      <CravingsDrawer />

      {/* Dynamic Flying Craving Particles */}
      <FlyingCravingOverlay />
    </>
  );
}
