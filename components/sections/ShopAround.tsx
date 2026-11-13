"use client";

import { useLayoutEffect, useRef } from "react";
import { insurers } from "@/lib/business";

/**
 * The Shop-Around: ten paper slips, one per insurer, dealt from the left like cards,
 * fanned and overlapping, then squared up into a flat ruled row. It plays once.
 * The row's final layout is rendered from the start, so nothing shifts. The motion runs
 * on the compositor (Web Animations API), so it costs the main thread almost nothing.
 */
export function ShopAround() {
  const rowRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const slips = Array.from(row.querySelectorAll<HTMLElement>("[data-slip]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof row.animate !== "function") {
      slips.forEach((el) => el.classList.remove("slip-pending"));
      return;
    }

    const rowBox = row.getBoundingClientRect();
    const boxes = slips.map((el) => el.getBoundingClientRect());
    const anims = slips.map((el, i) => {
      const dx = boxes[i].left - rowBox.left; // distance from the row's left edge
      const dy = boxes[i].top - rowBox.top; // later lines start from the first line
      const fan = (i - (slips.length - 1) / 2) * 2.6; // degrees
      const pileX = -dx + i * 16; // an overlapping pile near the left edge
      const pileY = -dy + (i % 2 === 0 ? -3 : 3);
      el.style.zIndex = String(i + 1);
      el.classList.remove("slip-pending");
      return el.animate(
        [
          { transform: `translate(${-dx - 140}px, ${-dy - 10}px) rotate(-14deg)`, opacity: 0, easing: "cubic-bezier(.2,.8,.3,1)" },
          { transform: `translate(${pileX}px, ${pileY}px) rotate(${fan}deg)`, opacity: 1, offset: 0.42, easing: "cubic-bezier(.55,0,.2,1)" },
          { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        ],
        { duration: 620, delay: i * 60, fill: "backwards" },
      );
    });
    return () => anims.forEach((a) => a.cancel());
  }, []);

  return (
    <div>
      <p className="label mb-3 text-ink">One call. Ten insurers compared.</p>
      <ul
        ref={rowRef}
        aria-label="The ten insurers we compare"
        className="relative flex flex-wrap gap-x-2 gap-y-2.5 border-b border-rule pb-4 lg:border-b-0 lg:pb-0"
      >
        {insurers.map((ins) => (
          <li
            key={ins.name}
            data-slip
            className="slip-pending relative rounded-[4px] border border-rule bg-sheet px-2.5 pb-[7px] pt-[9px]"
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
