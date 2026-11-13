import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { business, photos } from "@/lib/business";
import { QuoteForm } from "@/components/QuoteBuilder/QuoteForm";
import { ClientDesk } from "@/components/sections/ClientDesk";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { agencySchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Contact Kaifer Insurance Group | Cockeysville, MD Insurance" },
  description:
    "Call, email or visit The Kaifer Insurance Group at 120 Cockeysville Rd #100, Cockeysville, MD 21030. Open weekdays. Request a quote or policy service online.",
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    title: "Contact Kaifer Insurance Group | Cockeysville, MD Insurance",
    description: "Call (410) 584-7610, email, or visit 120 Cockeysville Rd #100, Cockeysville, MD 21030.",
  },
  twitter: {
    title: "Contact Kaifer Insurance Group | Cockeysville, MD Insurance",
    description: "Call (410) 584-7610, email, or visit 120 Cockeysville Rd #100, Cockeysville, MD 21030.",
  },
};

const TILES = [
  { icon: Phone, label: "Call", value: business.phone.display, href: business.phone.href, note: business.hours.short },
  { icon: Mail, label: "Email", value: business.email, href: `mailto:${business.email}`, note: "For quotes and policy questions." },
  { icon: MapPin, label: "Visit", value: "120 Cockeysville Rd #100", href: business.links.maps, note: "Cockeysville, MD 21030" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[agencySchema(), breadcrumbSchema()]} />
      <section aria-labelledby="contact-title" className="border-b border-rule">
        <div className="wrap pb-14 pt-10 sm:pt-16 lg:pb-20 lg:pt-24">
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.9375rem] text-muted">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="text-link">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">Contact</li>
            </ol>
          </nav>
          <h1 id="contact-title" className="label text-accent-ink">
            Contact our insurance agency in Cockeysville, MD
          </h1>
          <p className="display mt-5 text-[clamp(2.75rem,1.4rem+5vw,5rem)]">Call, email or come by.</p>
          <p className="lede mt-5 max-w-[38rem]">
            An independent insurance agency since 1974. Open {business.hours.summary}.
          </p>

          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {TILES.map((t) => (
              <li key={t.label}>
                <a
                  href={t.href}
                  className="sheet group flex h-full flex-col p-6 transition-colors hover:border-ink/40 lg:p-7"
                >
                  <span className="flex items-center justify-between">
                    <span className="label">{t.label}</span>
                    <t.icon size={22} strokeWidth={1.5} aria-hidden="true" className="text-accent" />
                  </span>
                  <span className="display mt-6 break-words text-[1.625rem] leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
                    {t.value}
                  </span>
                  <span className="mt-2 text-[0.9375rem] text-muted">{t.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="request-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label">Quote Builder</p>
            <h2 id="request-title" className="h2 mt-4">
              Request a quote or policy service.
            </h2>
            <div className="sheet mt-8 flex flex-col overflow-hidden">
              <QuoteForm variant="inline" />
            </div>
          </div>

          <aside aria-labelledby="visit-title" className="lg:col-span-5">
            <div className="sheet relative mt-6 p-6 lg:mt-[7.5rem] lg:p-7">
              <span className="tab label left-6 lg:left-7">Visit</span>
              <h2 id="visit-title" className="display text-[1.75rem] leading-tight">
                The Cockeysville office
              </h2>
              <Image
                src={photos.lobby.src}
                width={photos.lobby.width}
                height={photos.lobby.height}
                alt="Inside the Cockeysville office: the blue KIG sign on the wall, the front desk and chairs."
                sizes="320px"
                loading="lazy"
                className="mt-5 block h-auto w-full max-w-[320px] rounded-[3px]"
              />
              <dl className="ruled mt-5">
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                  <dt className="label pt-1">Address</dt>
                  <dd>
                    <address className="not-italic">{business.address.full}</address>
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                  <dt className="label pt-1">Hours</dt>
                  {/* DRAFT: the current site says 9:00am to 5:00pm. Confirm with Mark. */}
                  <dd>
                    {business.hours.summary}
                    <br />
                    <span className="text-muted">{business.hours.weekend}</span>
                  </dd>
                </div>
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 py-3">
                  <dt className="label pt-1">Phone</dt>
                  <dd>
                    <a href={business.phone.href} className="text-link">
                      {business.phone.display}
                    </a>
                    <span className="block text-muted">Fax {business.fax}</span>
                  </dd>
                </div>
              </dl>
              <a href={business.links.maps} className="btn btn-ghost mt-4 w-full bg-sheet">
                Get directions on Google Maps
                <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <div className="sheet mt-4 overflow-hidden p-2.5">
              <iframe
                title="Map of 120 Cockeysville Rd #100, Cockeysville, MD 21030"
                src={business.links.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full rounded-[3px] border-0"
              />
            </div>
          </aside>
        </div>
      </section>

      <ClientDesk />
      <FinalCta />
    </>
  );
}
