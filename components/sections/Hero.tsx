import Image from "next/image";
import { Phone } from "lucide-react";
import { business, photos } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";
import { Seal } from "@/components/Seal";
import { ShopAround } from "./ShopAround";

const FACTS = ["Family owned since 1974", "Ten insurers, one call", "4.9 on Google, 32 reviews"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="wrap pb-16 pt-8 sm:pt-12 lg:pb-28 lg:pt-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-[auto_auto_auto_auto_auto_1fr] lg:gap-x-14">
          {/* The eyebrow and the headline together are the page's only h1. */}
          <h1 id="hero-title" className="lg:col-span-7 lg:row-start-1">
            <span className="label block text-accent-ink">Independent insurance agency in Cockeysville, MD</span>
            <span className="display mt-4 block text-[clamp(2.6rem,1.3rem+4.4vw,4.55rem)] text-balance lg:mt-6">
              We don&rsquo;t work for an insurance company.{" "}
              <span className="draw-rule">We work for you.</span>
            </span>
          </h1>

          <div className="mt-7 flex flex-col gap-2 xs:flex-row xs:flex-wrap xs:items-center xs:gap-3 lg:col-span-7 lg:row-start-3 lg:mt-9">
            <QuoteButton className="btn btn-primary text-[1.0625rem]">Get My Quote</QuoteButton>
            <a href={business.phone.href} className="btn btn-ghost text-[1.0625rem]">
              <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
              Call {business.phone.display}
            </a>
          </div>

          <p className="lede mt-7 max-w-[36rem] text-[1.0625rem] text-ink/80 sm:text-[1.125rem] lg:col-span-7 lg:row-start-2 lg:mt-7">
            The Kaifer Insurance Group is a family owned insurance agency in Cockeysville, Maryland. Since 1974 we have
            compared insurers for our clients, Erie among them, for auto, home, business and life.
          </p>

          <figure className="relative mt-12 lg:col-span-5 lg:col-start-8 lg:row-span-6 lg:row-start-1 lg:mt-10 lg:self-start">
            <Seal className="absolute -left-4 -top-9 z-10 w-[92px] sm:-left-8 sm:-top-11 sm:w-[112px]" />
            <div className="sheet p-2.5 sm:p-3">
              <Image
                src={photos.hero.src}
                width={photos.hero.width}
                height={photos.hero.height}
                alt="Eight members of the Kaifer Insurance Group team in purple KIG shirts holding a $5,000 check to the Dawn Hill Fight Foundation beside the Chili 8 cook-off entry board."
                priority
                sizes="(min-width: 1240px) 470px, (min-width: 1024px) 38vw, (min-width: 640px) 90vw, 100vw"
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="mt-2.5 border-t border-rule pt-2.5 text-[0.875rem] leading-snug text-muted">
                The KIG team at Chili 8, November 7, 2026. $5,000 for the Dawn Hill Fight Foundation.
              </figcaption>
            </div>
          </figure>

          <div className="mt-10 lg:col-span-7 lg:row-start-4 lg:mt-12">
            <ShopAround />
          </div>

          <ul className="mt-6 grid gap-0 sm:grid-cols-3 lg:col-span-7 lg:row-start-5">
            {FACTS.map((f, i) => (
              <li
                key={f}
                className={`label py-2.5 text-ink/80 sm:py-1 ${i > 0 ? "border-t border-rule sm:border-l sm:border-t-0 sm:pl-4" : ""} ${i < 2 ? "sm:pr-4" : ""}`}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
