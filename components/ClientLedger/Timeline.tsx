"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { CURRENT_YEAR, FOUNDED } from "@/lib/business";
import { NEXT_YEAR_POS, SPAN, leftFor, yearsWithEntries } from "./geometry";

type Props = {
  pos: MotionValue<number>;
  activeYear: number | "next";
  focused: boolean;
  onPick: (yearPos: number, phase: "start" | "move" | "end") => void;
};

const YEARS = Array.from({ length: CURRENT_YEAR - FOUNDED + 1 }, (_, i) => FOUNDED + i);

/** The ruled line drawn to scale, with a tick per year and a round accent handle. */
export function Timeline({ pos, activeYear, focused, onPick }: Props) {
  const lineRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; dragging: boolean } | null>(null);
  const handle = useRef<HTMLDivElement>(null);

  // The handle follows the motion value directly, so it tracks a drag even before the
  // animation engine has loaded.
  useEffect(() => {
    const place = (v: number) => {
      if (handle.current) handle.current.style.left = leftFor(v);
    };
    place(pos.get());
    return pos.on("change", place);
  }, [pos]);

  const yearAt = (clientX: number) => {
    const el = lineRef.current;
    if (!el) return FOUNDED;
    const r = el.getBoundingClientRect();
    const f = Math.min(1, Math.max(0, (clientX - r.left - 14) / (r.width - 28)));
    return FOUNDED + f * SPAN;
  };

  return (
    <div
      ref={lineRef}
      className="relative h-[104px] min-w-[1080px] cursor-pointer select-none md:min-w-0"
      style={{ touchAction: "pan-x" }}
      aria-hidden="true"
      onPointerDown={(e) => {
        const onHandle = (e.target as HTMLElement).closest("[data-handle]");
        const dragNow = e.pointerType !== "touch" || !!onHandle;
        drag.current = { id: e.pointerId, x: e.clientX, dragging: dragNow };
        if (dragNow) {
          e.currentTarget.setPointerCapture(e.pointerId);
          onPick(yearAt(e.clientX), "start");
        }
      }}
      onPointerMove={(e) => {
        if (drag.current?.dragging && drag.current.id === e.pointerId) onPick(yearAt(e.clientX), "move");
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        if (!d) return;
        if (d.dragging) onPick(yearAt(e.clientX), "end");
        else if (Math.abs(e.clientX - d.x) < 8) onPick(yearAt(e.clientX), "end");
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      {/* The hairline */}
      <div className="absolute inset-x-[14px] top-[44px] h-px bg-ink/25" />

      {YEARS.map((y) => {
        const decade = y % 10 === 0;
        const isFounding = y === FOUNDED;
        const labelled = decade || isFounding || y === CURRENT_YEAR;
        return (
          <div key={y} className="absolute top-[44px]" style={{ left: leftFor(y) }}>
            <div
              className={`absolute left-0 w-px -translate-x-1/2 ${decade || isFounding ? "-top-[12px] h-[24px] bg-ink/45" : "-top-[5px] h-[10px] bg-ink/20"}`}
            />
            {labelled ? (
              <span
                className={`absolute top-[18px] -translate-x-1/2 text-[0.75rem] font-semibold tracking-[0.06em] ${
                  activeYear === y ? "text-accent-ink" : "text-muted"
                } ${!decade && !isFounding ? "md:max-lg:hidden" : ""}`}
              >
                {y}
              </span>
            ) : null}
          </div>
        );
      })}

      {/* The "Next" stop */}
      <div className="absolute top-[44px]" style={{ left: leftFor(NEXT_YEAR_POS) }}>
        <div className="absolute -top-[12px] left-0 h-[24px] w-px -translate-x-1/2 border-l border-dashed border-ink/45" />
        <span
          className={`absolute top-[18px] -translate-x-1/2 text-[0.75rem] font-semibold uppercase tracking-[0.12em] ${
            activeYear === "next" ? "text-accent-ink" : "text-muted"
          }`}
        >
          Next
        </span>
      </div>
      <div
        className="absolute top-[44px] h-px border-t border-dashed border-ink/30"
        style={{ left: leftFor(CURRENT_YEAR), right: 14 }}
      />

      {/* A dot at every year that has an entry */}
      {yearsWithEntries.map((y) => (
        <span
          key={y}
          className={`absolute top-[44px] h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper ${
            activeYear === y ? "bg-accent" : "bg-accent/70"
          }`}
          style={{ left: leftFor(y), boxSizing: "content-box" }}
        />
      ))}

      {/* The handle that rides the line */}
      <div
        ref={handle}
        data-handle
        className="absolute top-[44px] z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab p-2.5 active:cursor-grabbing"
        style={{ left: leftFor(pos.get()), touchAction: "none" }}
      >
        <span
          className={`block h-[26px] w-[26px] rounded-full border-[3px] border-paper bg-accent ring-1 ring-accent ${
            focused ? "outline-2 outline-offset-4 outline-accent-ink" : ""
          }`}
        />
      </div>
    </div>
  );
}
