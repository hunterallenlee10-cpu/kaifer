"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useQuote } from "./QuoteContext";
import type { QuotePreset } from "./types";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> & {
  preset?: QuotePreset;
  /** Runs just before the builder opens, for example to close the mobile menu. */
  onBeforeOpen?: () => void;
  children: ReactNode;
};

/** Any control that opens the Quote Builder is a real button, never a link. */
export function QuoteButton({ preset, onBeforeOpen, children, ...rest }: Props) {
  const { open } = useQuote();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.();
        open(preset);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
