import { business, insurers } from "./business";

// The FAQ text, shared by the visible accordion and the FAQPage JSON-LD so they match word for word.
// Answers use only facts from lib/business.ts.

const insurerList = (() => {
  const names = insurers.map((i) => i.name);
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
})();

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is an independent insurance agent?",
    a: "An agent who is not tied to one insurance company. We compare several for you and work for you, not for them.",
  },
  {
    q: "Which insurance companies do you work with?",
    a: `Ten: ${insurerList}.`,
  },
  {
    q: "Do you only sell Erie Insurance?",
    a: "No. Erie is our specialty and we represent nine others.",
  },
  {
    q: "Can you lower what I pay now?",
    a: "We cannot promise a number before we see your coverage. Send a request and we will compare your options across our insurers.",
  },
  {
    q: "Do you insure businesses?",
    a: "Yes. Business owners packages, general liability, commercial property, commercial auto, workers' compensation and professional liability, among others. For business owners, we offer appointments during off-business hours and during the weekend.",
  },
  {
    q: "Which states do you serve?",
    a: "Maryland, Pennsylvania, Virginia and DC.",
  },
  {
    q: "How do I file a claim?",
    a: `Call your insurer's 24/7 claims line, or call us at ${business.phone.display}. ${business.lines.claimPromise}`,
  },
  {
    q: "Where is your office and when are you open?",
    // DRAFT: hours from the Google Business Profile. Confirm with Mark.
    a: `${business.address.full}. We are open ${business.hours.summary}, and closed Saturday and Sunday.`,
  },
];
