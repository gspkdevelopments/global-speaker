import type { LocalizedCurriculumLessonOverride } from "@/lib/curriculum-types";

const describePersonality: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Personalidad",
  sequence: 3,
  nextLessonId: "fra-people-faire-durer-une-conversation-v1",
  title: "Comment je me décris vraiment",
  description:
    "Describe tu personalidad sin reducirte a una lista de adjetivos: añade matices, situaciones y un ejemplo real.",
  learningObjective:
    "Explicar tres rasgos de tu personalidad y demostrar al menos uno mediante una situación concreta.",
  expectedOutcome: "Una descripción personal de 45 segundos con matices y un ejemplo.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Alguien te pregunta cómo eres. Una respuesta como `Je suis sympathique` es correcta, pero todavía no permite conocerte. Vas a mostrar cómo se expresa ese rasgo en tu vida.\n\n> **Tu misión:** describirte con precisión sin hablar como si tu personalidad fuera absoluta o idéntica en toda situación.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a elegir tres rasgos, matizarlos con expresiones como `plutôt`, `parfois` o `ça dépend`, y justificar uno con un ejemplo introducido por `par exemple` o `quand…`.",
    },
    {
      heading: "Observa",
      body:
        "Compara la primera respuesta con la segunda y observa cuál permite conocer mejor a la persona.\n\n> `Je suis calme, curieuse et responsable.`\n\n> `Je dirais que je suis plutôt calme. Au début, je peux être réservée, mais avec mes amis je parle beaucoup. Je suis aussi curieuse : quand un sujet m’intéresse, j’ai tendance à chercher beaucoup d’informations.`\n\n> **Hazlo ahora:** localiza un matiz, un contraste y un ejemplo.",
    },
    {
      heading: "Comprende",
      body:
        "`Je suis…` afirma un rasgo. `Je suis plutôt…` lo presenta como una tendencia. `Je peux être…` reconoce que el rasgo aparece en ciertas situaciones.\n\n`Mais`, `parfois` y `ça dépend` evitan descripciones demasiado rígidas.\n\nLa frase que realmente demuestra la personalidad suele comenzar con `quand…`, `par exemple…` o `avec…` porque conecta el adjetivo con una conducta observable.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Je dirais que je suis…` — diría que soy…\n- `Je suis plutôt…` — soy más bien…\n- `Je peux être…` — puedo ser / estar…\n- `Parfois, je suis…` — a veces soy / estoy…\n- `Ça dépend de la situation.` — depende de la situación.\n- `J’ai tendance à…` — tiendo a…\n- `Quand…, je…` — cuando…, yo…\n- `Par exemple…` — por ejemplo…\n\nAdjetivos iniciales: `calme`, `curieux / curieuse`, `sociable`, `réservé(e)`, `patient(e)`, `créatif / créative`, `organisé(e)`, `spontané(e)`.",
    },
    {
      heading: "Hazlo ahora",
      body:
        "Completa tres capas distintas:\n\n1. Un rasgo: `Je dirais que je suis __________.`\n2. Un matiz: `Je suis plutôt __________, mais __________.`\n3. Una prueba: `Quand __________, j’ai tendance à __________.`\n\n> **Resultado esperado:** tres ideas que se complementan sin repetirse.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Elige la opción que produce una descripción más natural, precisa y personal.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Elige tres rasgos que reconozcas en ti. Para uno de ellos, piensa en una situación reciente que pueda demostrarlo.\n\n> **Tu tarea:** descríbete, introduce un contraste y cuenta el ejemplo en una o dos frases.\n\n> **Resultado esperado:** una respuesta de aproximadamente 45 segundos que suene como tú, no como una definición de diccionario.",
    },
    {
      heading: "Escucha tu propia voz",
      body:
        "Di la descripción una vez. Después pregúntate:\n\n- ¿Utilicé tres adjetivos sin explicarlos?\n- ¿Mostré al menos una situación real?\n- ¿Hay un matiz que evita una afirmación demasiado absoluta?\n- ¿Cambiaría alguna palabra para que se parezca más a mi forma de ser?",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca lo que ya puedes demostrar. El último nivel exige una descripción personal, no la repetición del ejemplo.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes hablar de tu personalidad. En **Et toi, comment tu es ?** aprenderás a utilizar esa información para conocer a otra persona y mantener viva la conversación.",
    },
  ],
  practice: [
    {
      prompt: "Una forma matizada de decir que eres reservado/a:",
      options: ["Je suis toujours réservé(e).", "Je suis plutôt réservé(e) au début."],
      answer: "Je suis plutôt réservé(e) au début.",
      explanation: "Plutôt y au début muestran que el rasgo es una tendencia situada, no una verdad absoluta.",
    },
    {
      prompt: "Una frase que demuestra curiosidad:",
      options: ["Je suis curieux / curieuse.", "Quand un sujet m’intéresse, je cherche à en savoir plus."],
      answer: "Quand un sujet m’intéresse, je cherche à en savoir plus.",
      explanation: "La segunda frase convierte el rasgo en una conducta observable.",
    },
    {
      prompt: "Completa el contraste: Je suis calme, ___ je parle beaucoup avec mes amis.",
      options: ["mais", "parce que"],
      answer: "mais",
      explanation: "Mais introduce un contraste entre dos aspectos de tu personalidad.",
    },
  ],
  checkpoints: [
    "Puedo nombrar tres rasgos de mi personalidad.",
    "Puedo matizar una descripción según la situación.",
    "Puedo describirme durante 45 segundos e incluir un ejemplo real.",
  ],
};

