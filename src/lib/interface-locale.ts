export type InterfaceLocale = "en" | "es" | "fr";

export const INTERFACE_LOCALE_COOKIE = "gspk-interface-locale";

export function isInterfaceLocale(value: string | undefined | null): value is InterfaceLocale {
  return value === "en" || value === "es" || value === "fr";
}
