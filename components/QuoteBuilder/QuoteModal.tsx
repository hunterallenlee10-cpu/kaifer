"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useQuote } from "./QuoteContext";
import dynamic from "next/dynamic";

// The form code loads the first time the builder opens, not with the page.
const QuoteForm = dynamic(() => import("./QuoteForm").then((m) => m.QuoteForm), { ssr: false });

/** The Quote Builder as a modal. Native <dialog> makes the page inert behind it. */
export function QuoteModal() {
  const { isOpen, preset, session, close, returnFocus } = useQuote();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const root = document.documentElement;
    if (isOpen && !d.open) {
      d.showModal();
      root.style.overflow = "hidden";
      d.querySelector<HTMLElement>("h2")?.focus();
    } else if (!isOpen && d.open) {
      d.close();
    }
    if (!isOpen) {
      root.style.overflow = "";
    }
  }, [isOpen]);

  // Keep Tab inside the dialog, even in browsers that let focus reach the address bar.
  const onKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab" || !ref.current) return;
    const items = Array.from(
      ref.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => el.offsetParent !== null || el.classList.contains("sr-only"));
    if (!items.length) return;
    const first = items[0];
    const lastEl = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="quote-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClose={() => {
        if (isOpen) close();
        returnFocus();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
      className="m-0 h-[100dvh] max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-ink/55 sm:m-auto sm:h-auto sm:max-h-[min(92dvh,860px)] sm:w-[min(760px,calc(100%-48px))] sm:rounded-[6px]"
    >
      {isOpen ? (
        <div className="relative flex h-full max-h-[100dvh] flex-col sm:h-auto overflow-y-auto overscroll-contain border-rule bg-sheet sm:max-h-[min(92dvh,860px)] sm:rounded-[6px] sm:border">
          <button
            type="button"
            onClick={close}
            aria-label="Close the Quote Builder"
            className="absolute right-2 top-2 z-10 flex h-11 w-11 items-center justify-center rounded-[6px] text-muted hover:bg-paper hover:text-ink sm:right-3 sm:top-3"
          >
            <X size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <QuoteForm key={session} preset={preset} titleId="quote-title" variant="modal" onClose={close} />
        </div>
      ) : null}
    </dialog>
  );
}
