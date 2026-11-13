"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useQuote } from "./QuoteContext";
import type { QuotePreset } from "./types";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type"> & {
  preset?: QuotePreset;
  children: ReactNode;
};

/** Any control that opens the Quote Builder is a real button, never a link. */
export function QuoteButton({ preset, children, ...rest }: Props) {
  const { open } = useQuote();
  return (
    <button type="button" aria-haspopup="dialog" onClick={() => open(preset)} {...rest}>
      {children}
    </button>
  );
}
