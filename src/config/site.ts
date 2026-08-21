const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return fallbackSiteUrl;

  try {
    const url = new URL(candidate);
    return url.toString().replace(/\/$/, "");
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteConfig = {
  name: "Global Speaker",
  siteUrl: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  isProductionUrlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim()),
};

export const contactConfig = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ?? "",
  primaryContactMethod: "whatsapp" as const,
};
