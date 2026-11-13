"use client";

import { FileText, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { QuoteButton } from "./QuoteBuilder/QuoteButton";

/** Mobile only: Call, Client desk, Get My Quote. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[6px] md:hidden">
      <div className="grid grid-cols-[1fr_1fr_1.35fr] gap-2 px-3 py-2.5">
        <a href={business.phone.href} className="btn btn-ghost min-h-[48px] gap-1.5 px-2 text-[0.9375rem]" aria-label={`Call ${business.phone.display}`}>
          <Phone size={17} strokeWidth={1.75} aria-hidden="true" />
          Call
        </a>
        <QuoteButton preset={{ mode: "service" }} className="btn btn-ghost min-h-[48px] gap-1.5 px-2 text-[0.9375rem]">
          <FileText size={17} strokeWidth={1.75} aria-hidden="true" />
          Client desk
        </QuoteButton>
        <QuoteButton className="btn btn-primary min-h-[48px] px-2 text-[0.9375rem]">Get My Quote</QuoteButton>
      </div>
    </div>
  );
}
