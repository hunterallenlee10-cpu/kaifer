import { ArrowRight, Briefcase, CarFront, HeartPulse, House, Layers, type LucideIcon } from "lucide-react";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";
import type { CoverageKey } from "@/components/QuoteBuilder/types";

type Tile = {
  id: string;
  key: CoverageKey;
  title: string;
  icon: LucideIcon;
  line: string;
  rows: string[];
  cta: string;
  span: string;
};

const TILES: Tile[] = [
  {
    id: "business-insurance",
    key: "business",
    title: "Business",
    icon: Briefcase,
    line: "Coverage for the business you built and the people who work in it.",
    rows: [
      "Business owners package",
      "General liability",
      "Commercial property",
      "Commercial auto",
      "Workers' compensation",
      "Professional liability (E&O)",
      "Cyber liability",
      "Surety bonds",
    ],
    cta: "Get a business quote",
    span: "lg:col-span-8",
  },
  {
    id: "auto-insurance",
    key: "auto",
    title: "Auto",
    icon: CarFront,
    line: "Coverage for your cars and the people who drive them.",
    rows: ["Motorcycle", "Collector car", "Motor home and RV"],
    cta: "Get an auto quote",
    span: "lg:col-span-4",
  },
  {
    id: "home-insurance",
    key: "home",
    title: "Home",
    icon: House,
    line: "Coverage for the place you live and what is in it.",
    rows: ["Homeowners", "Condominium", "High net worth coverage"],
    cta: "Get a home quote",
    span: "lg:col-span-5",
  },
  {
    id: "life-insurance",
    key: "life",
    title: "Life",
    icon: HeartPulse,
    line: "Coverage for the people who count on you.",
    rows: ["Individual life", "Individual disability", "Final expense"],
    cta: "Get a life quote",
    span: "lg:col-span-4",
  },
];

const ALSO = ["Flood", "Personal umbrella", "Renters", "Condominium", "Boat and marine", "Rental property", "Valuable items"];

export function Coverage() {
  return (
    <section id="coverage" aria-labelledby="coverage-title" className="section">
      <div className="wrap">
        <div className="max-w-[44rem]">
          <p className="label">Coverage</p>
          <h2 id="coverage-title" className="h2 mt-4">
            What we cover
          </h2>
          <p className="lede mt-5">
            Auto, home, business and life, for clients across Maryland, Pennsylvania, Virginia and DC. Pick a line and
            we will compare it for you.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
          {TILES.map((t) => (
            <article
              key={t.id}
              id={t.id}
              className={`sheet group relative flex flex-col p-6 transition-colors hover:border-ink/40 lg:p-8 ${t.span} ${
                t.key === "business" ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="display text-[2rem] leading-none">{t.title}</h3>
                <t.icon size={26} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
              </div>
              <p className="mt-4 max-w-[30rem] text-muted">{t.line}</p>
              <ul className={`mt-6 ${t.key === "business" ? "grid gap-x-8 sm:grid-cols-2" : ""}`}>
                {t.rows.map((r) => (
                  <li key={r} className="border-t border-rule py-2.5 text-[0.9375rem] font-medium">
                    {r}
                  </li>
                ))}
              </ul>
              <QuoteButton
                preset={{ coverage: [t.key] }}
                className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-6 font-semibold text-accent-ink after:absolute after:inset-0 after:rounded-[6px] after:content-[''] group-hover:underline group-hover:underline-offset-4"
              >
                {t.cta}
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
              </QuoteButton>
            </article>
          ))}

          <article className="sheet group relative flex flex-col bg-paper p-6 transition-colors hover:border-ink/40 md:col-span-2 lg:col-span-3 lg:p-7">
            <div className="flex items-start justify-between gap-4">
              <h3 className="display text-[1.625rem] leading-none">Also</h3>
              <Layers size={22} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
            </div>
            <ul className="mt-5">
              {ALSO.map((r) => (
                <li key={r} className="border-t border-rule py-2 text-[0.9375rem]">
                  {r}
                </li>
              ))}
            </ul>
            <QuoteButton
              preset={{ coverage: ["other"] }}
              className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-5 font-semibold text-accent-ink after:absolute after:inset-0 after:rounded-[6px] after:content-[''] group-hover:underline group-hover:underline-offset-4"
            >
              Ask about these
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </QuoteButton>
          </article>
        </div>
      </div>
    </section>
  );
}
