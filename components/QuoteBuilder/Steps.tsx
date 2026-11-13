"use client";

import { lifeEvents, suggestionsFor } from "@/lib/checkup";
import { CheckTile, Field, Legend, RadioRow, Select, TextArea, TextInput } from "./Fields";
import {
  BEST_TIMES,
  COVERAGE_OPTIONS,
  INSURED_ANSWERS,
  MONTHS,
  POLICY_TYPES,
  SERVICE_REQUESTS,
  type CoverageKey,
  type FormState,
  type ServiceKey,
} from "./types";

export type Errors = Partial<Record<keyof FormState, string>>;
type StepProps = {
  s: FormState;
  set: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  errors: Errors;
  uid: string;
};

const toggle = <T,>(list: T[], v: T, on: boolean) => (on ? [...list.filter((x) => x !== v), v] : list.filter((x) => x !== v));

export function StepCoverage({ s, set, errors, uid }: StepProps) {
  return (
    <fieldset id={`${uid}-coverage`} aria-describedby={errors.coverage ? `${uid}-coverage-error` : undefined}>
      <Legend hint="Pick as many as you like.">Coverage</Legend>
      {s.note ? (
        <p className="mb-4 rounded-[6px] border border-rule bg-paper px-3.5 py-2.5 text-[0.9375rem]">
          <span className="label mr-2">Note</span>
          {s.note}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-2 xs:grid-cols-2">
        {COVERAGE_OPTIONS.map((o) => (
          <CheckTile
            key={o.key}
            name="coverage"
            value={o.key}
            checked={s.coverage.includes(o.key)}
            invalid={!!errors.coverage}
            onChange={(on) => set("coverage", toggle<CoverageKey>(s.coverage, o.key, on))}
          >
            {o.label}
          </CheckTile>
        ))}
      </div>
      {errors.coverage ? (
        <p id={`${uid}-coverage-error`} role="alert" className="mt-3 text-[0.9375rem] font-medium text-[#a33b30]">
          {errors.coverage}
        </p>
      ) : null}
    </fieldset>
  );
}

export function StepChanges({ s, set }: StepProps) {
  const review = suggestionsFor(s.changes);
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_15rem]">
      <fieldset>
        <Legend hint="Optional. Pick any that apply.">This year</Legend>
        <div className="flex flex-wrap gap-2">
          {lifeEvents.map((e) => (
            <CheckTile
              key={e.key}
              size="chip"
              name="changes"
              value={e.key}
              checked={s.changes.includes(e.key)}
              onChange={(on) => set("changes", toggle(s.changes, e.key, on))}
            >
              {e.label}
            </CheckTile>
          ))}
        </div>
      </fieldset>
      <aside aria-live="polite" className="self-start rounded-[6px] border border-rule bg-paper p-4">
        <h3 className="label">Worth reviewing</h3>
        {review.length ? (
          <ul className="ruled mt-2">
            {review.map((r) => (
              <li key={r} className="py-2 text-[0.9375rem] font-medium">
                {r}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-[0.9375rem] text-muted">Pick a change and we will list what is worth a look.</p>
        )}
        <p className="mt-3 border-t border-rule pt-3 text-[0.8125rem] leading-snug text-muted">
          A general guide, not insurance advice. We will go through your actual policies with you.
        </p>
      </aside>
    </div>
  );
}

export function StepStanding({ s, set, errors, uid }: StepProps) {
  return (
    <div>
      <fieldset className="pb-5">
        <Legend>Insured now?</Legend>
        <RadioRow name={`${uid}-insured`} options={INSURED_ANSWERS} value={s.insured} onChange={(v) => set("insured", v)} />
      </fieldset>
      <Field id={`${uid}-insurer`} label="Current insurer" optional>
        <TextInput
          id={`${uid}-insurer`}
          value={s.currentInsurer}
          onChange={(v) => set("currentInsurer", v)}
          autoComplete="off"
        />
      </Field>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field id={`${uid}-renewal`} label="Renewal month" optional>
          <Select
            id={`${uid}-renewal`}
            value={s.renewalMonth}
            onChange={(v) => set("renewalMonth", v)}
            options={MONTHS}
            placeholder="Choose a month"
          />
        </Field>
        <Field id={`${uid}-zip`} label="ZIP code" error={errors.zip}>
          <TextInput
            id={`${uid}-zip`}
            value={s.zip}
            onChange={(v) => set("zip", v.replace(/[^\d]/g, "").slice(0, 5))}
            inputMode="numeric"
            autoComplete="postal-code"
            error={errors.zip}
            required
          />
        </Field>
      </div>
    </div>
  );
}

export function StepService({ s, set, errors, uid }: StepProps) {
  return (
    <div>
      <Field id={`${uid}-request`} label="Request type" error={errors.request}>
        <Select
          id={`${uid}-request`}
          value={s.request}
          onChange={(v) => set("request", v as ServiceKey)}
          options={SERVICE_REQUESTS.map((r) => ({ value: r.key, label: r.label }))}
          placeholder="Choose a request"
          error={errors.request}
        />
      </Field>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field id={`${uid}-holder`} label="Policyholder name" error={errors.policyholder}>
          <TextInput
            id={`${uid}-holder`}
            value={s.policyholder}
            onChange={(v) => set("policyholder", v)}
            autoComplete="name"
            error={errors.policyholder}
            required
          />
        </Field>
        <Field id={`${uid}-ptype`} label="Policy type" optional>
          <Select
            id={`${uid}-ptype`}
            value={s.policyType}
            onChange={(v) => set("policyType", v)}
            options={POLICY_TYPES}
            placeholder="Choose a type"
          />
        </Field>
      </div>
      <Field id={`${uid}-details`} label="What happened, or what needs to change" optional>
        <TextArea id={`${uid}-details`} value={s.details} onChange={(v) => set("details", v)} rows={4} />
      </Field>
    </div>
  );
}

export function StepInfo({ s, set, errors, uid }: StepProps) {
  return (
    <div>
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Name" error={errors.name}>
          <TextInput
            id={`${uid}-name`}
            value={s.name}
            onChange={(v) => set("name", v)}
            autoComplete="name"
            error={errors.name}
            required
          />
        </Field>
        <Field id={`${uid}-phone`} label="Phone" error={errors.phone}>
          <TextInput
            id={`${uid}-phone`}
            type="tel"
            value={s.phone}
            onChange={(v) => set("phone", v)}
            autoComplete="tel"
            inputMode="tel"
            error={errors.phone}
            required
          />
        </Field>
      </div>
      <Field id={`${uid}-email`} label="Email" optional error={errors.email}>
        <TextInput
          id={`${uid}-email`}
          type="email"
          value={s.email}
          onChange={(v) => set("email", v)}
          autoComplete="email"
          error={errors.email}
        />
      </Field>
      <fieldset className="pb-5">
        <Legend>Best time to call</Legend>
        <RadioRow name={`${uid}-time`} options={BEST_TIMES} value={s.bestTime} onChange={(v) => set("bestTime", v)} />
      </fieldset>
      <Field id={`${uid}-notes`} label="Notes" optional>
        <TextArea id={`${uid}-notes`} value={s.notes} onChange={(v) => set("notes", v)} rows={3} />
      </Field>
    </div>
  );
}

export function validate(step: string, s: FormState): Errors {
  const e: Errors = {};
  if (step === "coverage" && s.coverage.length === 0) e.coverage = "Pick at least one. Something else works too.";
  if (step === "standing" && !/^\d{5}$/.test(s.zip)) e.zip = "Please enter a five digit ZIP code.";
  if (step === "service") {
    if (!s.request) e.request = "Pick a request type.";
    if (!s.policyholder.trim()) e.policyholder = "Please add the policyholder's name.";
  }
  if (step === "info") {
    if (!s.name.trim()) e.name = "Please tell us your name.";
    const d = s.phone.replace(/\D/g, "");
    if (!(d.length === 10 || (d.length === 11 && d.startsWith("1"))))
      e.phone = "Please check the number. We need ten digits to call you back.";
    if (s.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))
      e.email = "That email does not look right. You can also leave it blank.";
  }
  return e;
}
