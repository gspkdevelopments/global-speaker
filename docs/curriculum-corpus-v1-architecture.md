# Global Speaker Curriculum Corpus v1
## Architecture phase

**Status:** Proposed architecture for authoring and review
**Scope:** Approximately 175 interconnected learning objects across English, French, and Spanish
**Implementation constraint:** This document defines the corpus. It does not author the full lessons, add routes, add accounts, or change product code.

## 0. Executive decision

Global Speaker Corpus v1 is a **learning graph** with several navigational views, not a folder tree and not three translated textbooks.

Every learning object has one canonical identity and one primary communicative job. It may be discovered through multiple dimensions:

- language
- CEFR-aligned level
- life environment
- professional path
- interest
- communication function
- cultural or register context
- prerequisite and progression links

The graph has three compatible modes:

1. **Guided progression:** a learner follows a coherent sequence for a level, environment, profession, or goal.
2. **Context exploration:** a learner enters through Home, Work, People, Travel, Interests, or Culture.
3. **Need-based retrieval:** a learner searches for a real function such as clarifying, apologizing, recommending, negotiating, or telling a story.

A lesson is canonical only when it has a distinct communicative purpose, a believable situation, language a learner can use, and a meaningful relationship to other objects. Tags and links create reuse. Duplicating a lesson for every category is prohibited.

The existing Phase 1 professional lessons are valid seed objects. Corpus v1 should extend the same data-driven approach rather than replace it.

---

## 1. Curriculum philosophy

### 1.1 Governing principle

> Language begins with your life.

The corpus starts from what the learner is trying to notice, understand, do, express, negotiate, repair, or share. Linguistic form is selected because it makes a communicative action possible.

The canonical learning movement is:

```text
PERCEIVE -> UNDERSTAND -> CONNECT -> EXPRESS -> INTERACT
```

The lesson-level methodology expands that movement into:

```text
Context -> Notice -> Understand -> Toolkit -> Examples -> Culture/Register
-> Guided Practice -> Production -> Real-world Challenge -> Reflection -> Continue
```

### 1.2 Principles

1. **Communicative purpose before grammar.** A structure enters because it helps with a real function, not because a syllabus has reached it.
2. **Situations before decontextualized lists.** Vocabulary and phrases live inside scenes, relationships, tasks, and consequences.
3. **Pattern before terminology.** Learners first notice what people say and what it does. Labels are optional support.
4. **Meaning includes social meaning.** Directness, warmth, distance, turn-taking, uncertainty, status, and regional variation are part of knowing a phrase.
5. **Production is necessary.** Recognition and controlled practice are not completion. Every substantial lesson asks for original language.
6. **Transfer is visible.** A learner should be able to take the lesson into a real conversation, message, meeting, workplace, or cultural encounter.
7. **Multiple legitimate routes.** There is a guided route, but no single correct life or interest path.
8. **Languages are not translation layers.** French, Spanish, and English receive their own communicative and cultural decisions.
9. **Useful density over content volume.** A smaller number of strong objects is preferable to mechanically filling a grid.
10. **Human review protects trust.** Accuracy, register, cultural care, and usefulness outrank publishing velocity.

### 1.3 What Corpus v1 is not

- a grammar sequence with scenario decoration
- a set of translated English lessons
- a collection of thin SEO articles
- a gamification system
- a user-progress database
- an AI tutor
- a complete teacher-training curriculum

---

## 2. Curriculum taxonomy

Taxonomy terms are controlled values. A lesson may have one primary value where specified and several secondary values. Free text is permitted only for descriptions, objectives, examples, and editorial notes.

### 2.1 Identity dimensions

| Dimension | Cardinality | Controlled vocabulary / rule |
| --- | --- | --- |
| `id` | one | Immutable corpus ID; see Section 15 |
| `slug` | one | Stable human-readable route slug; immutable after publication except redirect migration |
| `language` | one | `english`, `french`, `spanish` |
| `level` | one primary, optional range | `A1`, `A2`, `B1`, `B2`, `C1`, `C2`; optional `A2-B1` bridge only when the task genuinely spans levels |
| `status` | one | `planned`, `draft`, `review`, `published`, `retired` |
| `version` | one | Integer content revision, starting at `1` |

### 2.2 Discovery dimensions

| Dimension | Cardinality | Controlled vocabulary |
| --- | --- | --- |
| `primaryEnvironment` | one | `home`, `work`, `people`, `travel`, `interests`, `culture`, `cross-context` |
| `secondaryEnvironments` | zero or more | Same vocabulary, excluding the primary value |
| `interests` | zero or more | `music`, `technology`, `food`, `nature`, `design`, `ideas`; additions require the test in Section 10 |
| `professionalPaths` | zero or more | `hospitality`, `restaurants-bars`, `tourism`, `real-estate`, `sales`, `remote-work` |
| `communicationFunctions` | one primary, one or more secondary | Controlled function list in Section 11 |
| `vocabularyDomain` | one or more | Controlled domain plus optional specific terms, e.g. `food.drinks`, `travel.directions` |
| `culturalContexts` | zero or more | `general`, `uk`, `us`, `international-english`, `france`, `quebec`, `mexico`, `spain`, `latin-america`, or a named context with an editorial note |

### 2.3 Linguistic dimensions

| Dimension | Cardinality | Rule |
| --- | --- | --- |
| `structures` | zero or more | Communicative structure labels, not a grammar syllabus. Examples: `softened-questions`, `past-narrative`, `conditional-recommendation` |
| `pronunciationFocus` | zero or more | Sound, stress, rhythm, liaison, intonation, reduction, linking, or orthographic issue where relevant |
| `register` | one or more | `casual`, `neutral`, `polite`, `formal`, `professional`, `intimate`, `regional`, `written` |
| `culturalDimension` | zero or more | What differs socially: distance, turn-taking, hospitality norms, disagreement, apology, time, hierarchy, humor, taboo, identity |

