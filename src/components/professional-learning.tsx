import Link from "next/link";
import type { Lesson, LearningModule, ProfessionalPath } from "@/content/professional";
import { ButtonLink, SectionHeading } from "@/components/ui";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Global Speaker</Link>{items.map((item) => <span key={item.label}><i aria-hidden="true">→</i>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function ProfessionalPathCard({ path, index }: { path: ProfessionalPath; index: number }) {
  const lessonCount = path.modules.reduce((count, module) => count + module.lessons.length, 0);
  return <Link className="professional-card" href={`/professional/${path.slug}`}><div><span>{String(index + 1).padStart(2, "0")}</span><i>{path.shortCode}</i></div><h3>{path.title}</h3><p>{path.communicationNeeds.join(" · ")}<br /><small>{lessonCount ? `${lessonCount} ${lessonCount === 1 ? "lesson" : "lessons"} available` : "Learning path in development"}</small></p><b aria-hidden="true">↗</b></Link>;
}

export function ModuleList({ path }: { path: ProfessionalPath }) {
  return <div className="module-list">{path.modules.map((module) => <article className="module-row" key={module.slug}><div className="module-row__number">{String(module.number).padStart(2, "0")}</div><div><h3>{module.title}</h3><p>{module.description}</p><span className="module-row__goal">Goal · {module.communicationGoal}</span>{module.lessons.length ? <div className="lesson-links">{module.lessons.map((lesson) => <Link href={`/professional/${path.slug}/${lesson.slug}`} key={lesson.id}><span>Lesson</span>{lesson.title}<b aria-hidden="true">↗</b></Link>)}</div> : <p className="module-status">Coming soon</p>}</div></article>)}</div>;
}

export function PracticeTeacherCTA() {
  return <section className="learning-teacher"><div><p className="eyebrow">Practice this with a teacher</p><h2>Turn the situation into a real conversation.</h2><p>Remote sessions are available worldwide. In-person sessions are available in Tulum when applicable.</p></div><div className="learning-teacher__actions"><ButtonLink href="/language-map">Build your Language Map</ButtonLink><ButtonLink href="/about" variant="text">Learn about Global Speaker</ButtonLink></div></section>;
}

function LessonSection({ section, index }: { section: { title: string; body: string; examples?: string[] }; index: number }) {
  return <section className="lesson-section"><span className="article-section-number">0{index + 1}</span><h2>{section.title}</h2><p>{section.body}</p>{section.examples ? <div className="example-list">{section.examples.map((example) => <p key={example}>{example}</p>)}</div> : null}</section>;
}

export function LessonRenderer({ lesson, path, module, previous, next }: { lesson: Lesson; path: ProfessionalPath; module: LearningModule; previous?: Lesson; next?: Lesson }) {
  return <>
    <header className="lesson-header"><div className="container"><Breadcrumbs items={[{ label: "Professional", href: "/professional" }, { label: path.title, href: `/professional/${path.slug}` }, { label: lesson.title }]} /><div className="lesson-header__grid"><div><p className="eyebrow">{path.shortCode} · Module {String(module.number).padStart(2, "0")}</p><h1>{lesson.title}</h1><p className="lesson-header__subtitle">{lesson.description}</p></div><dl className="lesson-meta"><div><dt>Language</dt><dd>{lesson.language === "english" ? "English" : lesson.language}</dd></div><div><dt>Level</dt><dd>{lesson.level ?? "Open level"}</dd></div><div><dt>Study time</dt><dd>{lesson.estimatedMinutes ? `${lesson.estimatedMinutes} minutes` : "Self-paced"}</dd></div></dl></div></div></header>
    <main className="lesson-layout"><div className="container lesson-layout__grid"><aside className="lesson-rail"><span>In this lesson</span><a href="#goal">Communication goal</a><a href="#language">Useful language</a><a href="#scenario">Real scenario</a><a href="#practice">Practice</a><a href="#your-turn">Your turn</a></aside><article className="lesson-content"><section className="lesson-goal" id="goal"><p className="eyebrow">Communication goal</p><p>{lesson.communicationGoal}</p></section>{lesson.vocabulary ? <section id="language" className="lesson-section"><span className="article-section-number">01</span><h2>Useful language</h2><div className="vocabulary-grid">{lesson.vocabulary.map((item) => <div key={item.term}><strong>{item.term}</strong><span>{item.meaning}</span></div>)}</div></section> : null}{lesson.phrases ? <section id={lesson.vocabulary ? undefined : "language"} className="lesson-section"><span className="article-section-number">{lesson.vocabulary ? "02" : "01"}</span><h2>{lesson.vocabulary ? "Useful phrases" : "Useful language"}</h2><div className="phrase-list">{lesson.phrases.map((phrase) => <div key={phrase.text}><p>{phrase.text}</p>{phrase.note ? <span>{phrase.note}</span> : null}</div>)}</div></section> : null}{lesson.explanation?.map((section, index) => <LessonSection index={index + (lesson.vocabulary ? 2 : 1)} key={section.title} section={section} />)}{lesson.scenario ? <section className="lesson-scenario" id="scenario"><p className="eyebrow">Real scenario</p><h2>{lesson.scenario.setting}</h2><p><strong>Your role:</strong> {lesson.scenario.role}</p><p><strong>What is happening:</strong> {lesson.scenario.situation}</p></section> : null}{lesson.practice ? <section className="lesson-section" id="practice"><span className="article-section-number">06</span><h2>Practice</h2><div className="practice-list">{lesson.practice.map((item, index) => <div key={item.prompt}><span>{String(index + 1).padStart(2, "0")} · {item.type}</span><p>{item.prompt}</p>{item.answer ? <details><summary>Check one possible answer</summary><p>{item.answer}</p></details> : null}</div>)}</div></section> : null}{lesson.yourTurn ? <section className="your-turn" id="your-turn"><p className="eyebrow">Your turn</p><p>{lesson.yourTurn.prompt}</p><span>{lesson.yourTurn.guidance}</span></section> : null}<LessonNavigation path={path} previous={previous} next={next} /></article></div></main><PracticeTeacherCTA /></>;
}

function LessonNavigation({ path, previous, next }: { path: ProfessionalPath; previous?: Lesson; next?: Lesson }) {
  return <nav className="lesson-navigation" aria-label="Lesson navigation"><div>{previous ? <Link href={`/professional/${path.slug}/${previous.slug}`}><span>Previous</span>{previous.title}</Link> : <span className="lesson-navigation__empty">Start of path</span>}</div><Link className="lesson-navigation__overview" href={`/professional/${path.slug}`}>Path overview</Link><div>{next ? <Link href={`/professional/${path.slug}/${next.slug}`}><span>Next</span>{next.title}</Link> : <Link href={`/professional/${path.slug}`}><span>Continue</span>Explore the path</Link>}</div></nav>;
}

export function LearningHeader({ title, intro, eyebrow }: { title: string; intro: string; eyebrow: string }) {
  return <div className="container"><SectionHeading eyebrow={eyebrow} title={title} intro={intro} /></div>;
}
