import { headers } from "next/headers";

export async function getLocaleHeader() {
  const headersList = await headers();
  const localeHeader = headersList.get("X-NEXT-INTL-LOCALE");
  return localeHeader;
}