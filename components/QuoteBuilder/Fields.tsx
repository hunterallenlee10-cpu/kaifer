"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function Legend({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <legend className="mb-3 w-full">
      <span className="label block">{children}</span>
      {hint ? <span className="mt-1 block text-[0.9375rem] text-muted">{hint}</span> : null}
    </legend>
  );
}

/** A multi-select option: a real checkbox styled as a ledger tile or chip. */
export function CheckTile({
  name,
  value,
  checked,
  onChange,
  children,
  size = "tile",
  invalid,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  size?: "tile" | "chip";
  invalid?: boolean;
}) {
  const base =
    size === "tile"
      ? "min-h-[56px] px-3 py-3 text-[0.9375rem] font-medium sm:px-4 sm:text-[1rem]"
      : "min-h-[44px] px-3.5 py-2 text-[0.9375rem]";
  return (
    <label
      className={`group relative flex cursor-pointer items-center gap-3 rounded-[6px] border bg-sheet transition-colors ${base} ${
        checked ? "border-accent bg-[#f2f8fc] text-ink" : invalid ? "border-[#b4483c]" : "border-rule hover:border-ink/40"
      } has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
          checked ? "border-accent bg-accent text-white" : "border-ink/30 bg-sheet"
        }`}
      >
        {checked ? <Check size={14} strokeWidth={2.25} /> : null}
      </span>
      <span className="leading-snug">{children}</span>
    </label>
  );
}

export function RadioRow({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const checked = value === o;
        return (
          <label
            key={o}
            className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-[6px] border px-3.5 py-2 text-[0.9375rem] transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-ink ${
              checked ? "border-accent bg-[#f2f8fc]" : "border-rule bg-sheet hover:border-ink/40"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o}
              checked={checked}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 rounded-full border ${checked ? "border-[5px] border-accent" : "border-ink/30"}`}
            />
            {o}
          </label>
        );
      })}
    </div>
  );
}

const inputCls =
  "block w-full min-h-[48px] rounded-[6px] border bg-sheet px-3.5 py-2.5 text-[1rem] text-ink placeholder:text-muted/80 focus:outline-2 focus:outline-offset-1 focus:outline-accent-ink";

export function Field({
  id,
  label,
  optional,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="pb-5">
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3">
        <span className="label text-ink">{label}</span>
        {optional ? <span className="text-[0.8125rem] text-muted">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? <p className="mt-1.5 text-[0.875rem] text-muted">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.9375rem] font-medium text-[#a33b30]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  id,
  value,
  onChange,
  error,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "id">) {
  return (
    <input
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputCls} ${error ? "border-[#b4483c]" : "border-rule"}`}
      {...rest}
    />
  );
}

export function TextArea({
  id,
  value,
  onChange,
  rows = 3,
  error,
  ...rest
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  error?: string;
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "id">) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputCls} resize-y leading-relaxed ${error ? "border-[#b4483c]" : "border-rule"}`}
      {...rest}
    />
  );
}

export function Select({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly { value: string; label: string }[] | readonly string[];
  placeholder: string;
  error?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputCls} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='none'%20stroke='%235A6878'%20stroke-width='1.75'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='m6%209%206%206%206-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_14px_center] bg-no-repeat pr-10 ${
        error ? "border-[#b4483c]" : "border-rule"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) =>
        typeof o === "string" ? (
          <option key={o} value={o}>
            {o}
          </option>
        ) : (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ),
      )}
    </select>
  );
}
