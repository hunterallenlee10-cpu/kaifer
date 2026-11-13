import { business } from "@/lib/business";

const STEPS = [
  { n: "1", title: "Tell us what you want covered.", body: "Two minutes in the Quote Builder, or one phone call." },
  { n: "2", title: "We compare.", body: "Ten insurers, your coverage, side by side." },
  { n: "3", title: "You choose.", body: "We set it up, and we are the ones you call afterwards." },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="label">How it works</p>
            <h2 id="how-title" className="h2 mt-4">
              Three steps, one conversation.
            </h2>
          </div>
          <p className="text-[1.0625rem] text-muted lg:col-span-6 lg:pb-2">&ldquo;{business.lines.mission}&rdquo;</p>
        </div>
        <ol className="mt-12 grid border-y border-ink/25 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`flex gap-5 py-7 md:block md:px-8 md:py-10 ${i > 0 ? "border-t border-rule md:border-l md:border-t-0" : "md:pl-0"}`}
            >
              <span className="display block text-[3rem] leading-none text-accent md:text-[4rem]" aria-hidden="true">
                {s.n}
              </span>
              <div className="md:mt-6">
                <h3 className="text-[1.1875rem] font-semibold leading-snug">
                  <span className="sr-only">Step {s.n}. </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
