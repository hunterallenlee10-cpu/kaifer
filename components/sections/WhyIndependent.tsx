import { ArrowRight, ArrowUpRight } from "lucide-react";
import { business, insurers } from "@/lib/business";
import { QuoteButton } from "@/components/QuoteBuilder/QuoteButton";

export function WhyIndependent() {
  return (
    <section id="why-independent" aria-labelledby="why-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="label">Why independent</p>
            <h2 id="why-title" className="h2 mt-4">
              An independent agent shops. A company agent sells.
            </h2>
            <div className="mt-8 space-y-6 text-[1.125rem] leading-relaxed">
              <p>
                <strong className="font-semibold">&ldquo;{business.lines.notForCompany}&rdquo;</strong> That means one
                conversation and ten insurers compared. We give you our recommendation. You make the decision.
              </p>
              <p>
                It matters most on a bad day. In our words: &ldquo;{business.lines.claimPromise}&rdquo;
              </p>
            </div>
            {/* DRAFT: confirm Mark is happy to feature this. */}
            <figure className="mt-10 border-l-2 border-accent pl-6">
              <blockquote className="display-italic text-[1.625rem] leading-snug sm:text-[1.875rem]">
                &ldquo;{business.result.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4">
                <span className="label text-ink">{business.result.source}</span>
                <span className="mt-1 block text-[0.9375rem] text-muted">{business.result.caveat}</span>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6 lg:pt-2">
            <div className="sheet relative mt-6 lg:mt-0">
              <div className="flex items-baseline justify-between gap-4 border-b border-rule px-5 py-4 sm:px-6">
                <h3 className="display text-[1.375rem]">Who we compare for you</h3>
                <span className="label">10 insurers</span>
              </div>
              <table className="w-full text-left">
                <caption className="sr-only">The ten insurance companies The Kaifer Insurance Group represents</caption>
                <thead>
                  <tr className="border-b border-rule">
                    <th scope="col" className="label w-14 py-2.5 pl-5 font-semibold sm:w-16 sm:pl-6">
                      No.
                    </th>
                    <th scope="col" className="label py-2.5 font-semibold">
                      Insurer
                    </th>
                    <th scope="col" className="label py-2.5 pr-5 text-right font-semibold sm:pr-6">
                      Known for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {insurers.map((ins, i) => (
                    <tr key={ins.name} className={i > 0 ? "border-t border-rule" : ""}>
                      <td className="py-3.5 pl-5 align-top text-[0.875rem] text-muted sm:pl-6">
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 pr-3 align-top">
                        <span className={ins.featured ? "font-semibold" : "font-medium"}>{ins.name}</span>
                        {ins.featured ? (
                          <span className="ml-2 inline-block rounded-[4px] bg-accent px-2 py-0.5 align-[2px] text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-white">
                            Our specialty
                          </span>
                        ) : null}
                      </td>
                      <td className="whitespace-nowrap py-3.5 pr-5 text-right align-top text-[0.9375rem] text-muted sm:pr-6">
                        {ins.tag ?? ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* The agency's own ERIE links. Each carries agent number BB1367 where ERIE supports it. */}
              <div className="border-t border-rule bg-paper/60 px-5 py-4 sm:px-6">
                <p className="label">Erie online</p>
                <ul className="mt-1 flex flex-wrap gap-x-6">
                  {[
                    { href: business.erie.autoQuote, label: "Start an ERIE auto quote" },
                    { href: business.erie.lifeCalculator, label: "ERIE life insurance calculator" },
                    { href: business.erie.billPay, label: "Pay an ERIE bill" },
                  ].map((l) => (
                    <li key={l.href}>
                      <a href={l.href} className="text-link inline-flex min-h-[44px] items-center gap-1 text-[0.9375rem] font-medium">
                        {l.label}
                        <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="text-[0.8125rem] text-muted">These open erieinsurance.com, linked to our agency.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-[1fr_1.2fr_0.95fr]">
          <article className="sheet flex flex-col p-6 lg:p-7">
            <p className="label">New to us</p>
            <h3 className="display mt-3 text-[1.625rem] leading-tight">Two minutes, or one phone call.</h3>
            <p className="mt-3 text-muted">Tell us what you want covered and we compare it across our insurers.</p>
            <QuoteButton className="btn btn-primary mt-6 self-start">Get My Quote</QuoteButton>
          </article>
          <article className="sheet flex flex-col p-6 lg:p-7">
            <p className="label">At claim time</p>
            <h3 className="display mt-3 text-[1.625rem] leading-tight">We stay on your side.</h3>
            <p className="mt-3 text-muted">&ldquo;{business.lines.claimPromise}&rdquo;</p>
            <QuoteButton preset={{ mode: "service", request: "claim" }} className="btn btn-ghost mt-6 self-start bg-sheet">
              File a claim
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </QuoteButton>
          </article>
          <article className="sheet flex flex-col p-6 md:col-span-2 lg:col-span-1 lg:p-7">
            <p className="label">Run a business?</p>
            <h3 className="display mt-3 text-[1.625rem] leading-tight">We meet on your hours.</h3>
            <p className="mt-3 text-muted">For business owners, &ldquo;{business.lines.afterHours}&rdquo;</p>
            <QuoteButton
              preset={{ coverage: ["business"] }}
              className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 self-start pt-5 font-semibold text-accent-ink hover:underline hover:underline-offset-4"
            >
              Quote my business
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </QuoteButton>
          </article>
        </div>
      </div>
    </section>
  );
}
