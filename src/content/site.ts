export type LanguageKey = "english" | "french" | "spanish" | "german" | "italian";

export type LanguageStatus = "active" | "planned";

export type LivedMoment = { label: string; line: string; context: string };

export type LanguageProfile = {
  key: LanguageKey;
  status: LanguageStatus;
  code: string;
  name: string;
  nativeName: string;
  eyebrow: string;
  heading: string;
  description: string;
  promise: string;
  themes: string[];
  accent: "blue" | "wine" | "terracotta" | "slate" | "olive";
  languageMapExamples: string[];
  livedMoment: LivedMoment;
};

export const languages: LanguageProfile[] = [
  {
    key: "english",
    status: "active",
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
    languageMapExamples: [
      "Lead a guest conversation",
      "Share an opinion naturally",
      "Feel ready in meetings",
      "Travel without rehearsing every sentence",
    ],
    livedMoment: {
      label: "Work · 09:14",
      line: "Could you walk me through that?",
      context:
        "A useful sentence begins with a real need: understand the process, ask clearly, keep the conversation moving.",
    },
  },
  {
    key: "french",
    status: "active",
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
    languageMapExamples: [
      "Find the right social register",
      "Follow natural conversation",
      "Express nuance and taste",
      "Travel with cultural confidence",
    ],
    livedMoment: {
      label: "Après le travail · 18:20",
      line: "On se retrouve après le travail ?",
      context:
        "The words carry more than a plan. They carry ease, social distance, rhythm, and the possibility of belonging.",
    },
  },
  {
    key: "spanish",
    status: "active",
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
    languageMapExamples: [
      "Participate in daily life",
      "Connect more deeply in Mexico",
      "Handle work interactions",
      "Build real relationships",
    ],
    livedMoment: {
      label: "Daily life · 13:05",
      line: "¿Me recomienda algo de aquí?",
      context:
        "Language becomes local when it helps you ask, listen, respond, and take part in the place around you.",
    },
  },
  {
    key: "german",
    status: "planned",
    code: "DE",
    name: "German",
    nativeName: "Deutsch",
    eyebrow: "",
    heading: "",
    description: "",
    promise: "",
    themes: [],
    accent: "slate",
    languageMapExamples: [],
    livedMoment: { label: "", line: "", context: "" },
  },
  {
    key: "italian",
    status: "planned",
    code: "IT",
    name: "Italian",
    nativeName: "Italiano",
    eyebrow: "",
    heading: "",
    description: "",
    promise: "",
    themes: [],
    accent: "olive",
    languageMapExamples: [],
    livedMoment: { label: "", line: "", context: "" },
  },
];

export const activeLanguages = languages.filter((l) => l.status === "active");

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