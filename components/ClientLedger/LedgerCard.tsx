"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { KIND_LABEL, ledger } from "@/lib/ledger";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";

const sizeFor = (t: string) =>
  t.length < 140
    ? "text-[1.625rem] sm:text-[2rem] leading-[1.25]"
    : t.length < 330
      ? "text-[1.25rem] sm:text-[1.5rem] leading-[1.4]"
      : "text-[1.0625rem] leading-[1.6] lg:text-[1.1875rem]";

type Props = { index: number; dir: number; onStep: (delta: 1 | -1) => void };

/** The large sheet under the timeline: the year on the left, the entry on the right. */
export function LedgerCard({ index, dir, onStep }: Props) {
  const entry = ledger[index];
  const yearKey = entry.kind === "next" ? "you" : String(entry.year);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const atStart = index === 0;
  const atEnd = index === ledger.length - 1;

  return (
    <div
      className="sheet relative mt-14 grid md:grid-cols-[minmax(0,4.5fr)_minmax(0,7.5fr)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        swipe.current = e.pointerType === "touch" ? { x: e.clientX, y: e.clientY } : null;
      }}
      onPointerUp={(e) => {
        const s = swipe.current;
        swipe.current = null;
        if (!s) return;
        const dx = e.clientX - s.x;
        const dy = e.clientY - s.y;
        // A clear sideways swipe turns the page. Taps and vertical scrolls pass through.
        if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.5) onStep(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        swipe.current = null;
      }}
    >
      <span className="tab label left-6 text-accent-ink lg:left-10">
        {entry.kind === "next" ? "Next" : `Entry ${String(index + 1).padStart(2, "0")} of ${ledger.length}`}
      </span>

      <div className="flex items-center justify-between gap-4 border-b border-rule px-6 py-5 md:flex-col md:items-start md:justify-center md:border-b-0 md:border-r md:px-6 md:py-10 lg:px-10">
        <div className="relative h-[clamp(4.5rem,11vw,9.5rem)] min-w-0 flex-1 overflow-hidden md:w-full md:flex-none" aria-hidden="true">
          <AnimatePresence initial={false} mode="popLayout" custom={dir}>
            <m.span
              key={yearKey}
              custom={dir}
              variants={{
                enter: (d: number) => ({ y: `${d * 70}%`, opacity: 0 }),
                center: { y: "0%", opacity: 1 },
                exit: (d: number) => ({ y: `${d * -70}%`, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.36, ease: [0.3, 0.7, 0.2, 1] }}
              className="display absolute bottom-0 left-0 block text-[clamp(4.5rem,11vw,9.5rem)] leading-[0.9] text-accent"
            >
              {entry.kind === "next" ? "You." : entry.year}
            </m.span>
          </AnimatePresence>
        </div>

        <div className="flex shrink-0 gap-2 md:mt-8">
          <button
            type="button"
            onClick={() => onStep(-1)}
            disabled={atStart}
            aria-label="Previous entry"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink disabled:cursor-default disabled:text-ink/25 disabled:hover:border-rule"
          >
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            disabled={atEnd}
            aria-label="Next entry"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-rule text-ink transition-colors hover:border-ink disabled:cursor-default disabled:text-ink/25 disabled:hover:border-rule"
          >
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Every entry sits in the same grid cell, so the card keeps one height while you drag. */}
      <div className="grid items-center px-6 py-7 md:px-8 md:py-10 lg:px-10">
        {ledger.map((e, i) => {
          const active = i === index;
          return (
            <figure
              key={e.id}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 flex flex-col transition-opacity duration-300 ${
                active ? "visible opacity-100 max-md:animate-[fade_300ms_ease-out]" : "invisible opacity-0 max-md:hidden"
              }`}
            >
              <p className="label">
                {KIND_LABEL[e.kind]}
                {e.kind !== "next" ? <span> · {e.year}</span> : null}
              </p>
              {e.kind === "client" ? (
                <blockquote className={`display mt-4 ${sizeFor(e.text)}`}>&ldquo;{e.text}&rdquo;</blockquote>
              ) : (
                <p className={`display mt-4 ${sizeFor(e.text)}`}>{e.text}</p>
              )}
              {e.kind === "next" ? (
                <div className="mt-8">
                  <QuoteButton className="btn btn-primary" tabIndex={active ? 0 : -1}>
                    Get My Quote
                  </QuoteButton>
                </div>
              ) : (
                <figcaption className="mt-6 border-t border-rule pt-4 text-[0.9375rem] font-medium text-ink/80">
                  {e.attribution}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </div>
  );
}
