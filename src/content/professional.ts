import type { LanguageKey } from "@/content/site";

export type VocabularyItem = { term: string; meaning: string };
export type Phrase = { text: string; note?: string };
export type LessonSection = { title: string; body: string; examples?: string[] };
export type PracticeBlock = { type: "choice" | "fill" | "match" | "rewrite"; prompt: string; answer?: string };
export type Scenario = { setting: string; role: string; situation: string };
export type Exercise = { prompt: string; guidance: string };

export type Lesson = {
  id: string;
  title: string;
  slug: string;
  description: string;
  language: LanguageKey;
  level?: string;
  estimatedMinutes?: number;
  communicationGoal: string;
  vocabulary?: VocabularyItem[];
  phrases?: Phrase[];
  explanation?: LessonSection[];
  scenario?: Scenario;
  practice?: PracticeBlock[];
  yourTurn?: Exercise;
  relatedLessons?: string[];
  relatedResource?: string;
};

export type LearningModule = {
  title: string;
  slug: string;
  number: number;
  description: string;
  communicationGoal: string;
  lessons: Lesson[];
};

export type ProfessionalPath = {
  title: string;
  slug: string;
  shortCode: string;
  description: string;
  languages: LanguageKey[];
  communicationNeeds: string[];
  modules: LearningModule[];
  featuredResources?: string[];
  seoTitle?: string;
  seoDescription?: string;
};

const hospitalityModules: LearningModule[] = [
  { number: 1, title: "Welcoming Guests", slug: "welcoming-guests", description: "Start the interaction with warmth, clarity, and an easy next question.", communicationGoal: "Greet a guest, find out what they need, and open a natural service interaction.", lessons: [] },
  { number: 2, title: "Check-in & Arrival", slug: "check-in-arrival", description: "Handle reservations, identification, timing, luggage, and room readiness.", communicationGoal: "Guide an arrival smoothly while setting clear expectations.", lessons: [] },
  { number: 3, title: "Guest Requests", slug: "guest-requests", description: "Listen closely, clarify what matters, and offer a useful next step.", communicationGoal: "Understand a request and respond even when the first explanation is unclear.", lessons: [] },
  { number: 4, title: "Recommendations", slug: "recommendations", description: "Use local knowledge and preferences to make a recommendation feel personal.", communicationGoal: "Ask about preferences and recommend places, transport, or activities with confidence.", lessons: [] },
  { number: 5, title: "Problems & Recovery", slug: "problems-recovery", description: "Acknowledge problems, apologize naturally, and move toward a solution.", communicationGoal: "Keep trust in a difficult service interaction.", lessons: [] },
  { number: 6, title: "Directions & Orientation", slug: "directions-orientation", description: "Make locations, distances, routes, and timing easy to follow.", communicationGoal: "Give clear directions and check that a guest can act on them.", lessons: [] },
  { number: 7, title: "Check-out & Farewell", slug: "check-out-farewell", description: "Close the stay with practical help, feedback, and a genuine goodbye.", communicationGoal: "Complete a final interaction clearly and warmly.", lessons: [] },
];

const welcomingLesson: Lesson = {
  id: "hospitality-welcoming-a-guest-naturally-in-english",
  title: "Welcoming a Guest Naturally in English",
  slug: "welcoming-a-guest-naturally-in-english",
  description: "Open a hotel or hospitality interaction with warmth, clarity, and the right amount of formality.",
  language: "english",
  level: "A2-B1",
  estimatedMinutes: 12,
  communicationGoal: "By the end of this lesson, you should be able to welcome a guest and begin a natural service interaction.",
  phrases: [
    { text: "Hello. Welcome.", note: "A simple, warm opening." },
    { text: "How can I help you?", note: "An open question that lets the guest lead." },
    { text: "Are you checking in?", note: "A natural way to identify the next step." },
    { text: "Do you have a reservation?", note: "Clear and ordinary in a hotel context." },
    { text: "May I have your name, please?", note: "Polite and professional; " + "What's your name?" + " is more direct." },
  ],
  explanation: [
    { title: "Warm first, efficient second", body: "Hello, Hi, and Good morning all work. Welcome adds the feeling that the person has arrived somewhere they are expected. Follow it with one useful question rather than a long script.", examples: ["Good morning. Welcome.", "Hi, welcome in."] },
    { title: "Formal does not have to sound distant", body: "May I have your name, please? is polished. Can I have your name, please? is also natural and a little less formal. The goal is not to sound impressive; it is to make the next moment easy.", examples: ["Are you checking in?", "Do you have a reservation?"] },
  ],
  scenario: { setting: "A small hotel reception desk in the morning", role: "You are welcoming a guest who has just walked in with a suitcase.", situation: "Greet them, find out whether they are checking in, and ask for the information you need next." },
  practice: [
    { type: "choice", prompt: "Which opening sounds most natural at a hotel desk? A) Explain your existence. B) Good morning. Welcome. How can I help you?", answer: "B" },
    { type: "fill", prompt: "Complete the question: Do you have a ________?", answer: "reservation" },
    { type: "rewrite", prompt: "Make this more welcoming: What do you want?", answer: "How can I help you?" },
  ],
  yourTurn: { prompt: "Write the first two sentences you would say to a guest arriving at your workplace.", guidance: "Use a greeting, Welcome, and one question. Keep it natural enough to say without reading." },
  relatedLessons: ["hospitality/understanding-and-clarifying-guest-requests"],
};

