export const COVERAGE_OPTIONS = [
  { key: "auto", label: "Auto" },
  { key: "home", label: "Home" },
  { key: "renters", label: "Renters or condo" },
  { key: "business", label: "Business" },
  { key: "life", label: "Life" },
  { key: "umbrella", label: "Umbrella" },
  { key: "boat", label: "Boat, motorcycle or RV" },
  { key: "collector", label: "Collector car" },
  { key: "flood", label: "Flood" },
  { key: "other", label: "Something else" },
] as const;

export type CoverageKey = (typeof COVERAGE_OPTIONS)[number]["key"];

export const SERVICE_REQUESTS = [
  { key: "claim", label: "File a claim" },
  { key: "idcard", label: "Auto ID card" },
  { key: "certificate", label: "Certificate of insurance" },
  { key: "change", label: "Policy change" },
  { key: "billing", label: "Billing question" },
] as const;

export type ServiceKey = (typeof SERVICE_REQUESTS)[number]["key"];

export const POLICY_TYPES = ["Auto", "Home", "Renters or condo", "Business", "Life", "Umbrella", "Other"] as const;

export const BEST_TIMES = ["Morning", "Afternoon", "After hours by appointment"] as const;
export const INSURED_ANSWERS = ["Yes", "No", "Not sure"] as const;
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type QuoteMode = "quote" | "service";

/** What a button asks the builder to open with. */
export type QuotePreset = {
  mode?: QuoteMode;
  coverage?: CoverageKey[];
  request?: ServiceKey;
  note?: string;
};

export type FormState = {
  mode: QuoteMode;
  coverage: CoverageKey[];
  changes: string[];
  insured: string;
  currentInsurer: string;
  renewalMonth: string;
  zip: string;
  request: ServiceKey | "";
  policyholder: string;
  policyType: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  bestTime: string;
  notes: string;
  note: string;
};

export function initialState(preset: QuotePreset = {}): FormState {
  return {
    mode: preset.mode ?? "quote",
    coverage: preset.coverage ? [...preset.coverage] : [],
    changes: [],
    insured: "",
    currentInsurer: "",
    renewalMonth: "",
    zip: "",
    request: preset.request ?? "",
    policyholder: "",
    policyType: "",
    details: "",
    name: "",
    phone: "",
    email: "",
    bestTime: "",
    notes: "",
    note: preset.note ?? "",
  };
}

export const coverageLabel = (k: CoverageKey) => COVERAGE_OPTIONS.find((o) => o.key === k)?.label ?? k;
export const serviceLabel = (k: ServiceKey | "") => SERVICE_REQUESTS.find((o) => o.key === k)?.label ?? "";