### 2.4 Progression dimensions

| Dimension | Cardinality | Rule |
| --- | --- | --- |
| `prerequisites` | zero or more | Typed IDs, usually soft prerequisites rather than hard locks |
| `relatedLessons` | zero or more | Thematic or contrastive relationships; not necessarily sequential |
| `nextRecommended` | zero or more | One primary next object plus optional alternatives for different goals |
| `progressionTracks` | zero or more | `language-level`, `environment`, `professional`, `interest`, `function`, `live-practice` |
| `lessonType` | one primary, optional secondary | Controlled content types in Section 12 |

### 2.5 Product and search dimensions

| Dimension | Cardinality | Rule |
| --- | --- | --- |
| `estimatedMinutes` | one | Integer; realistic active study time, not page reading time |
| `seoIntent` | one or more | `learn`, `solve-a-communication-problem`, `professional-language`, `cultural-understanding`, `pronunciation`, `language-comparison` |
| `searchEntities` | zero or more | Human search phrases and named concepts; never keyword stuffing |
| `featured` | optional | Editorial flag, not a paywall or quality grade |
| `resourceLinks` | zero or more | Existing Resource slugs only; no fabricated links |

---

## 3. Learning object schema

The corpus calls the canonical unit a **learning object**. Most objects are lessons, but the schema permits a small number of structured objects that support lessons without fragmenting the learner experience.

### 3.1 Required fields

```ts
type CorpusLesson = {
  id: string;
  slug: string;
  language: LanguageKey;
  level: CEFRLevel;
  title: string;
  description: string;
  learningObjective: string;
  primaryEnvironment: Environment;
  secondaryEnvironments: Environment[];
  interests: Interest[];
  professionalPaths: ProfessionalPathSlug[];
  communicationFunctions: CommunicationFunction[];
  vocabularyDomains: VocabularyDomain[];
  lessonType: LessonType;
  estimatedMinutes: number;
  prerequisites: Relation[];
  relatedLessons: Relation[];
  nextRecommended: Relation[];
  progressionTracks: ProgressionTrack[];
  status: CorpusStatus;
  version: number;
  seo: SeoMetadata;
  content: LessonContent;
};
```

Required means the field must be present in the manifest. An empty array is valid where the dimension does not apply. This makes filtering and validation deterministic.

### 3.2 Optional fields

```ts
type CorpusLessonOptional = {
  structures?: StructureFocus[];
  pronunciationFocus?: PronunciationFocus[];
  register?: Register[];
  culturalDimension?: CulturalDimension[];
  culturalContexts?: CulturalContext[];
  relatedResources?: string[];
  teacherNotes?: string;
  authorNotes?: string;
  regionalNotes?: RegionalNote[];
  audio?: MediaReference[];
  images?: MediaReference[];
  accessibilityNotes?: string[];
  assessmentRubric?: AssessmentReference;
  replaces?: string;
  retiredReason?: string;
};
```

### 3.3 Relation type

```ts
type Relation = {
  id: string;
  kind: "requires" | "supports" | "contrasts" | "continues" | "applies" | "explores";
  reason: string;
  priority?: "primary" | "alternate";
};
```

The reason is required. A bare list of IDs does not explain the learning graph and will decay into arbitrary linking.

### 3.4 SEO metadata

```ts
type SeoMetadata = {
  title: string;
  description: string;
  intent: SeoIntent[];
  searchPhrases: string[];
  canonicalPath: string;
  indexable: boolean;
};
```

`searchPhrases` should reflect how a real learner searches, such as `English for hotel reception`, `how to clarify a request in French`, or `Spanish phrases for recommending a restaurant`. It must not turn the lesson into a keyword container.

---

## 4. Lesson anatomy

A complete lesson is a coherent experience, not a page assembled from every possible component. The following anatomy is the default contract.

### 4.1 Context

Show a believable moment. State who is speaking, what has happened, what matters, and what the learner needs to accomplish. Avoid artificial dialogues that exist only to contain target grammar.

### 4.2 Notice

Give the learner a short exchange, message, audio transcript, image prompt, or interaction to observe. Highlight what is worth noticing: a phrase, a choice of register, a hesitation, a repair, a rhythm, or an implied meaning.

### 4.3 Understand

Explain meaning and communicative effect in plain language. Grammar terminology may appear after the learner understands the job of the form.

### 4.4 Toolkit

Provide a small set of reusable language:

- core phrases
- adaptable frames
- key vocabulary
- pronunciation cue where useful
- one or two alternatives with register notes

A default lesson should contain 4-10 high-value language items, not a glossary dump.

### 4.5 Examples

Show at least three varied examples. Examples must change the situation or relationship enough to demonstrate transfer.

### 4.6 Culture/Register

Explain what could sound too direct, too vague, too formal, too familiar, regionally marked, or culturally misaligned. If variation exists, name it without presenting one region as the universal norm.

### 4.7 Guided Practice

Use at least two practice modes. Suitable modes include choice, matching, noticing, completion, ordering, reformulation, pronunciation rehearsal, and response selection. Answers must be explainable, not merely marked right or wrong.

### 4.8 Production

The learner creates original language with constraints that make the task possible. Production should require a choice, adaptation, or personal detail, not transcription.

### 4.9 Real-world Challenge

Offer a small action beyond the page: ask a colleague, describe an object, send a message, rehearse a welcome, notice a phrase in a song, or retell a moment.

### 4.10 Reflection

Ask what changed in the learner's perception, what still feels difficult, or which version fits their voice. Reflection is not a motivational slogan.

### 4.11 Continue

Provide:

- one primary next recommendation
- one alternate route by interest, environment, or function
- path or collection context
- optional Language Map or teacher-practice CTA where relevant

### 4.12 Quality threshold for a complete lesson

A lesson is complete only when it:

