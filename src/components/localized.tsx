"use client";

import type { ReactNode } from "react";
import { useInterfaceLocale } from "@/components/interface-locale";
import type { InterfaceLocale } from "@/lib/interface-locale";

type LocalizedProps = {
  en: ReactNode;
  es: ReactNode;
  fr: ReactNode;
};

export function Localized({ en, es, fr }: LocalizedProps) {
  const { locale } = useInterfaceLocale();
  return <>{locale === "es" ? es : locale === "fr" ? fr : en}</>;
}

export function LocalizedText({ values }: { values: Record<InterfaceLocale, string> }) {
  const { locale } = useInterfaceLocale();
  return <>{values[locale]}</>;
}
