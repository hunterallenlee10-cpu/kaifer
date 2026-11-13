import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { business } from "@/lib/business";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Kaifer Insurance Group" },
  description: "This page is not in the ledger. Head back to The Kaifer Insurance Group home page or call (410) 584-7610.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="section">
      <div className="wrap max-w-[48rem]">
        <p className="label text-accent-ink">Error 404</p>
        <h1 id="nf-title" className="display mt-5 text-[clamp(2.5rem,1.5rem+4vw,4.25rem)]">
          This page is not in the ledger.
        </h1>
        <p className="lede mt-6">The link may be old, or the address may have a typo. Everything we do is one click or one call away.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <Link href="/" className="btn btn-primary">
            Back to the home page
          </Link>
          <a href={business.phone.href} className="btn btn-ghost">
            <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
            Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
