import type { LocalizedCurriculumLessonOverride } from "@/lib/curriculum-types";

const askForHelp: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Urgencias",
  sequence: 5,
  nextLessonId: "fra-work-clarifier-une-demande-v1",
  title: "J’ai besoin d’aide maintenant",
  description:
    "Comunica una necesidad inmediata con suficiente claridad para que otra persona pueda ayudarte.",
  learningObjective:
    "Pedir ayuda, explicar la necesidad principal y confirmar la acción siguiente en una situación urgente.",
  expectedOutcome: "Una solicitud de ayuda clara de 20–30 segundos en francés.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Tienes poco tiempo, estás bajo presión o no encuentras algo importante. En una urgencia, intentar construir una frase perfecta puede bloquearte. Necesitas una secuencia breve y reutilizable.\n\n> **Tu misión:** captar la atención, nombrar la necesidad, añadir el dato esencial y confirmar qué ocurrirá.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a organizar tu mensaje en cuatro pasos: **atención → necesidad → información esencial → confirmación**. La prioridad es que la otra persona comprenda y pueda actuar.",
    },
    {
      heading: "Observa",
      body:
        "Lee la situación y localiza los cuatro pasos.\n\n> `— Excusez-moi, j’ai besoin d’aide.`\n\n> `— Qu’est-ce qui se passe ?`\n\n> `— Je ne trouve pas mon téléphone. Je l’ai utilisé ici il y a dix minutes.`\n\n> `— D’accord. Vous pouvez vérifier à la réception.`\n\n> `— Juste pour confirmer : la réception est au rez-de-chaussée ?`\n\n> `— Oui, exactement.`\n\n> **Hazlo ahora:** identifica la necesidad y el único detalle que ayuda a buscar el teléfono.",
    },
    {
      heading: "Comprende",
      body:
        "`J’ai besoin d’aide` comunica inmediatamente la intención. Después debes decir **qué ocurre**, no toda la historia.\n\n`Je ne trouve pas…`, `j’ai perdu…`, `je me sens…` o `je dois…` presentan necesidades diferentes.\n\n`Juste pour confirmer…` evita salir con una instrucción mal entendida. En una urgencia, confirmar es parte de resolver el problema.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Excusez-moi.` — disculpe / perdón.\n- `J’ai besoin d’aide.` — necesito ayuda.\n- `C’est urgent.` — es urgente.\n- `Je ne trouve pas…` — no encuentro…\n- `J’ai perdu…` — perdí…\n- `Je me sens mal.` — me siento mal.\n- `Je dois aller à…` — tengo que ir a…\n- `Vous pouvez m’aider ?` — ¿puede ayudarme?\n- `Où est… ?` — ¿dónde está…?\n- `Juste pour confirmer…` — solo para confirmar…\n\n> **Regla práctica:** añade primero la información que cambia lo que la otra persona debe hacer.",
    },
    {
      heading: "Construye tu mensaje",
      body:
        "Elige una necesidad realista y completa:\n\n1. Atención: `Excusez-moi, __________.`\n2. Necesidad: `J’ai besoin de __________.`\n3. Dato esencial: `Je suis / Je dois / Je ne trouve pas __________.`\n4. Acción: `Vous pouvez __________ ?`\n5. Confirmación: `Juste pour confirmer, __________ ?`\n\n> **Resultado esperado:** un mensaje que otra persona pueda comprender en la primera escucha.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la frase que comunica primero la información útil para resolver la situación.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Piensa en la urgencia más probable para ti: salud, documentos, transporte, ubicación, tiempo, teléfono o dinero.\n\n> **Tu tarea:** crea una solicitud utilizando cuatro pasos y dilo en menos de 30 segundos.\n\n> **Resultado esperado:** una persona que no conoce tu situación puede identificar qué necesitas y qué puede hacer.",
    },
    {
      heading: "Reto bajo presión",
      body:
        "Repite el mensaje sin leer y con una sola respiración entre cada paso. Si olvidas una palabra, utiliza una descripción sencilla en lugar de detenerte.\n\nEjemplo: si olvidas `chargeur`, puedes decir `l’objet pour charger mon téléphone`.",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca lo que ya puedes resolver. La meta final es comunicar lo esencial aun cuando no recuerdes todas las palabras.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes pedir ayuda inmediata. En **Je dois expliquer le problème**, aprenderás a dar contexto, explicar lo que ya intentaste y pedir una solución específica.",
    },
  ],
  practice: [
    {
      prompt: "Necesitas encontrar una farmacia ahora:",
      options: ["J’aime beaucoup cette ville.", "Excusez-moi, c’est urgent. Où est la pharmacie la plus proche ?"],
      answer: "Excusez-moi, c’est urgent. Où est la pharmacie la plus proche ?",
      explanation: "La segunda opción comunica urgencia, necesidad y acción concreta.",
    },
    {
      prompt: "No encuentras tu pasaporte:",
      options: ["Je ne trouve pas mon passeport.", "Je suis un passeport."],
      answer: "Je ne trouve pas mon passeport.",
      explanation: "Je ne trouve pas… expresa que no puedes localizar un objeto.",
    },
    {
      prompt: "Quieres comprobar que entendiste el lugar:",
      options: ["Juste pour confirmer : c’est au premier étage ?", "Pourquoi vous parlez français ?"],
      answer: "Juste pour confirmer : c’est au premier étage ?",
      explanation: "La confirmación repite el dato que necesitas para actuar correctamente.",
    },
  ],
  checkpoints: [
    "Puedo decir que necesito ayuda y nombrar el problema.",
    "Puedo pedir una acción y confirmar la respuesta.",
    "Puedo comunicar una urgencia en menos de 30 segundos sin leer.",
  ],
};