- has one clear communicative objective
- uses a specific and believable context
- contains language that can be adapted beyond the example
- explains meaning, form, and social effect accurately
- includes at least two guided practice types
- includes original production
- includes a real-world challenge
- identifies register or cultural considerations when relevant
- links to at least one sensible continuation or explicitly marks itself as a terminal exploration object
- is appropriate for its stated level and language
- has been reviewed by a proficient speaker or qualified editor for target language accuracy
- passes the rubric in Section 19

---

## 5. Learning graph model

### 5.1 Nodes

The primary nodes are lessons. Supporting nodes may later include:

- `path`: Hospitality, Music, B1 English
- `collection`: a curated view of lessons
- `function`: Clarifying, Recommending, Repairing
- `language`: English, French, Spanish
- `level`: A1-C2
- `resource`: an editorial or discovery page
- `practice-set`: a reusable but non-canonical exercise grouping

Only lessons receive completion and progress semantics in the first platform implementation. Supporting nodes organize discovery and recommendations.

### 5.2 Edges

- `requires`: the learner will struggle without this earlier capability. Use sparingly.
- `supports`: useful preparation but not a gate.
- `continues`: the clearest next step in a guided sequence.
- `applies`: takes a pattern into a new environment or profession.
- `contrasts`: compares register, language, culture, or communicative strategy.
- `explores`: a lateral route for curiosity or context.

### 5.3 Soft prerequisites

Most prerequisites are advisory. The platform may show `Recommended first` without blocking access. Hard prerequisites should be reserved for a genuinely dependent task, such as a complex negotiation simulation requiring earlier clarification and turn-taking work.

### 5.4 Guided tracks

A track is a view over graph edges, not a new copy of the content. Examples:

- `english-b1-work-confidence`
- `french-a2-daily-life`
- `hospitality-front-desk`
- `music-listening-and-expression`
- `clarify-explain-and-repair`

Each track defines an ordered spine plus optional branches. The lesson object remains canonical.

### 5.5 Exploration

Search and collection pages can filter by any taxonomy dimension. A learner exploring Food may encounter a Home cooking object, a Restaurants & Bars recommendation object, and a Culture object about hospitality rituals without those lessons being duplicated.

### 5.6 Recommendation rules

Recommendations should prefer:

1. a `continues` edge matching the current track
2. an `applies` edge in the learner's selected environment or profession
3. a `supports` edge one level below or at the same level
4. an `explores` edge matching an interest
5. a contrastive or cultural object that deepens the same communicative problem

Recommendations must never be based only on shared tags. Shared tags create candidates; typed edges and editorial priority create recommendations.

---

## 6. Level framework

### 6.1 CEFR as a calibration language

CEFR alignment describes the communicative demand of an object. It does not dictate the lesson order, the voice, or the full curriculum. A learner can enter a B1 professional lesson because the situation matters to them even if their general level is uneven.

### 6.2 Working definitions

| Level | Global Speaker emphasis |
| --- | --- |
| A1 | Recognize and produce short supported language for immediate needs; greet, identify, request, name, and respond with familiar frames. |
| A2 | Handle predictable exchanges, describe familiar contexts, ask simple follow-up questions, and manage basic repair. |
| B1 | Connect ideas, narrate experiences, explain needs, clarify ambiguity, recommend, compare, and sustain a practical interaction. |
| B2 | Manage nuance, extended turns, disagreement, negotiation, explanation, professional interaction, and register choices with increasing flexibility. |
| C1 | Adapt language strategically across complex contexts, implied meaning, persuasion, leadership, and culturally sensitive interaction. |
| C2 | Rarely a target for a general lesson. Used only for specialized advanced communication, stylistic nuance, or near-native interpretive work. |

### 6.3 Alignment dimensions

Every level assignment should consider:

- task complexity
- interlocutor relationship and power
- spontaneity and time pressure
- amount of support
- discourse length
- repair burden
- vocabulary specificity
- sociolinguistic complexity
- expected accuracy versus intelligibility

A lesson may be `A2-B1` only when the same task has a supported entry and a meaningful extension, not because the author is uncertain.

### 6.4 Progression without lockstep

A learner's graph may contain B1 Work objects before A2 Travel objects. The platform should show a sensible next move within the chosen context while still offering a level-calibrated bridge. CEFR is a map of demand, not a gatekeeping identity.

---

## 7. Language-specific principles

### 7.1 English

- Teach the wide range of international English without erasing regional identities.
- Make directness, softening, understatement, phrasal verbs, collocation, and turn-taking visible.
- Distinguish international comprehensibility from UK- or US-specific usage.
- Treat pronunciation as intelligibility, rhythm, prominence, linking, and listener effort rather than accent elimination.
- Use professional English as interactional competence, not corporate jargon.

### 7.2 French

- Treat register as structural: `tu/vous`, professional distance, politeness formulas, and conversational softening must be contextualized.
- Teach liaison, rhythm, vowel quality, and connected speech where they change comprehension.
- Avoid presenting metropolitan France as the only French-speaking reality. Use regional notes for Quebec and other francophone contexts when relevant.
- Address discourse markers, pronoun choices, negation in speech, and formulaic politeness as living usage, with clear register labels.
- Separate grammatical gender accuracy from social assumptions about people and occupations.

### 7.3 Spanish

- Treat regional variation as a first-class design concern: `tú`, `usted`, `vos`, vocabulary, pronunciation, and discourse norms vary.
- Where the product context is Mexico, teach Mexican Spanish as a named context, not as universal Spanish.
- Make politeness, diminutives, indirectness, warmth, and interpersonal alignment visible without stereotyping.
- Include pronunciation and listening work for syllable timing, reduced sounds, regional `s`, and intonation where useful.
- Distinguish `ser/estar`, preterite/imperfect, subjunctive, object pronouns, and other forms through communicative meaning rather than grammar chapters.

### 7.4 Cross-language policy

