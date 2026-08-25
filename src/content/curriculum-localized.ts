import type { LocalizedCurriculumLessonOverride } from "@/lib/curriculum-types";
import type { InterfaceLocale } from "@/lib/interface-locale";
import { spanishFrenchBeingLessons } from "./curriculum-localized/es-french-being.ts";
import { spanishFrenchLeisureLessons } from "./curriculum-localized/es-french-leisure.ts";
import { spanishFrenchPersonalityLessons } from "./curriculum-localized/es-french-personality.ts";
import { spanishFrenchUrgencyLessons } from "./curriculum-localized/es-french-urgency.ts";

const spanishFrenchPilot: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Ser y existir",
  sequence: 1,
  nextLessonId: "fra-people-raconter-un-souvenir-v1",
  title: "Qui je suis aujourd’hui",
  description:
    "Construye una presentación que hable de tu vida real: quién eres, de dónde vienes, dónde vives y cómo te sientes hoy.",
  learningObjective:
    "Presentarte en francés mediante seis frases verdaderas sobre quién eres, qué forma parte de tu vida y cómo te sientes.",
  expectedOutcome: "Una presentación personal de 30–45 segundos en francés.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Conoces a alguien por primera vez. No quieres recitar una presentación genérica: quieres compartir información real sobre ti y abrir espacio para conocer a la otra persona.\n\n> **Tu misión:** al terminar, podrás presentarte con seis frases que solo podrían hablar de ti.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a combinar tres formas centrales: `je suis` para identidad o características, `j’ai` para edad, posesión y ciertas sensaciones, y `je me sens` para expresar tu estado actual.\n\nNo necesitas memorizar una tabla completa. Primero aprenderás a elegir la forma que comunica exactamente lo que quieres decir.",
    },
    {
      heading: "Observa",
      body:
        "Lee el diálogo una vez para comprender la situación. Después, vuelve a leerlo y localiza las frases que hablan de identidad, ubicación y estado actual.\n\n> `— Bonjour, je m’appelle Clara. Et toi ?`\n\n> `— Moi, c’est Daniel.`\n\n> `— Tu es d’où ?`\n\n> `— Je suis mexicain. J’habite à Tulum.`\n\n> `— Tu travailles ici ?`\n\n> `— Oui, je suis dentiste.`\n\n> `— Et comment tu te sens aujourd’hui ?`\n\n> `— Je me sens bien, mais un peu fatigué.`\n\n> **Hazlo ahora:** encuentra dos usos de `je suis`, uno de `j’habite` y uno de `je me sens`.",
    },
    {
      heading: "Comprende",
      body:
        "`Je suis…` presenta una identidad o característica: `Je suis dentiste.` · `Je suis calme.`\n\n`J’ai…` expresa posesión, edad y algunas sensaciones que en español se construyen con **tener**: `J’ai trente ans.` · `J’ai faim.`\n\n`Je me sens…` expresa cómo te encuentras en este momento: `Je me sens motivée.` · `Je me sens un peu nerveux.`\n\nEn francés se dice `j’ai 30 ans`, literalmente “tengo 30 años”. No se dice `je suis 30 ans`. Las terminaciones de algunos adjetivos también pueden cambiar: `fatigué` / `fatiguée`.",
    },
    {
      heading: "Tus herramientas",
      body:
        "Usa estas seis estructuras como un mapa personal, no como una lista aislada:\n\n- `Je m’appelle…` — me llamo…\n- `Je suis…` — soy / estoy…\n- `J’ai…` — tengo…\n- `J’habite à…` — vivo en…\n- `Je viens de…` — vengo de / soy de…\n- `Aujourd’hui, je me sens…` — hoy me siento…\n\n> **Objetivo de esta sección:** elige una información verdadera que puedas colocar después de cada estructura.",
    },
    {
      heading: "Hazlo ahora",
      body:
        "Completa las frases con información verdadera. Si todavía necesitas apoyo, conserva el modelo a la vista.\n\n1. `Je m’appelle __________.`\n2. `Je suis __________.`\n3. `J’ai __________ ans.`\n4. `J’habite à __________.`\n5. `Je viens de __________.`\n6. `Aujourd’hui, je me sens __________.`\n\n> **Resultado esperado:** seis frases completas que describen tu vida actual.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la expresión que completa correctamente cada frase. Después de responder verás por qué funciona esa opción.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Convierte las seis frases en una presentación fluida. Puedes cambiar el orden y añadir una conexión sencilla como `et` (y), `mais` (pero) o `aussi` (también).\n\n> **Tu tarea:** di tu nombre, origen, lugar de residencia, algo que haces, una característica personal y cómo te sientes hoy.\n\n> **Resultado esperado:** una presentación de 30–45 segundos que nadie más podría decir exactamente igual.",
    },
    {
      heading: "Tu primer diálogo",
      body:
        "Presentarte es solo la mitad de la interacción. Después de compartir algo sobre ti, devuelve la conversación a la otra persona:\n\n- `Et toi ?` — ¿y tú?\n- `Comment tu t’appelles ?` — ¿cómo te llamas?\n- `Tu es d’où ?` — ¿de dónde eres?\n- `Tu habites où ?` — ¿dónde vives?\n- `Comment tu te sens aujourd’hui ?` — ¿cómo te sientes hoy?\n\n> **Reto:** presenta tu información y termina con una de estas preguntas. Imagina la respuesta y continúa durante dos turnos más.",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca únicamente lo que ya puedes hacer. No necesitas completar los tres niveles en el primer intento: esta escala te muestra con claridad cuál es tu siguiente paso.",
    },
    {
      heading: "Continúa",
      body:
        "La próxima lección, **D’où je viens**, añadirá el pasado. Pasarás de describir quién eres hoy a contar una parte breve de la historia que te trajo hasta aquí.\n\nAntes de continuar, intenta tu presentación una vez sin leer. Si una frase todavía se bloquea, vuelve solamente a esa estructura y personalízala de nuevo.",
    },
  ],
  practice: [
    {
      prompt: "___ vingt-cinq ans.",
      options: ["Je suis", "J’ai"],
      answer: "J’ai",
      explanation: "En francés la edad se expresa con avoir: J’ai vingt-cinq ans.",
    },
    {
      prompt: "___ calme et créative.",
      options: ["Je suis", "J’ai"],
      answer: "Je suis",
      explanation: "Calme y créative describen características, por eso usamos être: Je suis…",
    },
    {
      prompt: "Aujourd’hui, ___ un peu nerveux.",
      options: ["je me sens", "j’ai"],
      answer: "je me sens",
      explanation: "La frase describe cómo te encuentras hoy: je me sens un peu nerveux.",
    },
  ],
  checkpoints: [
    "Reconozco las seis expresiones cuando las veo.",
    "Puedo completar mi presentación con el modelo a la vista.",
    "Puedo presentarme durante 30–45 segundos sin leer.",
  ],
};

const spanishFrenchFoundation = {
  "fra-people-saluer-et-se-presenter-v1": spanishFrenchPilot,
  ...spanishFrenchBeingLessons,
  ...spanishFrenchPersonalityLessons,
  ...spanishFrenchUrgencyLessons,
  ...spanishFrenchLeisureLessons,
};

const overrides: Partial<Record<InterfaceLocale, Record<string, LocalizedCurriculumLessonOverride>>> = {
  es: spanishFrenchFoundation,
};

export function getLocalizedCurriculumOverride(locale: InterfaceLocale, lessonId: string) {
  return overrides[locale]?.[lessonId];
}

export function getLocalizedFoundationLessonIds(locale: InterfaceLocale, language: string) {
  return Object.entries(overrides[locale] ?? {})
    .filter(([, lesson]) => lesson.language === language)
    .sort(([, a], [, b]) => a.sequence - b.sequence)
    .map(([lessonId]) => lessonId);
}
