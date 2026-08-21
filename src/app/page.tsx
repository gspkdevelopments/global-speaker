import Link from "next/link";
import { LanguageCard, ResourceCard } from "@/components/cards";
import { LanguageSelector } from "@/components/language-selector";
import { LifeEnvironmentGrid } from "@/components/life-environment-grid";
import { LanguageMapPreview } from "@/components/language-map-preview";
import { MethodExample, MethodSequence } from "@/components/method-sequence";
import { ButtonLink, CTASection, SectionHeading } from "@/components/ui";
import { languages, professionalPaths } from "@/content/site";
import { resources } from "@/content/resources";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">English · Français · Español</p>
            <h1>Speak more<br />of the <em>world.</em></h1>
            <p className="hero__lede">Learn the language through the life you already live.</p>
            <div className="hero__actions"><ButtonLink href="/language-map">Build your Language Map</ButtonLink><ButtonLink href="/resources" variant="text">Explore free resources</ButtonLink></div>
            <div className="goal-links" aria-label="Reasons for learning"><span>What brings you here?</span>{["Work", "Travel", "Life", "Culture"].map((goal) => <Link key={goal} href={`/language-map?reason=${goal.toLowerCase()}`}>{goal}</Link>)}</div>
          </div>
          <div className="hero__visual" aria-label="Language grows from everyday experience">
            <div className="hero-collage">
              <div className="hero-collage__sun" />
              <div className="hero-collage__window"><span>THE WORLD<br />AROUND YOU</span></div>
              <div className="hero-collage__figure"><i /><b /></div>
              <p><span>01</span> Notice<br /><span>02</span> Connect<br /><span>03</span> Express</p>
              <strong>life → language</strong>
            </div>
          </div>
        </div>
        <div className="container"><LanguageSelector /></div>
      </section>

      <section className="section method-intro">
        <div className="container">
          <SectionHeading eyebrow="The method · 01" title="You already know what you want to say." intro="We help you build the language to say it." />
          <MethodSequence />
          <MethodExample />
          <div className="section-link"><Link href="/method">Explore the full method <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="section life-section">
        <div className="container life-section__heading">
          <SectionHeading eyebrow="Your life · 02" title="Your life is already full of lessons." intro="The words you need are hiding in plain sight — in the places you go, the work you do, and the things that hold your attention." />
          <p className="margin-note">Tap a world to look inside.</p>
        </div>
        <div className="container"><LifeEnvironmentGrid /></div>
      </section>

      <section className="section language-gateway">
        <div className="container">
          <SectionHeading eyebrow="Language gateway · 03" title="Choose your language." intro="One method. Three ways into a wider world." />
          <div className="language-card-grid">{languages.map((language) => <LanguageCard language={language} key={language.key} />)}</div>
        </div>
      </section>

      <section className="section work-section" id="professional">
        <div className="container work-section__layout">
          <div className="work-section__intro">
            <SectionHeading eyebrow="Professional paths · 04" title="Language for the world you work in." intro="Learn the moments that make your work move: the welcome, the question, the explanation, the recovery, the connection." />
            <ButtonLink href="/language-map?reason=work" variant="secondary">Map my work language</ButtonLink>
          </div>
          <div className="professional-list">
            {professionalPaths.map((path, index) => (
              <article className="professional-card" key={path.title}>
                <div><span>{String(index + 1).padStart(2, "0")}</span><i>{path.code}</i></div>
                <h3>{path.title}</h3>
                <p>{path.needs.join(" · ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section map-section">
        <div className="container map-section__grid">
          <div className="map-section__copy">
            <SectionHeading eyebrow="Personal learning · 05" title="Build your Language Map." intro="Generic lessons begin with a textbook. Your map begins with your goals, environments, communication needs, interests, and current ability." />
            <ul><li>What you want to do</li><li>Where language appears</li><li>What keeps you curious</li><li>What would unlock confidence</li></ul>
            <ButtonLink href="/language-map">Create my Language Map</ButtonLink>
          </div>
          <LanguageMapPreview />
        </div>
      </section>

      <section className="section resources-preview">
        <div className="container">
          <div className="resources-preview__heading"><SectionHeading eyebrow="Free resources · 06" title="Follow a question." intro="Small ideas become useful when they attach to something you can see, hear, feel, or do." /><ButtonLink href="/resources" variant="text">Explore all resources</ButtonLink></div>
          <div className="resource-grid resource-grid--preview">{[resources[0], resources[4], resources[7]].map((resource, index) => <ResourceCard resource={resource} index={index} key={resource.slug} />)}</div>
        </div>
      </section>

      <CTASection title="Your curriculum begins with your life." copy="Bring your world — your work, your people, your interests, your questions. We’ll build from there." />
    </>
  );
}