A concept may be shared across languages, but the object is translated only when the communicative task, examples, cultural dimension, and language-specific explanation are genuinely authored for that language. A shared English lesson may inspire French and Spanish objects; it does not automatically create them.

---

## 8. Environment architecture

Environments are broad life lenses. They are not mutually exclusive departments.

### 8.1 Home

Subdomains:

- objects, rooms, and physical surroundings
- routines, time, and household coordination
- food, cooking, and care
- feelings, comfort, and boundaries
- hosting and being hosted
- practical services, repairs, and domestic decisions

Typical functions: describing, requesting, explaining, refusing, negotiating, reassuring.

### 8.2 Work

Subdomains:

- meetings and turn-taking
- updates, priorities, and deadlines
- instructions and process explanation
- feedback and disagreement
- customers, colleagues, and stakeholders
- written clarity and asynchronous communication
- professional identity and confidence

Professional paths are specialized views of Work, but Work objects should also serve learners outside the six named paths.

### 8.3 People

Subdomains:

- introductions and first contact
- relationships and rapport
- opinions, agreement, and disagreement
- storytelling and memory
- humor, emotion, and vulnerability
- conflict, repair, and boundaries
- belonging, identity, and social roles

### 8.4 Travel

Subdomains:

- arrivals, departures, and accommodation
- directions, transport, and timing
- plans, choices, and changes
- local knowledge and safety
- unexpected problems
- observation, comparison, and travel stories

### 8.5 Interests

Subdomains are the six interest collections in Section 10. An Interests object must make the subject matter necessary to the language task; merely naming a topic is not enough.

### 8.6 Culture

Subdomains:

- politeness and social expectations
- food, music, media, and everyday rituals
- identity, place, and belonging
- time, space, hierarchy, and hospitality
- humor, implication, taboo, and silence
- language variation and cultural interpretation

Culture objects teach learners how to notice and participate, not memorize national stereotypes.

---

## 9. Professional architecture

Professional paths are coherent sequences of workplace situations. Each path should contain a recognizable spine and cross-links into Work, People, Travel, Food, Culture, and relevant functions.

| Path | Core sequence | High-value cross-links |
| --- | --- | --- |
| Hospitality | Welcome -> arrival -> requests -> recommendations -> problems -> directions -> farewell | Travel, Food, Culture, rapport, repair |
| Restaurants & Bars | Welcome -> menu -> preferences -> recommendations -> ordering -> service recovery -> small talk -> farewell | Food, Hospitality, sensory description, comparison |
| Tourism | Discover needs -> plan itinerary -> explain local context -> guide movement -> manage safety -> answer questions -> tell stories -> adapt plans | Travel, Culture, Nature, storytelling |
| Real Estate | Establish rapport -> discover needs -> describe space -> compare options -> explain terms -> negotiate -> follow up -> build trust | Home, Work, persuasion, negotiation, written clarity |
| Sales | Open conversation -> discover problem -> explain value -> handle objections -> present options -> negotiate -> close -> follow up | Work, People, persuasion, comparison, repair |
| Remote Work | Join meetings -> give updates -> ask for clarity -> collaborate asynchronously -> give feedback -> set boundaries -> document decisions -> resolve misalignment | Work, Technology, register, written clarity |

### 9.1 Professional design rules

- A professional sequence is organized around job moments, not industry vocabulary lists.
- Each path must teach both task language and relationship language.
- Every path needs at least one problem, repair, or uncertainty object.
- Professional objects should connect to general Work and People objects so learners do not get trapped in a silo.
- Live-teaching hooks may recommend roleplay, pronunciation practice, feedback, or personalized assignments, but no lesson should imply that live instruction is required.

---

## 10. Interest architecture

### 10.1 Existing interests

| Interest | Subdomains | Language opportunities |
| --- | --- | --- |
| Music | listening, lyrics, performance, taste, memory, local scenes | describing sound, expressing preference, interpretation, storytelling |
| Technology | tools, interfaces, habits, privacy, work systems, change | explaining process, troubleshooting, comparing, predicting, persuading |
| Food | ingredients, cooking, taste, markets, restaurants, ritual | sensory description, recommendation, sequence, culture, preference |
| Nature | weather, landscapes, animals, sustainability, observation, place | describing, comparing, warning, storytelling, expressing wonder |
| Design | objects, spaces, visual choices, usability, craft, aesthetics | critique, explanation, comparison, justification, professional presentation |
| Ideas | opinions, evidence, ethics, books, questions, uncertainty | abstract discussion, agreement, disagreement, nuance, persuasion |

### 10.2 Additional interests

Do not add a seventh permanent interest in Corpus v1. The six current interests are broad enough to cover the intended graph. Temporary editorial themes may be represented as tags or collections, for example `film`, `community`, `Mexican food`, or `entrepreneurship`, without becoming top-level taxonomy.

Promote a theme to a permanent interest only if it has:

- at least 8 planned objects across two or more languages
- at least 3 distinct communication functions
- a durable learner need beyond a seasonal campaign
- meaningful cross-links to at least two environments
- a clear reason the existing six interests cannot represent it

---

## 11. Communication function matrix

Functions are the pedagogical spine that recurs across environments and languages. Each object has one primary function and may have secondary functions.

| Function family | Controlled functions | Typical recurrence |
| --- | --- | --- |
| Connect | introducing, greeting, welcoming, building-rapport, showing-interest | People, Hospitality, Work, Travel |
| Elicit | asking, interviewing, checking, requesting, inviting | All environments |
| Repair | clarifying, confirming, correcting, apologizing, handling-problems, escalating | Work, Hospitality, People, Travel |
| Shape meaning | describing, comparing, classifying, explaining, defining, summarizing | Home, Work, Interests, Culture |
| Influence | recommending, persuading, negotiating, proposing, refusing, setting-boundaries | Work, Sales, Real Estate, People |
| Express stance | expressing-opinions, agreeing, disagreeing, evaluating, hedging, showing-emotion | People, Culture, Ideas, Work |
| Narrate | storytelling, sequencing, recounting, speculating, reflecting | People, Travel, Music, Culture |
| Coordinate | planning, scheduling, giving-directions, giving-instructions, updating, documenting | Work, Travel, Hospitality, Remote Work |
| Manage register | softening, formalizing, casualizing, signaling-distance, signaling-warmth | All languages; especially professional and cultural objects |

