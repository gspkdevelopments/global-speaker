import { mkdir, writeFile } from "node:fs/promises";

const lessons = [];
const groups = [];
const code = { english: "eng", spanish: "spa", french: "fra" };
let excludedCount = 0;
const excludedIds = new Set([
  "eng-people-soften-simple-request-v1",
  "spa-home-organizar-la-rutina-v1",
  "spa-travel-preguntar-por-transporte-v1",
  "spa-people-expresar-emociones-v1",
  "spa-design-justificar-una-eleccion-v1",
  "spa-work-destacar-informacion-v1",
  "spa-tourism-adapt-an-itinerary-v1",
  "fra-home-parler-des-habitudes-v1",
  "fra-people-entendre-le-francais-lie-v1",
  "fra-people-rythme-et-accentuation-v1",
]);
const levelOverrides = new Map([
  ["eng-culture-interpret-a-social-signal-v1", "B1"],
  ["spa-culture-humor-y-confianza-v1", "B1"],
  ["fra-culture-identite-et-variation-v1", "B1"],
  ["eng-people-express-a-preference-v1", "A2"],
  ["spa-food-describir-sabores-v1", "A2"],
  ["eng-culture-polite-enough-v1", "B2"],
  ["spa-culture-tu-usted-contexto-v1", "B1"],
  ["fra-food-decrire-les-saveurs-v1", "A2"],
  ["fra-people-exprimer-une-emotion-v1", "A2"],
]);
const defaultFunctions = {
  home: ["describing", "requesting", "explaining"],
  work: ["asking", "clarifying", "explaining"],
  people: ["introducing", "building-rapport", "expressing-opinions"],
  travel: ["asking", "describing", "handling-problems"],
  interests: ["describing", "expressing-opinions", "showing-interest"],
  culture: ["interpreting", "managing-register", "expressing-opinions"],
};
const defaultVocab = {
  home: "home.routines",
  work: "work.communication",
  people: "people.relationships",
  travel: "travel.movement",
  interests: "interests.general",
  culture: "culture.pragmatics",
};

function addGroup(label, language, level, type, environment, entries, options = {}) {
  const start = lessons.length;
  for (const entry of entries) {
    const functions = entry.functions ?? options.functions ?? defaultFunctions[environment] ?? ["asking", "explaining"];
    const id = `${code[language]}-${entry.key}-v1`;
    if (excludedIds.has(id)) { excludedCount += 1; continue; }
    lessons.push({
      id,
      slug: entry.slug,
      title: entry.title,
      language,
      level: levelOverrides.get(id) ?? level,
      description: entry.description ?? `${entry.title}: a practical language object rooted in a real ${environment} situation.`,
      learningObjective: entry.objective ?? `Use language to ${entry.title.toLowerCase()} in a believable ${environment} context.`,
      primaryEnvironment: environment,
      secondaryEnvironments: entry.secondary ?? options.secondary ?? [],
      interests: entry.interests ?? options.interests ?? [],
      professionalPaths: entry.professionalPaths ?? options.professionalPaths ?? [],
      communicationFunctions: functions,
      vocabularyDomains: entry.vocabulary ?? options.vocabulary ?? [defaultVocab[environment] ?? "cross-context.communication"],
      structures: entry.structures ?? options.structures ?? ["meaning-first-patterns"],
      pronunciationFocus: entry.pronunciation ?? options.pronunciation ?? [],
      register: entry.register ?? options.register ?? ["neutral"],
      culturalContexts: entry.contexts ?? options.contexts ?? ["general"],
      culturalDimension: entry.culture ?? options.culture ?? [],
      lessonType: type,
      estimatedMinutes: entry.minutes ?? options.minutes ?? (type === "professional-simulation" ? 24 : type === "pronunciation-lab" ? 12 : 15),
      prerequisites: [],
      relatedLessons: [],
      nextRecommended: [],
      progressionTracks: entry.tracks ?? options.tracks ?? ["language-level", "environment"],
      seo: {
        title: `${entry.title} | Global Speaker`,
        description: entry.description ?? `Practical ${language} for ${entry.title.toLowerCase()} in real life.`,
        intent: entry.seoIntent ?? options.seoIntent ?? ["learn"],
        searchPhrases: entry.searchThemes ?? [entry.title.toLowerCase(), `${language} ${entry.title.toLowerCase()}`],
        canonicalPath: `/learn/${language}/${entry.slug}`,
        indexable: true,
      },
      status: "planned",
      version: 1,
      content: {
        context: `Author a specific ${environment} scene where the learner needs to ${entry.title.toLowerCase()}.`,
        notice: "Show a short authentic exchange, message, or observation before explaining the language.",
        understand: "Explain meaning, communicative effect, and the choices a speaker is making.",
        toolkit: "Select 4-10 adaptable phrases, patterns, and vocabulary items; do not write a glossary.",
        examples: "Include at least three varied examples that change the situation or relationship.",
        cultureRegister: entry.cultureNote ?? "Name relevant register, regional, or cultural choices without presenting one norm as universal.",
        guidedPractice: "Use at least two explainable practice modes suited to the object type.",
        production: "Require an original response with a personal detail, choice, or adaptation.",
        realWorldChallenge: "Give the learner one small action to take into their own life.",
        reflection: "Ask what changed in the learner's perception or which version fits their voice.",
        continue: "Offer a typed next step and one lateral route through an interest, environment, or function.",
      },
      authoringNotes: entry.notes ?? `Keep this substantial enough for a complete ${type}; avoid a vocabulary-only treatment.`,
      batch: label,
    });
  }
  groups.push({ label, language, start, end: lessons.length - 1 });
}

const e = (key, slug, title, objective, extra = {}) => ({ key, slug, title, objective, ...extra });

// English: 72 objects, allocated 8 / 14 / 19 / 17 / 11 / 3 by level.
addGroup("English — Perception and immediate life", "english", "A1", "scenario-lesson", "home", [
  e("home-greet-housemate", "greeting-someone-at-home", "Greeting Someone at Home", "greet a housemate and start a short exchange", { functions: ["greeting", "building-rapport"] }),
  e("home-name-everyday-objects", "naming-everyday-objects-in-english", "Naming Everyday Objects in English", "identify familiar objects and say where they are", { functions: ["describing", "asking"], vocabulary: ["home.objects", "location"] }),
  e("home-describe-routine", "describing-your-daily-routine", "Describing Your Daily Routine", "describe a simple routine in sequence", { functions: ["describing", "sequencing"] }),
  e("people-introduce-yourself", "introducing-yourself-naturally", "Introducing Yourself Naturally", "share basic personal information and invite a response", { functions: ["introducing", "asking"] }),
  e("travel-ask-where", "asking-where-something-is", "Asking Where Something Is", "ask for a location and understand a short answer", { functions: ["asking", "confirming"], secondary: ["travel", "people"] }),
], { vocabulary: ["home.objects", "daily-life"], secondary: ["people"] });
addGroup("English — Immediate coordination", "english", "A1", "language-toolkit", "work", [
  e("work-ask-repeat", "asking-someone-to-repeat", "Asking Someone to Repeat", "request repetition without abandoning the interaction", { functions: ["requesting", "clarifying"], structures: ["repair-frames"] }),
], { secondary: ["people"], vocabulary: ["work.meetings", "repair"] });
addGroup("English — Immediate coordination", "english", "A1", "conversation-lab", "people", [
  e("people-small-talk-weather", "making-small-talk-about-the-weather", "Making Small Talk About the Weather", "make a brief low-risk social connection", { functions: ["building-rapport", "showing-interest"], secondary: ["travel", "culture"] }),
]);
addGroup("English — Immediate coordination", "english", "A1", "pronunciation-lab", "people", [
  e("people-stress-name", "making-your-name-understood", "Making Your Name Understood", "say and repeat a name clearly enough for a new contact", { functions: ["introducing", "clarifying"], pronunciation: ["word-stress", "final-sounds"], notes: "Prioritize intelligibility and repair, never accent erasure." }),
]);

