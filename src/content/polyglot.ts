import type { LanguageKey } from "@/content/site";

export type PolyglotTopic =
  | "learning-science"   // cómo aprenden los políglotas, métodos personales
  | "language-transfer"  // interferencia, falsos amigos, similitudes léxicas
  | "identity-switching"  // identidad multilingüe, code-switching
  | "stories"             // entrevistas / historias de estudiantes
  | "tools"               // recursos para autodidactas
  | "community";          // comunidades locales e internacionales

export const polyglotTopics: { key: PolyglotTopic; label: string }[] = [
  { key: "learning-science", label: "Learning science" },
  { key: "language-transfer", label: "Language transfer" },
  { key: "identity-switching", label: "Identity & switching" },
  { key: "stories", label: "Stories" },
  { key: "tools", label: "Tools" },
  { key: "community", label: "Community" },
];

export type LanguagePair = { from: LanguageKey; to: LanguageKey };

export type PolyglotArticle = {
  slug: string;
  title: string;
  description: string;
  topic: PolyglotTopic;
  // No real interface i18n yet (see SiteHeader's decorative "EN / ES / FR"
  // label) — every article is authored in English today. Explicit field,
  // not assumed, so it's a one-line widen whenever real translation ships.
  interfaceLanguage: "en";
  // What makes an article cross-linkable from a /learn/[language] hub.
  relatedLanguagePairs?: LanguagePair[];
  readingMinutes: number;
  updatedAt: string; // ISO date
  body: string; // markdown, rendered with the existing CurriculumMarkdown component
};