const explainProblem: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Urgencias",
  sequence: 6,
  nextLessonId: "fra-music-parler-dune-chanson-v1",
  title: "Je dois expliquer le problème",
  description:
    "Explica qué ocurrió, cuál es la consecuencia actual y qué solución necesitas sin perderte en detalles.",
  learningObjective:
    "Presentar un problema en orden, mencionar lo que ya intentaste y pedir una acción concreta.",
  expectedOutcome: "Una explicación funcional de 40–60 segundos en francés.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "La otra persona sabe que necesitas ayuda, pero todavía no comprende el problema. Si cuentas todos los detalles al mismo tiempo, la información importante puede desaparecer.\n\n> **Tu misión:** explicar el problema en cuatro capas: qué pasó, qué sucede ahora, qué intentaste y qué necesitas.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a construir una explicación que permita tomar una decisión. Cada frase tendrá una función distinta y visible.",
    },
    {
      heading: "Observa",
      body:
        "Identifica las cuatro capas en esta conversación.\n\n> `— Il y a un problème avec ma réservation.`\n\n> `— Qu’est-ce qui s’est passé ?`\n\n> `— J’ai réservé deux nuits, mais le système montre seulement une nuit.`\n\n> `— Vous avez déjà vérifié la confirmation ?`\n\n> `— Oui, j’ai déjà vérifié l’e-mail. La réservation indique bien deux nuits.`\n\n> `— D’accord.`\n\n> `— J’ai besoin de savoir si vous pouvez corriger la réservation aujourd’hui.`\n\n> **Hazlo ahora:** localiza el contraste y la solicitud final.",
    },
    {
      heading: "Comprende",
      body:
        "`Il y a un problème avec…` anuncia el tema. `J’ai…, mais…` muestra la diferencia entre lo esperado y la realidad.\n\n`J’ai déjà essayé de…` evita que te propongan inmediatamente algo que ya hiciste.\n\nLa explicación termina con `J’ai besoin de…` o `Vous pouvez… ?` para convertir la información en una acción posible.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Il y a un problème avec…` — hay un problema con…\n- `Ce qui s’est passé, c’est que…` — lo que ocurrió es que…\n- `Je devais…, mais…` — debía…, pero…\n- `Maintenant…` — ahora…\n- `J’ai déjà essayé de…` — ya intenté…\n- `Le problème continue.` — el problema continúa.\n- `J’ai besoin de…` — necesito…\n- `Vous pouvez vérifier / corriger / confirmer… ?` — ¿puede revisar / corregir / confirmar…?\n\n> **Regla práctica:** termina siempre con la acción que necesitas, no solamente con la descripción del problema.",
    },
    {
      heading: "Ordena la explicación",
      body:
        "Completa las cuatro capas:\n\n1. Problema: `Il y a un problème avec __________.`\n2. Diferencia: `Je devais __________, mais __________.`\n3. Intento: `J’ai déjà essayé de __________.`\n4. Necesidad: `J’ai besoin de __________.`\n\n> **Resultado esperado:** cuatro frases donde cada una añade información nueva.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la frase que ocupa correctamente cada función dentro de la explicación.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Elige un problema plausible para ti: una reserva incorrecta, un pago rechazado, una entrega tardía, un objeto que no funciona o una instrucción contradictoria.\n\n> **Tu tarea:** explica qué ocurrió, la consecuencia, lo que intentaste y la solución que necesitas.\n\n> **Resultado esperado:** una explicación de 40–60 segundos que permita responder con una acción concreta.",
    },
    {
      heading: "Repara la comprensión",
      body:
        "Si la otra persona entiende algo diferente, no repitas exactamente la misma frase. Utiliza:\n\n- `Ce que je veux dire, c’est que…`\n- `Non, le problème n’est pas…, c’est…`\n- `Je vais reformuler.`\n- `Juste pour vérifier que nous sommes d’accord…`",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca lo que ya puedes demostrar. El último nivel implica adaptar la explicación cuando aparece un malentendido.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes presentarte, conversar y resolver una necesidad. La siguiente lección, **Ce que j’aime faire**, llevará el francés a tus intereses y a tu tiempo libre.",
    },
  ],
  practice: [
    {
      prompt: "La frase que anuncia el problema:",
      options: ["Il y a un problème avec ma réservation.", "J’ai déjà vérifié mon e-mail."],
      answer: "Il y a un problème avec ma réservation.",
      explanation: "Il y a un problème avec… permite identificar inmediatamente el tema.",
    },
    {
      prompt: "La frase que explica un intento anterior:",
      options: ["J’ai déjà redémarré l’appareil.", "Vous pouvez remplacer l’appareil ?"],
      answer: "J’ai déjà redémarré l’appareil.",
      explanation: "J’ai déjà… informa qué acción intentaste antes de pedir ayuda.",
    },
    {
      prompt: "La frase que convierte la explicación en una solicitud:",
      options: ["Le problème continue.", "Vous pouvez vérifier le paiement ?"],
      answer: "Vous pouvez vérifier le paiement ?",
      explanation: "La pregunta final pide una acción específica que puede resolver el problema.",
    },
  ],
  checkpoints: [
    "Puedo explicar la diferencia entre lo esperado y lo ocurrido.",
    "Puedo mencionar lo que ya intenté y pedir una solución.",
    "Puedo explicar el problema y reformular si no me comprenden.",
  ],
};

export const spanishFrenchUrgencyLessons = {
  "fra-travel-demander-un-renseignement-v1": askForHelp,
  "fra-work-clarifier-une-demande-v1": explainProblem,
};
