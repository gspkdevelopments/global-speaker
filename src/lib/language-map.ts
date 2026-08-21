export type LanguageMapData = {
  language: string;
  goal: string;
  environments: string;
  interests: string;
  challenges: string[];
  level: string;
  name: string;
};

function clean(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function normalizeWhatsAppNumber(phone: string) {
  const trimmed = phone.trim();
  const withoutInternationalPrefix = trimmed.startsWith("00") ? trimmed.slice(2) : trimmed;
  const digits = withoutInternationalPrefix.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15 ? digits : "";
}

export function formatLanguageMapMessage(map: LanguageMapData) {
  const fields = [
    map.name ? `Name: ${clean(map.name)}` : "",
    map.language ? `Language: ${clean(map.language)}` : "",
    map.goal ? `Goal: ${clean(map.goal)}` : "",
    map.level ? `Level: ${clean(map.level)}` : "",
    map.environments ? `Real contexts: ${clean(map.environments)}` : "",
    map.challenges.length ? `Focus: ${map.challenges.map(clean).join(", ")}` : "",
    map.interests ? `Interests: ${clean(map.interests)}` : "",
  ].filter(Boolean);

  return [
    "Hi! I just completed my Global Speaker Language Map.",
    "",
    "I'd like to explore a personalized learning plan.",
    "",
    ...fields,
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string) {
  const normalizedPhone = normalizeWhatsAppNumber(phone);
  const normalizedMessage = message.trim();
  if (!normalizedPhone || !normalizedMessage) return null;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(normalizedMessage)}`;
}