const requestLesson: Lesson = {
  id: "hospitality-understanding-and-clarifying-guest-requests",
  title: "Understanding and Clarifying Guest Requests",
  slug: "understanding-and-clarifying-guest-requests",
  description: "Keep a request moving when you need more information, time, or a different solution.",
  language: "english",
  level: "B1",
  estimatedMinutes: 15,
  communicationGoal: "By the end of this lesson, you should be able to clarify a request without making the guest repeat everything from the beginning.",
  phrases: [
    { text: "Of course.", note: "Acknowledge the request before solving it." },
    { text: "Let me check.", note: "Buy a moment without sounding unavailable." },
    { text: "Just to make sure...", note: "Signal that you are checking the detail." },
    { text: "Do you mean...?", note: "Offer your understanding for confirmation." },
    { text: "Would you like...?", note: "Turn an assumption into a choice." },
    { text: "Is that for today?", note: "A focused question about timing." },
    { text: "I'll find out for you.", note: "Promise a next action, not an instant answer." },
    { text: "We can... / Unfortunately...", note: "Offer what is possible, then explain a limit honestly." },
  ],
  explanation: [
    { title: "Acknowledge before you clarify", body: "Of course and Let me check show that the request has been heard. Then ask one precise question. This feels more cooperative than starting with I don't understand.", examples: ["Of course. Just to make sure, you need two extra towels?", "Let me check. Is that for today?"] },
    { title: "Make the uncertainty visible", body: "Do you mean...? is useful when two interpretations are possible. Would you like...? helps when the guest may be choosing between alternatives. Both phrases protect the conversation from a guess.", examples: ["Do you mean a taxi to the airport?", "Would you like us to call one for you?"] },
    { title: "Give a next step", body: "If something is not available, pair Unfortunately with what you can do. We can move the request from a dead end toward a real option.", examples: ["Unfortunately, the spa is full today, but we can book you for tomorrow."] },
  ],
  scenario: { setting: "A guest asks quickly for something you are not sure you understood.", role: "You are working at the front desk during a busy afternoon.", situation: "A guest asks for a late checkout and transport, but the timing is unclear. Clarify the request and offer a next step." },
  practice: [
    { type: "choice", prompt: "The guest says, 'Can you arrange one for later?' Which reply checks the missing detail? A) Do you mean a taxi? B) No. C) We are closed.", answer: "A" },
    { type: "match", prompt: "Match the move to the phrase: acknowledge, clarify, next action. Of course. / Do you mean...? / I'll find out for you.", answer: "acknowledge = Of course; clarify = Do you mean; next action = I'll find out" },
    { type: "rewrite", prompt: "Make this more helpful: I don't know if we have that.", answer: "Let me check. I'll find out for you." },
  ],
  yourTurn: { prompt: "Respond to: 'Can I get a car for tomorrow morning?' Ask one clarifying question and offer a next step.", guidance: "Check the time or destination, then use Let me check or I'll find out for you." },
  relatedLessons: ["hospitality/welcoming-a-guest-naturally-in-english"],
};

const drinksLesson: Lesson = {
  id: "restaurants-bars-recommending-drinks-naturally-in-english",
  title: "Recommending Drinks Naturally in English",
  slug: "recommending-drinks-naturally-in-english",
  description: "Ask about taste, translate preferences into useful language, and recommend a drink with confidence.",
  language: "english",
  level: "B1",
  estimatedMinutes: 15,
  communicationGoal: "By the end of this lesson, you should be able to discover a guest's preferences and make a clear drink recommendation.",
  vocabulary: [
    { term: "sweet", meaning: "with a noticeable sugar taste" }, { term: "dry", meaning: "not sweet" }, { term: "light", meaning: "gentle or easy to drink" }, { term: "strong", meaning: "with a powerful flavor or alcohol presence" }, { term: "fruity", meaning: "with fruit flavors" }, { term: "citrusy", meaning: "with lemon, lime, or orange notes" }, { term: "smoky", meaning: "with a toasted or wood-like flavor" }, { term: "refreshing", meaning: "fresh and cooling" },
  ],
  phrases: [
    { text: "Do you prefer X or Y?", note: "A simple choice is easier than asking for a full description." },
    { text: "If you like X, I'd recommend Y.", note: "Connect a known preference to a new option." },
    { text: "You might like...", note: "A friendly recommendation that leaves room for choice." },
  ],
  explanation: [
    { title: "Ask about taste, not expertise", body: "Many guests do not know the names of drinks, but they know what they enjoy. Start with a contrast such as sweet or dry, light or strong, fruity or smoky.", examples: ["Do you prefer something light or strong?", "Would you like something refreshing or more complex?"] },
    { title: "Build a bridge to the menu", body: "A recommendation works when the reason is audible. If you like something citrusy, I'd recommend the mezcal margarita. The guest can understand the choice even if the drink is new.", examples: ["If you like dry drinks, I'd recommend the house gin and tonic.", "You might like the hibiscus spritz. It's fruity and refreshing."] },
  ],
  scenario: { setting: "A guest is looking at the drinks menu during a quiet moment at the bar.", role: "You are the bartender and want to recommend something without overwhelming them.", situation: "The guest says, 'I don't know what to order.' Ask about one preference and recommend a drink with a reason." },
  practice: [
    { type: "choice", prompt: "Which question gives the guest an easy choice? A) Explain your palate. B) Do you prefer something light or strong?", answer: "B" },
    { type: "fill", prompt: "If you like fruity drinks, I'd ________ the passion-fruit spritz.", answer: "recommend" },
    { type: "rewrite", prompt: "Make this recommendation more useful: Try this.", answer: "You might like this. It's light, citrusy, and refreshing." },
  ],
  yourTurn: { prompt: "Recommend a drink to someone who likes light, citrusy flavors but does not want something sweet.", guidance: "Name a drink you know, use If you like... or You might like..., and give one reason." },
  relatedLessons: [],
};

