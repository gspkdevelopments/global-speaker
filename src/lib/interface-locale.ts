import { cookies } from "next/headers";

export type InterfaceLocale = "en" | "es" | "fr";

export const INTERFACE_LOCALE_COOKIE = "gspk-interface-locale";

export function isInterfaceLocale(value: string | undefined | null): value is InterfaceLocale {
  return value === "en" || value === "es" || value === "fr";
}

export async function getInterfaceLocale(): Promise<InterfaceLocale> {
  const store = await cookies();
  const value = store.get(INTERFACE_LOCALE_COOKIE)?.value;
  return isInterfaceLocale(value) ? value : "en";
}
