import { ArrowUpRight } from "lucide-react";
import { business, reviews } from "@/lib/business";

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="label">Reviews</p>
            <h2 id="reviews-title" className="h2 mt-4">
              4.9 on Google. Here is why.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="text-muted">
              From {business.rating.count} Google reviews, checked {business.rating.checked}.
            </p>
            <a href={business.links.maps} className="text-link mt-2 inline-flex min-h-[44px] items-center gap-1 font-semibold">
              Read all reviews on Google
              <ArrowUpRight size={17} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 gap-4 md:columns-2">
          {reviews.map((r) => (
            <figure key={r.name} className="sheet mb-4 break-inside-avoid p-6 sm:p-8">
              <blockquote className="display text-[1.3125rem] leading-[1.45] sm:text-[1.4375rem]">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-baseline justify-between gap-3 border-t border-rule pt-4">
                <span className="font-semibold">{r.name}</span>
                <span className="label">{r.town}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
