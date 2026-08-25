import type { Metadata } from "next";
import Image from "next/image";
import { Localized } from "@/components/localized";
import { CTASection, PageIntro, SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "About", description: "Global Speaker grew from self-directed language learning and the idea that language sticks when it connects to real life.", alternates: { canonical: "/about" } };

const values = {
  en: [["Real environments", "Language should return to the places where it will be used."], ["Meaningful situations", "A sentence is easier to keep when there is a reason to say it."], ["Interests", "Curiosity creates attention, repetition, and a personal point of view."], ["Emotion", "Feeling gives language weight and makes memory less mechanical."], ["Identity", "Learning another language should expand who you can be, not erase who you are."], ["Communication", "The point is connection: understanding, responding, and being understood."]],
  es: [["Entornos reales", "El idioma debe volver a los lugares donde realmente se usará."], ["Situaciones con sentido", "Una frase es más fácil de recordar cuando existe una razón para decirla."], ["Intereses", "La curiosidad crea atención, repetición y un punto de vista personal."], ["Emoción", "Sentir le da peso al idioma y vuelve la memoria menos mecánica."], ["Identidad", "Aprender otro idioma debe ampliar quién puedes ser, no borrar quién eres."], ["Comunicación", "El objetivo es conectar: entender, responder y ser entendido."]],
  fr: [["Environnements réels", "La langue doit revenir aux endroits où elle sera réellement utilisée."], ["Situations porteuses de sens", "Une phrase se retient mieux lorsqu'il existe une raison de la dire."], ["Intérêts", "La curiosité crée l'attention, la répétition et un point de vue personnel."], ["Émotion", "Le ressenti donne du poids à la langue et rend la mémoire moins mécanique."], ["Identité", "Apprendre une autre langue doit élargir ce que vous pouvez être, pas effacer qui vous êtes."], ["Communication", "Le but est la connexion : comprendre, répondre et être compris."]],
};

