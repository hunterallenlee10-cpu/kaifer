import { Phone } from "lucide-react";
import { business } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";
import { Seal } from "@/components/Seal";

export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="on-ink border-b border-paper/15 bg-ink text-paper">
      <div className="wrap section grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div>
          <h2 id="final-title" className="display text-[clamp(2.5rem,1.4rem+4vw,4.75rem)] text-balance">
            Your name belongs in the ledger.
          </h2>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
            <QuoteButton className="btn btn-primary text-[1.0625rem]">Get My Quote</QuoteButton>
            <a href={business.phone.href} className="btn btn-ghost text-[1.0625rem]">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              Call {business.phone.display}
            </a>
          </div>
        </div>
        <Seal tone="ink" className="hidden w-[180px] md:block lg:w-[210px]" />
      </div>
    </section>
  );
}
