// Every business fact used on the site lives here. Sources: the agency's Google Business
// Profile, kaiferinsurance.com, and the agency's own Facebook page. Invent nothing.

export const FOUNDED = 1974;
// Computed at build time, so the count stays right each year.
export const CURRENT_YEAR = new Date().getFullYear();
export const YEARS_IN_BUSINESS = CURRENT_YEAR - FOUNDED;

export const business = {
  name: "The Kaifer Insurance Group",
  shortName: "KIG",
  legalTagline: "Helping You Protect What Matters Most",
  founded: FOUNDED,

  address: {
    street: "120 Cockeysville Rd #100",
    city: "Cockeysville",
    region: "MD",
    postalCode: "21030",
    country: "US",
    // Written exactly like the Google Business Profile.
    full: "120 Cockeysville Rd #100, Cockeysville, MD 21030",
  },

  phone: {
    display: "(410) 584-7610",
    href: "tel:+14105847610",
    e164: "+14105847610",
  },
  fax: "(410) 584-7614",
  // DRAFT: confirm whether the office line accepts texts. The text button stays hidden until this is true.
  acceptsText: false,
  sms: "sms:+14105847610",
  email: "mark@kaiferinsurance.com",

  // Source: Google Business Profile.
  // DRAFT: the current site says 9:00am to 5:00pm. Confirm with Mark.
  hours: {
    summary: "Monday to Friday, 8:30 AM to 5:30 PM",
    short: "Mon to Fri, 8:30 AM to 5:30 PM",
    weekend: "Closed Saturday and Sunday",
    opens: "08:30",
    closes: "17:30",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  },

  links: {
    site: "https://kaiferinsurance.com",
    facebook: "https://www.facebook.com/kaiferinsurance",
    x: "https://x.com/KaiferIns",
    maps: "https://maps.google.com/?cid=8676493269257691816",
    mapsEmbed:
      "https://maps.google.com/maps?q=120%20Cockeysville%20Rd%20%23100%2C%20Cockeysville%2C%20MD%2021030&output=embed",
  },

  // Real ERIE links. They carry the agency's own agent number, BB1367.
  erie: {
    autoQuote: "https://www.erieinsurance.com/OnlineQuote/?AgentNumber=BB1367",
    billPay: "https://www.erieinsurance.com/PaymentCenterWeb/BillPay/Payment/BillPayment",
    lifeCalculator: "https://www.erieinsurance.com/BB1367/life-insurance/calculator",
  },

  serviceStates: ["Maryland", "Pennsylvania", "Virginia", "DC"],
  serviceAreaSentence: "all of Maryland, Pennsylvania, Virginia, and DC",
  clientTowns: ["Cockeysville", "Parkville", "Catonsville", "Forest Hill", "Baltimore"],

  // Their own words.
  lines: {
    notForCompany: "We do not work for an insurance company; we work for you.",
    claimPromise:
      "We work on your side when you have a loss and follow through to see that you get fair, prompt payment and service.",
    afterHours: "we offer appointments during off-business hours and during the weekend for your convenience.",
    giveBack: "We Don't Just Sell Policies. We Give Back!",
    clientFamily:
      "Supporting our Client-Family in troubled times is exactly what we do. That is our business.",
    mission:
      "As an independent agency since 1974, we at The Kaifer Insurance Group are dedicated to building trusting relationships with our clients through knowledge, communication and service.",
    goldStandard: "and his wife Jackie have set a gold standard for personalized insurance service",
  },

  // Named on their site. No licence numbers.
  licences:
    "Our agents hold Property and Casualty and Life and Health licences in Maryland, Pennsylvania and Virginia. Individual agents are also licensed in Ohio and DC.",

  // Google rating, shown as text only. Never marked up as aggregateRating.
  rating: { score: "4.9", count: 32, checked: "November 13, 2026" },

  // Facebook, October 30, 2026.
  // DRAFT: confirm Mark is happy to feature this.
  result: {
    quote:
      "It certainly was a Happy Friday Morning to our new insured who just saved $5,080 annually by switching over to one of our carriers",
    source: "KIG on Facebook, October 30, 2026",
    caveat: "One client's result. Yours depends on your coverage and history.",
  },

  // For sitemap last-modified dates.
  contentUpdated: "2026-11-13",
} as const;

export type Insurer = { name: string; short: string; tag?: string; featured?: boolean };

// Exactly ten, names as text only. Never a logo.
export const insurers: Insurer[] = [
  { name: "Erie Insurance", short: "Erie", featured: true },
  { name: "The Hanover Insurance Group", short: "Hanover" },
  { name: "GEICO", short: "GEICO" },
  { name: "Progressive", short: "Progressive" },
  { name: "Chubb", short: "Chubb" },
  { name: "Wright Flood", short: "Wright Flood", tag: "Flood" },
  { name: "AIC (Agency Insurance Company)", short: "AIC" },
  // DRAFT: tag inferred from the insurer's name.
  { name: "Chesapeake Employers Insurance", short: "Chesapeake Employers", tag: "Workers' comp" },
  { name: "American Collectors Insurance", short: "American Collectors", tag: "Collector cars" },
  { name: "Hagerty", short: "Hagerty", tag: "Collector cars" },
];