function ValueGrid({ locale }: { locale: keyof typeof values }) { return <div className="values-grid">{values[locale].map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>; }

function FounderPortrait({ locale }: { locale: "en" | "es" | "fr" }) {
  const copy = {
    en: { role: "Founder · Educator · Intercultural builder", place: "Tulum, Mexico · 2026", alt: "Ricardo Aguilar, founder of Global Speaker, outdoors in Tulum" },
    es: { role: "Fundador · Educador · Constructor intercultural", place: "Tulum, México · 2026", alt: "Ricardo Aguilar, fundador de Global Speaker, al aire libre en Tulum" },
    fr: { role: "Fondateur · Éducateur · Bâtisseur interculturel", place: "Tulum, Mexique · 2026", alt: "Ricardo Aguilar, fondateur de Global Speaker, en extérieur à Tulum" },
  }[locale];
  return (
    <figure className="relative m-0 min-h-[380px] overflow-hidden bg-[var(--paper-deep)] md:min-h-[600px]">
      <Image
        src="/founder-ricardo-aguilar.jpg"
        alt={copy.alt}
        fill
        sizes="(max-width: 767px) calc(100vw - 2rem), 33vw"
        quality={90}
        className="object-cover object-center"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent px-5 pb-5 pt-20 text-white">
        <strong className="block text-sm font-bold uppercase tracking-[.13em]">Ricardo Aguilar</strong>
        <span className="mt-1 block text-xs tracking-[.08em]">{copy.role}</span>
        <i className="mt-3 block font-[var(--serif)] text-sm">{copy.place}</i>
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  return <Localized
    en={<><PageIntro eyebrow="About · The human starting point" title="Built by a language learner." copy="Global Speaker began with a simple observation: language becomes easier to remember when it belongs to a place, a feeling, an interest, or something you genuinely want to say." accent="ink" note="Not a corporate origin story" /><section className="section founder-story"><div className="container founder-story__grid"><FounderPortrait locale="en" /><div className="founder-story__copy"><SectionHeading eyebrow="The origin" title="Learning changed when the world became the classroom." /><p>Global Speaker was born from a lived experience: emigrating, working across cultures, and discovering that mastering a language is not only about memorizing words. It is about being able to understand, respond, connect, and build a new life.</p><p>After years using Spanish, English, and French in hospitality, customer service, teaching, and international projects, Ricardo created Global Speaker to turn that lived knowledge into a learning system that is more human, practical, and teachable.</p><blockquote>“The goal is not to sound like a textbook. It is to become more yourself in another language.”</blockquote></div></div></section><section className="section values-section"><div className="container"><SectionHeading eyebrow="What stays central" title="Meaning before machinery." /><ValueGrid locale="en" /></div></section><CTASection eyebrow="Your story is source material" title="What do you want to be able to say?" /></>}
    es={<><PageIntro eyebrow="Acerca de · El punto de partida humano" title="Creado por un estudiante de idiomas." copy="Global Speaker nació de una observación sencilla: el idioma se recuerda mejor cuando pertenece a un lugar, una emoción, un interés o algo que de verdad quieres decir." accent="ink" note="No es una historia corporativa de origen" /><section className="section founder-story"><div className="container founder-story__grid"><FounderPortrait locale="es" /><div className="founder-story__copy"><SectionHeading eyebrow="El origen" title="Aprender cambió cuando el mundo se convirtió en el aula." /><p>Global Speaker nació de una experiencia real: emigrar, trabajar entre culturas y descubrir que dominar un idioma no consiste solamente en memorizar palabras. Consiste en poder entender, responder, conectar y construir una vida nueva.</p><p>Después de años utilizando el español, el inglés y el francés en hospitalidad, atención al cliente, enseñanza y proyectos internacionales, Ricardo creó Global Speaker para convertir ese conocimiento vivido en un sistema de aprendizaje más humano, práctico y enseñable.</p><blockquote>“La meta no es sonar como un libro de texto. Es poder ser más tú mismo en otro idioma.”</blockquote></div></div></section><section className="section values-section"><div className="container"><SectionHeading eyebrow="Lo que permanece en el centro" title="Sentido antes que maquinaria." /><ValueGrid locale="es" /></div></section><CTASection eyebrow="Tu historia es material de aprendizaje" title="¿Qué quieres ser capaz de decir?" /></>}
    fr={<><PageIntro eyebrow="À propos · Le point de départ humain" title="Créé par un apprenant en langues." copy="Global Speaker est né d'une observation simple : une langue se retient mieux lorsqu'elle appartient à un lieu, une émotion, un intérêt ou quelque chose que vous voulez réellement dire." accent="ink" note="Pas une histoire d'origine corporate" /><section className="section founder-story"><div className="container founder-story__grid"><FounderPortrait locale="fr" /><div className="founder-story__copy"><SectionHeading eyebrow="L'origine" title="L'apprentissage a changé lorsque le monde est devenu la salle de classe." /><p>Global Speaker est né d'une expérience vécue : émigrer, travailler entre plusieurs cultures et découvrir que maîtriser une langue ne consiste pas seulement à mémoriser des mots. Il s'agit de pouvoir comprendre, répondre, créer des liens et construire une nouvelle vie.</p><p>Après des années à utiliser l'espagnol, l'anglais et le français dans l'hôtellerie, le service client, l'enseignement et des projets internationaux, Ricardo a créé Global Speaker pour transformer ce savoir vécu en un système d'apprentissage plus humain, pratique et transmissible.</p><blockquote>« Le but n'est pas de sonner comme un manuel. C'est de devenir davantage vous-même dans une autre langue. »</blockquote></div></div></section><section className="section values-section"><div className="container"><SectionHeading eyebrow="Ce qui reste central" title="Le sens avant la mécanique." /><ValueGrid locale="fr" /></div></section><CTASection eyebrow="Votre histoire est une matière d'apprentissage" title="Qu'aimeriez-vous pouvoir dire ?" /></>}
  />;
}
