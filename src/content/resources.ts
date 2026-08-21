import type { LanguageKey } from "@/content/site";

export type ResourceSection = {
  heading: string;
  body: string;
  examples?: string[];
};

export type Resource = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  language: LanguageKey;
  languageLabel: string;
  category: string;
  difficulty: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  accent: "blue" | "wine" | "terracotta";
  sections: ResourceSection[];
  exercise: string[];
  related: string[];
  culture?: boolean;
};

export const resources: Resource[] = [
  {
    slug: "see-look-or-watch",
    title: "See, Look or Watch?",
    subtitle: "Three verbs. Three different relationships with attention.",
    description: "A practical way to choose between three English verbs that are often translated as the same word.",
    language: "english",
    languageLabel: "English",
    category: "Words & Meaning",
    difficulty: "Basic",
    readingTime: "6 min",
    publishedAt: "2026-08-20",
    updatedAt: "2026-08-20",
    author: "Global Speaker",
    accent: "blue",
    sections: [
      {
        heading: "See: what reaches your eyes",
        body: "Seeing usually happens without effort. Your eyes are open and something enters your awareness. You do not need to decide to pay attention first.",
        examples: ["I can see the ocean from here.", "Did you see that flash of light?", "I saw Marta at the market this morning."],
      },
      {
        heading: "Look: direct your attention",
        body: "Looking is intentional. You point your eyes toward something, often for a shorter moment. It frequently appears with at, for, or after.",
        examples: ["Look at the color of the water.", "I’m looking for my keys.", "Could you look after the table for a moment?"],
      },
      {
        heading: "Watch: follow what unfolds",
        body: "Watching combines attention with time. We watch things that move, change, perform, or develop — a film, a match, a person crossing the street.",
        examples: ["We watched the storm move across the coast.", "What did you watch last night?", "Watch how she greets every guest."],
      },
      {
        heading: "One situation, three relationships",
        body: "You might see a musician when you enter a café, look at the guitar because it catches your attention, and then watch the performance. The object is similar; your relationship with it changes.",
      },
    ],
    exercise: ["Look around you. What can you see?", "What are you looking at right now?", "What did you watch recently?"],
    related: ["hear-vs-listen", "think-believe-and-feel"],
  },
  {
    slug: "hear-vs-listen",
    title: "Hear vs Listen",
    subtitle: "Sound arrives. Attention is a choice.",
    description: "Understand the difference between receiving a sound and giving it your attention.",
    language: "english", languageLabel: "English", category: "Words & Meaning", difficulty: "Basic", readingTime: "4 min", publishedAt: "2026-08-18", updatedAt: "2026-08-18", author: "Global Speaker", accent: "blue",
    sections: [{ heading: "From sound to attention", body: "We hear sounds that reach us; we listen when we deliberately attend to them.", examples: ["I can hear music outside.", "Listen to the rhythm of this sentence."] }],
    exercise: ["What can you hear right now?", "What do you choose to listen to carefully?"], related: ["see-look-or-watch"],
  },
  {
    slug: "think-believe-and-feel",
    title: "Think, Believe and Feel",
    subtitle: "Opinion, conviction, and intuition are not the same.",
    description: "Choose a more precise English verb when you share what is happening inside you.",
    language: "english", languageLabel: "English", category: "Expression", difficulty: "Intermediate", readingTime: "5 min", publishedAt: "2026-08-15", updatedAt: "2026-08-15", author: "Global Speaker", accent: "blue",
    sections: [{ heading: "Name the source", body: "Think often introduces an opinion, believe a stronger conviction, and feel an intuitive or emotional response.", examples: ["I think the café closes at eight.", "I believe practice changes confidence.", "I feel this is the right moment."] }],
    exercise: ["Share one thought, one belief, and one feeling about learning."], related: ["see-look-or-watch"],
  },
  {
    slug: "savoir-vs-connaitre",
    title: "Savoir vs Connaître",
    subtitle: "Two kinds of knowing in French.",
    description: "Distinguish knowing a fact or skill from being familiar with a person, place, or subject.",
    language: "french", languageLabel: "Français", category: "Words & Meaning", difficulty: "Basic", readingTime: "5 min", publishedAt: "2026-08-16", updatedAt: "2026-08-16", author: "Global Speaker", accent: "wine",
    sections: [{ heading: "What kind of knowledge?", body: "Savoir works with facts and abilities; connaître expresses familiarity.", examples: ["Je sais nager.", "Je connais bien ce quartier."] }], exercise: ["Name one fact you know and one place you know well."], related: ["tu-vs-vous"],
  },
  {
    slug: "tu-vs-vous",
    title: "Tu vs Vous",
    subtitle: "Grammar becomes a social relationship.",
    description: "Notice how familiarity, respect, context, and culture shape a small French pronoun.",
    language: "french", languageLabel: "Français", category: "People", difficulty: "Basic", readingTime: "6 min", publishedAt: "2026-08-12", updatedAt: "2026-08-12", author: "Global Speaker", accent: "wine", culture: true,
    sections: [{ heading: "More than formality", body: "The choice is relational. Age, work, region, hierarchy, tone, and mutual comfort all matter.", examples: ["On peut se tutoyer ?", "Comment allez-vous ?"] }], exercise: ["In which relationships would you wait before using tu?"], related: ["savoir-vs-connaitre"],
  },
  {
    slug: "express-opinions-in-french",
    title: "Express Opinions Naturally in French",
    subtitle: "Move beyond je pense que.",
    description: "A compact set of expressions for certainty, nuance, hesitation, and disagreement.",
    language: "french", languageLabel: "Français", category: "Expression", difficulty: "Intermediate", readingTime: "5 min", publishedAt: "2026-08-10", updatedAt: "2026-08-10", author: "Global Speaker", accent: "wine",
    sections: [{ heading: "Give your opinion texture", body: "Small framing phrases show how strongly you hold an idea.", examples: ["À mon avis…", "J’ai l’impression que…", "Je ne suis pas tout à fait d’accord."] }], exercise: ["Choose a film and express three levels of certainty about it."], related: ["tu-vs-vous"],
  },
  {
    slug: "ser-vs-estar",
    title: "Ser vs Estar",
    subtitle: "Identity, condition, and the way you frame reality.",
    description: "Learn the distinction through real situations instead of memorizing permanent versus temporary.",
    language: "spanish", languageLabel: "Español", category: "Grammar in Context", difficulty: "Basic", readingTime: "6 min", publishedAt: "2026-08-17", updatedAt: "2026-08-17", author: "Global Speaker", accent: "terracotta",
    sections: [{ heading: "A more useful question", body: "Ask whether you are identifying something or describing its state in a situation.", examples: ["La playa es tranquila.", "La playa está tranquila hoy."] }], exercise: ["Describe one place generally, then describe how it is today."], related: ["what-ahorita-means-in-mexico"],
  },
  {
    slug: "what-ahorita-means-in-mexico",
    title: "What “Ahorita” Actually Means in Mexico",
    subtitle: "A tiny word with a cultural sense of time.",
    description: "Context, tone, and shared expectations decide whether ahorita means now, soon, or later.",
    language: "spanish", languageLabel: "Español", category: "Culture", difficulty: "Basic", readingTime: "5 min", publishedAt: "2026-08-14", updatedAt: "2026-08-14", author: "Global Speaker", accent: "terracotta", culture: true,
    sections: [{ heading: "Listen beyond the dictionary", body: "Ahorita can intensify ahora, soften a commitment, or leave timing open. Tone and situation carry the real meaning.", examples: ["Ahorita voy.", "Lo hacemos ahorita.", "Ahorita no puedo."] }], exercise: ["Listen for ahorita today. What did the situation suggest?"], related: ["everyday-mexican-spanish"],
  },
  {
    slug: "everyday-mexican-spanish",
    title: "Spanish You Actually Hear in Everyday Mexico",
    subtitle: "A field guide to ordinary connection.",
    description: "Useful expressions that make more sense when you understand the situation around them.",
    language: "spanish", languageLabel: "Español", category: "Daily Life", difficulty: "Basic", readingTime: "7 min", publishedAt: "2026-08-08", updatedAt: "2026-08-08", author: "Global Speaker", accent: "terracotta", culture: true,
    sections: [{ heading: "Meaning lives in use", body: "Everyday phrases are social tools: they soften, connect, acknowledge, and keep an interaction moving.", examples: ["Qué padre.", "Mande?", "Provecho."] }], exercise: ["Choose one expression and notice when people use it this week."], related: ["what-ahorita-means-in-mexico", "ser-vs-estar"],
  },
];

export const getResource = (slug: string) => resources.find((resource) => resource.slug === slug);

export const cultureIdeas = [
  { title: "Why Mexicans say “ahorita”", description: "Time, tone, and shared understanding in one small word.", slug: "what-ahorita-means-in-mexico", region: "Mexico" },
  { title: "Tu vs Vous", description: "How a pronoun maps distance, respect, and familiarity.", slug: "tu-vs-vous", region: "France" },
  { title: "Why “How are you?” changes meaning", description: "The same question can greet, care, or invite a real answer.", region: "Cross-cultural" },
  { title: "Why literal translation sounds strange", description: "Meaning follows situations, not just dictionary entries.", region: "Expression" },
  { title: "How humor changes between languages", description: "Timing, taboo, wordplay, and what a group shares.", region: "People" },
  { title: "Mexican Spanish foreigners actually hear", description: "Everyday phrases as social tools, not vocabulary lists.", slug: "everyday-mexican-spanish", region: "Mexico" },
];
