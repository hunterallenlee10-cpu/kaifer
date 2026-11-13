import { CURRENT_YEAR, FOUNDED } from "@/lib/business";
import { ledger } from "@/lib/ledger";

/** The "Next" stop sits a short gap after the current year. */
export const NEXT_YEAR_POS = CURRENT_YEAR + 4;
export const SPAN = NEXT_YEAR_POS - FOUNDED;

/**
 * Each entry's position on the line, in years. Entries that share a year are spread
 * across that year so a drag walks through them in order.
 */
export const slots: number[] = (() => {
  const out: number[] = [];
  for (let i = 0; i < ledger.length; i++) {
    const e = ledger[i];
    if (e.kind === "next") {
      out.push(NEXT_YEAR_POS);
      continue;
    }
    const same = ledger.filter((x) => x.year === e.year);
    const k = same.indexOf(e);
    out.push(e.year + (same.length > 1 ? (k / same.length) * 0.9 : 0));
  }
  return out;
})();

export const frac = (yearPos: number) => (yearPos - FOUNDED) / SPAN;

/** CSS left for a position on the line, inset so the ends stay inside the strip. */
export const leftFor = (yearPos: number) => `calc(14px + (100% - 28px) * ${frac(yearPos).toFixed(5)})`;

export function nearestIndex(yearPos: number): number {
  let best = 0;
  let bestD = Infinity;
  slots.forEach((s, i) => {
    const d = Math.abs(s - yearPos);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

/** The last entry whose slot is at or before a position, for the sweep. */
export function indexAtOrBefore(yearPos: number): number {
  let idx = 0;
  slots.forEach((s, i) => {
    if (s <= yearPos + 1e-6) idx = i;
  });
  return idx;
}

export const yearsWithEntries = Array.from(new Set(ledger.filter((e) => e.kind !== "next").map((e) => e.year)));
