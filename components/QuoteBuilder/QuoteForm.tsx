"use client";

import { ArrowLeft, ArrowRight, Check, Copy, Mail, MessageSquare, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { business } from "@/lib/business";
import { bodyFor, mailtoFor, routingLine, smsFor, subjectFor, summarize } from "@/lib/quote-message";
import { StepChanges, StepCoverage, StepInfo, StepService, StepStanding, validate, type Errors } from "./Steps";
import { initialState, type FormState, type QuoteMode, type QuotePreset } from "./types";

const QUOTE_STEPS = [
  { key: "coverage", title: "What do you want covered?" },
  { key: "changes", title: "Anything change this year?" },
  { key: "standing", title: "Where things stand" },
  { key: "info", title: "Your info" },
] as const;

const SERVICE_STEPS = [
  { key: "service", title: "What do you need?" },
  { key: "info", title: "Your info" },
] as const;

type Props = {
  preset?: QuotePreset;
  titleId?: string;
  /** "modal" focuses its heading on every step; "inline" only after the first interaction. */
  variant?: "modal" | "inline";
  onClose?: () => void;
};

export function QuoteForm({ preset, titleId, variant = "modal", onClose }: Props) {
  const uid = useId().replace(/:/g, "");
  const [s, setS] = useState<FormState>(() => initialState(preset));
  const [stepIdx, setStepIdx] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);

  const steps = s.mode === "service" ? SERVICE_STEPS : QUOTE_STEPS;
  const step = steps[stepIdx];
  const last = stepIdx === steps.length - 1;
  const hId = titleId ?? `${uid}-title`;

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setS((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  useEffect(() => {
    if (variant === "inline" && !touched.current) return;
    headingRef.current?.focus({ preventScroll: variant === "modal" });
  }, [stepIdx, done, variant]);

  const go = (dir: 1 | -1) => {
    touched.current = true;
    if (dir === 1) {
      const e = validate(step.key, s);
      setErrors(e);
      if (Object.keys(e).length) {
        requestAnimationFrame(() => {
          const bad = bodyRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], fieldset[aria-describedby] input");
          bad?.focus();
        });
        return;
      }
      if (last) {
        setDone(true);
        return;
      }
    }
    setErrors({});
    // An existing client is usually the policyholder, so carry the name forward.
    if (dir === 1 && step.key === "service" && !s.name.trim()) setS((prev) => ({ ...prev, name: prev.policyholder }));
    setStepIdx((i) => Math.max(0, Math.min(steps.length - 1, i + dir)));
  };

  // New quote or policy service. Offered on the first step only, and keeps whatever was typed.
  const switchMode = (mode: QuoteMode) => {
    if (mode === s.mode) return;
    touched.current = true;
    setErrors({});
    setStepIdx(0);
    setS((prev) => ({ ...prev, mode }));
  };

  const restart = () => {
    touched.current = true;
    setS(initialState({ mode: s.mode }));
    setErrors({});
    setStepIdx(0);
    setDone(false);
  };

  if (done) return <Success s={s} hId={hId} headingRef={headingRef} onClose={onClose} onRestart={restart} />;

  const pct = ((stepIdx + 1) / steps.length) * 100;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        go(1);
      }}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="px-5 pt-5 sm:px-8 sm:pt-7">
        <div className="flex items-center justify-between gap-4">
          <p className="label" aria-live="polite">
            {s.mode === "service" ? "Policy service" : "Quote Builder"} <span aria-hidden="true">·</span> Step{" "}
            {stepIdx + 1} of {steps.length}
          </p>
        </div>
        <div className="mt-3 h-[3px] w-full bg-rule" aria-hidden="true">
          <div className="h-full bg-accent transition-[width] duration-300 ease-out" style={{ width: `${pct}%` }} />
        </div>
        <h2
          id={hId}
          ref={headingRef}
          tabIndex={-1}
          className="display mt-5 text-[1.75rem] leading-tight outline-none sm:text-[2.125rem]"
        >
          {step.title}
        </h2>
      </div>

      <div ref={bodyRef} key={step.key} className="animate-[fade_220ms_ease-out] px-5 py-6 sm:px-8">
        {stepIdx === 0 ? (
          <fieldset className="mb-6">
            <legend className="sr-only">What kind of request is this?</legend>
            <div className="grid grid-cols-2 rounded-[6px] border border-rule bg-paper p-1">
              {(
                [
                  ["quote", "New quote"],
                  ["service", "I am already a client"],
                ] as const
              ).map(([mode, label]) => (
                <label
                  key={mode}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-center rounded-[4px] px-2 text-center text-[0.9375rem] font-semibold leading-tight transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink ${
                    s.mode === mode ? "border border-rule bg-sheet text-ink" : "border border-transparent text-muted hover:text-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${uid}-mode`}
                    value={mode}
                    checked={s.mode === mode}
                    onChange={() => switchMode(mode)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}
        {step.key === "coverage" && <StepCoverage s={s} set={set} errors={errors} uid={uid} />}
        {step.key === "changes" && <StepChanges s={s} set={set} errors={errors} uid={uid} />}
        {step.key === "standing" && <StepStanding s={s} set={set} errors={errors} uid={uid} />}
        {step.key === "service" && <StepService s={s} set={set} errors={errors} uid={uid} />}
        {step.key === "info" && <StepInfo s={s} set={set} errors={errors} uid={uid} />}
      </div>

      <div className="sticky bottom-0 z-[1] mt-auto border-t border-rule bg-paper px-5 py-3.5 sm:px-8 sm:py-4">
        {last ? (
          <p className="mb-4 text-[0.875rem] leading-snug text-muted">
            Sending this request does not bind, change or cancel any coverage. Nothing changes until you hear from us
            in writing.
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-3">
          {stepIdx > 0 ? (
            <button type="button" onClick={() => go(-1)} className="btn btn-ghost px-4">
              <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
              Back
            </button>
          ) : (
            <span />
          )}
          <button type="submit" className="btn btn-primary">
            {last ? (s.mode === "service" ? "Send my request" : "Get My Quote") : "Next"}
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

function Success({
  s,
  hId,
  headingRef,
  onClose,
  onRestart,
}: {
  s: FormState;
  hId: string;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onClose?: () => void;
  onRestart: () => void;
}) {
  const rows = summarize(s);
  const [copied, setCopied] = useState(false);

  // For visitors with no mail app set up: the same text, ready to paste anywhere.
  const copy = async () => {
    const text = `${subjectFor(s)}\n\n${bodyFor(s)}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };
  return (
    <div className="flex min-h-0 flex-1 flex-col px-5 py-6 sm:px-8 sm:py-8">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent text-accent">
        <Check size={26} strokeWidth={2} aria-hidden="true" />
      </span>
      {/* DRAFT: confirm reply method and timing. */}
      <h2 id={hId} ref={headingRef} tabIndex={-1} className="display mt-5 text-[1.875rem] leading-tight outline-none">
        Request ready. An agent from our Cockeysville office will call you back.
      </h2>
      <p className="mt-3 text-[0.9375rem] text-muted">
        To reach the office now, call, or send this request by email. Nothing is sent until you do.
      </p>

      <dl className="ruled mt-6 rounded-[6px] border border-rule bg-sheet px-4">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[8.5rem_1fr] gap-3 py-2.5 text-[0.9375rem]">
            <dt className="label pt-[3px]">{r.label}</dt>
            <dd className="min-w-0 break-words">{r.value}</dd>
          </div>
        ))}
      </dl>

      {/* DRAFT: confirm routing. */}
      <p className="mt-4 text-[0.9375rem]">{routingLine(s)}</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={business.phone.href} className="btn btn-primary min-h-[56px] text-[1.0625rem]">
          <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
          Call now
        </a>
        <a href={mailtoFor(s)} className="btn btn-ghost min-h-[56px] bg-sheet text-[1.0625rem]">
          <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
          Email this to us
        </a>
        {business.acceptsText ? (
          <a href={smsFor(s)} className="btn btn-ghost min-h-[56px] bg-sheet text-[1.0625rem] sm:col-span-2">
            <MessageSquare size={18} strokeWidth={1.75} aria-hidden="true" />
            Text this to us
          </a>
        ) : null}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1">
        <button type="button" onClick={copy} className="inline-flex min-h-[44px] items-center gap-1.5 text-[0.9375rem] text-link">
          <Copy size={16} strokeWidth={1.75} aria-hidden="true" />
          {copied ? "Copied" : "Copy this request"}
        </button>
        <button type="button" onClick={onRestart} className="min-h-[44px] text-[0.9375rem] text-link">
          Start another request
        </button>
        {onClose ? (
          <button type="button" onClick={onClose} className="min-h-[44px] text-[0.9375rem] text-link">
            Close and keep reading
          </button>
        ) : null}
        <span className="sr-only" role="status">
          {copied ? "Request copied to the clipboard." : ""}
        </span>
      </div>
    </div>
  );
}
