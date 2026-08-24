import type { InterfaceLocale } from "@/lib/interface-locale";

export const ui = {
  en: {
    learn: "Learn", professional: "Professional", method: "Method", resources: "Resources", culture: "Culture", about: "About",
    languageMap: "Language Map", locations: "Locations", back: "Back", level: "Level", environment: "Environment", studyTime: "Study time",
    lessons: "lessons", connectedLessons: "connected lessons", explore: "Explore", curriculum: "Curriculum", allResources: "All free resources",
    previous: "Previous", next: "Next", continue: "Continue", overview: "Overview", language: "Language", availableNow: "Available now",
    communicationNeeds: "Communication needs", buildMap: "Build my Language Map", practiceTeacher: "Practice this with a teacher",
  },
  es: {
    learn: "Aprender", professional: "Profesional", method: "Método", resources: "Recursos", culture: "Cultura", about: "Acerca de",
    languageMap: "Mapa de Idioma", locations: "Ubicaciones", back: "Volver", level: "Nivel", environment: "Entorno", studyTime: "Tiempo de estudio",
    lessons: "lecciones", connectedLessons: "lecciones conectadas", explore: "Explorar", curriculum: "Currículo", allResources: "Todos los recursos gratuitos",
    previous: "Anterior", next: "Siguiente", continue: "Continuar", overview: "Vista general", language: "Idioma", availableNow: "Disponible ahora",
    communicationNeeds: "Necesidades de comunicación", buildMap: "Crear mi Mapa de Idioma", practiceTeacher: "Practica esto con un profesor",
  },
  fr: {
    learn: "Apprendre", professional: "Professionnel", method: "Méthode", resources: "Ressources", culture: "Culture", about: "À propos",
    languageMap: "Carte linguistique", locations: "Lieux", back: "Retour", level: "Niveau", environment: "Contexte", studyTime: "Temps d’étude",
    lessons: "leçons", connectedLessons: "leçons associées", explore: "Explorer", curriculum: "Programme", allResources: "Toutes les ressources gratuites",
    previous: "Précédent", next: "Suivant", continue: "Continuer", overview: "Vue d’ensemble", language: "Langue", availableNow: "Disponible maintenant",
    communicationNeeds: "Besoins de communication", buildMap: "Créer ma carte linguistique", practiceTeacher: "Pratiquez ceci avec un professeur",
  },
} as const satisfies Record<InterfaceLocale, Record<string, string>>;

export function t(locale: InterfaceLocale) { return ui[locale]; }
