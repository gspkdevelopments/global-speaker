// Node's built-in test runner executes this TypeScript module without another dependency.
import assert from "node:assert/strict";
import test from "node:test";
import { buildWhatsAppUrl, formatLanguageMapMessage, normalizeWhatsAppNumber, type LanguageMapData } from "../src/lib/language-map.ts";

const baseMap: LanguageMapData = {
  language: "English",
  goal: "Work",
  environments: "Hospitality with international guests",
  interests: "Music, travel",
  challenges: ["Speaking", "Confidence"],
  level: "Intermediate",
  name: "Ricardo",
};

test("normalizes international WhatsApp numbers", () => {
  assert.equal(normalizeWhatsAppNumber("+52 (984) 123-4567"), "529841234567");
  assert.equal(normalizeWhatsAppNumber("+52 998 401 5977"), "529984015977");
  assert.equal(normalizeWhatsAppNumber("00 33 6 12 34 56 78"), "33612345678");
  assert.equal(normalizeWhatsAppNumber("123"), "");
});

test("builds the configured Global Speaker destination URL", () => {
  const url = buildWhatsAppUrl("+52 998 401 5977", formatLanguageMapMessage(baseMap));
  assert.ok(url?.startsWith("https://wa.me/529984015977?text="));
  assert.equal(new URL(url!).searchParams.get("text"), formatLanguageMapMessage(baseMap));
});

test("builds an English message with multiple focus areas and interests", () => {
  const message = formatLanguageMapMessage(baseMap);
  assert.match(message, /Language: English/);
  assert.match(message, /Focus: Speaking, Confidence/);
  assert.match(message, /Interests: Music, travel/);
  const url = buildWhatsAppUrl("+52 984 123 4567", message);
  assert.ok(url?.startsWith("https://wa.me/529841234567?text="));
  assert.equal(new URL(url!).searchParams.get("text"), message);
});

test("preserves French accents and apostrophes", () => {
  const message = formatLanguageMapMessage({ ...baseMap, language: "French", environments: "Café conversations à Montréal", interests: "Cinéma, littérature", name: "Zoë" });
  const url = buildWhatsAppUrl("+33 6 12 34 56 78", message);
  assert.match(decodeURIComponent(url!), /Café conversations à Montréal/);
  assert.match(message, /I'd like/);
  assert.match(message, /Zoë/);
});

test("preserves Spanish accents and punctuation", () => {
  const message = formatLanguageMapMessage({ ...baseMap, language: "Spanish", environments: "México: trabajo y conversación", interests: "Música, viajes" });
  const url = buildWhatsAppUrl("0052 984 123 4567", message);
  assert.match(decodeURIComponent(url!), /México: trabajo y conversación/);
  assert.match(decodeURIComponent(url!), /Música, viajes/);
});

test("omits empty optional fields and rejects incomplete URLs", () => {
  const message = formatLanguageMapMessage({ ...baseMap, environments: "", interests: "", challenges: [] });
  assert.doesNotMatch(message, /Real contexts:/);
  assert.doesNotMatch(message, /Focus:/);
  assert.doesNotMatch(message, /Interests:/);
  assert.equal(buildWhatsAppUrl("", message), null);
  assert.equal(buildWhatsAppUrl("+52 984 123 4567", "   "), null);
});
