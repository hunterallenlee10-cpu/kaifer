import Image from "next/image";
import { photos } from "@/lib/business";

// DRAFT: confirm totals and how to describe the foundation. Amounts are only those on the checks in the photos.
const CHECKS = [
  { date: "12/3/2022", memo: "Chili IV", amount: "$3,000" },
  { date: "11/8/25", memo: "Chili III to VII", amount: "$20,000" },
  { date: "November 7, 2026", memo: "Chili 8", amount: "$5,000" },
];

export function GiveBack() {
  return (
    <section id="giving-back" aria-labelledby="give-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="max-w-[46rem]">
          <p className="label">Giving back</p>
          <h2 id="give-title" className="h2 mt-4">
            We don&rsquo;t just sell policies. We give back.
          </h2>
        </div>

        {/* The chili cook-off: an offset collage */}
        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-7">
            <figure className="sheet relative z-10 w-[92%] p-2.5 sm:w-[82%] sm:p-3">
              <Image
                src={photos.chili20k.src}
                width={photos.chili20k.width}
                height={photos.chili20k.height}
                alt="Nine people at the chili cook-off holding a $20,000 check to the Dawn Hill Fight Foundation, memo Chili III to VII, with the KIG logo on the check."
                sizes="(min-width: 1024px) 560px, 90vw"
                loading="lazy"
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="mt-2.5 border-t border-rule pt-2.5 text-[0.875rem] text-muted">
                $20,000 to the Dawn Hill Fight Foundation, from Chili III to VII.
              </figcaption>
            </figure>
            <figure className="sheet relative -mt-16 ml-auto w-[70%] p-2.5 sm:-mt-28 sm:w-[58%] sm:p-3">
              <Image
                src={photos.chili3k.src}
                width={photos.chili3k.width}
                height={photos.chili3k.height}
                alt="Eleven people, most in black KIG shirts, with a $3,000 check to the Dawn Hill Fight Foundation at Chili IV."
                sizes="(min-width: 1024px) 400px, 70vw"
                loading="lazy"
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="mt-2.5 border-t border-rule pt-2.5 text-[0.875rem] text-muted">
                Chili IV, December 2022.
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <h3 className="display text-[2rem] leading-tight">The chili cook-off</h3>
            <p className="mt-4 text-[1.0625rem] text-muted">
              The team runs a chili cook-off for the Dawn Hill Fight Foundation. These are the checks from our own
              photos, as written.
            </p>
            <table className="mt-8 w-full text-left">
              <caption className="sr-only">Checks to the Dawn Hill Fight Foundation</caption>
              <thead>
                <tr className="border-b border-ink/30">
                  <th scope="col" className="label pb-2 font-semibold">Dated</th>
                  <th scope="col" className="label pb-2 font-semibold">Memo</th>
                  <th scope="col" className="label pb-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {CHECKS.map((c) => (
                  <tr key={c.memo} className="border-b border-rule">
                    <td className="py-3.5 pr-3 text-[0.9375rem]">{c.date}</td>
                    <td className="py-3.5 pr-3 text-[0.9375rem] font-medium">{c.memo}</td>
                    <td className="display py-3.5 text-right text-[1.625rem] text-accent">{c.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chemo Comfies, H.O.P.E. and the 4-H Fair */}
        <div className="mt-20 grid gap-4 lg:grid-cols-12">
          <article className="sheet p-5 sm:p-7 lg:col-span-7">
            <div className="grid grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] gap-3 sm:gap-4">
              <Image
                src={photos.comfiesDelivery.src}
                width={photos.comfiesDelivery.width}
                height={photos.comfiesDelivery.height}
                alt="A KIG team member in a blue suit beside clear bags of handmade fleece blankets in a GBMC hospital lobby."
                sizes="(min-width: 1024px) 240px, 38vw"
                loading="lazy"
                className="block h-full max-h-[420px] w-full max-w-[428px] rounded-[3px] object-cover"
              />
              <div className="flex flex-col">
                <Image
                  src={photos.comfiesTable.src}
                  width={photos.comfiesTable.width}
                  height={photos.comfiesTable.height}
                  alt="Tables stacked with colourful handmade fleece tie blankets."
                  sizes="(min-width: 1024px) 400px, 58vw"
                  loading="lazy"
                  className="block h-auto w-full max-w-[640px] rounded-[3px]"
                />
                <h3 className="display mt-5 text-[1.75rem] leading-tight">Chemo Comfies</h3>
                <p className="mt-2 text-muted">
                  The non-profit Dottie Pope created, making handmade fleece blankets for cancer patients.
                </p>
                {/* DRAFT: confirm the GBMC delivery caption. */}
                <p className="mt-auto border-t border-rule pt-3 text-[0.875rem] text-muted">A delivery to GBMC.</p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 lg:col-span-5">
            <article className="sheet relative mt-6 p-6 sm:p-7">
              <span className="tab label left-6 sm:left-7">September 2026</span>
              <h3 className="display text-[1.75rem] leading-tight">H.O.P.E.</h3>
              <p className="mt-1 text-[0.9375rem] font-medium">Help for Oncology Problems and Emotional Support</p>
              <p className="mt-3 text-muted">
                KIG supported its annual fundraiser again this year, and Dottie serves on its board.
              </p>
            </article>
            <article className="sheet relative mt-6 p-6 sm:p-7">
              <span className="tab label left-6 sm:left-7">July 2026</span>
              <h3 className="display text-[1.75rem] leading-tight">Baltimore County 4-H Fair</h3>
              <p className="mt-3 text-muted">KIG is a donor to the fair.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
