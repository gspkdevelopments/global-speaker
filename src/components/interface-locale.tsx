"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { InterfaceLocale } from "@/lib/interface-locale";
import { INTERFACE_LOCALE_COOKIE } from "@/lib/interface-locale";

type LocaleContextValue = {
  locale: InterfaceLocale;
  setLocale: (locale: InterfaceLocale) => void;
};

const InterfaceLocaleContext = createContext<LocaleContextValue | null>(null);

export function InterfaceLocaleProvider({ children, initialLocale }: { children: React.ReactNode; initialLocale: InterfaceLocale }) {
  const [locale, setLocaleState] = useState<InterfaceLocale>(initialLocale);
  const router = useRouter();

  const setLocale = (nextLocale: InterfaceLocale) => {
    setLocaleState(nextLocale);
    document.cookie = `${INTERFACE_LOCALE_COOKIE}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale;
    router.refresh();
  };

  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <InterfaceLocaleContext.Provider value={value}>{children}</InterfaceLocaleContext.Provider>;
}

export function useInterfaceLocale() {
  const context = useContext(InterfaceLocaleContext);
  if (!context) throw new Error("useInterfaceLocale must be used inside InterfaceLocaleProvider");
  return context;
}