export const coverage = {
  personal: [
    "Auto",
    "Homeowners",
    "Renters",
    "Condominium",
    "Flood",
    "Personal umbrella",
    "Boat and marine",
    "Motorcycle",
    "Motor home and RV",
    "ATV",
    "Collector car",
    "Valuable items",
    "Rental property",
    "High net worth coverage",
  ],
  business: [
    "Business owners package",
    "General liability",
    "Commercial property",
    "Commercial auto",
    "Workers' compensation",
    "Professional liability (E&O)",
    "Commercial umbrella",
    "Cyber liability",
    "Builders' risk",
    "Contractor's general liability",
    "Restaurant and bar",
    "Hotel and motel",
    "Manufacturers",
    "Non-profit",
    "Surety bonds",
  ],
  life: ["Individual life", "Individual disability", "Final expense", "Fixed annuities"],
  service: [
    "File a claim",
    "Online billing and payments",
    "Auto ID card request",
    "Certificate of insurance request",
    "Policy change request",
    "Annual insurance review",
  ],
};

export type TeamMember = { name: string; initials: string; role: string; fact: string };

// Professional facts only. Nothing personal from the old bios.
export const team: TeamMember[] = [
  {
    name: "J. Timothy Kaifer",
    initials: "TK",
    role: "Founder",
    fact: "Opened the agency in 1974 after Travelers. Calvert Hall, class of 1961.",
  },
  {
    name: "Jackie Kaifer, CISR",
    initials: "JK",
    role: "Personal lines",
    fact: "More than four decades at KIG.",
  },
  {
    name: "Mark Kaifer, Esq.",
    initials: "MK",
    role: "Principal",
    fact: "Principal since 2013. Joined in 2007 after five years as a litigation associate at Goodell DeVries.",
  },
  {
    name: "Patrick Kaifer",
    initials: "PK",
    role: "General Manager, Personal Lines Manager",
    fact: "At the agency since 2010, licensed since 2013. Also runs IT and “the agency’s quite impressive fish tank”. Go Hall.",
  },
  {
    name: "Heather Kaifer, Esq.",
    initials: "HK",
    role: "Business operations",
    fact: "Leads the business operations and customer service teams.",
  },
  {
    name: "Dottie Pope",
    initials: "DP",
    role: "Commercial Manager",
    fact: "A former Erie Insurance Customer Service Agent of the Year. Created and runs Chemo Comfies.",
  },
  {
    name: "Debbie Barbieri, CISR",
    initials: "DB",
    role: "Agent",
    fact: "In insurance since 2001, at KIG since September 2012.",
  },
  {
    name: "Jan Brown, AU",
    initials: "JB",
    role: "Commercial operations",
    fact: "Thirty years at Erie Insurance as a Senior Commercial Underwriter.",
  },
];

export type Review = { name: string; town: string; text: string };

// Exactly as published on the agency's reviews page.
export const reviews: Review[] = [
  {
    name: "Anton P.",
    town: "Cockeysville",
    text: "I've been working with Kaifer Insurance for several years now and have consistently received competitive rates and excellent service. Recently, when I needed to replace a vehicle, getting an updated quote and making the transition was quick and easy.",
  },
  {
    name: "Holly B.",
    town: "Cockeysville",
    text: "Great price and service: Patrick was easy to communicate with, responsive and the price was almost half of what I had been paying with my previous insurer. Highly recommend!",
  },
  {
    name: "Brett P.",
    town: "Cockeysville",
    text: "Mark and the team helped me learn the ins and outs of the insurance side of things for my business (yacht maintenance), communicated well, priced fairly, and were just down to earth professionals that were easy to work with.",
  },
  {
    name: "Samir K.",
    town: "Cockeysville",
    text: "Wonderful service and great rates. Have various services through them for the past 15 years. Parents have used their services for much longer.",
  },
  {
    name: "Steven A.",
    town: "Cockeysville",
    text: "I appreciate the prompt response when assistance was requested, and it was great how Patrick followed up personally with updates as they were made available.",
  },
  {
    name: "Raymond C.",
    town: "Forest Hill",
    text: "I like having a personal agent, one who knows me and my family. I have this with Kaifer Insurance Group.",
  },
];

// Their November 2, 2026 blog post.
// DRAFT: seasonal. Swap each season.
export const seasonal = {
  lead: "Deer season is here.",
  body: "November is one of the highest-risk months for deer collisions. Does your auto policy carry comprehensive?",
  cta: "Check my auto coverage",
  note: "Deer season: review comprehensive",
};

// Photos from the agency's own Facebook page and Google Business Profile.
export const photos = {
  logo: { src: "/images/00-logo-logo-kig-transparent.webp", png: "/images/00-logo-logo-kig-transparent.png", width: 900, height: 435 },
  hero: { src: "/images/01-chili8-team-purple-5000-check-BEST.webp", width: 1729, height: 1211 },
  chili20k: { src: "/images/02-chili-20000-check-dawn-hill.webp", width: 1083, height: 868 },
  chili3k: { src: "/images/03-chili4-team-black-shirts-3000-check.webp", width: 1614, height: 1211 },
  orioles: { src: "/images/04-TEAM-orioles-day-in-office.webp", width: 1157, height: 868 },
  dressedUp: { src: "/images/05-team-dressed-up-at-event-table.webp", width: 910, height: 868 },
  lobby: { src: "/images/06-OFFICE-lobby-kig-wall-sign.webp", width: 650, height: 425 },
  comfiesDelivery: { src: "/images/07-chemo-comfies-blanket-delivery-gbmc.webp", width: 428, height: 868 },
  comfiesTable: { src: "/images/08-chemo-comfies-fleece-blankets-table.webp", width: 640, height: 481 },
} as const;
