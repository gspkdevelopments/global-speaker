"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type InterfaceLocale = "en" | "es" | "fr";

type LocaleContextValue = {
  locale: InterfaceLocale;
  setLocale: (locale: InterfaceLocale) => void;
};

const InterfaceLocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "gspk-interface-locale";

export function InterfaceLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<InterfaceLocale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es" || saved === "fr") {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLocale = (nextLocale: InterfaceLocale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <InterfaceLocaleContext.Provider value={value}>{children}</InterfaceLocaleContext.Provider>;
}

export function useInterfaceLocale() {
  const context = useContext(InterfaceLocaleContext);
  if (!context) throw new Error("useInterfaceLocale must be used inside InterfaceLocaleProvider");
  return context;
}
