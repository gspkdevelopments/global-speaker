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
    slug: "spanish-hiding-in-your-english",
    title: "The Spanish You Already Speak Is Hiding in Your English",
    description:
      "How much English a Spanish speaker already half-knows, and where that same familiarity quietly gets in the way — especially useful if you're using English with travelers and expats day to day.",
    topic: "language-transfer",
    interfaceLanguage: "en",
    relatedLanguagePairs: [{ from: "spanish", to: "english" }],
    readingMinutes: 6,
    updatedAt: "2026-09-04",
    body: `If your daily English comes from checking guests in, answering messages, or chatting with travelers, you already have a bigger working vocabulary than you probably give yourself credit for — a lot of it borrowed straight from Spanish, whether you notice it or not.

## The overlap you're already using

English absorbed an enormous amount of vocabulary from Latin and French, which means a huge share of its more formal and abstract words look almost identical to Spanish: *información/information*, *reservación/reservation*, *necesario/necessary*, *posible/possible*. This is why reading a hotel email or a booking confirmation in English often feels more manageable than a casual conversation — formal English leans on exactly the vocabulary Spanish already gave you.

## Where it quietly works against you

The overlap thins out fast in the everyday, informal register — the words you need most when actually talking to someone. *Realizar* doesn't mean "to realize" (it means to carry out or accomplish); *actualmente* doesn't mean "actually" (it means "currently"); *embarazada* is nowhere near "embarrassed." These aren't obscure traps — they're exactly the kind of word a confident Spanish speaker reaches for automatically, because the cognate feels so certain.

## Why this matters more in spoken English than written

In writing, you have a second to catch yourself. In a live conversation with a guest or a stranger, the cognate comes out before you've had time to check it — and English speakers are often too polite to correct it, so the mistake quietly survives for years. The fix isn't avoiding cognates; most of them are genuinely correct and useful. It's building a short mental list of the handful that betray you most — *realizar*, *actualmente*, *embarazada*, *sensible* — so your brain flags them the moment they're about to come out, instead of trusting the resemblance blindly.`,
  },
  {
    slug: "whatsapp-language-habit",
    title: "The WhatsApp Language Habit: Turning Your Daily Messages into Practice",
    description:
      "You're already texting in the language you're learning more than you realize. Here's how to turn that into a free, low-effort practice system without making your phone feel like homework.",
    topic: "tools",
    interfaceLanguage: "en",
    readingMinutes: 5,
    updatedAt: "2026-09-04",
    body: `Most language apps ask you to carve out fifteen minutes you don't have. WhatsApp is already open forty times a day. The habit that actually survives long-term is the one that rides on top of something you were going to do anyway — and for most people today, that something is messaging.

## Read before you translate

When a message comes in in the language you're learning, resist the reflex to translate it word by word in your head. Read it once for the gist, guess at anything unclear from context, and only look something up if the meaning genuinely doesn't land. This single habit — tolerating a little uncertainty instead of stopping for every word — is worth more than most vocabulary apps combined.

## Write the reply twice

Before sending a reply, write a rough version, then rewrite it once, slightly better. You're not aiming for perfect — you're aiming for the small rep of noticing your first instinct and improving on it, which is exactly the muscle that makes real-time conversation easier later.

## Save what almost tripped you up

Keep one running note — in your phone, wherever's easiest — for phrases you had to think about before sending, or ones a friend used that you'd never have written yourself. Not a vocabulary list to memorize later, just a record of real friction. Reading it back once a week does more than most flashcard decks, because every line came from something that actually happened to you.

## Let voice notes do double duty

If you send voice notes, that's free speaking practice you're already doing. Occasionally re-record one before sending — not for perfection, just to notice the gap between your first take and your second. That gap is where progress actually lives.`,
  },
  {
    slug: "where-language-learners-meet",
    title: "Where Do Language Learners Actually Meet?",
    description:
      "A practical map of where real language interaction happens in a place like Tulum — cafés, coworkings, group chats, and the communities that turn practice into something social.",
    topic: "community",
    interfaceLanguage: "en",
    readingMinutes: 5,
    updatedAt: "2026-09-04",
    body: `Studying alone gets you vocabulary. Talking to people gets you a language. The two aren't in competition, but most learners heavily overinvest in the first because it's easier to schedule — you don't need anyone else's calendar to open an app.

## The obvious places, used the wrong way

Cafés, coworkings, and community events are the usual advice, but most people walk in with no plan beyond "meet people," which rarely produces a real conversation. It works much better with a small, specific reason to talk — asking about a menu item, a laptop sticker, a book someone's reading. The place doesn't create the interaction; a genuine, small question does.

## Group chats are underrated real estate

A WhatsApp group built around a shared goal — learning a language, living in the same town, doing the same activity — is a low-pressure place to practice writing, ask a quick question, or just be around the language passively. It's not a replacement for speaking practice, but it's a steady drip of exposure that costs nothing and fits into dead time during the day.

## Look for shared tasks, not just shared interests

The strongest language friendships often come from doing something together, not just talking about a topic — a class, a sport, a volunteer project, a running group. Shared tasks create natural, repeated reasons to talk, and repetition is what turns a stranger into someone you actually practice with.

## Start with proximity you already have

Before looking for a formal exchange partner, look at who's already around you — neighbors, coworkers, people at the gym — and default to using the language you're learning with them, even briefly. It feels more vulnerable than a structured meetup, but it's usually the fastest way to build a real, ongoing connection instead of a one-time practice session.`,
  },
  {
    slug: "day-language-stops-feeling-like-a-subject",
    title: "The Day a Language Stops Feeling Like a Subject",
    description:
      "There's a recognizable turning point where a language quietly stops being something you study and becomes something you use to get on with your life. Here's what usually leads up to it.",
    topic: "stories",
    interfaceLanguage: "en",
    readingMinutes: 5,
    updatedAt: "2026-09-04",
    body: `Ask people who've become fluent in something and most of them can point to a rough moment when the language stopped being a school subject and started being just... the way they got things done. It rarely comes from a lesson. It usually comes from needing something.

## It starts with an unavoidable need

The shift tends to happen around a problem that can't wait for a textbook: explaining a symptom to a doctor, arguing about a bill, comforting someone, negotiating a price. In the moment, there's no time to think in translations — you just have to produce something, however imperfect, and it works. That single successful, urgent exchange often does more than months of structured study, because it proves the language is usable under pressure, not just on a worksheet.

## The vocabulary starts arriving out of order

Textbooks teach in a tidy order — greetings, numbers, family, food. Real fluency arrives out of order and slightly ugly: the word for a specific tool at work, a phrase your neighbor always says, the exact way your partner's mother scolds someone lovingly. This vocabulary sticks harder than anything from a course, because it came attached to a real moment instead of a unit test.

## The internal translator gets quieter

At some point, without noticing exactly when, the pause before speaking gets shorter. You're not mentally composing a sentence in your first language and converting it anymore — you're reaching more directly for the thought in the new one. It's rarely dramatic. It's usually only visible in hindsight, when you realize a conversation just happened and you can't remember translating any of it.

## What actually causes the shift

Not talent, and not more hours of study than everyone else. The common thread is simply being placed in enough real situations where the language was the only tool available — no subtitles, no dictionary, no way out except to try. If a language still feels like a subject, the fastest way to change that isn't more lessons. It's fewer safety nets.`,
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
  {
    slug: "foreign-language-effect-decisions",
    title: "You Make Different Decisions in a Foreign Language — Here's the Research",
    description:
      "A University of Chicago research program found that thinking in a foreign language changes what people are willing to risk, and even what they consider morally acceptable. It's one of the stranger, better-documented findings in bilingualism research.",
    topic: "identity-switching",
    interfaceLanguage: "en",
    readingMinutes: 6,
    updatedAt: "2026-09-04",
    body: `Most conversations about how a foreign language changes you focus on personality — feeling bolder in French, warmer in Spanish. There's a separate, more measurable finding that gets less attention: the language you're thinking in can change the actual decisions you make, in ways researchers can reproduce in a lab.

## The experiment that started it

Psychologist Boaz Keysar and his team at the University of Chicago ran a version of the classic framing experiment — the kind where identical information described as a "gain" versus a "loss" leads people to make different choices, even though the math is the same. When the choice was presented in participants' native language, they showed the usual bias: risk-averse when a gain was framed, risk-seeking when a loss was framed. When the exact same choice was presented in a language they had learned later in life, that bias largely disappeared. People became more consistent, not less, when using a language that wasn't their first.

## It goes further than money

The same research group extended the idea to moral reasoning, using variations of the classic "trolley problem" — a scenario asking whether it's acceptable to sacrifice one life to save several others. People answering in a foreign language were substantially more willing to accept the utilitarian, five-lives-over-one choice than people answering in their native tongue. The leading explanation isn't that a foreign language makes people more logical in some general sense — it's that it creates emotional distance. A native language is soaked in the emotional associations of childhood; a language learned later, often in a classroom, carries less of that emotional weight, so decisions made in it feel less personal and more calculated.

## What this actually means for you

This isn't a call to make every hard decision in your second language, and it isn't evidence that a foreign language makes you a better or worse person. It's evidence that the language you're thinking in is not a neutral container for your decisions — it's part of how the decision gets made. If you've ever noticed that a difficult conversation feels more manageable in a language that isn't your first, or that an argument that would wreck you in your native tongue feels survivable in another one, this research suggests you're not imagining the distance. You're using it, whether you meant to or not.`,
  },
  {
    slug: "bilingual-brain-myth-and-evidence",
    title: "What the 'Bilingual Brain' Research Actually Shows (and Doesn't)",
    description:
      "The idea that speaking two languages gives you a general cognitive upgrade is one of the most repeated claims about bilingualism — and one of the most contested inside the research itself. Here's an honest look at where the evidence actually stands.",
    topic: "learning-science",
    interfaceLanguage: "en",
    readingMinutes: 7,
    updatedAt: "2026-09-04",
    body: `If you've heard that speaking two languages sharpens your brain, delays cognitive decline, and makes you generally better at focusing and multitasking, you've heard a real research claim — one that a growing number of researchers now think was overstated, and possibly wrong in its strongest form.

## Where the claim came from

The idea traces back largely to work by psychologist Ellen Bialystok and colleagues, who found that bilingual children and adults sometimes outperformed monolinguals on tasks measuring "executive function" — the mental skills involved in ignoring distractions, switching between tasks, and holding conflicting information in mind. The theory made intuitive sense: constantly managing two languages, suppressing one while using the other, looked like a built-in daily workout for exactly those mental muscles. For a while, this became one of the most widely repeated facts about bilingualism in popular science writing.

## Why the field started pushing back

Psychologist Kenneth Paap and others have spent over a decade trying to replicate the strongest versions of this finding, with results that often didn't hold up. A 2023 book-length review of the evidence argued that, once you account for publication bias and inconsistent testing methods, the data doesn't support a general bilingual advantage in executive function distinguishable from no advantage at all. Meta-analyses on the topic have produced genuinely mixed results — some find effects only in specific tasks or age groups, others find nothing once study quality is controlled for. This is a live, unresolved scientific debate, not a settled question with one side clearly winning.

## What's actually well-supported

None of this means bilingualism does nothing to the brain — the debate is specifically about whether it produces broad, general-purpose cognitive gains that transfer to unrelated tasks. What's much better supported: bilingual children and adults often show enhanced metalinguistic awareness (the ability to think consciously about how language itself works), and the social and communicative advantages of navigating two languages are well documented, independent of any executive-function debate. The honest version of the story isn't "bilingualism makes you smarter." It's "bilingualism reliably changes your relationship with language itself — the broader claims about your brain in general are still being argued over by the people who study it."

## Why this matters more than it sounds

It's tempting to want a scientific reason to justify time spent learning a language beyond "I wanted to and I enjoyed it." But that reason doesn't need to exist for the effort to be worth it. Being skeptical of the oversold version of bilingual-brain research isn't a letdown — it's a small, useful exercise in the exact kind of self-discovery this whole pillar is about: learning to tell the difference between a finding that's real and one that just sounds good repeated often enough.`,
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