import Image from "next/image";
import { business, photos, team } from "@/lib/business";

export function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="section border-t border-rule">
      <div className="wrap">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-12 lg:max-w-[46rem]">
            <p className="label">The team</p>
            <h2 id="team-title" className="h2 mt-4">
              The people who pick up the phone.
            </h2>
            <p className="lede mt-5">
              A family agency in its second generation. In the agency&rsquo;s words, Tim &ldquo;
              {business.lines.goldStandard}&rdquo;. Clients mention Patrick, Debbie, Mark and Tim by name in their
              reviews.
            </p>
          </div>

          <div className="lg:col-span-6">
            <figure className="sheet p-2.5 sm:p-3">
              <Image
                src={photos.orioles.src}
                width={photos.orioles.width}
                height={photos.orioles.height}
                alt="Seven Kaifer Insurance Group team members in Orioles gear inside the office, around a cookout table, with an Orioles flag on the wall."
                sizes="(min-width: 1240px) 560px, (min-width: 1024px) 46vw, 100vw"
                loading="lazy"
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="mt-2.5 border-t border-rule pt-2.5 text-[0.875rem] text-muted">
                Orioles day at the office, 120 Cockeysville Road.
              </figcaption>
            </figure>
            <figure className="sheet relative ml-auto mt-4 w-[72%] p-2.5 sm:mr-8 sm:w-[52%] sm:p-3">
              <Image
                src={photos.dressedUp.src}
                width={photos.dressedUp.width}
                height={photos.dressedUp.height}
                alt="Seven Kaifer Insurance Group team members dressed up around a table at a fundraiser lunch."
                sizes="(min-width: 1024px) 320px, 60vw"
                loading="lazy"
                className="block h-auto w-full rounded-[3px]"
              />
              <figcaption className="mt-2.5 border-t border-rule pt-2.5 text-[0.875rem] text-muted">The KIG team.</figcaption>
            </figure>
          </div>

          <div className="lg:col-span-6">
            <div className="sheet">
              <div className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-rule px-5 py-2.5 sm:px-6">
                <span className="label" aria-hidden="true" />
                <span className="label">Name and role</span>
              </div>
              <ul className="ruled">
                {team.map((m) => (
                  <li key={m.name} className="grid grid-cols-[3.25rem_1fr] gap-4 px-5 py-4 sm:px-6">
                    <span
                      aria-hidden="true"
                      className="display flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-accent text-[1.0625rem] font-semibold text-accent"
                    >
                      {m.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="display text-[1.3125rem] leading-tight">{m.name}</p>
                      <p className="label mt-1 text-accent-ink">{m.role}</p>
                      <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted">{m.fact}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{business.licences}</p>
            <p className="display-italic mt-4 text-[1.125rem] text-muted">Yes, there is a fish tank. Patrick is in charge of it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
