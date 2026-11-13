import { ArrowRight } from "lucide-react";
import { seasonal } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";

// DRAFT: seasonal, from their November 2 blog post. Swap each season.
export function Seasonal() {
  return (
    <aside aria-label="Seasonal note" className="border-y border-rule bg-paper">
      <div className="wrap flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8">
        <p className="label shrink-0 text-accent-ink">November</p>
        <p className="text-[1.0625rem] leading-snug">
          <strong className="font-semibold">{seasonal.lead}</strong> {seasonal.body}
        </p>
        <QuoteButton
          preset={{ coverage: ["auto"], note: seasonal.note }}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 self-start font-semibold text-accent-ink hover:underline hover:underline-offset-4 md:ml-auto md:self-center"
        >
          {seasonal.cta}
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
        </QuoteButton>
      </div>
    </aside>
  );
}
