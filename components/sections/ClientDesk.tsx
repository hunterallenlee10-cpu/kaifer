import { ArrowUpRight, FileCheck, FileWarning, IdCard, PenLine, Receipt, type LucideIcon } from "lucide-react";
import { business } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";
import type { ServiceKey } from "@/components/QuoteBuilder/types";

const TILES: { key: ServiceKey; label: string; icon: LucideIcon }[] = [
  { key: "claim", label: "File a claim", icon: FileWarning },
  { key: "idcard", label: "Auto ID card", icon: IdCard },
  { key: "certificate", label: "Certificate of insurance", icon: FileCheck },
  { key: "change", label: "Policy change", icon: PenLine },
  { key: "billing", label: "Billing question", icon: Receipt },
];

export function ClientDesk() {
  return (
    <section id="client-desk" aria-labelledby="desk-title" className="on-ink bg-ink text-paper">
      <div className="wrap section">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label text-paper/70">Client desk</p>
            <h2 id="desk-title" className="h2 mt-4">
              Already a client?
            </h2>
          </div>
          <p className="text-[1.0625rem] text-paper/75 lg:col-span-5 lg:pb-2">
            Pick a request and fill in a short form for our Cockeysville office.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {TILES.map((t) => (
            <li key={t.key} className={t.key === "claim" ? "col-span-2 md:col-span-1" : ""}>
              <QuoteButton
                preset={{ mode: "service", request: t.key }}
                className="group flex h-full min-h-[120px] w-full flex-col justify-between rounded-[6px] border border-paper/20 p-5 text-left transition-colors hover:border-paper hover:bg-paper/[0.06]"
              >
                <t.icon size={24} strokeWidth={1.5} aria-hidden="true" className="text-paper/80" />
                <span className="mt-6 block text-[1.0625rem] font-semibold leading-snug">{t.label}</span>
              </QuoteButton>
            </li>
          ))}
          <li className="col-span-2 md:col-span-1">
            <a
              href={business.erie.billPay}
              className="group flex h-full min-h-[120px] w-full flex-col justify-between rounded-[6px] border border-dashed border-paper/35 p-5 transition-colors hover:border-paper"
            >
              <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" className="text-paper/80" />
              <span className="mt-6 block text-[1.0625rem] font-semibold leading-snug">
                Pay my ERIE bill <span className="block text-[0.875rem] font-normal text-paper/70">(opens erieinsurance.com)</span>
              </span>
            </a>
          </li>
        </ul>

        <p className="mt-8 max-w-[44rem] text-[0.9375rem] text-paper/70">
          For an emergency or after hours, call your insurance company&rsquo;s 24/7 claims line. The number is on your
          policy and your ID card.
        </p>
      </div>
    </section>
  );
}
