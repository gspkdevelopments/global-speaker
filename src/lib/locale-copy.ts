import type { InterfaceLocale } from "@/lib/interface-locale";

export type WithEnglish<T> = Partial<Record<InterfaceLocale, T>> & { en: T };

export function pickLocaleCopy<T>(dict: Record<string, T> & { en: T }, locale: InterfaceLocale): T {
  return dict[locale] ?? dict.en;
}