const discoverPersonality: LocalizedCurriculumLessonOverride = {
  language: "french",
  pillar: "Personalidad",
  sequence: 4,
  nextLessonId: "fra-travel-demander-un-renseignement-v1",
  title: "Et toi, comment tu es ?",
  description:
    "Convierte una descripción personal en una conversación: pregunta, escucha, reacciona y profundiza.",
  learningObjective:
    "Sostener una conversación de dos minutos sobre personalidad utilizando preguntas y reacciones naturales.",
  expectedOutcome: "Una conversación personal de al menos seis turnos en francés.",
  sections: [
    {
      heading: "Tu situación",
      body:
        "Ya puedes hablar de ti, pero una conversación no puede avanzar si solo recitas tu descripción. Ahora necesitas mostrar curiosidad por la otra persona y reaccionar a lo que realmente dice.\n\n> **Tu misión:** mantener un intercambio de al menos seis turnos sin convertirlo en un interrogatorio.",
    },
    {
      heading: "Tu objetivo",
      body:
        "Vas a alternar cuatro movimientos: compartir algo, hacer una pregunta abierta, reaccionar y formular una pregunta de seguimiento.",
    },
    {
      heading: "Observa",
      body:
        "Observa cómo cada pregunta nace de la respuesta anterior.\n\n> `— Je dirais que je suis assez spontanée. Et toi ?`\n\n> `— Moi, je suis plutôt organisé.`\n\n> `— Ah oui ? Dans quelles situations ?`\n\n> `— Surtout au travail. J’aime savoir ce que je dois faire.`\n\n> `— Je comprends. Et pendant ton temps libre, tu es pareil ?`\n\n> `— Pas vraiment ! Avec mes amis, je suis beaucoup plus spontané.`\n\n> **Hazlo ahora:** identifica una reacción y dos preguntas de seguimiento.",
    },
    {
      heading: "Comprende",
      body:
        "`Et toi ?` devuelve la conversación, pero no basta para profundizar. Una pregunta como `Dans quelles situations ?` pide un ejemplo.\n\nReacciones breves como `Ah oui ?`, `Je comprends`, `Moi aussi` o `Pas vraiment` muestran que escuchaste.\n\nLa conversación se siente natural cuando la siguiente pregunta utiliza una palabra o idea que la otra persona acaba de compartir.",
    },
    {
      heading: "Tus herramientas",
      body:
        "- `Et toi, tu dirais que tu es comment ?` — ¿y tú, cómo dirías que eres?\n- `Dans quelles situations ?` — ¿en qué situaciones?\n- `Qu’est-ce qui te fait dire ça ?` — ¿qué te hace decir eso?\n- `Tu as un exemple ?` — ¿tienes un ejemplo?\n- `Ah oui ?` — ¿ah, sí?\n- `Je comprends.` — entiendo.\n- `Moi aussi.` — yo también.\n- `Pas vraiment.` — no realmente.\n- `Ça dépend.` — depende.\n\n> **Regla práctica:** reacción breve primero; pregunta después.",
    },
    {
      heading: "Construye el intercambio",
      body:
        "Elige un rasgo tuyo y prepara esta secuencia:\n\n1. Comparte: `Je suis plutôt __________.`\n2. Devuelve: `Et toi, __________ ?`\n3. Reacciona: `Ah oui ? / Moi aussi / Je comprends.`\n4. Profundiza: `Dans quelles situations ? / Tu as un exemple ?`\n\n> **Resultado esperado:** cuatro movimientos conectados que pueden iniciar una conversación real.",
    },
    {
      heading: "Comprueba lo aprendido",
      kind: "practice",
      body:
        "Selecciona la respuesta que escucha y hace avanzar la conversación.",
    },
    {
      heading: "Hazlo personal",
      body:
        "Imagina que la otra persona dice: `Je suis très créative, mais parfois un peu désorganisée.`\n\n> **Tu tarea:** responde con una reacción, comparte una conexión personal y formula una pregunta de seguimiento. Después continúa hasta completar seis turnos.\n\n> **Resultado esperado:** una conversación de aproximadamente dos minutos.",
    },
    {
      heading: "Reto de escucha",
      body:
        "En tu próxima conversación, evita preparar la pregunta siguiente mientras la otra persona habla. Escucha una palabra concreta de su respuesta y úsala para construir tu seguimiento.\n\nEjemplo: si dice `au travail`, pregunta `Et au travail, dans quelles situations exactement ?`",
    },
    {
      heading: "Evidencia de avance",
      kind: "progress",
      body:
        "Marca el nivel que ya puedes sostener. La meta final requiere escuchar y adaptar la conversación, no repetir seis preguntas memorizadas.",
    },
    {
      heading: "Continúa",
      body:
        "Ya puedes presentarte, contar parte de tu historia, describirte y conocer a alguien. La siguiente lección, **J’ai besoin d’aide maintenant**, utilizará la misma claridad para una situación de urgencia.",
    },
  ],
  practice: [
    {
      prompt: "— Je suis assez timide au début. — ___",
      options: ["D’accord.", "Ah oui ? Dans quelles situations ?"],
      answer: "Ah oui ? Dans quelles situations ?",
      explanation: "La segunda respuesta reconoce la idea y abre espacio para explicarla.",
    },
    {
      prompt: "— Au travail, je suis très organisé. — ___",
      options: ["Moi aussi. Tu as un exemple ?", "Quel âge as-tu ?"],
      answer: "Moi aussi. Tu as un exemple ?",
      explanation: "La reacción conecta con la respuesta y la pregunta profundiza en el mismo tema.",
    },
    {
      prompt: "Una reacción breve antes de preguntar:",
      options: ["Je comprends.", "Pourquoi est-ce que…"],
      answer: "Je comprends.",
      explanation: "Je comprends muestra escucha; después puedes formular la pregunta completa.",
    },
  ],
  checkpoints: [
    "Puedo devolver una pregunta con Et toi ?",
    "Puedo reaccionar y formular una pregunta de seguimiento.",
    "Puedo sostener seis turnos adaptándome a las respuestas.",
  ],
};

export const spanishFrenchPersonalityLessons = {
  "fra-people-exprimer-une-emotion-v1": describePersonality,
  "fra-people-faire-durer-une-conversation-v1": discoverPersonality,
};