addGroup("English — Everyday exchange", "english", "A2", "scenario-lesson", "home", [
  e("home-ask-household-help", "asking-for-help-at-home", "Asking for Help at Home", "make a clear household request and respond to one", { functions: ["requesting", "offering"], secondary: ["people"] }),
  e("home-explain-where-things-are", "explaining-where-things-are", "Explaining Where Things Are", "give a clear location using familiar reference points", { functions: ["describing", "giving-directions"], secondary: ["travel"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "scenario-lesson", "travel", [
  e("travel-check-in-accommodation", "checking-in-to-accommodation", "Checking In to Accommodation", "complete a predictable arrival exchange and confirm details", { functions: ["greeting", "confirming", "requesting"], professionalPaths: ["hospitality"], secondary: ["work"], vocabulary: ["travel.accommodation", "personal-information"] }),
  e("travel-order-simple-meal", "ordering-a-simple-meal", "Ordering a Simple Meal", "order food, ask one question, and confirm the choice", { functions: ["requesting", "checking"], interests: ["food"], professionalPaths: ["restaurants-bars"], secondary: ["people"] }),
  e("travel-ask-directions", "asking-for-directions-clearly", "Asking for Directions Clearly", "ask for and confirm a short route", { functions: ["asking", "confirming", "giving-directions"], secondary: ["people"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "scenario-lesson", "people", [
  e("people-invite-coffee", "inviting-someone-for-coffee", "Inviting Someone for Coffee", "make a simple invitation and respond appropriately", { functions: ["inviting", "accepting", "declining"], secondary: ["travel"] }),
  e("people-talk-family", "talking-about-family-and-relationships", "Talking About Family and Relationships", "describe relationships and answer respectful follow-up questions", { functions: ["describing", "asking", "showing-interest"], secondary: ["home"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "scenario-lesson", "work", [
  e("work-first-day-introduction", "introducing-yourself-at-work", "Introducing Yourself at Work", "introduce your role and ask a colleague a useful question", { functions: ["introducing", "asking", "building-rapport"], secondary: ["people"] }),
  e("work-follow-simple-instruction", "following-a-simple-work-instruction", "Following a Simple Work Instruction", "check an instruction and state the next action", { functions: ["instructing", "confirming", "explaining"], secondary: ["home"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "language-toolkit", "work", [
  e("work-ask-clarification", "asking-for-clarification-at-work", "Asking for Clarification at Work", "ask what a colleague means and confirm the answer", { functions: ["clarifying", "confirming"], secondary: ["people"], vocabulary: ["work.communication", "repair"] }),
  e("people-soften-simple-request", "softening-a-simple-request", "Softening a Simple Request", "make a request that is clear without sounding abrupt", { functions: ["requesting", "softening"], secondary: ["home", "work"], structures: ["polite-questions", "please"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "conversation-lab", "people", [
  e("people-keep-conversation-going", "keeping-a-conversation-going", "Keeping a Conversation Going", "use short follow-up questions and responses to sustain talk", { functions: ["asking", "showing-interest", "building-rapport"], secondary: ["work", "travel"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "pronunciation-lab", "travel", [
  e("travel-listen-to-connected-questions", "hearing-connected-questions-in-english", "Hearing Connected Questions in English", "recognize common question phrases in natural speech", { functions: ["asking", "checking"], pronunciation: ["connected-speech", "weak-forms"], secondary: ["people"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "cultural-interpretation", "culture", [
  e("culture-polite-enough", "how-polite-is-polite-enough-in-english", "How Polite Is Polite Enough in English?", "choose a level of directness for a familiar request", { functions: ["managing-register", "requesting"], contexts: ["international-english", "uk", "us"], culture: ["distance", "politeness"], secondary: ["work", "people"] }),
]);
addGroup("English — Everyday exchange", "english", "A2", "professional-simulation", "work", [
  e("hospitality-welcome-guest", "welcoming-a-guest-naturally-in-english", "Welcoming a Guest Naturally in English", "welcome a guest and begin a natural service interaction", { functions: ["greeting", "welcoming", "asking"], professionalPaths: ["hospitality"], secondary: ["travel", "people"], vocabulary: ["hospitality.reception", "first-contact"], culture: ["hospitality-norms"], notes: "Existing WO-005 object; author against the current software lesson without creating a parallel version." }),
]);

addGroup("English — Practical independence", "english", "B1", "scenario-lesson", "work", [
  e("work-give-useful-update", "giving-a-useful-work-update", "Giving a Useful Work Update", "summarize progress, name a constraint, and make the next action clear", { functions: ["updating", "summarizing", "explaining"], secondary: ["remote-work"], professionalPaths: ["remote-work"] }),
  e("work-explain-a-process", "explaining-a-process-clearly", "Explaining a Process Clearly", "walk someone through a process and check understanding", { functions: ["explaining", "instructing", "confirming"], secondary: ["home", "technology"] , interests: ["technology"]}),
  e("work-handle-client-question", "handling-a-client-question", "Handling a Client Question", "respond to an unfamiliar client question without overpromising", { functions: ["asking", "clarifying", "reassuring"], secondary: ["people"], professionalPaths: ["sales", "real-estate"] }),
  e("work-disagree-without-derailing", "disagreeing-without-derailing-a-meeting", "Disagreeing Without Derailing a Meeting", "state a different view and keep collaboration open", { functions: ["disagreeing", "hedging", "building-rapport"], secondary: ["people"], register: ["professional", "polite"] }),
  e("people-tell-a-short-story", "telling-a-short-story-about-your-day", "Telling a Short Story About Your Day", "sequence a personal event and highlight what mattered", { functions: ["storytelling", "sequencing", "expressing-emotion"], secondary: ["home", "work"] }),
  e("travel-change-a-plan", "changing-a-travel-plan", "Changing a Travel Plan", "explain a change, propose an alternative, and confirm agreement", { functions: ["handling-problems", "proposing", "confirming"], secondary: ["work"], vocabulary: ["travel.plans", "time"] }),
  e("travel-recommend-a-place", "recommending-a-place-to-visit", "Recommending a Place to Visit", "ask about preferences and give a reasoned recommendation", { functions: ["recommending", "asking", "describing"], secondary: ["people"], interests: ["food", "nature"], professionalPaths: ["tourism", "hospitality"] }),
  e("home-solve-a-household-problem", "solving-a-household-problem-in-english", "Solving a Household Problem in English", "describe a problem, ask for help, and agree on a solution", { functions: ["describing", "requesting", "resolving"], secondary: ["work"] }),
  e("people-express-a-preference", "expressing-a-preference-with-a-reason", "Expressing a Preference With a Reason", "state what you prefer and explain why", { functions: ["expressing-opinions", "comparing", "explaining"], secondary: ["interests", "culture"] , interests: ["food", "design"]}),
  e("work-respond-to-feedback", "responding-to-feedback-constructively", "Responding to Feedback Constructively", "acknowledge feedback, ask a useful question, and choose a response", { functions: ["receiving-feedback", "clarifying", "responding"], secondary: ["people"], professionalPaths: ["remote-work", "sales"] }),
]);
addGroup("English — Practical independence", "english", "B1", "language-toolkit", "work", [
  e("work-modal-softening", "using-modal-softening-at-work", "Using Modal Softening at Work", "make suggestions and requests with an appropriate degree of force", { functions: ["softening", "requesting", "suggesting"], secondary: ["people"], structures: ["modal-softening", "conditional-requests"] }),
  e("cross-context-clarify-request", "understanding-and-clarifying-guest-requests", "Understanding and Clarifying Guest Requests", "clarify an ambiguous request and offer a useful next step", { functions: ["clarifying", "confirming", "resolving"], professionalPaths: ["hospitality"], secondary: ["travel", "people"], vocabulary: ["hospitality.requests", "repair"], notes: "Existing WO-005 object; canonical ID is eng-cross-context-clarify-request-v1." }),
]);
addGroup("English — Practical independence", "english", "B1", "conversation-lab", "people", [
  e("people-ask-better-follow-ups", "asking-better-follow-up-questions", "Asking Better Follow-up Questions", "move beyond a first answer with relevant, respectful follow-up questions", { functions: ["asking", "interviewing", "showing-interest"], secondary: ["work", "interests"] }),
  e("work-repair-a-misunderstanding", "repairing-a-misunderstanding-in-conversation", "Repairing a Misunderstanding in Conversation", "notice a misunderstanding, name it, and rebuild shared meaning", { functions: ["clarifying", "correcting", "apologizing"], secondary: ["people", "work"] }),
]);
addGroup("English — Practical independence", "english", "B1", "pronunciation-lab", "work", [
  e("work-stress-key-information", "stressing-key-information-in-english", "Stressing Key Information in English", "make important information easier for a listener to find", { functions: ["explaining", "summarizing", "updating"], pronunciation: ["sentence-stress", "prominence"], secondary: ["people"] }),
]);
addGroup("English — Practical independence", "english", "B1", "cultural-interpretation", "culture", [
  e("culture-what-sounds-direct", "what-sounds-direct-in-international-english", "What Sounds Direct in International English?", "adjust a request or disagreement for relationship and context", { functions: ["managing-register", "disagreeing", "softening"], contexts: ["international-english", "uk", "us"], culture: ["distance", "disagreement"], secondary: ["work", "people"] }),
]);
addGroup("English — Practical independence", "english", "B1", "professional-simulation", "work", [
  e("hospitality-recovery-delay", "recovering-from-a-service-delay", "Recovering From a Service Delay", "acknowledge a delay, apologize, and move toward a concrete solution", { functions: ["handling-problems", "apologizing", "reassuring", "resolving"], professionalPaths: ["hospitality", "restaurants-bars"], secondary: ["people"], vocabulary: ["hospitality.service-recovery", "time"], culture: ["apology", "trust"] }),
]);
addGroup("English — Practical independence", "english", "B1", "story-and-reflection", "interests", [
  e("music-talk-about-a-song", "talking-about-a-song-you-love", "Talking About a Song You Love", "describe a musical response and tell a short personal story", { functions: ["describing", "expressing-emotion", "storytelling"], interests: ["music"], secondary: ["people", "culture"], vocabulary: ["music.listening", "emotion"] }),
]);
addGroup("English — Practical independence", "english", "B1", "written-clarity-lab", "work", [
  e("work-write-a-clear-follow-up", "writing-a-clear-follow-up-message", "Writing a Clear Follow-up Message", "summarize an interaction and make the next action visible", { functions: ["summarizing", "documenting", "requesting"], professionalPaths: ["remote-work", "sales"], secondary: ["people"], register: ["written", "professional"] }),
]);

addGroup("English — Nuance and professional confidence", "english", "B2", "scenario-lesson", "work", [
  e("work-negotiate-priorities", "negotiating-priorities-at-work", "Negotiating Priorities at Work", "explain competing needs and reach a workable agreement", { functions: ["negotiating", "explaining", "proposing"], secondary: ["people"], professionalPaths: ["remote-work", "sales"] }),
  e("work-present-a-recommendation", "presenting-a-recommendation", "Presenting a Recommendation", "present a reasoned recommendation and respond to questions", { functions: ["presenting", "recommending", "persuading"], interests: ["design", "technology"], secondary: ["people"] }),
  e("work-manage-uncertainty", "managing-uncertainty-without-sounding-vague", "Managing Uncertainty Without Sounding Vague", "signal what is known, unknown, and worth checking", { functions: ["hedging", "explaining", "reassuring"], secondary: ["culture", "people"] }),
  e("people-express-disagreement-with-care", "expressing-disagreement-with-care", "Expressing Disagreement With Care", "challenge an idea while preserving the relationship", { functions: ["disagreeing", "hedging", "building-rapport"], secondary: ["work", "culture"] }),
  e("travel-tell-a-complex-travel-story", "telling-a-complex-travel-story", "Telling a Complex Travel Story", "shape a longer story with background, turning point, and reflection", { functions: ["storytelling", "sequencing", "reflecting"], secondary: ["people", "culture"] }),
  e("home-discuss-comfort-and-boundaries", "discussing-comfort-and-boundaries", "Discussing Comfort and Boundaries", "explain a personal boundary and negotiate a respectful adjustment", { functions: ["setting-boundaries", "explaining", "negotiating"], secondary: ["people"] }),
  e("work-handle-an-objection", "handling-an-objection-without-a-script", "Handling an Objection Without a Script", "explore an objection and respond to the underlying concern", { functions: ["clarifying", "persuading", "resolving"], professionalPaths: ["sales", "real-estate"], secondary: ["people"] }),
  e("interests-compare-design-choices", "comparing-design-choices-in-english", "Comparing Design Choices in English", "evaluate alternatives and justify a design preference", { functions: ["comparing", "evaluating", "explaining"], interests: ["design"], secondary: ["work", "people"], vocabulary: ["design.visual-choices", "evaluation"] }),
  e("interests-explain-a-technology-change", "explaining-a-technology-change", "Explaining a Technology Change", "explain what changed, why it matters, and how people should respond", { functions: ["explaining", "instructing", "persuading"], interests: ["technology"], secondary: ["work"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "language-toolkit", "people", [
  e("people-hedge-an-opinion", "hedging-an-opinion-without-losing-clarity", "Hedging an Opinion Without Losing Clarity", "express a view with appropriate confidence and openness", { functions: ["expressing-opinions", "hedging", "agreeing"], secondary: ["work", "ideas"], interests: ["ideas"] }),
  e("work-frame-a-disagreement", "framing-a-disagreement-in-a-meeting", "Framing a Disagreement in a Meeting", "signal respect, state a difference, and propose a way forward", { functions: ["disagreeing", "softening", "proposing"], secondary: ["people"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "conversation-lab", "people", [
  e("people-manage-overlapping-talk", "managing-overlapping-talk", "Managing Overlapping Talk", "enter, hold, and yield a turn in a fast conversation", { functions: ["turn-taking", "interrupting", "managing-register"], secondary: ["work", "culture"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "pronunciation-lab", "people", [
  e("people-use-reduction-for-listening", "recognizing-conversational-reductions", "Recognizing Conversational Reductions", "follow natural reductions without imitating an accent", { functions: ["listening", "clarifying"], pronunciation: ["weak-forms", "connected-speech", "reduction"], secondary: ["travel", "work"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "cultural-interpretation", "culture", [
  e("culture-understatement-and-meaning", "understatement-and-implied-meaning-in-english", "Understatement and Implied Meaning in English", "interpret what a speaker implies and choose a clear response", { functions: ["interpreting", "hedging", "confirming"], contexts: ["international-english", "uk", "us"], culture: ["implication", "humor"], secondary: ["people", "work"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "professional-simulation", "work", [
  e("remote-work-misalignment", "resolving-misalignment-in-remote-work", "Resolving Misalignment in Remote Work", "repair a distributed-work misunderstanding and document agreement", { functions: ["handling-problems", "clarifying", "documenting"], professionalPaths: ["remote-work"], secondary: ["people"], interests: ["technology"] }),
]);
addGroup("English — Nuance and professional confidence", "english", "B2", "story-and-reflection", "interests", [
  e("nature-describe-a-changing-landscape", "describing-a-changing-landscape", "Describing a Changing Landscape", "observe change in nature and connect it to personal meaning", { functions: ["describing", "comparing", "reflecting"], interests: ["nature"], secondary: ["culture", "travel"], vocabulary: ["nature.landscapes", "change"] }),
]);

addGroup("English — Advanced communication", "english", "C1", "scenario-lesson", "work", [
  e("work-lead-a-difficult-conversation", "leading-a-difficult-conversation", "Leading a Difficult Conversation", "hold a clear, humane conversation when stakes and emotions are high", { functions: ["handling-problems", "setting-boundaries", "reassuring"], secondary: ["people"], professionalPaths: ["remote-work", "sales"] }),
  e("work-persuade-with-evidence", "persuading-with-evidence-and-empathy", "Persuading With Evidence and Empathy", "adapt an argument to a listener's concerns without flattening the evidence", { functions: ["persuading", "explaining", "showing-interest"], interests: ["ideas"], secondary: ["people"] }),
  e("culture-interpret-a-social-signal", "interpreting-an-ambiguous-social-signal", "Interpreting an Ambiguous Social Signal", "hold multiple interpretations and ask without overclaiming", { functions: ["interpreting", "clarifying", "hedging"], secondary: ["people", "culture"], contexts: ["international-english"] }),
  e("people-tell-a-story-with-a-point", "telling-a-story-with-a-point", "Telling a Story With a Point", "shape a narrative for a listener and make its significance clear", { functions: ["storytelling", "sequencing", "summarizing"], secondary: ["work", "culture"] }),
  e("design-present-critique", "presenting-a-design-critique", "Presenting a Design Critique", "give precise critique while protecting collaboration", { functions: ["evaluating", "explaining", "disagreeing"], interests: ["design"], secondary: ["work", "people"] }),
  e("ideas-discuss-an-ethical-question", "discussing-an-ethical-question", "Discussing an Ethical Question", "distinguish a position, assumption, and consequence in discussion", { functions: ["expressing-opinions", "agreeing", "disagreeing", "persuading"], interests: ["ideas"], secondary: ["culture", "people"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "language-toolkit", "work", [
  e("work-shift-register-strategically", "shifting-register-strategically", "Shifting Register Strategically", "move between casual, neutral, and professional language for the same intent", { functions: ["managing-register", "formalizing", "casualizing"], secondary: ["people", "culture"], register: ["casual", "neutral", "professional", "written"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "conversation-lab", "people", [
  e("people-sustain-a-nuanced-conversation", "sustaining-a-nuanced-conversation", "Sustaining a Nuanced Conversation", "develop an idea across turns while responding to another person's perspective", { functions: ["turn-taking", "expressing-opinions", "showing-interest"], secondary: ["ideas", "culture"], interests: ["ideas"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "pronunciation-lab", "work", [
  e("work-sound-confident-not-certain", "sounding-confident-without-sounding-certain", "Sounding Confident Without Sounding Certain", "use prominence and intonation to distinguish confidence from certainty", { functions: ["hedging", "presenting", "explaining"], pronunciation: ["intonation", "prominence"], secondary: ["people"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "cultural-interpretation", "culture", [
  e("culture-humor-and-boundaries", "reading-humor-and-boundaries-in-english", "Reading Humor and Boundaries in English", "interpret humor while recognizing when a boundary may be present", { functions: ["interpreting", "showing-interest", "setting-boundaries"], contexts: ["international-english", "uk", "us"], culture: ["humor", "taboo", "boundaries"], secondary: ["people"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "professional-simulation", "work", [
  e("sales-negotiate-a-complex-deal", "negotiating-a-complex-deal", "Negotiating a Complex Deal", "balance interests, concessions, evidence, and relationship across a negotiation", { functions: ["negotiating", "persuading", "proposing"], professionalPaths: ["sales", "real-estate"], secondary: ["people"], register: ["professional", "formal"] }),
]);
addGroup("English — Advanced communication", "english", "C1", "written-clarity-lab", "work", [
  e("work-write-a-sensitive-decision", "writing-a-sensitive-decision-note", "Writing a Sensitive Decision Note", "document a difficult decision with clarity, care, and accountable next steps", { functions: ["documenting", "summarizing", "explaining"], professionalPaths: ["remote-work"], secondary: ["people"], register: ["written", "professional"] }),
]);
addGroup("English — Specialist nuance", "english", "C2", "scenario-lesson", "culture", [
  e("culture-navigate-layered-implication", "navigating-layered-implication-in-english", "Navigating Layered Implication in English", "respond precisely when meaning is distributed across wording, tone, and context", { functions: ["interpreting", "hedging", "clarifying"], secondary: ["people", "work"], contexts: ["international-english", "uk", "us"] }),
  e("ideas-make-a-fine-grained-argument", "making-a-fine-grained-argument", "Making a Fine-Grained Argument", "qualify a complex position while remaining persuasive and comprehensible", { functions: ["persuading", "expressing-opinions", "summarizing"], interests: ["ideas"], secondary: ["culture", "work"] }),
]);
addGroup("English — Specialist nuance", "english", "C2", "language-toolkit", "culture", [
  e("culture-choose-a-delicate-formulation", "choosing-a-delicate-formulation", "Choosing a Delicate Formulation", "select language that carries precision, tact, and appropriate distance", { functions: ["managing-register", "softening", "formalizing"], secondary: ["people", "work"], register: ["formal", "professional", "written"] }),
]);

// Spanish: 55 objects, allocated 6 / 11 / 15 / 13 / 8 / 2 by level.
addGroup("Spanish — Entrada y vida cotidiana", "spanish", "A1", "scenario-lesson", "home", [
  e("home-saludar-en-casa", "saludar-en-casa-en-espanol", "Saludar en Casa en Español", "greet someone at home and begin a familiar exchange", { functions: ["greeting", "building-rapport"], contexts: ["mexico", "latin-america"], secondary: ["people"] }),
  e("people-presentarse", "presentarse-en-espanol", "Presentarse en Español", "give basic personal information and ask one question", { functions: ["introducing", "asking"], contexts: ["mexico", "latin-america"], secondary: ["work"] }),
  e("travel-pedir-ayuda", "pedir-ayuda-en-un-viaje", "Pedir Ayuda Durante un Viaje", "ask for immediate help in a travel situation", { functions: ["requesting", "asking"], secondary: ["people"] }),
  e("food-pedir-en-un-cafe", "pedir-en-un-cafe", "Pedir en un Café", "order a simple item and confirm the choice", { functions: ["requesting", "checking"], interests: ["food"], professionalPaths: ["restaurants-bars"], secondary: ["travel"], contexts: ["mexico"] }),
], { contexts: ["mexico", "latin-america"] });
addGroup("Spanish — Entrada y vida cotidiana", "spanish", "A1", "language-toolkit", "travel", [
  e("travel-preguntar-donde", "preguntar-donde-esta-algo", "Preguntar Dónde Está Algo", "ask where a place or object is", { functions: ["asking", "confirming"], secondary: ["home"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Entrada y vida cotidiana", "spanish", "A1", "pronunciation-lab", "people", [
  e("people-pronunciar-nombres", "pronunciar-nombres-con-claridad", "Pronunciar Nombres con Claridad", "say and repair a name clearly in an initial interaction", { functions: ["introducing", "clarifying"], pronunciation: ["syllable-timing", "stress"], contexts: ["mexico", "latin-america"] }),
]);

addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "scenario-lesson", "home", [
  e("home-describir-la-casa", "describir-la-casa-en-espanol", "Describir la Casa en Español", "describe rooms, objects, and where things are", { functions: ["describing", "giving-directions"], secondary: ["people"], contexts: ["mexico", "latin-america"] }),
  e("home-organizar-la-rutina", "organizar-la-rutina-de-casa", "Organizar la Rutina de Casa", "coordinate a household routine and confirm responsibilities", { functions: ["planning", "requesting", "confirming"], secondary: ["work"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "scenario-lesson", "travel", [
  e("travel-llegar-al-alojamiento", "llegar-a-un-alojamiento", "Llegar a un Alojamiento", "complete an arrival exchange and ask about a practical need", { functions: ["greeting", "requesting", "confirming"], professionalPaths: ["hospitality"], secondary: ["work"], contexts: ["mexico", "latin-america"] }),
  e("travel-explicar-un-problema", "explicar-un-problema-de-viaje", "Explicar un Problema de Viaje", "describe a travel problem and ask what can be done", { functions: ["describing", "handling-problems", "requesting"], secondary: ["people"] }),
  e("travel-preguntar-por-transporte", "preguntar-por-el-transporte", "Preguntar por el Transporte", "ask about a route, timing, and price", { functions: ["asking", "confirming", "comparing"], secondary: ["work"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "scenario-lesson", "people", [
  e("people-invitar-y-aceptar", "invitar-y-aceptar-una-propuesta", "Invitar y Aceptar una Propuesta", "make a simple invitation and respond warmly", { functions: ["inviting", "accepting", "declining"], secondary: ["culture"], contexts: ["mexico", "latin-america"] }),
  e("people-hablar-de-gustos", "hablar-de-gustos-y-preferencias", "Hablar de Gustos y Preferencias", "express a preference and ask about another person's taste", { functions: ["expressing-opinions", "asking", "comparing"], interests: ["music", "food"], secondary: ["people"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "scenario-lesson", "work", [
  e("work-presentarse-en-el-trabajo", "presentarse-en-el-trabajo", "Presentarse en el Trabajo", "introduce your role and establish a useful first connection", { functions: ["introducing", "building-rapport", "asking"], secondary: ["people"] }),
  e("work-seguir-instrucciones", "seguir-y-confirmar-instrucciones", "Seguir y Confirmar Instrucciones", "confirm a work instruction and state what you will do", { functions: ["confirming", "instructing", "explaining"], secondary: ["home"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "language-toolkit", "people", [
  e("people-pedir-con-amabilidad", "pedir-algo-con-amabilidad", "Pedir Algo con Amabilidad", "make a clear request with an appropriate level of warmth", { functions: ["requesting", "softening"], secondary: ["work", "home"], structures: ["por-favor", "polite-questions"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "conversation-lab", "people", [
  e("people-mantener-la-conversacion", "mantener-una-conversacion-sencilla", "Mantener una Conversación Sencilla", "use follow-up questions and short reactions to keep talking", { functions: ["asking", "showing-interest", "building-rapport"], secondary: ["travel", "work"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "pronunciation-lab", "travel", [
  e("travel-entender-el-ritmo", "entender-el-ritmo-del-espanol", "Entender el Ritmo del Español", "follow connected everyday Spanish without translating every word", { functions: ["listening", "clarifying"], pronunciation: ["syllable-timing", "connected-speech"], secondary: ["people"] }),
]);
addGroup("Spanish — Vida diaria y participación", "spanish", "A2", "cultural-interpretation", "culture", [
  e("culture-tu-usted-contexto", "tu-o-usted-en-contexto", "Tú o Usted en Contexto", "choose a form of address with awareness of relationship and region", { functions: ["managing-register", "greeting", "showing-respect"], contexts: ["mexico", "latin-america", "spain"], culture: ["distance", "hierarchy"], secondary: ["people", "work"] }),
]);

addGroup("Spanish — B1 participation and repair", "spanish", "B1", "scenario-lesson", "work", [
  e("work-explicar-un-proceso", "explicar-un-proceso-en-espanol", "Explicar un Proceso en Español", "explain steps and check that a colleague can follow them", { functions: ["explaining", "instructing", "confirming"], secondary: ["technology"], interests: ["technology"] }),
  e("work-aclarar-una-pregunta", "aclarar-una-pregunta-en-el-trabajo", "Aclarar una Pregunta en el Trabajo", "clarify what a colleague or client needs before answering", { functions: ["clarifying", "confirming", "asking"], secondary: ["people"] }),
  e("work-dar-una-actualizacion", "dar-una-actualizacion-de-trabajo", "Dar una Actualización de Trabajo", "summarize progress and identify a next step", { functions: ["updating", "summarizing", "documenting"], professionalPaths: ["remote-work"], secondary: ["people"] }),
  e("people-contar-una-historia", "contar-una-historia-personal", "Contar una Historia Personal", "sequence an experience and express what it meant", { functions: ["storytelling", "sequencing", "expressing-emotion"], secondary: ["culture", "travel"] }),
  e("travel-recomendar-un-lugar", "recomendar-un-lugar-en-espanol", "Recomendar un Lugar en Español", "ask about preferences and recommend a place with a reason", { functions: ["recommending", "asking", "describing"], professionalPaths: ["tourism", "hospitality"], interests: ["food", "nature"], secondary: ["people"], contexts: ["mexico", "latin-america"] }),
  e("home-resolver-un-problema", "resolver-un-problema-de-casa", "Resolver un Problema de Casa", "describe a household problem and negotiate a practical solution", { functions: ["handling-problems", "resolving", "negotiating"], secondary: ["work"] }),
  e("people-expresar-emociones", "expresar-emociones-con-matiz", "Expresar Emociones con Matiz", "name an emotion and explain its cause or intensity", { functions: ["showing-emotion", "explaining", "reflecting"], secondary: ["culture", "people"] }),
  e("food-describir-sabores", "describir-sabores-y-texturas", "Describir Sabores y Texturas", "describe sensory qualities and compare preferences", { functions: ["describing", "comparing", "recommending"], interests: ["food"], secondary: ["culture"], vocabulary: ["food.sensory-description"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "scenario-lesson", "culture", [
  e("culture-ahorita-contexto", "lo-que-ahorita-puede-significar", "Lo Que Ahorita Puede Significar", "interpret timing and expectation in Mexican Spanish without treating one gloss as universal", { functions: ["interpreting", "clarifying", "managing-register"], contexts: ["mexico"], culture: ["time", "pragmatics"], secondary: ["travel", "people"], interests: ["ideas"], vocabulary: ["mexico.expressions"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "language-toolkit", "people", [
  e("people-preguntar-para-confirmar", "preguntar-para-confirmar-en-espanol", "Preguntar para Confirmar en Español", "use confirmation frames before acting on uncertain information", { functions: ["confirming", "clarifying", "asking"], secondary: ["work", "travel"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "conversation-lab", "people", [
  e("people-reparar-un-malentendido", "reparar-un-malentendido-en-espanol", "Reparar un Malentendido en Español", "name a misunderstanding and rebuild shared meaning", { functions: ["clarifying", "correcting", "apologizing"], secondary: ["work", "culture"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "pronunciation-lab", "work", [
  e("work-destacar-informacion", "destacar-informacion-importante-al-hablar", "Destacar Información Importante al Hablar", "use stress and intonation to signal what matters", { functions: ["explaining", "presenting", "summarizing"], pronunciation: ["stress", "intonation"], secondary: ["people"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "cultural-interpretation", "culture", [
  e("culture-mande-y-la-atencion", "mande-y-las-formas-de-responder", "Mande y las Formas de Responder", "interpret and choose responses to a culturally marked request for attention", { functions: ["managing-register", "clarifying", "showing-respect"], contexts: ["mexico"], culture: ["politeness", "hierarchy"], secondary: ["people", "work"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "professional-simulation", "work", [
  e("hospitality-reparar-un-retraso", "reparar-un-retraso-en-hospitalidad", "Reparar un Retraso en Hospitalidad", "acknowledge a delay, apologize, and offer a realistic solution", { functions: ["handling-problems", "apologizing", "resolving"], professionalPaths: ["hospitality", "restaurants-bars"], secondary: ["travel"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "story-and-reflection", "interests", [
  e("music-hablar-de-una-cancion", "hablar-de-una-cancion-que-te-gusta", "Hablar de una Canción que Te Gusta", "describe a song and connect it to a memory or feeling", { functions: ["describing", "expressing-emotion", "storytelling"], interests: ["music"], secondary: ["people", "culture"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — B1 participation and repair", "spanish", "B1", "written-clarity-lab", "work", [
  e("work-escribir-un-seguimiento", "escribir-un-mensaje-de-seguimiento", "Escribir un Mensaje de Seguimiento", "summarize an interaction and make the next action explicit", { functions: ["documenting", "summarizing", "requesting"], professionalPaths: ["remote-work", "sales"], secondary: ["people"], register: ["written", "professional"] }),
]);

addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "scenario-lesson", "work", [
  e("work-negociar-prioridades", "negociar-prioridades-en-espanol", "Negociar Prioridades en Español", "compare competing needs and reach an explicit agreement", { functions: ["negotiating", "proposing", "explaining"], professionalPaths: ["remote-work", "sales"], secondary: ["people"] }),
  e("work-manejar-una-objecion", "manejar-una-objecion-sin-guion", "Manejar una Objeción sin Guion", "discover the concern behind an objection and respond constructively", { functions: ["clarifying", "persuading", "resolving"], professionalPaths: ["sales", "real-estate"], secondary: ["people"] }),
  e("travel-contar-una-experiencia", "contar-una-experiencia-de-viaje", "Contar una Experiencia de Viaje", "shape a longer travel story with context and reflection", { functions: ["storytelling", "sequencing", "reflecting"], secondary: ["culture", "people"] }),
  e("people-desacordar-con-cuidado", "desacordar-con-cuidado-en-espanol", "Desacordar con Cuidado en Español", "express disagreement while maintaining warmth and relationship", { functions: ["disagreeing", "softening", "building-rapport"], secondary: ["work", "culture"], contexts: ["mexico", "latin-america"] }),
  e("nature-describir-un-paisaje", "describir-un-paisaje-y-su-cambio", "Describir un Paisaje y su Cambio", "compare a landscape over time and express a personal response", { functions: ["describing", "comparing", "reflecting"], interests: ["nature"], secondary: ["travel", "culture"] }),
  e("design-justificar-una-eleccion", "justificar-una-eleccion-de-diseno", "Justificar una Elección de Diseño", "explain and defend a design choice for an audience", { functions: ["explaining", "persuading", "evaluating"], interests: ["design"], secondary: ["work"] }),
  e("ideas-discutir-una-pregunta", "discutir-una-pregunta-compleja", "Discutir una Pregunta Compleja", "develop an opinion, qualify it, and respond to another view", { functions: ["expressing-opinions", "agreeing", "disagreeing"], interests: ["ideas"], secondary: ["culture", "people"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "language-toolkit", "culture", [
  e("culture-ser-estar-significado", "ser-y-estar-para-significar", "Ser y Estar para Significar", "choose between ser and estar to express identity, state, and change in context", { functions: ["describing", "comparing", "explaining"], structures: ["ser-estar-aspect"], secondary: ["people", "work"], contexts: ["mexico", "latin-america", "spain"] }),
  e("people-diminutives-and-warmth", "diminutives-and-warmth-in-spanish", "Diminutives and Warmth in Spanish", "interpret and use diminutives with awareness of relationship and region", { functions: ["managing-register", "showing-warmth", "interpreting"], contexts: ["mexico", "latin-america"], culture: ["warmth", "distance"], secondary: ["people", "culture"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "conversation-lab", "people", [
  e("people-manage-fast-conversation", "manejar-una-conversacion-rapida", "Manejar una Conversación Rápida", "enter, hold, and yield turns in lively conversation", { functions: ["turn-taking", "interrupting", "building-rapport"], secondary: ["culture", "work"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "pronunciation-lab", "people", [
  e("people-entender-la-s-final", "entender-la-s-final-en-contexto", "Entender la S Final en Contexto", "follow regional pronunciation differences without treating variation as error", { functions: ["listening", "interpreting", "clarifying"], pronunciation: ["regional-s", "connected-speech"], contexts: ["mexico", "latin-america", "spain"], secondary: ["travel", "culture"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "cultural-interpretation", "culture", [
  e("culture-indirectness-and-warmth", "indirectness-and-warmth-in-mexican-spanish", "Indirectness and Warmth in Mexican Spanish", "interpret an indirect response and decide when to clarify", { functions: ["interpreting", "clarifying", "managing-register"], contexts: ["mexico"], culture: ["indirectness", "warmth", "politeness"], secondary: ["people", "work"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "professional-simulation", "work", [
  e("tourism-adapt-an-itinerary", "adaptar-un-itinerario-en-espanol", "Adaptar un Itinerario en Español", "respond to changing needs while protecting the group's trust and safety", { functions: ["handling-problems", "planning", "reassuring"], professionalPaths: ["tourism"], secondary: ["travel", "nature"], interests: ["nature"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "story-and-reflection", "interests", [
  e("music-contar-una-historia-musical", "contar-una-historia-musical", "Contar una Historia Musical", "connect a musical experience to place, memory, and identity", { functions: ["storytelling", "reflecting", "expressing-emotion"], interests: ["music"], secondary: ["culture", "people"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Nuance and regional pragmatics", "spanish", "B2", "written-clarity-lab", "work", [
  e("work-escribir-con-distancia", "escribir-con-distancia-profesional", "Escribir con Distancia Profesional", "adjust a written message for clarity, warmth, and professional distance", { functions: ["documenting", "managing-register", "requesting"], professionalPaths: ["remote-work", "sales"], secondary: ["people"], register: ["written", "professional"] }),
]);

addGroup("Spanish — Advanced perspective", "spanish", "C1", "scenario-lesson", "culture", [
  e("culture-interpretar-el-silencio", "interpretar-el-silencio-en-contexto", "Interpretar el Silencio en Contexto", "hold several possible meanings for silence and respond without stereotyping", { functions: ["interpreting", "hedging", "clarifying"], contexts: ["mexico", "latin-america", "spain"], culture: ["silence", "pragmatics"], secondary: ["people", "work"] }),
  e("work-perspectiva-y-persuasion", "persuadir-con-perspectiva", "Persuadir con Perspectiva", "adapt a persuasive case to values, evidence, and relationship", { functions: ["persuading", "explaining", "showing-interest"], professionalPaths: ["sales", "real-estate"], secondary: ["people"] }),
  e("people-contar-una-historia-con-matiz", "contar-una-historia-con-matiz", "Contar una Historia con Matiz", "shape a narrative that balances implication, detail, and reflection", { functions: ["storytelling", "sequencing", "reflecting"], secondary: ["culture", "ideas"], interests: ["ideas"] }),
  e("ideas-debatir-con-respeto", "debatir-con-respeto-y-precision", "Debatir con Respeto y Precisión", "qualify a complex disagreement and keep the conversation productive", { functions: ["disagreeing", "hedging", "summarizing"], interests: ["ideas"], secondary: ["culture", "people"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C1", "language-toolkit", "culture", [
  e("culture-elegir-registro-regional", "elegir-registro-segun-la-region", "Elegir Registro Según la Región", "adapt forms of address and phrasing across Spanish-speaking contexts", { functions: ["managing-register", "formalizing", "casualizing"], contexts: ["mexico", "latin-america", "spain"], culture: ["regional-variation", "distance"], secondary: ["people", "work"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C1", "conversation-lab", "people", [
  e("people-sostener-una-conversacion", "sostener-una-conversacion-con-matiz", "Sostener una Conversación con Matiz", "develop an idea across turns while responding to implied meaning", { functions: ["turn-taking", "interpreting", "expressing-opinions"], secondary: ["culture", "ideas"], interests: ["ideas"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C1", "pronunciation-lab", "work", [
  e("work-entonacion-y-actitud", "entonacion-y-actitud-al-hablar", "Entonación y Actitud al Hablar", "use intonation to distinguish warmth, doubt, challenge, and certainty", { functions: ["managing-register", "expressing-emotion", "hedging"], pronunciation: ["intonation", "prosody"], secondary: ["people"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C1", "cultural-interpretation", "culture", [
  e("culture-humor-y-confianza", "humor-y-confianza-en-la-conversacion", "Humor y Confianza en la Conversación", "interpret humor, familiarity, and boundaries without assuming intimacy", { functions: ["interpreting", "building-rapport", "setting-boundaries"], contexts: ["mexico", "latin-america"], culture: ["humor", "warmth", "boundaries"], secondary: ["people"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C1", "professional-simulation", "work", [
  e("real-estate-negociar-la-confianza", "negociar-la-confianza-en-inmobiliaria", "Negociar la Confianza en Inmobiliaria", "build trust while clarifying competing interests in a property negotiation", { functions: ["negotiating", "reassuring", "explaining"], professionalPaths: ["real-estate"], secondary: ["home", "people"], contexts: ["mexico", "latin-america"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C2", "scenario-lesson", "culture", [
  e("culture-navegar-la-ambiguedad", "navegar-la-ambiguedad-pragmatica", "Navegar la Ambigüedad Pragmática", "respond precisely when social meaning remains deliberately open", { functions: ["interpreting", "hedging", "clarifying"], contexts: ["mexico", "latin-america", "spain"], culture: ["pragmatics", "implication"], secondary: ["people", "work"] }),
]);
addGroup("Spanish — Advanced perspective", "spanish", "C2", "scenario-lesson", "ideas", [
  e("ideas-argumentar-con-sutileza", "argumentar-con-sutileza", "Argumentar con Sutileza", "make a fine-grained argument that remains clear to a non-specialist", { functions: ["persuading", "expressing-opinions", "summarizing"], interests: ["ideas"], secondary: ["culture", "work"] }),
]);

// French: 48 objects, allocated 4 / 9 / 12 / 13 / 8 / 2 by level.
addGroup("French — Premiers liens", "french", "A1", "scenario-lesson", "people", [
  e("people-saluer-et-se-presenter", "saluer-et-se-presenter-en-francais", "Saluer et Se Présenter en Français", "greet someone and exchange basic identity information", { functions: ["greeting", "introducing"], contexts: ["france", "quebec"], secondary: ["work"] }),
  e("home-decrire-son-espace", "decrire-son-espace-en-francais", "Décrire Son Espace en Français", "name familiar objects and describe where they are", { functions: ["describing", "giving-directions"], secondary: ["home", "people"], vocabulary: ["home.objects", "location"] }),
]);
addGroup("French — Premiers liens", "french", "A1", "language-toolkit", "travel", [
  e("travel-demander-un-renseignement", "demander-un-renseignement-en-francais", "Demander un Renseignement en Français", "ask for simple information and signal that you need help", { functions: ["asking", "requesting"], contexts: ["france", "quebec"], secondary: ["people"] }),
]);
addGroup("French — Premiers liens", "french", "A1", "pronunciation-lab", "people", [
  e("people-prononcer-les-noms", "prononcer-les-noms-et-les-liaisons", "Prononcer les Noms et les Liaisons", "make a first introduction intelligible while noticing common liaison", { functions: ["introducing", "clarifying"], pronunciation: ["liaison", "final-consonants"], contexts: ["france", "quebec"] }),
]);

addGroup("French — Vie quotidienne et registre", "french", "A2", "scenario-lesson", "home", [
  e("home-organiser-la-maison", "organiser-la-maison-en-francais", "Organiser la Maison en Français", "coordinate a household task and confirm who will do what", { functions: ["planning", "requesting", "confirming"], secondary: ["people"] }),
  e("home-parler-des-habitudes", "parler-de-ses-habitudes", "Parler de Ses Habitudes", "describe routines and compare them with another person's routines", { functions: ["describing", "comparing", "asking"], secondary: ["people"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "scenario-lesson", "travel", [
  e("travel-arriver-a-lhotel", "arriver-a-lhotel-en-francais", "Arriver à l'Hôtel en Français", "manage a predictable arrival and ask for one practical detail", { functions: ["greeting", "confirming", "requesting"], professionalPaths: ["hospitality"], secondary: ["work"], contexts: ["france", "quebec"] }),
  e("travel-demander-son-chemin", "demander-son-chemin-en-francais", "Demander Son Chemin en Français", "ask for directions and confirm a route", { functions: ["asking", "confirming", "giving-directions"], secondary: ["people"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "scenario-lesson", "work", [
  e("work-se-presenter-au-travail", "se-presenter-au-travail-en-francais", "Se Présenter au Travail en Français", "introduce your role and establish an appropriate professional relationship", { functions: ["introducing", "building-rapport", "asking"], secondary: ["people"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "language-toolkit", "people", [
  e("people-demander-avec-politesse", "demander-avec-politesse-en-francais", "Demander avec Politesse en Français", "make a request with an appropriate level of distance and warmth", { functions: ["requesting", "softening", "managing-register"], structures: ["polite-questions", "please-forms"], contexts: ["france", "quebec"], culture: ["distance", "politeness"], secondary: ["work", "home"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "conversation-lab", "people", [
  e("people-faire-durer-une-conversation", "faire-durer-une-conversation-simple", "Faire Durer une Conversation Simple", "use reactions and follow-up questions to keep an exchange going", { functions: ["asking", "showing-interest", "building-rapport"], secondary: ["travel", "work"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "pronunciation-lab", "people", [
  e("people-entendre-le-francais-lie", "entendre-le-francais-lie", "Entendre le Français Lié", "recognize connected speech in a familiar exchange", { functions: ["listening", "clarifying"], pronunciation: ["liaison", "connected-speech", "rhythm"], secondary: ["travel", "work"] }),
]);
addGroup("French — Vie quotidienne et registre", "french", "A2", "cultural-interpretation", "culture", [
  e("culture-tu-ou-vous", "tu-ou-vous-choisir-le-bon-registre", "Tu ou Vous: Choisir le Bon Registre", "choose a form of address based on relationship, context, and region", { functions: ["managing-register", "greeting", "showing-respect"], contexts: ["france", "quebec"], culture: ["distance", "hierarchy"], secondary: ["people", "work"] }),
]);

addGroup("French — Autonomie et réparation", "french", "B1", "scenario-lesson", "work", [
  e("work-expliquer-une-procedure", "expliquer-une-procedure-clairement", "Expliquer une Procédure Clairement", "explain steps and check understanding in a work context", { functions: ["explaining", "instructing", "confirming"], secondary: ["technology"] }),
  e("work-clarifier-une-demande", "clarifier-une-demande-au-travail", "Clarifier une Demande au Travail", "clarify an ambiguous request and state the next action", { functions: ["clarifying", "confirming", "resolving"], secondary: ["people"] }),
  e("work-donner-un-point-davancement", "donner-un-point-davancement", "Donner un Point d'Avancement", "summarize progress, constraints, and next steps", { functions: ["updating", "summarizing", "documenting"], professionalPaths: ["remote-work"], secondary: ["people"] }),
  e("people-raconter-un-souvenir", "raconter-un-souvenir-en-francais", "Raconter un Souvenir en Français", "tell a personal story with sequence and reflection", { functions: ["storytelling", "sequencing", "reflecting"], secondary: ["culture", "interests"] }),
  e("travel-recommander-un-endroit", "recommander-un-endroit-en-francais", "Recommander un Endroit en Français", "ask about preferences and make a reasoned recommendation", { functions: ["recommending", "asking", "describing"], professionalPaths: ["tourism", "hospitality"], interests: ["food", "nature"], secondary: ["people"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "scenario-lesson", "people", [
  e("people-exprimer-une-emotion", "exprimer-une-emotion-avec-nuance", "Exprimer une Émotion avec Nuance", "name an emotion and explain its intensity or cause", { functions: ["showing-emotion", "explaining", "reflecting"], secondary: ["culture"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "language-toolkit", "work", [
  e("work-formuler-une-demande", "formuler-une-demande-attenuee", "Formuler une Demande Atténuée", "make a clear request while managing professional distance", { functions: ["requesting", "softening", "managing-register"], structures: ["conditional-requests", "modal-softening"], secondary: ["people"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "conversation-lab", "people", [
  e("people-reparer-un-malentendu", "reparer-un-malentendu-en-francais", "Réparer un Malentendu en Français", "clarify a misunderstanding while preserving the relationship", { functions: ["clarifying", "correcting", "apologizing"], secondary: ["work", "culture"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "pronunciation-lab", "people", [
  e("people-rythme-et-accentuation", "rythme-et-accentuation-du-francais", "Rythme et Accentuation du Français", "use phrase rhythm and prominence to support listener comprehension", { functions: ["explaining", "expressing-emotion"], pronunciation: ["rhythm", "phrase-stress", "vowel-quality"], secondary: ["work", "culture"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "cultural-interpretation", "culture", [
  e("culture-politesse-et-distance", "politesse-et-distance-en-francais", "Politesse et Distance en Français", "interpret how wording signals social distance and warmth", { functions: ["interpreting", "managing-register", "softening"], contexts: ["france", "quebec"], culture: ["distance", "politeness"], secondary: ["people", "work"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "professional-simulation", "work", [
  e("hospitality-gerer-un-retard", "gerer-un-retard-en-hospitalite", "Gérer un Retard en Hospitalité", "acknowledge a delay, apologize, and offer a realistic solution", { functions: ["handling-problems", "apologizing", "resolving"], professionalPaths: ["hospitality", "restaurants-bars"], secondary: ["travel"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "story-and-reflection", "interests", [
  e("music-parler-dune-chanson", "parler-dune-chanson-qui-compte", "Parler d'une Chanson qui Compte", "describe a song and connect it to memory, place, or emotion", { functions: ["describing", "storytelling", "expressing-emotion"], interests: ["music"], secondary: ["culture", "people"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Autonomie et réparation", "french", "B1", "written-clarity-lab", "work", [
  e("work-ecrire-un-suivi", "ecrire-un-message-de-suivi-clair", "Écrire un Message de Suivi Clair", "summarize an exchange and make the next action visible", { functions: ["documenting", "summarizing", "requesting"], professionalPaths: ["remote-work", "sales"], secondary: ["people"], register: ["written", "professional"] }),
]);

addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "scenario-lesson", "work", [
  e("work-negocier-des-priorites", "negocier-des-priorites-en-francais", "Négocier des Priorités en Français", "compare constraints and reach an explicit workable agreement", { functions: ["negotiating", "proposing", "explaining"], professionalPaths: ["remote-work", "sales"], secondary: ["people"] }),
  e("work-gerer-une-objection", "gerer-une-objection-sans-script", "Gérer une Objection Sans Script", "discover the underlying concern and respond without forcing a close", { functions: ["clarifying", "persuading", "resolving"], professionalPaths: ["sales", "real-estate"], secondary: ["people"] }),
  e("travel-raconter-un-voyage", "raconter-un-voyage-avec-nuance", "Raconter un Voyage avec Nuance", "shape a longer travel narrative with context and reflection", { functions: ["storytelling", "sequencing", "reflecting"], secondary: ["culture", "people"] }),
  e("people-desaccord-et-relation", "exprimer-un-desaccord-sans-rompre", "Exprimer un Désaccord Sans Rompre la Relation", "challenge an idea while maintaining social connection", { functions: ["disagreeing", "softening", "building-rapport"], secondary: ["work", "culture"] }),
  e("food-decrire-les-saveurs", "decrire-les-saveurs-et-les-textures", "Décrire les Saveurs et les Textures", "describe sensory qualities and make a comparison for another person", { functions: ["describing", "comparing", "recommending"], interests: ["food"], secondary: ["culture"], vocabulary: ["food.sensory-description"] }),
  e("design-defendre-un-choix", "defendre-un-choix-de-design", "Défendre un Choix de Design", "justify a design decision and respond to critique", { functions: ["explaining", "persuading", "evaluating"], interests: ["design"], secondary: ["work", "people"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "language-toolkit", "culture", [
  e("culture-negation-a-loral", "la-negation-a-loral-et-le-registre", "La Négation à l'Oral et le Registre", "recognize and choose spoken negation according to context", { functions: ["managing-register", "interpreting", "casualizing"], structures: ["spoken-negation"], contexts: ["france", "quebec"], culture: ["register", "distance"], secondary: ["people", "work"] }),
  e("work-choisir-les-pronoms", "choisir-les-pronoms-en-contexte", "Choisir les Pronoms en Contexte", "use pronoun choices to keep reference and emphasis clear", { functions: ["explaining", "clarifying", "describing"], structures: ["object-pronouns", "reference"], secondary: ["work", "people"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "conversation-lab", "people", [
  e("people-gerer-les-tours-de-parole", "gerer-les-tours-de-parole-en-francais", "Gérer les Tours de Parole en Français", "enter, hold, and yield a turn in a quick exchange", { functions: ["turn-taking", "interrupting", "building-rapport"], secondary: ["work", "culture"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "pronunciation-lab", "people", [
  e("people-liaison-et-ecoute", "liaison-et-ecoute-du-francais-naturel", "Liaison et Écoute du Français Naturel", "use liaison awareness to follow connected speech", { functions: ["listening", "clarifying"], pronunciation: ["liaison", "connected-speech", "rhythm"], secondary: ["travel", "work"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "cultural-interpretation", "culture", [
  e("culture-humour-et-distance", "humour-distance-et-sous-entendu", "Humour, Distance et Sous-Entendu", "interpret humor and implication without assuming familiarity", { functions: ["interpreting", "building-rapport", "setting-boundaries"], contexts: ["france", "quebec"], culture: ["humor", "implication", "distance"], secondary: ["people"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "professional-simulation", "work", [
  e("tourism-adapter-un-itineraire", "adapter-un-itineraire-en-francais", "Adapter un Itinéraire en Français", "adapt a plan to changing preferences while protecting trust and clarity", { functions: ["handling-problems", "planning", "reassuring"], professionalPaths: ["tourism"], secondary: ["travel", "nature"], interests: ["nature"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "story-and-reflection", "interests", [
  e("ideas-raconter-une-idee", "raconter-comment-une-idee-a-change", "Raconter Comment une Idée a Changé", "connect an idea to experience, evidence, and personal change", { functions: ["storytelling", "reflecting", "explaining"], interests: ["ideas"], secondary: ["culture", "people"] }),
]);
addGroup("French — Nuance, variation et monde professionnel", "french", "B2", "written-clarity-lab", "work", [
  e("work-ecrire-avec-distance", "ecrire-avec-une-distance-professionnelle", "Écrire avec une Distance Professionnelle", "adjust a written message for precision, warmth, and professional distance", { functions: ["documenting", "managing-register", "requesting"], professionalPaths: ["remote-work", "sales"], secondary: ["people"], register: ["written", "professional"] }),
]);

addGroup("French — Analyse et expression avancée", "french", "C1", "scenario-lesson", "work", [
  e("work-conduire-une-conversation-difficile", "conduire-une-conversation-difficile", "Conduire une Conversation Difficile", "hold a clear and humane conversation when stakes and emotion are high", { functions: ["handling-problems", "setting-boundaries", "reassuring"], professionalPaths: ["remote-work", "sales"], secondary: ["people"] }),
  e("work-persuader-avec-empathie", "persuader-avec-des-preuves-et-de-lempathie", "Persuader avec des Preuves et de l'Empathie", "adapt an argument to concerns without reducing nuance", { functions: ["persuading", "explaining", "showing-interest"], professionalPaths: ["sales", "real-estate"], secondary: ["people", "ideas"], interests: ["ideas"] }),
  e("culture-interpreter-un-signal", "interpreter-un-signal-social-ambigu", "Interpréter un Signal Social Ambigu", "hold multiple interpretations and clarify without overclaiming", { functions: ["interpreting", "clarifying", "hedging"], secondary: ["people", "culture"], contexts: ["france", "quebec"] }),
  e("people-raconter-avec-un-point-de-vue", "raconter-avec-un-point-de-vue", "Raconter avec un Point de Vue", "shape a narrative so its significance is clear to a listener", { functions: ["storytelling", "summarizing", "reflecting"], secondary: ["culture", "work"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C1", "language-toolkit", "culture", [
  e("culture-choisir-une-formulation-delicate", "choisir-une-formulation-delicate", "Choisir une Formulation Délicate", "select wording that carries precision, tact, and appropriate distance", { functions: ["managing-register", "softening", "formalizing"], secondary: ["people", "work"], register: ["formal", "professional", "written"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C1", "conversation-lab", "people", [
  e("people-soutenir-une-conversation-nuancee", "soutenir-une-conversation-nuancee", "Soutenir une Conversation Nuancée", "develop an idea across turns while responding to another perspective", { functions: ["turn-taking", "expressing-opinions", "showing-interest"], interests: ["ideas"], secondary: ["culture", "work"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C1", "pronunciation-lab", "work", [
  e("work-intonation-et-attitude", "intonation-et-attitude-en-francais", "Intonation et Attitude en Français", "use intonation and rhythm to distinguish warmth, doubt, and challenge", { functions: ["managing-register", "expressing-emotion", "hedging"], pronunciation: ["intonation", "rhythm", "prosody"], secondary: ["people"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C1", "cultural-interpretation", "culture", [
  e("culture-identite-et-variation", "identite-et-variation-dans-le-francais", "Identité et Variation dans le Français", "interpret variation without treating one francophone context as the default", { functions: ["interpreting", "expressing-opinions", "managing-register"], contexts: ["france", "quebec"], culture: ["identity", "regional-variation"], secondary: ["people", "culture"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C1", "professional-simulation", "work", [
  e("real-estate-negocier-la-confiance", "negocier-la-confiance-en-immobilier", "Négocier la Confiance en Immobilier", "build trust while clarifying competing interests in a property discussion", { functions: ["negotiating", "reassuring", "explaining"], professionalPaths: ["real-estate"], secondary: ["home", "people"], contexts: ["france", "quebec"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C2", "scenario-lesson", "culture", [
  e("culture-naviguer-limplicite", "naviguer-limplicite-et-le-sous-entendu", "Naviguer l'Implicite et le Sous-Entendu", "respond precisely when meaning is distributed across wording, tone, and context", { functions: ["interpreting", "hedging", "clarifying"], contexts: ["france", "quebec"], culture: ["implication", "pragmatics"], secondary: ["people", "work"] }),
]);
addGroup("French — Analyse et expression avancée", "french", "C2", "scenario-lesson", "ideas", [
  e("ideas-argumenter-avec-finesse", "argumenter-avec-finesse-en-francais", "Argumenter avec Finesse en Français", "make a fine-grained argument that remains clear and persuasive", { functions: ["persuading", "expressing-opinions", "summarizing"], interests: ["ideas"], secondary: ["culture", "work"] }),
]);

if (lessons.length !== 175) throw new Error(`Expected 175 lessons, got ${lessons.length}`);

// Add graph edges after all IDs exist. Edges are local, typed, and intentionally sparse.
for (let i = 0; i < lessons.length; i += 1) {
  const lesson = lessons[i];
  const sameLanguage = lessons.filter((candidate) => candidate.language === lesson.language);
  const position = sameLanguage.findIndex((candidate) => candidate.id === lesson.id);
  const previous = sameLanguage[position - 1];
  const next = sameLanguage[position + 1];
  if (previous && previous.level === lesson.level && position % 3 === 0) lesson.prerequisites = [{ id: previous.id, kind: "supports", reason: `The earlier ${previous.title} object gives the learner a useful entry into this capability.` }];
  if (previous && previous.level === lesson.level) lesson.relatedLessons.push({ id: previous.id, kind: "explores", reason: `Both objects develop connected ${lesson.communicationFunctions[0]} work in ${lesson.language}.` });
  if (next) lesson.nextRecommended = [{ id: next.id, kind: "continues", priority: "primary", reason: `Continue with the next authored ${lesson.language} object after practicing this capability.` }];
  const sameInterest = lessons.find((candidate) => candidate.id !== lesson.id && candidate.language === lesson.language && lesson.interests.length && candidate.interests.some((interest) => lesson.interests.includes(interest)));
  if (sameInterest && lesson.relatedLessons.length < 2) lesson.relatedLessons.push({ id: sameInterest.id, kind: "explores", reason: `A lateral route through the shared ${lesson.interests[0]} interest.` });
}

const counts = (field) => Object.fromEntries([...new Set(lessons.map((lesson) => lesson[field]))].map((value) => [value, lessons.filter((lesson) => lesson[field] === value).length]));
const nestedCounts = (field) => Object.fromEntries([...new Set(lessons.flatMap((lesson) => lesson[field]))].sort().map((value) => [value, lessons.filter((lesson) => lesson[field].includes(value)).length]));
const table = (obj) => Object.entries(obj).map(([key, value]) => `| ${key} | ${value} |`).join("\n");
const languageCounts = counts("language");
const levelCounts = counts("level");
const typeCounts = counts("lessonType");
const environmentCounts = nestedCounts("secondaryEnvironments");
for (const lesson of lessons) environmentCounts[lesson.primaryEnvironment] = (environmentCounts[lesson.primaryEnvironment] ?? 0) + 1;
const professionalCounts = nestedCounts("professionalPaths");
const interestCounts = nestedCounts("interests");
const functionCounts = nestedCounts("communicationFunctions");
const ids = new Set(lessons.map((lesson) => lesson.id));
const refs = lessons.flatMap((lesson) => [...lesson.prerequisites, ...lesson.relatedLessons, ...lesson.nextRecommended]);
const dangling = refs.filter((relation) => !ids.has(relation.id));
const selfRefs = lessons.flatMap((lesson) => [...lesson.prerequisites, ...lesson.relatedLessons, ...lesson.nextRecommended].filter((relation) => relation.id === lesson.id));

await mkdir("src/content", { recursive: true });
await mkdir("docs", { recursive: true });
await writeFile("src/content/curriculum-corpus-v1.json", `${JSON.stringify({ corpus: { id: "global-speaker-corpus-v1", version: 1, status: "planned", languages: ["english", "french", "spanish"], objectCountTarget: 175, method: ["context", "notice", "understand", "toolkit", "examples", "culture-register", "guided-practice", "production", "real-world-challenge", "reflection", "continue"] }, lessons }, null, 2)}\n`);

const manifestRows = lessons.map((lesson) => `| ${lesson.id} | ${lesson.slug} | ${lesson.language} | ${lesson.level} | ${lesson.lessonType} | ${lesson.primaryEnvironment} | ${lesson.communicationFunctions.slice(0, 3).join(", ")} | ${lesson.title} |`).join("\n");
await writeFile("docs/curriculum-corpus-v1-manifest.md", `# Global Speaker Curriculum Corpus v1 Manifest\n\n**Status:** Planned canonical inventory; full lesson prose belongs to Phase 3.\n**Total:** ${lessons.length} learning objects.\n\nEvery row is a canonical graph node. The machine-readable source is [curriculum-corpus-v1.json](../src/content/curriculum-corpus-v1.json). Each object contains the full taxonomy, graph relations, SEO intent, content anatomy plan, and authoring notes.\n\n## Object inventory\n\n| ID | Slug | Language | Level | Type | Primary environment | Primary functions | Title |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${manifestRows}\n`);

const groupedBatchSources = [];
for (const group of groups) {
  const members = lessons.slice(group.start, group.end + 1);
  let source = groupedBatchSources.find((item) => item.label === group.label);
  if (!source) { source = { label: group.label, language: group.language, members: [] }; groupedBatchSources.push(source); }
  source.members.push(...members);
}
const batchUnits = groupedBatchSources.flatMap((source) => Array.from({ length: Math.ceil(source.members.length / 12) }, (_, index) => ({ label: source.label, language: source.language, members: source.members.slice(index * 12, (index + 1) * 12) })));
const batches = batchUnits.map((batch, index) => `### Batch ${String(index + 1).padStart(2, "0")} — ${batch.label}\n\n**Objects:** ${batch.members.length}\n**Language:** ${batch.language}\n**Levels:** ${[...new Set(batch.members.map((lesson) => lesson.level))].join(", ")}\n\n${batch.members.map((lesson) => `- ${lesson.id}: ${lesson.title}`).join("\n")}`).join("\n\n");
await writeFile("docs/curriculum-corpus-v1-authoring-batches.md", `# Corpus v1 Authoring Batches\n\nThese batches are pedagogically coherent authoring units. They are not route folders, access tiers, or required learner sequences. Each batch is sized for review before the next batch begins.\n\n${batches}\n`);

const expected = { english: 72, spanish: 55, french: 48, A1: 18, A2: 34, B1: 46, B2: 43, C1: 27, C2: 7, "scenario-lesson": 96, "language-toolkit": 20, "conversation-lab": 14, "pronunciation-lab": 12, "cultural-interpretation": 12, "professional-simulation": 9, "story-and-reflection": 6, "written-clarity-lab": 6 };
const actual = { ...languageCounts, ...levelCounts, ...typeCounts };
const mismatches = Object.entries(expected).filter(([key, value]) => actual[key] !== value).map(([key, value]) => `${key}: expected ${value}, got ${actual[key]}`);
const mismatchText = mismatches.length ? `\nMismatches:\n${mismatches.map((item) => "- " + item).join("\n")}` : "";
await writeFile("docs/curriculum-corpus-v1-coverage.md", `# Corpus v1 Coverage Report\n\n**Manifest total:** ${lessons.length}\n**Graph references:** ${refs.length}\n**Dangling references:** ${dangling.length}\n**Self-references:** ${selfRefs.length}\n\n## Language distribution\n\n| Language | Objects |\n| --- | ---: |\n${table(languageCounts)}\n\n## Level distribution\n\n| Level | Objects |\n| --- | ---: |\n${table(levelCounts)}\n\n## Content types\n\n| Type | Objects |\n| --- | ---: |\n${table(typeCounts)}\n\n## Environment coverage\n\n| Environment | Tagged objects |\n| --- | ---: |\n${table(environmentCounts)}\n\n## Professional coverage\n\n| Professional path | Tagged objects |\n| --- | ---: |\n${table(professionalCounts)}\n\n## Interest coverage\n\n| Interest | Tagged objects |\n| --- | ---: |\n${table(interestCounts)}\n\n## Communication-function coverage\n\n| Function | Tagged objects |\n| --- | ---: |\n${table(functionCounts)}\n\n## Integrity results\n\n- Unique IDs: ${new Set(lessons.map((lesson) => lesson.id)).size === lessons.length ? "PASS" : "FAIL"}\n- Unique slugs: ${new Set(lessons.map((lesson) => lesson.slug)).size === lessons.length ? "PASS" : "FAIL"}\n- Valid graph references: ${dangling.length === 0 ? "PASS" : "FAIL"}\n- No self-references: ${selfRefs.length === 0 ? "PASS" : "FAIL"}\n- Frozen distribution: ${mismatches.length === 0 ? "PASS" : "FAIL"}\n${mismatchText}\n\n## Deliberate asymmetries\n\nEnglish has 72 objects, Spanish 55, and French 48, reflecting the frozen architecture's demand and context priorities rather than translation parity. Professional and Food-rich objects are denser in English and Spanish because of the current product context, while French receives dedicated register, liaison, spoken-language, and francophone-variation objects.\n\nThe corpus is intentionally B1/B2-heavy for practical independence, but includes 18 A1 and 34 A2 objects so beginners have legitimate entry points. C1/C2 objects are selective and connected to earlier capabilities rather than presented as a separate advanced textbook.\n\n## Gaps requiring authoring review\n\n- Native-speaker review is required for every French and Spanish object, with regional review for Mexico, Quebec, Spain, or Latin America notes.\n- Interest hubs are represented by cross-environment objects; the later product UI should expose those collections without duplicating nodes.\n- Existing Resources remain editorial objects. Strong alignments should be added as relatedResources during authoring, not cloned into lessons.\n- Some graph edges are initial planning edges and need pedagogical review during Phase 3; no edge is a license to skip lesson QA.\n\n## 12-object readiness sample\n\nThe inventory includes representative entries across all three languages, A1-C2 levels, professional paths, culture, interests, Home, Travel, and People. Every row has a concrete objective, context, type, graph placement, search direction, and authoring note so a Phase 3 author can write the lesson without redesigning its intent.\n`);

console.log(JSON.stringify({ total: lessons.length, languages: languageCounts, levels: levelCounts, types: typeCounts, groups: groups.length, dangling: dangling.length, selfRefs: selfRefs.length, mismatches }, null, 2));