hospitalityModules[0].lessons = [welcomingLesson];
hospitalityModules[2].lessons = [requestLesson];

const path = (title: string, slug: string, shortCode: string, description: string, communicationNeeds: string[], modules: LearningModule[] = []): ProfessionalPath => ({ title, slug, shortCode, description, languages: ["english", "french", "spanish"], communicationNeeds, modules, seoTitle: `${title} Language Learning | Global Speaker`, seoDescription: description });

export const professionalPaths: ProfessionalPath[] = [
  path("Hospitality", "hospitality", "HSP", "Build the language for welcoming guests, understanding requests, giving local guidance, and recovering trust when plans change.", ["Reception", "Guest requests", "Recommendations", "Problems", "Directions", "Check-in / check-out"], hospitalityModules),
  path("Restaurants & Bars", "restaurants-bars", "F&B", "Learn the language of welcome, menus, preferences, recommendations, service recovery, and easy conversation.", ["Welcoming", "Menus", "Preferences", "Recommendations", "Service recovery", "Small talk"], [{ number: 1, title: "Welcoming & Menus", slug: "welcoming-menus", description: "Help guests settle in and understand their choices.", communicationGoal: "Guide a guest from arrival to a confident order.", lessons: [] }, { number: 2, title: "Recommendations", slug: "recommendations", description: "Turn taste and preference into a useful drink or food recommendation.", communicationGoal: "Recommend something naturally and explain why it fits.", lessons: [drinksLesson] }]),
  path("Tourism", "tourism", "TRV", "Develop practical language for itineraries, local knowledge, safety, storytelling, questions, and group guidance.", ["Itineraries", "Local knowledge", "Safety", "Storytelling", "Questions", "Group guidance"], [{ number: 1, title: "Guiding the Day", slug: "guiding-the-day", description: "Shape a clear, flexible experience for visitors.", communicationGoal: "Explain plans and respond to questions in the moment.", lessons: [] }]),
  path("Real Estate", "real-estate", "REA", "Communicate clearly through viewings, needs analysis, features, negotiation, follow-up, and trust.", ["Viewings", "Needs analysis", "Features", "Negotiation", "Follow-up", "Trust"], [{ number: 1, title: "Understanding the Buyer", slug: "understanding-the-buyer", description: "Ask useful questions before describing a property.", communicationGoal: "Discover what matters to a client and reflect it back clearly.", lessons: [] }]),
  path("Sales", "sales", "SLS", "Build language for discovery, value, objections, presentations, negotiation, and closing without losing the human conversation.", ["Discovery", "Value", "Objections", "Presentations", "Negotiation", "Closing"], [{ number: 1, title: "Discovery Conversations", slug: "discovery-conversations", description: "Find the real need behind a first question.", communicationGoal: "Ask and listen before moving toward a solution.", lessons: [] }]),
  path("Remote Work", "remote-work", "RMT", "Practice the language of meetings, updates, collaboration, feedback, boundaries, and written clarity across distance.", ["Meetings", "Updates", "Collaboration", "Feedback", "Boundaries", "Written clarity"], [{ number: 1, title: "Working Clearly", slug: "working-clearly", description: "Keep distributed work moving with clear, considerate language.", communicationGoal: "Share updates, ask for clarity, and make the next action visible.", lessons: [] }]),
];

export const getProfessionalPath = (slug: string) => professionalPaths.find((item) => item.slug === slug);
export const getLesson = (pathSlug: string, lessonSlug: string) => getProfessionalPath(pathSlug)?.modules.flatMap((module) => module.lessons).find((lesson) => lesson.slug === lessonSlug);
export const getLessonLocation = (pathSlug: string, lessonSlug: string) => getProfessionalPath(pathSlug)?.modules.find((module) => module.lessons.some((lesson) => lesson.slug === lessonSlug));
