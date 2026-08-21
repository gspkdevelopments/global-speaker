export type LanguageKey = "english" | "french" | "spanish";

export type LanguageProfile = {
  key: LanguageKey;
  code: string;
  name: string;
  nativeName: string;
  eyebrow: string;
  heading: string;
  description: string;
  promise: string;
  themes: string[];
  accent: "blue" | "wine" | "terracotta";
};

export const languages: LanguageProfile[] = [
  {
    key: "english",
    code: "EN",
    name: "English",
    nativeName: "English",
    eyebrow: "Connect globally.",
    heading: "English for the life you actually live.",
    description:
      "Build the English you need for conversations, professional confidence, travel, and the things you care about.",
    promise: "I want to express myself with more ease.",
    themes: ["Conversation", "Work", "Travel", "Expression", "Culture"],
    accent: "blue",
  },
  {
    key: "french",
    code: "FR",
    name: "French",
    nativeName: "Français",
    eyebrow: "Enter another way of seeing the world.",
    heading: "Le français, beyond the textbook.",
    description:
      "Learn to notice the choices, rhythms, and cultural cues that make French feel natural and expressive.",
    promise: "Je veux trouver ma propre voix.",
    themes: ["Expression", "Conversation", "Culture", "Travel", "Thought"],
    accent: "wine",
  },
  {
    key: "spanish",
    code: "ES",
    name: "Spanish",
    nativeName: "Español",
    eyebrow: "Live closer to the world around you.",
    heading: "Spanish for living closer to the world around you.",
    description:
      "Connect with Mexico, daily life, relationships, work, and culture through the Spanish people really use.",
    promise: "Quiero participar, no solo traducir.",
    themes: ["Mexico", "Daily life", "Relationships", "Work", "Culture"],
    accent: "terracotta",
  },
];

export const lifeEnvironments = [
  { name: "Home", index: "01", examples: ["Objects", "Routines", "Food", "Relationships", "Feelings", "Environment"] },
  { name: "Work", index: "02", examples: ["Meetings", "Customers", "Questions", "Problems", "Instructions", "Negotiation"] },
  { name: "People", index: "03", examples: ["Introductions", "Stories", "Opinions", "Humor", "Conflict", "Connection"] },
  { name: "Travel", index: "04", examples: ["Arrivals", "Directions", "Plans", "Discovery", "Questions", "Unexpected moments"] },
  { name: "Interests", index: "05", examples: ["Music", "Technology", "Food", "Nature", "Design", "Ideas"] },
  { name: "Culture", index: "06", examples: ["Politeness", "Identity", "Film", "Traditions", "Social cues", "Meaning"] },
];

export { professionalPaths } from "@/content/professional";

export const methodSteps = ["PERCEIVE", "THINK", "CONNECT", "EXPRESS", "INTERACT"];
