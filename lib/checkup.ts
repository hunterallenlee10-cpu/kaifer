// Life events in the Quote Builder (step 2) mapped to coverage worth reviewing.
// Uses only coverage names the agency lists on its own site. A general guide, not advice.

export type LifeEvent = { key: string; label: string; suggests: string[] };

export const lifeEvents: LifeEvent[] = [
  { key: "home", label: "Bought or refinanced a home", suggests: ["Homeowners", "Flood", "Personal umbrella"] },
  { key: "driver", label: "New driver in the house", suggests: ["Auto", "Personal umbrella"] },
  { key: "married", label: "Got married", suggests: ["Auto", "Homeowners", "Individual life"] },
  { key: "baby", label: "New baby", suggests: ["Individual life", "Individual disability"] },
  {
    key: "business",
    label: "Started or grew a business",
    suggests: ["Business owners package", "Workers' compensation", "General liability"],
  },
  { key: "renovated", label: "Renovated", suggests: ["Homeowners", "Valuable items"] },
  { key: "toys", label: "Bought a boat, bike or RV", suggests: ["Boat and marine", "Motorcycle", "Motor home and RV"] },
  { key: "wfh", label: "Working from home", suggests: ["Homeowners", "Business owners package"] },
  { key: "rental", label: "Renting out a property", suggests: ["Rental property", "Personal umbrella"] },
  { key: "nothing", label: "Nothing new, I just want a better look at my rate", suggests: ["Annual insurance review"] },
];

export function suggestionsFor(keys: string[]): string[] {
  const out: string[] = [];
  for (const e of lifeEvents) {
    if (!keys.includes(e.key)) continue;
    for (const s of e.suggests) if (!out.includes(s)) out.push(s);
  }
  return out;
}
