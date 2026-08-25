import type { LocalizedCurriculumLessonOverride } from "@/lib/curriculum-types";

const talkAboutInterests: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Ocio e intereses",
  sequence: 7,
  nextLessonId: "fra-travel-recommander-un-endroit-v1",
  title: "Ce que j’aime faire",
  description:
    "Habla de tus aficiones como parte de tu identidad: qué haces, desde cuándo, con qué frecuencia y por qué importa para ti.",
  learningObjective:
    "Describir dos intereses personales y explicar la experiencia o sensación que te producen.",
  expectedOutcome: "Una presentación de tus intereses de aproximadamente un minuto.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Alguien te pregunta qué haces en tu tiempo libre. Decir únicamente `J’aime la musique` cierra rápidamente el tema. Vas a añadir detalles que permiten encontrar conexiones reales.\n\n> **Tu misión:** hablar de dos intereses y explicar qué lugar ocupan en tu vida.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a combinar actividad, frecuencia, duración y significado personal. No necesitas impresionar: necesitas compartir información que la otra persona pueda retomar.",
    },
    {
      heading: "Observa",
      body:
        "Localiza la actividad, la frecuencia, el comienzo y la razón personal.\n\n> `Pendant mon temps libre, j’aime faire de la photographie.`\n\n> `Je prends souvent des photos quand je me promène.`\n\n> `Je m’intéresse à la photographie depuis trois ans.`\n\n> `Ce que j’aime surtout, c’est observer des détails que les autres ne voient pas toujours.`\n\n> `Ça me permet de ralentir et d’être plus attentive.`\n\n> **Hazlo ahora:** identifica qué frase explica por qué esta afición importa.",
    },
    {
      heading: "Comprende",
      body:
        "`J’aime…` nombra una preferencia. `Je m’intéresse à…` presenta un interés que exploras o desarrollas.\n\n`Depuis…` conecta el comienzo con el presente. `Souvent`, `parfois`, `tous les week-ends` o `quand j’ai le temps` muestran frecuencia.\n\n`Ça me permet de…` explica el valor personal de la actividad y abre una conversación más profunda.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Pendant mon temps libre…` — durante mi tiempo libre…\n- `J’aime…` — me gusta…\n- `Je m’intéresse à…` — me interesa…\n- `Je fais… depuis…` — hago… desde hace…\n- `Souvent / parfois / rarement…` — frecuentemente / a veces / rara vez…\n- `Quand j’ai le temps…` — cuando tengo tiempo…\n- `Ce que j’aime surtout, c’est…` — lo que más me gusta es…\n- `Ça me permet de…` — eso me permite…\n- `Ça me fait sentir…` — eso me hace sentir…\n\n> **Objetivo de esta sección:** combina una actividad con una razón que solo pueda venir de tu experiencia.",
    },
    {
      heading: "Construye tus intereses",
      body:
        "Prepara dos intereses con estructuras diferentes:\n\n**Interés 1**\n`J’aime __________.`\n`Je le fais __________.`\n`Ça me permet de __________.`\n\n**Interés 2**\n`Je m’intéresse à __________ depuis __________.`\n`Ce que j’aime surtout, c’est __________.`\n\n> **Resultado esperado:** dos descripciones que ofrecen puntos claros para continuar la conversación.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la expresión que comunica correctamente duración, frecuencia o significado personal.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Elige intereses auténticos, aunque sean sencillos: escuchar música, cocinar, caminar, leer, jugar, aprender, cuidar plantas, ver películas o pasar tiempo con alguien.\n\n> **Tu tarea:** describe dos intereses y explica por qué uno de ellos es importante para ti.\n\n> **Resultado esperado:** una intervención de aproximadamente un minuto que pueda iniciar una conversación real.",
    },
    {
      heading: "Conecta con otra persona",
      body:
        "Termina con una pregunta que corresponda a lo que compartiste:\n\n- `Et toi, qu’est-ce que tu aimes faire ?`\n- `Tu fais ça depuis longtemps ?`\n- `Qu’est-ce que tu aimes surtout dans cette activité ?`\n- `Tu préfères le faire seul(e) ou avec d’autres personnes ?`",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca lo que ya puedes demostrar. La meta final consiste en hablar desde tu experiencia y dejar una puerta abierta a la conversación.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes compartir tus intereses. La última lección base, **Proposer, inviter et répondre**, convertirá un interés común en una actividad compartida.",
    },
  ],
  practice: [
    {
      prompt: "Expresar una actividad que comenzó hace tres años y continúa:",
      options: ["Je fais de la photographie depuis trois ans.", "J’ai fait de la photographie dans trois ans."],
      answer: "Je fais de la photographie depuis trois ans.",
      explanation: "Depuis conecta un comienzo pasado con una actividad que continúa en el presente.",
    },
    {
      prompt: "Expresar frecuencia:",
      options: ["Je cuisine souvent le week-end.", "Je cuisine parce que le week-end."],
      answer: "Je cuisine souvent le week-end.",
      explanation: "Souvent indica con qué frecuencia realizas la actividad.",
    },
    {
      prompt: "Explicar el valor personal de una afición:",
      options: ["Ça me permet de me détendre.", "C’est une activité."],
      answer: "Ça me permet de me détendre.",
      explanation: "Ça me permet de… muestra qué aporta la actividad a tu vida.",
    },
  ],
  checkpoints: [
    "Puedo nombrar dos actividades que disfruto.",
    "Puedo explicar frecuencia, duración y una razón personal.",
    "Puedo hablar un minuto sobre mis intereses y formular una pregunta.",
  ],
};