### 11.1 Minimum recurrence target

Across the full corpus, each core function should appear in at least:

- all three languages, unless a documented language-specific constraint applies
- three or more environments
- two or more professional or interest contexts where appropriate
- at least two levels of increasing complexity

A function matrix review is required before final manifest lock to detect overproduction of recommendation and description lessons at the expense of repair, boundaries, disagreement, and storytelling.

---

## 12. Content-type system

The system uses a small set of meaningful types. Types describe the learner experience, not internal authoring tasks.

| Type | Purpose | Default size / use |
| --- | --- | --- |
| `scenario-lesson` | A complete situation-led lesson with the canonical anatomy | Default object; 10-20 minutes |
| `language-toolkit` | Focused reusable patterns for one communicative function | 6-12 minutes; must still include context and production |
| `conversation-lab` | Turn-taking, listening, repair, and sustained interaction | 12-25 minutes |
| `pronunciation-lab` | Intelligibility, rhythm, sound, linking, liaison, or prosody tied to a task | 8-15 minutes |
| `cultural-interpretation` | Interpret a social practice, register choice, or cultural signal | 8-15 minutes; must include language action |
| `professional-simulation` | Multi-step roleplay or workplace decision with branching responses | 15-30 minutes |
| `story-and-reflection` | Narrative input leading to retelling, interpretation, and personal production | 12-20 minutes |
| `written-clarity-lab` | Messages, notes, emails, documentation, and written register | 8-20 minutes |

Do not split a normal lesson into separate vocabulary, grammar, and culture pages merely to increase object count. A type is justified when the learner's mode of work materially changes.

Recommended Corpus v1 mix:

- 96 `scenario-lesson`
- 20 `language-toolkit`
- 14 `conversation-lab`
- 12 `pronunciation-lab`
- 12 `cultural-interpretation`
- 9 `professional-simulation`
- 6 `story-and-reflection`
- 6 `written-clarity-lab`

Total: **175 objects**.

---

## 13. Proposed 175-object distribution

All distributions below describe the same 175 canonical objects from different angles. They must not be added together. An object has one primary value in each dimension and may have many secondary tags.

### 13.1 Primary editorial anchor: 175

| Primary anchor | Count | Purpose |
| --- | ---: | --- |
| Cross-context foundations | 35 | High-utility functions such as introducing, asking, clarifying, describing, repair, and conversation management |
| Home | 10 | Domestic routines, objects, care, hosting, boundaries |
| Work | 14 | General workplace communication outside named professions |
| People | 9 | Relationships, stories, opinions, emotion, conflict |
| Travel | 10 | Arrival, movement, change, local knowledge, unexpected moments |
| Interests | 7 | Objects whose primary purpose is interest-driven exploration |
| Culture | 5 | Interpretation, register, ritual, identity, variation |
| Professional paths | 45 | Industry-specific objects across the six paths |
| Specialized interest objects | 24 | Music, Technology, Food, Nature, Design, and Ideas objects requiring subject-matter context |
| Language-specific form and pronunciation | 16 | Pronunciation, discourse, register, and language-specific patterns that cannot be represented by a general object |
| **Total** | **175** | |

The `Interests` and `Specialized interest objects` rows are intentionally distinct: the first covers broad entry lessons, while the second covers deeper subject-specific work. Both still carry the interest tags.

### 13.2 Professional allocation: 45

| Professional path | Count |
| --- | ---: |
| Hospitality | 10 |
| Restaurants & Bars | 8 |
| Tourism | 8 |
| Real Estate | 6 |
| Sales | 6 |
| Remote Work | 7 |
| **Total** | **45** |

Hospitality and Restaurants & Bars receive more objects because they combine high immediate need, strong Tulum relevance, and many transferable functions. Real Estate and Sales remain substantial but do not need inflated parallel scripts.

### 13.3 Language allocation: 175

| Primary language | Count | Rationale |
| --- | ---: | --- |
| English | 72 | Broadest initial demand, existing seed content, and strongest professional corpus in Phase 1 |
| Spanish | 55 | Mexico/Tulum relevance, daily participation, regional variation, and professional need |
| French | 48 | Strong cultural and travel value, register richness, and distinct language-specific progression |
| **Total** | **175** | |

These are authored objects, not translations. A French object may have a Spanish or English related object, but it is counted once in its authored language.

### 13.4 Level allocation: 175

| Level | Count | Design intent |
| --- | ---: | --- |
| A1 | 18 | Immediate needs, first contact, basic coordination, high support |
| A2 | 34 | Predictable exchanges and everyday repair |
| B1 | 46 | Main corpus center: practical independence and professional confidence |
| B2 | 43 | Nuance, sustained interaction, negotiation, explanation, and register |
| C1 | 27 | Complex professional, cultural, persuasive, and interpretive communication |
| C2 | 7 | Selective advanced nuance; not a general target |
| **Total** | **175** | |

### 13.5 Content type allocation: 175

As specified in Section 12: 96 scenario lessons, 20 language toolkits, 14 conversation labs, 12 pronunciation labs, 12 cultural interpretation objects, 9 professional simulations, 6 story/reflection objects, and 6 written clarity labs.

### 13.6 Object release waves

To protect quality, author in waves rather than publishing 175 at once:

- Wave 1: 45 objects proving all languages, environments, functions, and professional paths
- Wave 2: 60 objects filling level and function gaps
- Wave 3: 45 objects deepening interests, culture, and cross-links
- Wave 4: 25 advanced, pronunciation, simulation, and gap-repair objects

