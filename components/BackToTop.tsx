"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/** Appears only after the visitor has scrolled one and a half screens. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="fixed bottom-[88px] right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-sheet text-ink transition-colors hover:border-ink md:bottom-6 md:right-6"
      aria-label="Back to top"
    >
      <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
    </a>
  );
}
