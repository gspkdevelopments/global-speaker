import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/ui";
import { polyglotArticles, polyglotTopics } from "@/content/polyglot";
import { getInterfaceLocale } from "@/lib/interface-locale-server";
import { pickLocaleCopy, type WithEnglish } from "@/lib/locale-copy";

type PolyglotPageCopy = {
  metaTitle: string; metaDescription: string;
  eyebrow: string; title: string; copy: string; note: string;
  allArticlesEyebrow: string; allArticlesTitle: string; allArticlesIntro: string;
};

const pageCopy: WithEnglish<PolyglotPageCopy> = {
  en: { metaTitle: "Polyglot — Language Community & Culture", metaDescription: "Articles on how polyglots learn, language transfer, multilingual identity, personal methods, and the communities that keep languages alive.", eyebrow: "Polyglot", title: "Beyond one language, into a hub.", copy: "Global Speaker is a place to learn English, French, and Spanish — and a wider conversation about what it means to live between languages.", note: "Stories · Learning science · Transfer · Culture · Community", allArticlesEyebrow: "All articles", allArticlesTitle: "Follow a question.", allArticlesIntro: "Short editorial pieces, separate from the structured curriculum." },
  es: { metaTitle: "Polyglot — Comunidad e Idioma", metaDescription: "Artículos sobre cómo aprenden los políglotas, transferencia entre idiomas, identidad multilingüe, métodos personales y las comunidades que mantienen vivos los idiomas.", eyebrow: "Polyglot", title: "Más allá de un idioma, hacia un hub.", copy: "Global Speaker es un lugar para aprender inglés, francés y español — y una conversación más amplia sobre qué significa vivir entre idiomas.", note: "Historias · Ciencia del aprendizaje · Transferencia · Cultura · Comunidad", allArticlesEyebrow: "Todos los artículos", allArticlesTitle: "Sigue una pregunta.", allArticlesIntro: "Piezas editoriales cortas, separadas del currículo estructurado." },
  fr: { metaTitle: "Polyglot — Communauté linguistique et culture", metaDescription: "Articles sur la façon dont les polyglottes apprennent, le transfert linguistique, l'identité multilingue, les méthodes personnelles et les communautés qui font vivre les langues.", eyebrow: "Polyglot", title: "Au-delà d'une langue, vers un hub.", copy: "Global Speaker est un lieu pour apprendre l'anglais, le français et l'espagnol — et une conversation plus large sur ce que signifie vivre entre plusieurs langues.", note: "Histoires · Science de l'apprentissage · Transfert · Culture · Communauté", allArticlesEyebrow: "Tous les articles", allArticlesTitle: "Suivez une question.", allArticlesIntro: "De courts textes éditoriaux, distincts du programme structuré." },
  de: { metaTitle: "Polyglot — Sprachgemeinschaft & Kultur", metaDescription: "Artikel darüber, wie Polyglotte lernen, Sprachtransfer, mehrsprachige Identität, persönliche Methoden und die Gemeinschaften, die Sprachen lebendig halten.", eyebrow: "Polyglot", title: "Über eine Sprache hinaus, hin zu einem Hub.", copy: "Global Speaker ist ein Ort, um Englisch, Französisch und Spanisch zu lernen — und ein breiteres Gespräch darüber, was es bedeutet, zwischen Sprachen zu leben.", note: "Geschichten · Lernwissenschaft · Transfer · Kultur · Gemeinschaft", allArticlesEyebrow: "Alle Artikel", allArticlesTitle: "Folge einer Frage.", allArticlesIntro: "Kurze redaktionelle Beiträge, getrennt vom strukturierten Lehrplan." },
  it: { metaTitle: "Polyglot — Comunità linguistica e cultura", metaDescription: "Articoli su come imparano i poliglotti, il transfer linguistico, l'identità multilingue, i metodi personali e le comunità che tengono vive le lingue.", eyebrow: "Polyglot", title: "Oltre una lingua, verso un hub.", copy: "Global Speaker è un luogo per imparare inglese, francese e spagnolo — e una conversazione più ampia su cosa significhi vivere tra più lingue.", note: "Storie · Scienza dell'apprendimento · Transfer · Cultura · Comunità", allArticlesEyebrow: "Tutti gli articoli", allArticlesTitle: "Segui una domanda.", allArticlesIntro: "Brevi pezzi editoriali, separati dal percorso strutturato." },
  pt: { metaTitle: "Polyglot — Comunidade e Cultura Linguística", metaDescription: "Artigos sobre como os poliglotas aprendem, transferência entre idiomas, identidade multilíngue, métodos pessoais e as comunidades que mantêm os idiomas vivos.", eyebrow: "Polyglot", title: "Além de um idioma, rumo a um hub.", copy: "Global Speaker é um lugar para aprender inglês, francês e espanhol — e uma conversa mais ampla sobre o que significa viver entre idiomas.", note: "Histórias · Ciência da aprendizagem · Transferência · Cultura · Comunidade", allArticlesEyebrow: "Todos os artigos", allArticlesTitle: "Siga uma pergunta.", allArticlesIntro: "Textos editoriais curtos, separados do currículo estruturado." },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getInterfaceLocale();
  const t = pickLocaleCopy(pageCopy, locale);
  return { title: t.metaTitle, description: t.metaDescription, alternates: { canonical: "/polyglot" } };
}

export default async function PolyglotIndexPage() {
  const locale = await getInterfaceLocale();
  const t = pickLocaleCopy(pageCopy, locale);
  return (
    <>
      <PageIntro
        eyebrow={t.eyebrow}
        title={t.title}
        copy={t.copy}
        note={t.note}
      />
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow={t.allArticlesEyebrow} title={t.allArticlesTitle} intro={t.allArticlesIntro} />
          <div className="resource-grid resource-grid--preview">
            {polyglotArticles.map((article) => {
              const topicLabel = polyglotTopics.find((t) => t.key === article.topic)?.label ?? article.topic;
              return (
                <Link className="resource-card" key={article.slug} href={`/polyglot/${article.slug}`}>
                  <p className="eyebrow">{topicLabel} · {article.readingMinutes} min</p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