A wave is a planning unit, not a route or subscription tier.

---

## 14. Coverage matrix

The final manifest must produce a machine-readable coverage report. The following matrix is the minimum expected shape.

### 14.1 Environment x language minimums

| Environment | English | French | Spanish | Minimum total |
| --- | ---: | ---: | ---: | ---: |
| Home | 5 | 4 | 4 | 13 |
| Work | 8 | 6 | 7 | 21 |
| People | 5 | 4 | 5 | 14 |
| Travel | 6 | 5 | 5 | 16 |
| Interests | 5 | 4 | 5 | 14 |
| Culture | 4 | 4 | 5 | 13 |

These are tagged-object minimums, not primary-anchor counts. Professional objects may satisfy Work, Travel, Food, Culture, or People coverage simultaneously.

### 14.2 Professional x language minimums

Every professional path must have authored objects in all three languages by Corpus v1 lock. Minimums:

- Hospitality: 3 English, 2 French, 2 Spanish
- Restaurants & Bars: 2 English, 2 French, 2 Spanish
- Tourism: 2 English, 2 French, 2 Spanish
- Real Estate: 2 English, 1 French, 1 Spanish
- Sales: 2 English, 1 French, 1 Spanish
- Remote Work: 2 English, 2 French, 2 Spanish

These minimums are coverage floors, not the entire path count. Language-specific density may be uneven where learner need and authoring quality justify it.

### 14.3 Interest x language minimums

Each interest must have at least 4 authored objects, including at least one object in each language across the collection and at least two levels. No interest may be represented only by English translations.

### 14.4 Function gap detection

The coverage report must flag any of the following:

- a core function absent from a language
- a core function present at only one level
- fewer than three environment contexts for a high-frequency function
- no repair or boundary work in a professional path
- no sustained production in a collection
- fewer than two register-aware objects per language
- no pronunciation object for a language-specific high-risk feature

### 14.5 Likely gaps to monitor

The first likely imbalances are:

- overproduction of recommendation and description objects
- underproduction of refusing, disagreeing, setting boundaries, and repairing
- English-heavy professional language
- too few advanced French and Spanish objects
- culture reduced to etiquette tips instead of interpretation
- interests becoming topical vocabulary lists
- written clarity isolated from real workplace relationships

---

## 15. Naming and ID convention

### 15.1 Canonical ID

Use a stable, lowercase, hyphenated ID with language and primary function embedded:

```text
{language}-{primary-context}-{function}-{short-name}-v1
```

Examples:

```text
eng-hospitality-welcome-guest-naturally-v1
eng-hospitality-clarify-guest-request-v1
eng-restaurants-recommend-drink-v1
fra-work-soften-disagreement-v1
spa-travel-ask-for-directions-v1
```

The ID is not a URL and must not change when the public title is edited. Avoid numeric IDs that communicate nothing to editors.

### 15.2 Slug

The slug is human-readable and route-safe:

```text
welcoming-a-guest-naturally-in-english
understanding-and-clarifying-guest-requests
recommending-drinks-naturally-in-english
```

Slugs should be unique within the language corpus. If a published slug changes, preserve a redirect record and never reuse the old slug for a different object.

### 15.3 Titles

Titles should name the learner's communicative action and context. Prefer:

- `Clarifying a Guest Request Without Sounding Abrupt`
- `Disagreeing Clearly in a Remote Meeting`
- `Talking About a Song You Cannot Stop Thinking About`

Avoid:

- `The Conditional`
- `Hospitality Vocabulary 4`
- `English Lesson: Recommendations`

---

## 16. Content relationship rules

### 16.1 Reuse by tagging

Use one canonical object with multiple tags when:

- the communicative objective is the same
- the learner task and production prompt are substantially the same
- only the discovery context changes
- the language and cultural explanation do not materially change

Example: a lesson on `softening a request` may be tagged Work, Home, Hospitality, and Remote Work if the object teaches the same transferable move.

### 16.2 Create a separate lesson when

Create a separate object when any two of these are true:

- the interlocutor relationship changes the language choice
- the communicative risk or consequence changes
- the cultural/register explanation differs materially
- the target language pattern is different
- the production task requires a different skill
- the learner would search for it as a distinct problem
- the prerequisite or next step differs

Example: `Recommending a drink` and `Recommending a neighborhood` share a recommendation function but require different vocabulary, evidence, cultural expectations, and production. They are related, not duplicates.

### 16.3 Translation rule

Do not create a French or Spanish translation merely because an English object exists. Create it when:

- the same learner need is important in that language
- the language changes the explanation or toolkit
- the cultural/register reality has been authored
- a proficient speaker has reviewed the object

### 16.4 Resource relationship

Resources are discovery/editorial objects. Lessons are progression objects. Link them when one genuinely helps the other:

- resource -> lesson: the reader wants structured practice
- lesson -> resource: the learner wants cultural depth or broader context

Never clone a Resource into a lesson without changing purpose, progression, practice, and production.

---

## 17. SEO and discoverability model

### 17.1 Learner-first page contract

Each indexable lesson page must answer a real searcher's question in the first viewport:

- what situation is this for?
- what will I be able to do?
- which language and level is it?
- is this useful for my context?

The page should then provide a complete learning experience, not a teaser that forces a click into thin subpages.

### 17.2 Search intent classes

Use the controlled `seoIntent` values:

- `learn`: broad practical learning intent
- `solve-a-communication-problem`: a specific moment or phrase
- `professional-language`: role and industry intent
- `cultural-understanding`: meaning, register, or social practice
- `pronunciation`: intelligibility and sound intent
- `language-comparison`: contrast between forms or usage

### 17.3 Metadata rules

