"use client";

import { LazyMotion, MotionConfig, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FOUNDED, YEARS_IN_BUSINESS, business } from "@/lib/business";
import { JUMPS, SWEEP_TARGET, ledger } from "@/lib/ledger";
import { LedgerCard } from "./LedgerCard";
import { Timeline } from "./Timeline";
import { indexAtOrBefore, nearestIndex, slots } from "./geometry";

type Animate = (typeof import("./motion-features"))["animate"];

// The animation engine loads once, when the band is about a screen away from the viewport
// (or the visitor touches the ledger). There is one ledger per page, so module state is enough.
let animateFn: Animate | null = null;
let arm = () => {};
const armed = new Promise<void>((resolve) => (arm = resolve));
const loadFeatures = () =>
  armed
    .then(() => import("./motion-features"))
    .then((mod) => {
      animateFn = mod.animate;
      return mod.domAnimation;
    });

const valueText = (i: number) => {
  const e = ledger[i];
  return e.kind === "next" ? "Next. You." : `${e.year}. ${e.label}.`;
};

export function ClientLedger() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [focused, setFocused] = useState(false);
  const [spoken, setSpoken] = useState("");
  const pos = useMotionValue(slots[0]);
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const sweep = useRef<AnimationPlaybackControls | null>(null);
  const settle = useRef<AnimationPlaybackControls | null>(null);
  const reduced = useRef(false);
  const choose = (i: number, opts: { glide?: boolean; announce?: boolean } = {}) => {
    const next = Math.max(0, Math.min(ledger.length - 1, i));
    setIndex((prev) => {
      if (next !== prev) setDir(next > prev ? 1 : -1);
      return next;
    });
    if (opts.announce !== false) {
      const e = ledger[next];
      setSpoken(e.kind === "next" ? e.text : `${e.text} ${e.attribution}.`);
    }
    settle.current?.stop();
    if (opts.glide === false || reduced.current || !animateFn) pos.set(slots[next]);
    else settle.current = animateFn(pos, slots[next], { duration: 0.42, ease: [0.25, 0.8, 0.25, 1] });
  };

  const interrupt = () => {
    touched.current = true;
    arm();
    sweep.current?.stop();
    sweep.current = null;
  };

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = section.current;
    if (!el) return;

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        arm();
      },
      { rootMargin: "900px 0px" },
    );
    near.observe(el);

    // Sweep once from 1974 to Gerard's story the first time the band is in view.
    const inView = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        inView.disconnect();
        if (reduced.current) {
          choose(SWEEP_TARGET, { glide: false, announce: false });
          return;
        }
        arm();
        loadFeatures().then(() => {
          if (touched.current || !animateFn) return;
          sweep.current = animateFn(pos, slots[SWEEP_TARGET], {
            duration: 1.2,
            ease: [0.45, 0, 0.2, 1],
            onUpdate: (v) => {
              const i = indexAtOrBefore(v);
              setIndex((prev) => (prev === i ? prev : (setDir(1), i)));
            },
            onComplete: () => setIndex(SWEEP_TARGET),
          });
        });
      },
      { threshold: 0.35 },
    );
    inView.observe(el);

    return () => {
      near.disconnect();
      inView.disconnect();
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
          <div ref={strip} className="no-scrollbar -mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
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

        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadFeatures} strict>
            <LedgerCard
              index={index}
              dir={dir}
              onStep={(delta) => {
                interrupt();
                choose(index + delta);
              }}
            />
          </LazyMotion>
        </MotionConfig>

        {/* Read out the full entry after a visitor moves, without repeating it during the opening sweep. */}
        <p className="sr-only" aria-live="polite">
          {spoken}
        </p>

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
                aria-pressed={index === i}
                className={`min-h-[44px] rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
                  index === i ? "border-accent bg-sheet text-accent-ink" : "border-rule bg-sheet hover:border-ink/40"
                }`}
              >
                {j.label}
              </button>
            );
          })}
          <span className="ml-auto hidden text-[0.875rem] text-muted lg:inline">
            Drag the handle, tap a year, or use the arrow keys.
          </span>
        </div>
      </div>
    </section>
  );
}
