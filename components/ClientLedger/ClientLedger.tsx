"use client";

import { AnimatePresence, animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FOUNDED, YEARS_IN_BUSINESS, business } from "@/lib/business";
import { JUMPS, KIND_LABEL, SWEEP_TARGET, ledger } from "@/lib/ledger";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";
import { Timeline } from "./Timeline";
import { indexAtOrBefore, nearestIndex, slots } from "./geometry";

const sizeFor = (t: string) =>
  t.length < 140
    ? "text-[1.625rem] sm:text-[2rem] leading-[1.25]"
    : t.length < 330
      ? "text-[1.25rem] sm:text-[1.5rem] leading-[1.4]"
      : "text-[1.0625rem] sm:text-[1.1875rem] leading-[1.6]";

const valueText = (i: number) => {
  const e = ledger[i];
  return e.kind === "next" ? "Next. You." : `${e.year}. ${e.label}.`;
};

export function ClientLedger() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [focused, setFocused] = useState(false);
  const pos = useMotionValue(slots[0]);
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const sweep = useRef<AnimationPlaybackControls | null>(null);
  const settle = useRef<AnimationPlaybackControls | null>(null);
  const reduced = useRef(false);

  const choose = (i: number, opts: { glide?: boolean } = {}) => {
    const next = Math.max(0, Math.min(ledger.length - 1, i));
    setIndex((prev) => {
      if (next !== prev) setDir(next > prev ? 1 : -1);
      return next;
    });
    settle.current?.stop();
    if (opts.glide === false || reduced.current) pos.set(slots[next]);
    else settle.current = animate(pos, slots[next], { duration: 0.42, ease: [0.25, 0.8, 0.25, 1] });
  };

  const interrupt = () => {
    touched.current = true;
    sweep.current?.stop();
    sweep.current = null;
  };

  // Sweep once from 1974 to Gerard's story the first time the band is in view.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        if (reduced.current) {
          choose(SWEEP_TARGET, { glide: false });
          return;
        }
        sweep.current = animate(pos, slots[SWEEP_TARGET], {
          duration: 1.2,
          ease: [0.45, 0, 0.2, 1],
          onUpdate: (v) => {
            const i = indexAtOrBefore(v);
            setIndex((prev) => (prev === i ? prev : (setDir(1), i)));
          },
          onComplete: () => setIndex(SWEEP_TARGET),
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      sweep.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On narrow screens, keep the handle in view inside the scrolling strip.
  useEffect(() => {
    const sc = strip.current;
    if (!sc || sc.scrollWidth <= sc.clientWidth) return;
    const f = (slots[index] - FOUNDED) / (slots[slots.length - 1] - FOUNDED);
    const x = 14 + (sc.scrollWidth - 28) * f;
    if (x < sc.scrollLeft + 40 || x > sc.scrollLeft + sc.clientWidth - 40) {
      sc.scrollTo({ left: x - sc.clientWidth / 2, behavior: reduced.current ? "auto" : "smooth" });
    }
  }, [index]);

  const entry = ledger[index];
  const yearKey = entry.kind === "next" ? "you" : String(entry.year);

  return (
    <section ref={section} id="client-family" aria-labelledby="ledger-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label">The Client-Family Ledger</p>
            <h2 id="ledger-title" className="h2 mt-4">
              {YEARS_IN_BUSINESS} years of <span className="whitespace-nowrap">Client-Family.</span> Drag through them.
            </h2>
          </div>
          <p className="text-[1.0625rem] text-muted lg:col-span-5 lg:pb-2">
            &ldquo;{business.lines.clientFamily}&rdquo;{" "}
            <span className="whitespace-nowrap text-[0.9375rem]">KIG on Facebook, March 20, 2020.</span>
          </p>
        </div>

        <div className="mt-12">
          <div ref={strip} className="no-scrollbar -mx-4 snap-x overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
            <Timeline
              pos={pos}
              activeYear={entry.kind === "next" ? "next" : entry.year}
              focused={focused}
              onPick={(yp, phase) => {
                interrupt();
                if (phase === "start") document.getElementById("ledger-range")?.focus({ preventScroll: true });
                settle.current?.stop();
                if (phase === "end") choose(nearestIndex(yp));
                else {
                  pos.set(yp);
                  const i = nearestIndex(yp);
                  setIndex((prev) => (prev === i ? prev : (setDir(i > prev ? 1 : -1), i)));
                }
              }}
            />
          </div>

          <label htmlFor="ledger-range" className="sr-only">
            Move through the Client-Family Ledger
          </label>
          <input
            id="ledger-range"
            type="range"
            min={0}
            max={ledger.length - 1}
            step={1}
            value={index}
            aria-valuetext={valueText(index)}
            onFocus={(e) => setFocused(e.currentTarget.matches(":focus-visible"))}
            onBlur={() => setFocused(false)}
            onKeyDown={() => {
              interrupt();
              setFocused(true);
            }}
            onPointerDown={interrupt}
            onChange={(e) => {
              interrupt();
              choose(Number(e.target.value));
            }}
            className="ledger-range mt-2 block h-11 w-full cursor-pointer md:sr-only"
          />
        </div>

        <div className="sheet relative mt-14 grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="relative flex items-end border-b border-rule px-6 pb-5 pt-7 md:border-b-0 md:border-r md:px-10 md:pb-10 md:pt-10">
            <span className="tab label left-6 text-accent-ink md:left-10">{entry.kind === "next" ? "Next" : `Entry ${String(index + 1).padStart(2, "0")} of ${ledger.length}`}</span>
            <div className="relative h-[clamp(4.5rem,11vw,9.5rem)] w-full overflow-hidden" aria-hidden="true">
              <AnimatePresence initial={false} mode="popLayout" custom={dir}>
                <motion.span
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
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid px-6 py-7 md:px-10 md:py-10">
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

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="label mr-2">Jump to</span>
          {JUMPS.map((j) => {
            const i = ledger.findIndex((e) => e.id === j.id);
            return (
              <button
                key={j.id}
                type="button"
                onClick={() => {
                  interrupt();
                  choose(i);
                }}
                aria-controls="ledger-range"
                className={`min-h-[44px] rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                  index === i ? "border-accent bg-sheet text-accent-ink" : "border-rule bg-sheet hover:border-ink/40"
                }`}
              >
                {j.label}
              </button>
            );
          })}
          <span className="ml-auto hidden text-[0.875rem] text-muted md:inline">
            Drag the handle, tap a year, or use the arrow keys.
          </span>
        </div>
      </div>
    </section>
  );
}
