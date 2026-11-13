"use client";

import { animate } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { insurers } from "@/lib/business";

/**
 * The Shop-Around: ten paper slips, one per insurer, dealt from the left like cards,
 * fanned and overlapping, then squared up into a flat ruled row. It plays once.
 * The row's final layout is rendered from the start, so nothing shifts.
 */
export function ShopAround() {
  const rowRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const slips = Array.from(row.querySelectorAll<HTMLElement>("[data-slip]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => slips.forEach((el) => el.classList.remove("slip-pending"));
    if (reduced) {
      reveal();
      return;
    }

    const rowBox = row.getBoundingClientRect();
    const controls = slips.map((el, i) => {
      const box = el.getBoundingClientRect();
      const dx = box.left - rowBox.left; // distance from the row's left edge
      const dy = box.top - rowBox.top; // later lines start from the first line
      const fan = (i - (slips.length - 1) / 2) * 2.6; // degrees
      const pileX = -dx + i * 16; // overlapping pile near the left edge
      const pileY = -dy + (i % 2 === 0 ? -3 : 3);
      el.style.zIndex = String(i + 1);
      el.classList.remove("slip-pending");
      return animate(
        el,
        {
          x: [-dx - 140, pileX, 0],
          y: [-dy - 10, pileY, 0],
          rotate: [-14, fan, 0],
          opacity: [0, 1, 1],
        },
        {
          duration: 0.62,
          delay: i * 0.06,
          times: [0, 0.42, 1],
          ease: [
            [0.2, 0.8, 0.3, 1],
            [0.55, 0, 0.2, 1],
          ],
        },
      );
    });
    return () => {
      controls.forEach((c) => c.stop());
      slips.forEach((el) => {
        el.style.transform = "";
        el.style.opacity = "";
      });
    };
  }, []);

  return (
    <div>
      <p className="label mb-3 text-ink">One call. Ten insurers compared.</p>
      <ul
        ref={rowRef}
        aria-label="The ten insurers we compare"
        className="relative flex flex-wrap gap-x-2 gap-y-2.5 border-b border-rule pb-4"
      >
        {insurers.map((ins) => (
          <li
            key={ins.name}
            data-slip
            className="slip-pending relative rounded-[4px] border border-rule bg-sheet px-2.5 pb-[7px] pt-[9px] will-change-transform"
          >
            {ins.featured ? (
              <span aria-hidden="true" className="absolute inset-x-2.5 top-[3px] h-[2px] rounded-full bg-accent" />
            ) : null}
            <span className="block text-[0.75rem] font-semibold uppercase leading-none tracking-[0.1em] text-ink">
              {ins.short}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
