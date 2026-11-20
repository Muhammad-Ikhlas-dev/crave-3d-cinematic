"use client";

import { useState, useCallback, useEffect } from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("hello@crave.example.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      /* silent fail */
    }
  }, []);

  return (
    <footer className="border-t border-[#1a1612] bg-[#11100E] px-6 py-14">
      <div className="mx-auto max-w-7xl">
        {/* Top row */}
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {/* Brand column */}
          <div>
            <p className="mb-3 font-serif text-lg font-light tracking-[0.2em] text-[#f0ebe3]">
              CRAVE.
            </p>
            <p className="max-w-[240px] text-xs leading-relaxed text-[#C4BAAC]">
              A cinematic food storytelling experience crafted to transport you.
            </p>
          </div>

          {/* Nav column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8A87C]">
              Navigate
            </p>
            <ul className="flex flex-col gap-3 text-[11px] font-semibold uppercase tracking-widest text-[#D4CCC0]">
              <li>
                <a
                  href="#food-sections"
                  className="transition-colors hover:text-white"
                >
                  Experience
                </a>
              </li>
              <li>
                <a
                  href="#final"
                  className="transition-colors hover:text-white"
                >
                  Our Story
                </a>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8A87C]">
              Contact
            </p>
            <ul className="flex flex-col gap-3.5">
              {/* Email */}
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="flex-shrink-0 text-[#E8A87C]" />
                <a
                  href="mailto:hello@crave.example.com"
                  className="text-xs font-medium text-[#F5EFEB] transition-colors hover:text-[#E8A87C]"
                >
                  hello@crave.example.com
                </a>
                <button
                  onClick={copyEmail}
                  className="ml-1 text-[#C4BAAC] transition-colors hover:text-[#E8A87C]"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check size={12} className="text-[#E8A87C]" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </li>
              {/* Phone */}
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="flex-shrink-0 text-[#E8A87C]" />
                <a
                  href="tel:+12025550147"
                  className="text-xs font-medium text-[#F5EFEB] transition-colors hover:text-[#E8A87C]"
                >
                  +1 (202) 555-0147
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="border-t border-[#2e261f] pt-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#8E8272]">
            &copy; 2026 CRAVE. All rights reserved. &mdash; Placeholder contact details only.
          </p>
        </div>
      </div>
    </footer>
  );
}