export const polyglotArticles: PolyglotArticle[] = [
  {
    slug: "how-polyglots-actually-learn",
    title: "How Polyglots Actually Learn",
    description:
      "Not a secret method — a set of habits: constant contact, tolerance for ambiguity, and treating every language as a living relationship, not a subject.",
    topic: "learning-science",
    interfaceLanguage: "en",
    readingMinutes: 6,
    updatedAt: "2026-08-24",
    body: `Ask ten people who speak four or five languages how they did it, and you'll get ten different stories. Different countries, different ages, different reasons for starting. But underneath the stories, the same handful of habits keep showing up — and none of them is a secret method.

## They stay in contact, not in study mode

The people who keep languages alive long-term rarely describe what they do as "studying." They describe it as reading something they'd read anyway, watching something they'd watch anyway, texting someone they'd text anyway — just doing it in another language. The language rides on top of an activity that already had its own reason to exist. That's the difference between a habit that survives a busy month and one that quietly disappears the first time life gets in the way.

## They tolerate not understanding everything

New learners often treat every unknown word as a stop sign. Experienced polyglots treat it as background noise they'll pick up meaning for later. This isn't a talent — it's a decision, repeated often enough that it becomes automatic: keep going, guess from context, let the gaps fill in over time instead of pausing to look up every one.

## They talk to themselves before they talk to anyone else

A quiet habit that rarely gets mentioned: narrating your own day in the language you're learning, in your head, with no one listening. Describing what you're doing, what you want, what you notice. It's low-stakes rehearsal — by the time a real conversation happens, the sentence has already been built once before.

## They treat each language as a relationship, not a subject

Maybe the biggest shift: languages that get maintained for decades are usually tied to a person, a place, a piece of media, a version of yourself the learner likes being. Grammar rules fade. A reason to keep showing up doesn't. That's why the most useful early question isn't "how do I learn this language" — it's "what do I want this language to connect me to."`,
  },
  {
    slug: "spanish-to-french-lexical-overlap",
    title: "What Spanish Already Gave You for French",
    description:
      "A large share of everyday French vocabulary is closer to Spanish than most learners expect. Here's where the overlap is real, and where it quietly misleads you.",
    topic: "language-transfer",
    interfaceLanguage: "en",
    relatedLanguagePairs: [{ from: "spanish", to: "french" }],
    readingMinutes: 7,
    updatedAt: "2026-08-24",
    body: `If you already speak Spanish, you are not starting French from zero — even on day one. Both languages descend from Latin, and a large share of everyday vocabulary shares a recognizable root. The trick is knowing where that head start is real, and where it turns into a trap.

## Where the overlap genuinely helps

Abstract and formal vocabulary is where Spanish gives the most reliable head start: *información/information*, *importante/important*, *posible/possible*, *necesario/nécessaire*. These cognates tend to be spelled closer than they're pronounced, but once your ear adjusts to French pronunciation, recognizing the word on the page becomes almost automatic. Verbs ending in *-ar* in Spanish often line up with French *-er* verbs carrying a similar core meaning: *hablar/parler* is the odd one out, but *continuar/continuer*, *preparar/préparer*, and *explicar/expliquer* follow the pattern closely enough to guess correctly most of the time.

## Where it quietly misleads you

The overlap breaks down fastest in everyday, high-frequency words — exactly the vocabulary you need most in real conversation. *Embarazada* does not mean *embarrassé* (that's a classic false friend: one means pregnant, the other means embarrassed). *Actualmente* and *actuellement* both mean "currently," not "actually" — a trap for English speakers, but a different kind of trap when you're triangulating through Spanish. And French's nasal vowels and silent letters mean that a word can look nearly identical to its Spanish cousin on the page and sound almost unrecognizable out loud.

## A better rule of thumb than "guess and hope"

Use the overlap to *read* faster — skimming a French article, you'll correctly guess far more than someone with no Romance-language background. Don't use it to *assume* pronunciation, and don't use it to guess emotionally loaded or body-related vocabulary, where false friends cluster most densely. The overlap is a genuine shortcut for building passive vocabulary quickly. It is not a substitute for actually listening to French being spoken.`,
  },
  {
    slug: "french-english-false-friends",
    title: "French → English: The False Friends That Actually Trip People Up",
    description:
      "Not 'actuellement' — the ones nobody warns you about because they're almost right, which is what makes them dangerous.",
    topic: "language-transfer",
    interfaceLanguage: "en",
    relatedLanguagePairs: [{ from: "french", to: "english" }],
    readingMinutes: 5,
    updatedAt: "2026-08-24",
    body: `Everyone learning French toward English gets warned about *actuellement* (currently, not actually) and *librairie* (bookstore, not library). Those warnings are correct — and also so well-known that they're rarely the ones that cause a real misunderstanding anymore. The dangerous false friends are the quieter ones.

## The ones that are almost right

*Assister* doesn't mean to assist — it means to attend. Say "I assisted the meeting" in English and you'll be understood as claiming you helped run it, when you meant you were simply there. *Demander* means to ask, not to demand — "he demanded me a question" sounds oddly aggressive to an English ear for something that was just a polite request. *Sensible* means sensitive in French, not sensible in the English sense of practical — describing someone as "very sensible" when you mean *sensible* can land as a compliment about good judgment when you meant they cry easily at films.

## Why these are harder than the obvious ones

*Librairie/library* is a pure trap: totally unrelated meanings, easy to memorize as a pair once you've been burned once. The ones above are worse precisely because they're not unrelated — they're adjacent. *Assister* really is related to attending; *demander* really is a kind of asking. The meanings overlap just enough that your brain doesn't flag them as suspicious, so they survive in someone's English for years, corrected only if a native speaker happens to notice and say something.

## What actually fixes this

Not more vocabulary lists — most learners have already seen these words on a false-friends list at some point and forgotten them, because a list has no story attached. What sticks is noticing the mistake in a real sentence, ideally your own, and feeling the small confusion on the other person's face. If you're actively speaking English day to day, the fix isn't studying harder — it's paying attention to the two or three seconds after you say something, where a listener's expression tells you whether the sentence landed the way you meant it to.`,
  },
  {
    slug: "known-language-as-head-start",
    title: "The Language You Already Know Is a Head Start, Not a Detour",
    description:
      "Using a language you already speak to learn a new one isn't cheating and it isn't a shortcut that will hurt you later — but it works differently than most learners expect.",
    topic: "learning-science",
    interfaceLanguage: "en",
    readingMinutes: 6,
    updatedAt: "2026-08-24",
    body: `There's a persistent worry among language learners that leaning on a language they already know — instead of learning the new one "on its own terms" — is somehow cheating, or will leave gaps later. In practice, it's closer to the opposite: every language you already speak is infrastructure the next one gets to use.

## What actually transfers

Three things transfer reliably between languages, especially related ones: vocabulary recognition (cognates, shared roots, borrowed words), sentence-building instincts (where the verb goes, how questions are formed, how ideas get connected), and — often underrated — learning strategy itself. Someone who has already gone from zero to conversational in one language has already built the habit of tolerating ambiguity, guessing from context, and pushing through the awkward middle stretch where you understand more than you can say. That habit is reusable even when the vocabulary isn't.

## What doesn't transfer, and why that's fine

Pronunciation rarely transfers cleanly, and neither does cultural register — knowing when to be formal, when a phrase is warm versus cold, when silence means something. These have to be rebuilt for each language, sometimes from very little. This is normal, not a sign that the "shortcut" failed. A head start on vocabulary and structure buys you time and confidence to spend on the parts that genuinely need to be learned fresh.

## The real risk, and how to avoid it

The actual danger isn't leaning on a known language — it's stopping there. Using Spanish to guess your way through French vocabulary is a legitimate strategy for building a passive base fast. Continuing to translate every sentence through Spanish in your head, six months in, is what keeps someone stuck at an intermediate plateau. The known language should be a launchpad you leave, not a permanent scaffold you keep leaning on after the new language can stand on its own.`,
  },
  {
    slug: "why-you-feel-different-in-each-language",
    title: "Why You Feel Like a Different Person in Each Language",
    description:
      "It's not your imagination, and it's not a personality disorder — it's how language shapes which version of your thinking gets activated.",
    topic: "identity-switching",
    interfaceLanguage: "en",
    readingMinutes: 6,
    updatedAt: "2026-08-24",
    body: `Multilingual people frequently report the same strange, specific experience: they feel bolder in one language, softer in another, funnier in a third — even when translating the exact same sentence. It's a common enough observation that it has research behind it, and it's worth taking seriously rather than dismissing as imagination.

## What's actually happening

Each language you learn gets tied to the contexts you learned and used it in — who you spoke it with, what you talked about, how formal or playful those situations were. Speaking that language later doesn't just retrieve words; it partly retrieves the emotional and social frame those words lived in. If you learned a language mostly in professional settings, it can feel more careful, more measured, even when you're using it to talk about something casual. If you learned another one falling in love or making close friends, it can carry warmth that surprises even you.

## This is a feature, not a flaw

Some multilingual people worry this means they're being inconsistent or inauthentic — performing a different self depending on the language. It's more accurate to say each language gives you access to a different register of the same person, the way a different room in a house changes how you sit and what you talk about, without making you a different person for using it. The "bolder in French" or "warmer in Spanish" feeling isn't a costume. It's evidence the language became genuinely yours, not just a translation layer over your native one.

## What to do with this, practically

If a language you're learning feels stiff or distant, that's often not a grammar problem — it's a sign the language hasn't yet been attached to anything personal. Deliberately using it for things you actually care about — a real hobby, a real relationship, a real opinion — tends to loosen that stiffness faster than more drills do. The goal isn't to sound like a native speaker on day one. It's to give the language somewhere real to live in your life, so a version of you has a reason to show up in it.`,
  },
];

export function getPolyglotArticles(topic?: PolyglotTopic) {
  return topic ? polyglotArticles.filter((article) => article.topic === topic) : polyglotArticles;
}

export function getPolyglotArticleBySlug(slug: string) {
  return polyglotArticles.find((article) => article.slug === slug);
}

// Articles relevant to a given learning hub — matches on either side of the
// pair, so a Spanish speaker on /learn/french and a French speaker on
// /learn/spanish both see the same transfer article.
export function getPolyglotArticlesForLanguage(language: LanguageKey) {
  return polyglotArticles.filter((article) =>
    article.relatedLanguagePairs?.some((pair) => pair.from === language || pair.to === language)
  );
}