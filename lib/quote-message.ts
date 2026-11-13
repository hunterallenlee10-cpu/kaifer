import { business } from "./business";
import { suggestionsFor } from "./checkup";
import { lifeEvents } from "./checkup";
import { coverageLabel, serviceLabel, type FormState } from "@/components/QuoteBuilder/types";

export type SummaryRow = { label: string; value: string };

/** Plain rows describing a request, used on the success screen and in the email body. */
export function summarize(s: FormState): SummaryRow[] {
  const rows: SummaryRow[] = [];
  if (s.mode === "service") {
    rows.push({ label: "Request", value: serviceLabel(s.request) });
    if (s.policyholder) rows.push({ label: "Policyholder", value: s.policyholder });
    if (s.policyType) rows.push({ label: "Policy type", value: s.policyType });
    if (s.details) rows.push({ label: "Details", value: s.details });
  } else {
    rows.push({ label: "Coverage", value: s.coverage.map(coverageLabel).join(", ") });
    if (s.note) rows.push({ label: "Note", value: s.note });
    const changes = lifeEvents.filter((e) => s.changes.includes(e.key)).map((e) => e.label);
    if (changes.length) rows.push({ label: "This year", value: changes.join("; ") });
    const review = suggestionsFor(s.changes);
    if (review.length) rows.push({ label: "Worth reviewing", value: review.join(", ") });
    if (s.insured) rows.push({ label: "Insured now", value: s.insured });
    if (s.currentInsurer) rows.push({ label: "Current insurer", value: s.currentInsurer });
    if (s.renewalMonth) rows.push({ label: "Renewal month", value: s.renewalMonth });
    if (s.zip) rows.push({ label: "ZIP code", value: s.zip });
  }
  rows.push({ label: "Name", value: s.name });
  rows.push({ label: "Phone", value: s.phone });
  if (s.email) rows.push({ label: "Email", value: s.email });
  if (s.bestTime) rows.push({ label: "Best time to call", value: s.bestTime });
  if (s.notes) rows.push({ label: "Notes", value: s.notes });
  return rows;
}

export function subjectFor(s: FormState): string {
  if (s.mode === "service") return `Service request: ${serviceLabel(s.request)} for ${s.policyholder || s.name}`;
  const what = s.coverage.map(coverageLabel).join(", ");
  return `Quote request: ${what} for ${s.name}`;
}

export function bodyFor(s: FormState): string {
  const lines = summarize(s).map((r) => `${r.label}: ${r.value}`);
  return [
    `Hello ${business.shortName},`,
    "",
    s.mode === "service" ? "I would like help with a policy request." : "I would like a quote.",
    "",
    ...lines,
    "",
    "Thank you.",
  ].join("\n");
}

export function mailtoFor(s: FormState): string {
  return `mailto:${business.email}?subject=${encodeURIComponent(subjectFor(s))}&body=${encodeURIComponent(bodyFor(s))}`;
}

/** Shown only when business.acceptsText is true. */
export function smsFor(s: FormState): string {
  return `${business.sms}?&body=${encodeURIComponent(`${subjectFor(s)}\n${bodyFor(s)}`)}`;
}

// DRAFT: confirm routing.
export function routingLine(s: FormState): string {
  const isBusiness = s.mode === "service" ? s.policyType === "Business" : s.coverage.includes("business");
  const isPersonal = s.mode === "service" ? s.policyType !== "Business" : s.coverage.some((c) => c !== "business");
  if (isBusiness && isPersonal)
    return "Personal coverage goes to Patrick's team. Business coverage goes to Dottie's team.";
  if (isBusiness) return "Business coverage goes to Dottie's team.";
  return "Personal coverage goes to Patrick's team.";
}
