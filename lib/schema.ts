import { business, coverage, photos } from "./business";
import { faqs } from "./faq";
import { absolute } from "./site";

// Structured data. Only true things: no aggregateRating, no review markup, no prices, no awards.
// geo is left out because it cannot be derived with certainty here.

const AGENCY_ID = () => `${absolute("/")}#agency`;

export function agencySchema() {
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": AGENCY_ID(),
    name: business.name,
    alternateName: business.shortName,
    url: absolute("/"),
    logo: absolute(photos.logo.png),
    image: absolute(photos.hero.src),
    telephone: business.phone.e164,
    faxNumber: "+14105847614",
    email: business.email,
    foundingDate: String(business.founded),
    slogan: business.legalTagline,
    description:
      "A family owned independent insurance agency in Cockeysville, Maryland, comparing ten insurers for auto, home, business and life insurance since 1974.",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    // DRAFT: hours from the Google Business Profile. Confirm with Mark.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: business.hours.days.map((d) => `https://schema.org/${d}`),
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    areaServed: [
      { "@type": "State", name: "Maryland" },
      { "@type": "State", name: "Pennsylvania" },
      { "@type": "State", name: "Virginia" },
      { "@type": "AdministrativeArea", name: "District of Columbia" },
    ],
    hasMap: business.links.maps,
    sameAs: [business.links.facebook, business.links.x],
    knowsAbout: [...coverage.personal.slice(0, 6), ...coverage.business.slice(0, 5), ...coverage.life.slice(0, 2)],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

const SERVICES = [
  { id: "auto-insurance", name: "Auto insurance", type: "Auto insurance", text: "Auto insurance compared across the agency's insurers, including motorcycle, collector car and motor home and RV coverage." },
  { id: "home-insurance", name: "Home insurance", type: "Homeowners insurance", text: "Homeowners, condominium, renters and high net worth home coverage compared across the agency's insurers." },
  { id: "business-insurance", name: "Business insurance", type: "Commercial insurance", text: "Business owners packages, general liability, commercial property, commercial auto, workers' compensation and more." },
  { id: "life-insurance", name: "Life insurance", type: "Life insurance", text: "Individual life, individual disability, final expense and fixed annuities." },
];

export function serviceSchemas() {
  return SERVICES.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absolute("/")}#${s.id}`,
    name: s.name,
    serviceType: s.type,
    description: s.text,
    url: `${absolute("/")}#${s.id}`,
    provider: { "@id": AGENCY_ID() },
    areaServed: ["Maryland", "Pennsylvania", "Virginia", "District of Columbia"].map((n) => ({ "@type": "AdministrativeArea", name: n })),
  }));
}

export function breadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: absolute("/contact") },
    ],
  };
}