const inviteAndRespond: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Ocio e intereses",
  sequence: 8,
  title: "Proposer, inviter et répondre",
  description:
    "Utiliza un interés compartido para proponer una actividad, acordar detalles y responder con naturalidad.",
  learningObjective:
    "Proponer una actividad, aceptar o rechazar con consideración y cerrar un plan concreto.",
  expectedOutcome: "Un diálogo de 6–8 turnos que termina con un plan o una alternativa.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Descubres que otra persona comparte uno de tus intereses. Quieres proponer algo sin sonar demasiado brusco y necesitas saber responder si el momento no funciona.\n\n> **Tu misión:** transformar un interés común en una invitación clara y llegar a un plan o una alternativa.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a conectar cuatro movimientos: referencia al interés compartido, propuesta, respuesta y acuerdo de detalles.",
    },
    {
      heading: "Observa",
      body:
        "Observa cómo la propuesta nace de una conversación anterior y cómo el rechazo mantiene abierta la relación.\n\n> `— Tu as dit que tu aimais la photographie. Ça te dit d’aller au marché samedi matin ?`\n\n> `— Oui, avec plaisir ! À quelle heure ?`\n\n> `— On pourrait se retrouver vers dix heures.`\n\n> `— Samedi, je ne peux pas. Mais dimanche matin, je suis libre.`\n\n> `— Dimanche, ça marche pour moi.`\n\n> `— Parfait. On se retrouve devant l’entrée principale ?`\n\n> `— D’accord, à dimanche !`\n\n> **Hazlo ahora:** localiza la invitación, el rechazo y la alternativa.",
    },
    {
      heading: "Comprende",
      body:
        "`Ça te dit de… ?` es una propuesta informal. `On pourrait…` presenta una posibilidad y deja espacio para negociar.\n\n`Je ne peux pas` rechaza el momento, no necesariamente la relación. Añadir `mais…` y una alternativa muestra interés real.\n\nUn plan queda cerrado cuando ambas personas confirman actividad, día, hora y lugar necesarios.",
    },
    {
      heading: "Tus herramientas",
      body:
        "**Proponer**\n- `Ça te dit de… ?` — ¿te apetece…?\n- `On pourrait…` — podríamos…\n- `Tu veux… ?` — ¿quieres…?\n\n**Responder**\n- `Oui, avec plaisir !` — sí, con gusto.\n- `Bonne idée !` — ¡buena idea!\n- `Je ne peux pas…, mais…` — no puedo…, pero…\n- `Peut-être une autre fois.` — quizá en otra ocasión.\n\n**Cerrar el plan**\n- `À quelle heure ?` — ¿a qué hora?\n- `On se retrouve où ?` — ¿dónde nos encontramos?\n- `Ça marche pour moi.` — me funciona.\n- `D’accord, à… !` — de acuerdo, nos vemos…",
    },
    {
      heading: "Construye la invitación",
      body:
        "Elige uno de tus intereses y completa:\n\n1. Conexión: `Tu as dit que tu aimais __________.`\n2. Propuesta: `Ça te dit de __________ ?`\n3. Momento: `On pourrait __________.`\n4. Confirmación: `On se retrouve __________ ?`\n\nDespués prepara dos respuestas: una aceptación y un rechazo con alternativa.\n\n> **Resultado esperado:** puedes desempeñar cualquiera de los dos lados de la conversación.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la respuesta que mantiene clara la intención y ayuda a cerrar el plan.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Piensa en una actividad que realmente aceptarías: tomar un café, caminar, escuchar música, cocinar, visitar un lugar, practicar el idioma o asistir a un evento.\n\n> **Tu tarea:** crea un diálogo de 6–8 turnos. Incluye una dificultad de horario y resuélvela mediante una alternativa.\n\n> **Resultado esperado:** el diálogo termina con un plan concreto o con una despedida amable que preserva la relación.",
    },
    {
      heading: "Reto en la vida real",
      body:
        "Utiliza una de estas estructuras para hacer una propuesta verdadera a alguien, incluso si la conversación ocurre primero por mensaje. Observa qué información necesitas negociar para convertir la idea en un plan.",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca lo que ya puedes hacer. Completar esta lección significa poder conectar tu mundo personal con otra persona mediante el francés.",
    },
    {
      heading: "Tu base está construida",
      body:
        "Has completado el recorrido base de Global Speaker:\n\n1. Decir quién eres.\n2. Contar de dónde vienes.\n3. Describir tu personalidad.\n4. Conocer a otra persona.\n5. Pedir ayuda.\n6. Explicar un problema.\n7. Compartir tus intereses.\n8. Convertir un interés en interacción.\n\nTu Mapa de Idioma puede utilizar ahora estas capacidades para decidir qué entorno, necesidad o interés debes desarrollar después.",
    },
  ],
  practice: [
    {
      prompt: "Aceptar una invitación y pedir un detalle:",
      options: ["Oui, avec plaisir ! À quelle heure ?", "Je suis une heure."],
      answer: "Oui, avec plaisir ! À quelle heure ?",
      explanation: "La respuesta acepta claramente y pregunta el dato necesario para continuar.",
    },
    {
      prompt: "No puedes el sábado, pero quieres mantener la invitación:",
      options: ["Non.", "Samedi, je ne peux pas, mais dimanche je suis libre."],
      answer: "Samedi, je ne peux pas, mais dimanche je suis libre.",
      explanation: "La alternativa muestra que el problema es el horario, no la intención de compartir la actividad.",
    },
    {
      prompt: "Confirmar que el plan te funciona:",
      options: ["Ça marche pour moi.", "Ça marche sur moi."],
      answer: "Ça marche pour moi.",
      explanation: "Ça marche pour moi confirma que la propuesta o el horario te funciona.",
    },
  ],
  checkpoints: [
    "Puedo proponer una actividad relacionada con un interés.",
    "Puedo aceptar o rechazar ofreciendo una alternativa.",
    "Puedo sostener 6–8 turnos y cerrar un plan concreto.",
  ],
};

export const spanishFrenchLeisureLessons = {
  "fra-music-parler-dune-chanson-v1": talkAboutInterests,
  "fra-travel-recommander-un-endroit-v1": inviteAndRespond,
};
