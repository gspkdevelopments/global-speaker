"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const reasons = ["Work", "Travel", "Living abroad", "Relationships", "Culture", "Personal growth", "Other"];
const challenges = ["Speaking", "Understanding", "Vocabulary", "Grammar", "Pronunciation", "Confidence", "Other"];
const levels = ["Beginner", "Basic", "Intermediate", "Advanced", "Not sure"];

function ChoiceGroup({ legend, name, choices }: { legend: string; name: string; choices: string[] }) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      <div>{choices.map((choice) => <label key={choice}><input type="radio" name={name} value={choice} required /><span>{choice}</span></label>)}</div>
    </fieldset>
  );
}

export function LanguageMapForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="eyebrow">Map started</p>
        <h2>Your life has already given us a direction.</h2>
        <p>This foundation demo keeps your answers in this browser only and does not send personal data. A future CRM or WhatsApp connection can pick up from this exact handoff.</p>
        <div><button type="button" className="button button--primary" onClick={() => setSubmitted(false)}><span>Edit my answers</span><span aria-hidden="true">↺</span></button><Link href="/resources" className="button button--secondary"><span>Explore resources</span><span aria-hidden="true">↗</span></Link></div>
      </div>
    );
  }

  return (
    <form className="language-map-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section__number">01</div>
        <div className="form-section__body">
          <ChoiceGroup legend="What do you want to learn?" name="language" choices={["English", "French", "Spanish"]} />
          <ChoiceGroup legend="Why?" name="reason" choices={reasons} />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">02</div>
        <div className="form-section__body form-fields">
          <label htmlFor="environments">Where do you use or want to use the language?<span>Think about places, people, routines, or moments.</span></label>
          <textarea id="environments" name="environments" rows={4} required placeholder="At work with hotel guests, with friends, when I travel…" />
          <label htmlFor="interests">What interests you?<span>Your interests make new language easier to remember.</span></label>
          <textarea id="interests" name="interests" rows={3} required placeholder="Music, food, films, nature, technology…" />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">03</div>
        <div className="form-section__body">
          <ChoiceGroup legend="What feels hardest right now?" name="challenge" choices={challenges} />
          <ChoiceGroup legend="Current approximate level" name="level" choices={levels} />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">04</div>
        <div className="form-section__body form-fields form-fields--split">
          <label htmlFor="name">Name<input id="name" name="name" autoComplete="name" required placeholder="Your name" /></label>
          <label htmlFor="contact">Preferred contact method<select id="contact" name="contact" defaultValue="" required><option value="" disabled>Choose one</option><option>Email</option><option>WhatsApp</option><option>Phone</option></select></label>
          <label className="form-fields__wide" htmlFor="contact-detail">Where should we contact you?<input id="contact-detail" name="contactDetail" required placeholder="Email address or phone number" /></label>
        </div>
      </div>
      <div className="form-submit">
        <p>By continuing, you’re creating a starting point — not committing to a program.</p>
        <button className="button button--primary" type="submit"><span>Create my Language Map</span><span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
