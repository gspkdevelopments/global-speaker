export type InterfaceLocale = "en" | "es" | "fr" | "de" | "it" | "pt";

export const INTERFACE_LOCALE_COOKIE = "gspk-interface-locale";

const interfaceLocales: InterfaceLocale[] = ["en", "es", "fr", "de", "it", "pt"];

export function isInterfaceLocale(value: string | undefined | null): value is InterfaceLocale {
  return interfaceLocales.includes(value as InterfaceLocale);
}

export type InterfaceLocaleMeta = { code: string; nativeName: string };

export const interfaceLocaleMeta: Record<InterfaceLocale, InterfaceLocaleMeta> = {
  en: { code: "EN", nativeName: "English" },
  es: { code: "ES", nativeName: "Español" },
  fr: { code: "FR", nativeName: "Français" },
  de: { code: "DE", nativeName: "Deutsch" },
  it: { code: "IT", nativeName: "Italiano" },
  pt: { code: "PT", nativeName: "Português" },
};

export const allInterfaceLocales: readonly InterfaceLocale[] = interfaceLocales;