- One useful, specific title per object
- One human description that states context and outcome
- Canonical URL derived from the stable slug
- Breadcrumbs reflecting the learner's route, not keyword repetition
- Article or LearningResource schema only when the rendered content supports it and the schema is truthful
- No fabricated lesson counts, review scores, author expertise, or completion claims
- No Preview hostnames in Production metadata

### 17.4 Internal discovery

Every published lesson should be reachable through at least two meaningful paths, for example:

- language hub -> lesson
- professional path -> lesson
- function collection -> lesson
- Resource -> lesson

Use breadcrumbs, related learning, next recommendations, and collection links. Do not create link farms.

### 17.5 Indexing policy

Index substantial published objects. Do not index:

- draft or review objects
- empty module placeholders
- duplicate regional variants without distinct value
- thin practice fragments
- temporary experiments

---

## 18. Platform compatibility rules

The corpus must remain independent of commercial and identity systems while making them possible later.

### 18.1 Future account and progress compatibility

Stable `id`, `version`, `language`, `level`, and graph relations allow a future record such as:

```ts
type CompletionRecord = {
  userId: string;
  lessonId: string;
  lessonVersion: number;
  startedAt: string;
  completedAt?: string;
  practiceState?: string;
};
```

Do not add user IDs, cookies, completion writes, or account assumptions to Corpus v1 content.

### 18.2 Free limits and Plus

The content manifest must not know whether an object is free or paid. Future entitlements should reference stable object IDs through an external access policy. This permits:

- Free daily lesson-open limits
- Plus access to the full corpus
- Guided/live bundles with teacher-selected objects

No `isFree`, `price`, or `subscriptionTier` field belongs in the canonical lesson content.

### 18.3 Recommendations

Recommendations must be explicit graph relations with reasons. A future recommender may use learner level, context, history, or goals, but it should not have to infer the curriculum from page titles.

### 18.4 Live teaching

Optional fields may identify teacher-practice suitability, but the lesson remains complete without a teacher. A future live system can use:

- roleplay-ready scenarios
- pronunciation targets
- production prompts
- challenge extensions
- teacher notes

Do not build booking, messaging, or teacher dashboards into the corpus schema.

---

## 19. Authoring QA rubric

Every object receives a score from 0 to 3 in each category.

| Category | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| Communicative objective | absent or grammatical only | vague | useful but broad | specific, observable, and contextual |
| Situation authenticity | artificial or implausible | recognizable but thin | believable | consequential and learner-relevant |
| Language usefulness | isolated or unnatural | partly useful | mostly adaptable | reusable, natural, and prioritized |
| Meaning and structure | inaccurate | incomplete | accurate with minor gaps | clear relationship between form, meaning, and effect |
| Register/culture | absent when needed | stereotype or generic note | useful basic note | precise, respectful, and actionable |
| Level calibration | mismatched | uncertain | broadly appropriate | demand is documented and well supported |
| Practice design | absent | one weak exercise | two useful modes | varied practice with explainable answers |
| Production | absent or copying | constrained but narrow | original response | meaningful adaptation with clear success conditions |
| Real-world transfer | absent | generic encouragement | plausible action | specific challenge tied to learner life |
| Graph placement | isolated or arbitrary | tags only | useful links | typed relations with a justified next step |
| Language quality | errors or translationese | requires edits | publishable | reviewed by proficient speaker/editor |
| Accessibility and content clarity | confusing or inaccessible | uneven | clear | scannable, inclusive, and robust |
| Search usefulness | keyword-led or thin | generic | accurate metadata | search intent emerges from genuine utility |

### 19.1 Publish gate

- Minimum total: **31/39**
- No score below **2** in objective, authenticity, language usefulness, accuracy, level, practice, or production
- Register/culture must score at least **2** when relevant
- At least one proficient-speaker review
- All required schema fields present
- All relation IDs resolve
- No duplicate-object warning unresolved
- No unsupported cultural claim
- No route, canonical, or sitemap validation failure

A score of 36 or higher is preferred for featured objects. A lower score may remain in `draft` or `review` but cannot be published as Corpus v1.

---

## 20. Corpus manifest specification

The subsequent manifest should be one machine-readable file or a deterministic set of language files that validate against the same schema. JSON is the interchange format; YAML may be used for authoring if compiled to JSON without information loss.

### 20.1 Top-level manifest

```json
{
  "corpus": {
    "id": "global-speaker-corpus-v1",
    "version": 1,
    "status": "draft",
    "languages": ["english", "french", "spanish"],
    "objectCountTarget": 175,
    "method": ["context", "notice", "understand", "toolkit", "examples", "culture-register", "guided-practice", "production", "real-world-challenge", "reflection", "continue"]
  },
  "lessons": []
}
```

### 20.2 Manifest object example

This is an architecture example, not a full lesson.

```yaml
id: eng-restaurants-recommend-drink-v1
slug: recommending-drinks-naturally-in-english
language: english
level: B1
title: Recommending Drinks Naturally in English
description: Ask about taste and make a useful drink recommendation without overwhelming the guest.
learningObjective: By the end of this lesson, the learner can ask about a preference and recommend a drink with a clear reason.
primaryEnvironment: work
secondaryEnvironments: [travel, people]
interests: [food]
professionalPaths: [restaurants-bars, hospitality]
communicationFunctions:
  - asking
  - recommending
  - describing
  - comparing
vocabularyDomains: [food.drinks, sensory-description]
structures:
  - preference-questions
  - conditional-recommendation
pronunciationFocus: []
register: [neutral, professional, warm]
culturalContexts: [international-english, mexico]
culturalDimension:
  - hospitality-expectations
  - preference-and-expertise
prerequisites:
  - id: eng-cross-context-ask-preference-v1
    kind: supports
    reason: Learners benefit from a simple preference question before making a recommendation.
relatedLessons:
  - id: eng-hospitality-welcome-guest-naturally-v1
    kind: applies
    reason: Both lessons open a service interaction, but this one moves into taste and recommendation.
nextRecommended:
  - id: eng-restaurants-handle-service-recovery-v1
    kind: continues
    priority: primary
    reason: After recommending, the learner can practice recovering when a choice does not work.
progressionTracks: [professional, environment, function]
lessonType: scenario-lesson
estimatedMinutes: 15
seo:
  title: Recommending Drinks Naturally in English | Global Speaker
  description: Learn useful English for asking about drink preferences and making a natural recommendation at a bar or restaurant.
  intent: [professional-language, solve-a-communication-problem]
  searchPhrases:
    - English for recommending drinks
    - how to ask drink preferences in English
  canonicalPath: /professional/restaurants-bars/recommending-drinks-naturally-in-english
  indexable: true
status: planned
version: 1
content:
  context: {}
  notice: {}
  understand: {}
  toolkit: {}
  examples: []
  cultureRegister: {}
  guidedPractice: []
  production: {}
  realWorldChallenge: {}
  reflection: {}
  continue: {}
```

