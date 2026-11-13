"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { business } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";

export const NAV_LINKS = [
  { href: "/#why-independent", label: "Why independent" },
  { href: "/#client-family", label: "Client-Family" },
  { href: "/#coverage", label: "Coverage" },
  { href: "/#team", label: "Team" },
  { href: "/#giving-back", label: "Giving back" },
  { href: "/#client-desk", label: "Client desk" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    sheet.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-[6px] focus:bg-sheet focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center gap-4 lg:h-[72px]">
        <Link href="/" className="mr-auto flex shrink-0 items-center py-1" aria-label="The Kaifer Insurance Group, home">
          {/* A plain, pre-sized image: the hero photo keeps the network to itself. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-nav.webp" width={220} height={106} alt="" decoding="async" className="h-[42px] w-auto lg:h-[48px]" />
        </Link>

        <nav aria-label="Sections" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-[6px] px-2.5 py-2 text-[0.9375rem] font-medium text-ink/80 transition-colors hover:text-ink hover:underline hover:decoration-rule hover:underline-offset-8"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={business.phone.href}
          className="hidden min-h-[44px] items-center gap-2 px-1 text-[0.9375rem] font-semibold text-ink hover:text-accent-ink sm:inline-flex"
        >
          <Phone size={17} strokeWidth={1.75} aria-hidden="true" className="text-accent-ink" />
          {business.phone.display}
        </a>
        <QuoteButton className="btn btn-primary hidden min-h-[44px] px-4 text-[0.9375rem] md:inline-flex">Get My Quote</QuoteButton>

        <button
          ref={burger}
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-[6px] text-ink hover:bg-sheet xl:hidden"
          aria-expanded={open}
          aria-controls="menu-sheet"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} strokeWidth={1.75} aria-hidden="true" /> : <Menu size={24} strokeWidth={1.75} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="menu-sheet"
        ref={sheet}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-rule bg-paper lg:top-[72px] xl:hidden"
      >
        <nav aria-label="Menu" className="wrap flex min-h-full flex-col py-6">
          <ul className="ruled border-y border-rule">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[64px] items-center justify-between gap-4 py-3 text-[1.5rem] font-medium"
                >
                  <span className="display">{l.label}</span>
                  <span className="label tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-[64px] items-center justify-between gap-4 py-3 text-[1.5rem] font-medium"
              >
                <span className="display">Contact</span>
                <span className="label">07</span>
              </Link>
            </li>
          </ul>
          <div className="mt-8 grid gap-3">
            <QuoteButton className="btn btn-primary min-h-[56px] text-[1.0625rem]" onPointerUp={() => setOpen(false)}>
              Get My Quote
            </QuoteButton>
            <a href={business.phone.href} className="btn btn-ghost min-h-[56px] text-[1.0625rem]">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              Call {business.phone.display}
            </a>
          </div>
          <p className="mt-6 text-[0.9375rem] text-muted">
            {business.address.full}
            <br />
            {business.hours.short}
          </p>
        </nav>
      </div>
    </header>
  );
}
