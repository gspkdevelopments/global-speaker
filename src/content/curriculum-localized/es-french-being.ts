import type { LocalizedCurriculumLessonOverride } from "@/lib/curriculum-types";

const originStory: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Ser y existir",
  sequence: 2,
  nextLessonId: "fra-people-exprimer-une-emotion-v1",
  title: "D’où je viens et ce qui m’a formé",
  description:
    "Conecta tu identidad actual con un lugar, una etapa y una experiencia real de tu historia.",
  learningObjective:
    "Contar de dónde vienes y explicar brevemente una experiencia que haya influido en quién eres hoy.",
  expectedOutcome: "Una historia personal de 45–60 segundos en francés.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Alguien ya conoce tu nombre y quiere saber más sobre ti. Esta vez no basta con nombrar una ciudad: vas a conectar tu origen con una experiencia que te haya formado.\n\n> **Tu misión:** contar una historia breve con un antes, un cambio y una consecuencia actual.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a combinar `je viens de` para hablar de tu origen, `quand j’étais` para describir una etapa y `j’ai…` para presentar un hecho que ocurrió. Al final explicarás qué cambió en ti.",
    },
    {
      heading: "Observa",
      body:
        "Lee la historia e identifica: el lugar de origen, la situación anterior, el acontecimiento y su efecto actual.\n\n> `Je viens de Mérida, mais j’habite à Tulum aujourd’hui.`\n\n> `Quand j’étais plus jeune, j’étais très réservée.`\n\n> `J’ai commencé à voyager seule à vingt ans.`\n\n> `Cette expérience m’a appris à parler avec des personnes très différentes.`\n\n> `Aujourd’hui, je suis plus indépendante.`\n\n> **Hazlo ahora:** señala qué frase describe una etapa y cuál cuenta un acontecimiento concreto.",
    },
    {
      heading: "Comprende",
      body:
        "`Quand j’étais…` crea el escenario: una etapa, una característica o una situación que duraba.\n\n`J’ai commencé…`, `j’ai appris…` o `je suis arrivé(e)…` presentan acontecimientos que hacen avanzar la historia.\n\nLa última frase conecta el pasado con el presente: `Aujourd’hui, je suis…` o `Ça m’a rendu(e)…`\n\nNo necesitas dominar todos los tiempos del pasado. Necesitas distinguir entre **el contexto** y **lo que ocurrió dentro de él**.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Je viens de…` — vengo de / soy de…\n- `J’ai grandi à…` — crecí en…\n- `Quand j’étais…` — cuando era / estaba…\n- `J’ai commencé à…` — comencé a…\n- `J’ai appris à…` — aprendí a…\n- `Cette expérience m’a appris…` — esta experiencia me enseñó…\n- `Ça m’a rendu(e)…` — eso me volvió / me hizo…\n- `Aujourd’hui, je suis…` — actualmente soy / estoy…\n\n> **Objetivo de esta sección:** selecciona cuatro estructuras que correspondan a una historia que realmente quieras contar.",
    },
    {
      heading: "Construye tu historia",
      body:
        "Completa esta línea de tiempo con información verdadera:\n\n1. `Je viens de __________.`\n2. `Quand j’étais __________, j’étais __________.`\n3. `Un jour / À cette époque, j’ai __________.`\n4. `Cette expérience m’a appris __________.`\n5. `Aujourd’hui, je suis __________.`\n\n> **Resultado esperado:** cinco frases conectadas, no cinco respuestas aisladas.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Elige la forma que distingue correctamente una etapa del pasado, un acontecimiento y su consecuencia.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Elige una experiencia pequeña pero significativa: una mudanza, un trabajo, una amistad, un viaje, una decisión o algo que aprendiste.\n\n> **Tu tarea:** cuenta dónde estabas, qué ocurrió y qué cambió en ti.\n\n> **Resultado esperado:** una historia de 45–60 segundos que termine conectando con quién eres hoy.",
    },
    {
      heading: "Continúa la conversación",
      body:
        "Después de contar tu historia, invita a la otra persona a compartir la suya:\n\n- `Et toi, tu viens d’où ?`\n- `Tu as grandi où ?`\n- `Qu’est-ce qui t’a beaucoup appris ?`\n- `Ça t’a changé(e) comment ?`\n\n> **Reto:** cuenta tu historia y formula una pregunta que nazca realmente de lo que acabas de decir.",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca el nivel que ya puedes demostrar. Tu meta no es recitar el modelo, sino reconstruir tu propia historia.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes hablar de quién eres y de algo que te ha formado. La siguiente lección, **Comment je me décris vraiment**, utilizará esa información para describir tu personalidad con matices y ejemplos.",
    },
  ],
  practice: [
    {
      prompt: "Quand j’___ enfant, j’étais très curieux.",
      options: ["étais", "ai été"],
      answer: "étais",
      explanation: "Quand j’étais presenta una etapa o situación que duraba en el pasado.",
    },
    {
      prompt: "Je ___ à Cancún en 2024.",
      options: ["suis arrivé(e)", "arrivais"],
      answer: "suis arrivé(e)",
      explanation: "La llegada es un acontecimiento concreto que hace avanzar la historia.",
    },
    {
      prompt: "Cette expérience m’___ plus patient(e).",
      options: ["a rendu(e)", "rendais"],
      answer: "a rendu(e)",
      explanation: "M’a rendu(e) expresa el efecto que esa experiencia produjo en ti.",
    },
  ],
  checkpoints: [
    "Puedo distinguir el contexto de un acontecimiento pasado.",
    "Puedo construir mi historia con el modelo a la vista.",
    "Puedo contar una experiencia de 45–60 segundos sin leer.",
  ],
};

export const spanishFrenchBeingLessons = {
  "fra-people-raconter-un-souvenir-v1": originStory,
};
