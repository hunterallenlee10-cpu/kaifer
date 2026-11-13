"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { QuotePreset } from "./types";

type Ctx = {
  isOpen: boolean;
  preset: QuotePreset;
  session: number;
  open: (preset?: QuotePreset) => void;
  close: () => void;
  returnFocus: () => void;
};

const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preset, setPreset] = useState<QuotePreset>({});
  const [session, setSession] = useState(0);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((p: QuotePreset = {}) => {
    opener.current = (document.activeElement as HTMLElement) ?? null;
    setPreset(p);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const returnFocus = useCallback(() => {
    opener.current?.focus?.({ preventScroll: true });
  }, []);

  const value = useMemo(
    () => ({ isOpen, preset, session, open, close, returnFocus }),
    [isOpen, preset, session, open, close, returnFocus],
  );
  return <QuoteCtx.Provider value={value}>{children}</QuoteCtx.Provider>;
}

export function useQuote() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuote must be used inside QuoteProvider");
  return ctx;
}
