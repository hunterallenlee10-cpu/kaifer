"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/lib/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section aria-labelledby="faq-title" className="section border-t border-rule">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label">Questions</p>
          <h2 id="faq-title" className="h2 mt-4">
            Asked and answered.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <ul className="sheet ruled">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-6 px-5 py-4 text-left text-[1.0625rem] font-semibold sm:px-7"
                    >
                      <span>{f.q}</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                          isOpen ? "border-accent text-accent" : "border-rule text-muted"
                        }`}
                      >
                        {isOpen ? <Minus size={16} strokeWidth={1.75} /> : <Plus size={16} strokeWidth={1.75} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    hidden={!isOpen}
                    className="px-5 pb-6 sm:px-7"
                  >
                    <p className="max-w-[40rem] text-muted">{f.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
