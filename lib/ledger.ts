// The Client-Family Ledger. One entry per step on the slider, in order.
// Client quotes are exact, typos included (see Gerard's "in th Navy").
// Sources: the agency's Facebook review graphics (Gregory S., Gerard L.) and the
// reviews page on kaiferinsurance.com (every other client quote). Agency milestones
// come from the staff bios on kaiferinsurance.com. The 2025 entry is from the check
// in the agency's own photo.

export type LedgerKind = "agency" | "client" | "giving" | "next";

export type LedgerEntry = {
  id: string;
  year: number;
  kind: LedgerKind;
  text: string;
  attribution: string;
  /** Short spoken label for the range input's aria-valuetext. */
  label: string;
};

export const KIND_LABEL: Record<LedgerKind, string> = {
  agency: "The agency",
  client: "Client-Family",
  giving: "Giving back",
  next: "Next",
};

export const ledger: LedgerEntry[] = [
  {
    id: "founded",
    year: 1974,
    kind: "agency",
    text: "J. Timothy Kaifer opens The Kaifer Insurance Group.",
    attribution: "The Kaifer Insurance Group",
    label: "The agency opens",
  },
  {
    // Source: Facebook review graphic.
    id: "gregory",
    year: 1982,
    kind: "client",
    text: "Always cordial, responsive, knowledgeable, and professional. I've used Kaifer for almost fifty years and couldn't recommend them highly enough!",
    attribution: "Gregory S., insured since 1982",
    label: "Gregory S., insured since 1982",
  },
  {
    // Source: Facebook review graphic. Quoted exactly, including "in th Navy".
    id: "gerard",
    year: 1983,
    kind: "client",
    text: "I have been a client of the Kaifer Agency for over 40 years! Tim Kaifer took me on as a client back when I needed to get off my parents policy. Doing so at the time was somewhat of a risk. I was a 20 year old college student, but he understood the need for help, and came through. Over the years, and the next generation of Kaifers, the service has always been first class. From always making sure we had the best prices, to making sure the coverage was right, to educating my kids about insurance, and even helping our son in th Navy get the best insurance from another company, the Kaifer Agency has been the best!",
    attribution: "Gerard L., insured since 1983",
    label: "Gerard L., insured since 1983",
  },
  {
    id: "susan",
    year: 1983,
    kind: "client",
    text: "Easy to reach...knowledgeable. When I had a fender bender years ago, I called and Debbie walked me through what I needed to do, right there, on the spot!",
    attribution: "Susan P., insured since 1983",
    label: "Susan P., insured since 1983",
  },
  {
    id: "janet",
    year: 1983,
    kind: "client",
    text: "Two generations of great service. Always willing to explain things thoroughly and give me options and suggestions on how to get more value out of our policies. Support staff is excellent.",
    attribution: "Janet G., insured since 1983",
    label: "Janet G., insured since 1983",
  },
  {
    id: "margaret",
    year: 1985,
    kind: "client",
    text: "Over the years, Kaifer has been extremely supportive whenever my family has needed attention.",
    attribution: "Margaret P., insured since 1985",
    label: "Margaret P., insured since 1985",
  },
  {
    id: "william",
    year: 1985,
    kind: "client",
    text: "For four decades now, the Kaifer agency has always provided my family with excellent insurance information and education, the best insurance options, wise advice for my needs, and has always went above and beyond to provide the best customer service. I always recommend KIG to friends and family.",
    attribution: "William K., insured since 1985",
    label: "William K., insured since 1985",
  },
  {
    id: "charles",
    year: 1986,
    kind: "client",
    text: "Always there when needed with the right answers. Very honest.",
    attribution: "Charles B., Parkville, customer since April 1986",
    label: "Charles B., Parkville, customer since April 1986",
  },
  {
    id: "rebecca",
    year: 1995,
    kind: "client",
    text: "I began working with Kaifer more than 30 years ago as a continuation of my father's great relationship with the company. The service and savings have been outstanding!",
    attribution: "Rebecca B., insured since 1995",
    label: "Rebecca B., insured since 1995",
  },
  {
    id: "second-generation",
    year: 2007,
    kind: "agency",
    text: "Mark Kaifer leaves the Goodell DeVries law firm to carry the agency into its second generation.",
    attribution: "The Kaifer Insurance Group",
    label: "Mark Kaifer joins the agency",
  },
  {
    id: "michael",
    year: 2009,
    kind: "client",
    text: "Prompt and courteous service and coverage knowledge are the primary characteristics that I value in an agency. The Kaifer Insurance Group exemplifies these characteristics in their claim handling and policy services.",
    attribution: "Michael G., insured since 2009",
    label: "Michael G., insured since 2009",
  },
  {
    id: "principal",
    year: 2013,
    kind: "agency",
    text: "Mark becomes Principal. Patrick earns his licence.",
    attribution: "The Kaifer Insurance Group",
    label: "Mark becomes Principal",
  },
  {
    // Source: the check in the agency's photo, dated 11/8/25, memo "Chili III to VII".
    // DRAFT: confirm totals and how to describe the foundation.
    id: "chili",
    year: 2025,
    kind: "giving",
    text: "A $20,000 check to the Dawn Hill Fight Foundation, from Chili III to VII.",
    attribution: "The chili cook-off, check dated 11/8/25",
    label: "$20,000 to the Dawn Hill Fight Foundation",
  },
  {
    id: "donald",
    year: 2026,
    kind: "client",
    text: "Even as a first time customer, Kaifer insurance Group responded to my request for quote within one day. Patrick looked up my policy information and coverages and within 2 days my home and auto were covered.",
    attribution: "Donald A., Cockeysville, customer since May 2026",
    label: "Donald A., Cockeysville, customer since May 2026",
  },
  {
    id: "you",
    year: 0, // Placed after the current year on the line, labelled "Next".
    kind: "next",
    text: "Your name belongs in the ledger. Start with a quote.",
    attribution: "",
    label: "Next. You.",
  },
];

/** Index the sweep rests on when the band first scrolls into view. */
export const SWEEP_TARGET = ledger.findIndex((e) => e.id === "gerard");

export const JUMPS = [
  { label: "1974", id: "founded" },
  { label: "The 1980s", id: "gregory" },
  { label: "Second generation", id: "second-generation" },
  { label: "This year", id: "donald" },
] as const;
