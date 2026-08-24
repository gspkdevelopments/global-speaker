import "server-only";
import { cookies } from "next/headers";
import { INTERFACE_LOCALE_COOKIE, isInterfaceLocale, type InterfaceLocale } from "@/lib/interface-locale";

export async function getInterfaceLocale(): Promise<InterfaceLocale> {
  const store = await cookies();
  const value = store.get(INTERFACE_LOCALE_COOKIE)?.value;
  return isInterfaceLocale(value) ? value : "en";
}