### 20.3 Required content validation

The manifest validator must check:

1. IDs and slugs are unique.
2. Every relation points to an existing object or an approved future placeholder relation type.
3. Language, level, taxonomy, content type, and function values are controlled.
4. Required anatomy sections exist for the selected lesson type.
5. Estimated time is a positive integer within type guidance.
6. Every published object has indexability and canonical metadata.
7. Every published object has at least one continuation or an explicit terminal-exploration reason.
8. Primary and secondary environments do not duplicate.
9. Professional paths and interests are valid controlled values.
10. Coverage reports meet the matrix floors.
11. No object is an accidental near-duplicate based on normalized title, objective, and toolkit similarity.
12. A lesson cannot be published if its QA score or review record is missing.

### 20.4 Authoring workflow

1. Propose an object and its graph placement.
2. Run a duplicate and coverage check before writing.
3. Author the context and objective first.
4. Author the target language from the communicative task.
5. Add register/culture and language-specific notes.
6. Add practice, production, challenge, and continuation.
7. Run linguistic, pedagogical, accessibility, and SEO review.
8. Set status to `review`.
9. Resolve QA findings.
10. Publish only after manifest validation and coverage review.

---

## 21. Critical review and revisions

The architecture was reviewed against the risk of becoming an attractive but unmaintainable taxonomy.

### Risk 1: Too many dimensions create author burden

**Problem:** Twenty metadata fields can turn authoring into data entry.

**Revision:** Required fields are limited to identity, language, level, objective, discovery anchors, function, type, time, relations, status, version, SEO, and content. Structures, pronunciation, register, cultural dimensions, media, and teacher notes remain optional but are required by QA when relevant. Authoring tools should infer display labels from controlled values.

### Risk 2: A graph can become a link dump

**Problem:** If every lesson links to every shared tag, recommendations lose meaning.

**Revision:** Relations are typed, capped in editorial guidance, and require a reason. A lesson should normally have one primary next recommendation, up to three alternatives, and only the related links that help a learner decide.

### Risk 3: The 175 target could distort quality

**Problem:** A numeric target encourages filler, especially parallel translations.

**Revision:** 175 is a planning envelope, not a publishing quota. Wave gates, minimum quality scores, and the translation rule take precedence. The corpus may ship with fewer objects rather than weak objects.

### Risk 4: English professional content could dominate

**Problem:** English has the strongest seed and commercial demand, while French and Spanish become decorative tags.

**Revision:** Language allocation is explicit at 72/55/48, every professional path has language floors, and each language must have independent cultural and register decisions. Coverage reports must flag English-only paths.

### Risk 5: CEFR can become a hidden textbook sequence

**Problem:** Levels can turn into gates and flatten learner goals.

**Revision:** CEFR calibrates task demand, support, and progression edges. Entry is open; tracks offer level-sensitive routes; every object may be discovered through context or function.

### Risk 6: Culture can become stereotype or trivia

**Problem:** A culture field alone does not create cultural learning.

**Revision:** Cultural objects must teach interpretation and action, name context and variation, and pass a review for stereotyping, overgeneralization, and regional accuracy.

### Risk 7: Content types could fragment the corpus

**Problem:** Too many micro-types create empty navigation and administrative overhead.

**Revision:** Eight types are the ceiling for Corpus v1. A type exists only when the learner mode changes. Most objects remain scenario lessons.

### Risk 8: SEO could reintroduce article behavior

**Problem:** Search intent can pull authoring back toward keyword pages.

**Revision:** Indexability requires a complete lesson, real objective, production, graph placement, and human metadata. Search phrases document discovery; they do not determine pedagogy.

### Final architecture decision

Corpus v1 should proceed as a **typed graph manifest with a small content-type system, soft progression edges, explicit language-specific authorship, and coverage validation**. The next agent may generate the 175-item manifest from this document without deciding the fundamental model again. It should still be allowed to reduce counts when QA or language expertise shows that an object would be redundant or weak.

---

## Appendix A. Minimum next-agent deliverables

The agent generating the manifest must return:

- the complete object list with IDs and slugs
- distribution tables by language, level, primary anchor, professional path, interest, function, and type
- a relation-resolution report
- a coverage-gap report
- a duplicate-risk report
- a list of objects requiring native-speaker or regional review
- a list of proposed guided tracks
- a list of objects intentionally serving multiple collections
- unresolved product questions, limited to genuine decisions rather than architecture gaps

## Appendix B. Existing implementation alignment

The current application already has compatible concepts:

- `LanguageKey` for English, French, and Spanish
- typed professional paths and modules
- stable lesson IDs and slugs
- data-driven dynamic professional routes
- sitemap and metadata generation
- Resources as a separate editorial system

Corpus v1 should extend these concepts into a dedicated content module or manifest compiler. It should not force Resources and Lessons into one undifferentiated object type, and it should not introduce accounts, progress, quotas, subscriptions, or dashboards during corpus authoring.
