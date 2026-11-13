import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business, CURRENT_YEAR } from "@/lib/business";
import { IS_LIVE } from "@/lib/site";
import { Seal } from "@/components/Seal";

const COVER = [
  { href: "/#auto-insurance", label: "Auto insurance" },
  { href: "/#home-insurance", label: "Home insurance" },
  { href: "/#business-insurance", label: "Business insurance" },
  { href: "/#life-insurance", label: "Life insurance" },
  { href: "/#coverage", label: "Flood, umbrella and more" },
];

export function Footer() {
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="wrap pb-10 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="display text-[2rem] leading-tight sm:text-[2.5rem]">{business.name}</p>
            <p className="mt-2 text-paper/75">Helping you protect what matters most.</p>
            <a
              href={business.phone.href}
              className="display mt-8 inline-block text-[2.25rem] leading-none underline decoration-paper/30 decoration-1 underline-offset-[10px] hover:decoration-paper sm:text-[2.75rem]"
            >
              {business.phone.display}
            </a>
            <p className="mt-5">
              <a href={`mailto:${business.email}`} className="underline decoration-paper/30 underline-offset-4 hover:decoration-paper">
                {business.email}
              </a>
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="label text-paper/70">Visit</h2>
              <address className="mt-3 not-italic leading-relaxed">
                120 Cockeysville Rd #100
                <br />
                Cockeysville, MD 21030
              </address>
              <a
                href={business.links.maps}
                className="mt-3 inline-flex min-h-[44px] items-center gap-1 underline decoration-paper/30 underline-offset-4 hover:decoration-paper"
              >
                Directions on Google Maps
                <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <div>
              <h2 className="label text-paper/70">Hours</h2>
              <p className="mt-3 leading-relaxed">
                Monday to Friday
                <br />
                8:30 AM to 5:30 PM
                <br />
                <span className="text-paper/70">Closed Saturday and Sunday</span>
              </p>
              <p className="mt-3 text-paper/70">Fax {business.fax}</p>
            </div>
            <div>
              <h2 className="label text-paper/70">Coverage</h2>
              <ul className="mt-2">
                {COVER.map((c) => (
                  <li key={c.href}>
                    <a href={c.href} className="inline-flex min-h-[40px] items-center hover:underline hover:underline-offset-4">
                      {c.label}
                    </a>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="inline-flex min-h-[40px] items-center hover:underline hover:underline-offset-4">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 grid items-center gap-8 border-t border-paper/15 pt-8 md:grid-cols-[auto_1fr_auto]">
          <Seal tone="ink" className="w-[88px]" />
          <p className="max-w-[44rem] text-[0.9375rem] leading-relaxed text-paper/75">
            The Kaifer Insurance Group provides auto, home, life and business insurance to all of Maryland, Pennsylvania,
            Virginia and DC. We have clients in Cockeysville, Parkville, Catonsville, Forest Hill and Baltimore.
          </p>
          <ul className="flex gap-2">
            <li>
              <a
                href={business.links.facebook}
                aria-label="The Kaifer Insurance Group on Facebook"
                className="inline-flex min-h-[44px] items-center gap-1 rounded-[6px] border border-paper/25 px-3.5 text-[0.9375rem] hover:border-paper"
              >
                Facebook
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={business.links.x}
                aria-label="The Kaifer Insurance Group on X"
                className="inline-flex min-h-[44px] items-center gap-1 rounded-[6px] border border-paper/25 px-3.5 text-[0.9375rem] hover:border-paper"
              >
                X
                <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-1 text-[0.875rem] text-paper/65 sm:flex-row sm:justify-between">
          <p>© {CURRENT_YEAR} The Kaifer Insurance Group</p>
          {!IS_LIVE ? <p>Concept preview by Lee Enterprises Unlimited.</p> : null}
        </div>
      </div>
    </footer>
  );
}
