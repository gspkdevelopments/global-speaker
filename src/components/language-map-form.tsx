"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { contactConfig } from "@/config/site";
import { buildWhatsAppUrl, formatLanguageMapMessage, type LanguageMapData } from "@/lib/language-map";

const reasons = ["Work", "Travel", "Living abroad", "Relationships", "Culture", "Personal growth", "Other"];
const challenges = ["Speaking", "Understanding", "Vocabulary", "Grammar", "Pronunciation", "Confidence", "Other"];
const levels = ["Beginner", "Basic", "Intermediate", "Advanced", "Not sure"];

function ChoiceGroup({ legend, name, choices, initialValue, multiple = false, error }: { legend: string; name: string; choices: string[]; initialValue?: string | string[]; multiple?: boolean; error?: string }) {
  const selectedValues = Array.isArray(initialValue) ? initialValue : initialValue ? [initialValue] : [];
  return (
    <fieldset className="choice-group" aria-describedby={error ? `${name}-error` : undefined}>
      <legend>{legend}</legend>
      <div>{choices.map((choice) => <label key={choice}><input type={multiple ? "checkbox" : "radio"} name={name} value={choice} required={!multiple} defaultChecked={selectedValues.includes(choice)} /><span>{choice}</span></label>)}</div>
      {error ? <p className="form-error" id={`${name}-error`} role="alert">{error}</p> : null}
    </fieldset>
  );
}

function SummaryItem({ label, children }: { label: string; children: ReactNode }) {
  return <div><dt>{label}</dt><dd>{children}</dd></div>;
}

export function LanguageMapForm() {
  const [completedMap, setCompletedMap] = useState<LanguageMapData | null>(null);
  const [draftMap, setDraftMap] = useState<LanguageMapData | null>(null);
  const [challengeError, setChallengeError] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const completionHeading = useRef<HTMLHeadingElement>(null);

  const message = useMemo(() => completedMap ? formatLanguageMapMessage(completedMap) : "", [completedMap]);
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(contactConfig.whatsappNumber, message), [message]);

  useEffect(() => {
    if (completedMap) completionHeading.current?.focus();
  }, [completedMap]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selectedChallenges = formData.getAll("challenge").map(String);
    if (!selectedChallenges.length) {
      setChallengeError("Choose at least one area you want to strengthen.");
      document.querySelector<HTMLInputElement>('input[name="challenge"]')?.focus();
      return;
    }

    const nextMap = {
      language: String(formData.get("language") ?? ""),
      goal: String(formData.get("reason") ?? ""),
      environments: String(formData.get("environments") ?? ""),
      interests: String(formData.get("interests") ?? ""),
      challenges: selectedChallenges,
      level: String(formData.get("level") ?? ""),
      name: String(formData.get("name") ?? ""),
    };
    setChallengeError("");
    setCopyState("idle");
    setDraftMap(nextMap);
    setCompletedMap(nextMap);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function editMap() {
    setCompletedMap(null);
    setCopyState("idle");
    requestAnimationFrame(() => document.querySelector(".language-map-form")?.scrollIntoView({ block: "start" }));
  }

  async function copyMap() {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  if (completedMap) {
    return (
      <section className="map-completion" aria-labelledby="map-completion-title">
        <div className="map-completion__intro">
          <p className="eyebrow">Personal Language Map · Ready</p>
          <h2 id="map-completion-title" ref={completionHeading} tabIndex={-1}>Your Language Map is ready.</h2>
          <p>You have turned the life you already live into a clear starting point for learning.</p>
        </div>
        <div className="map-completion__artifact">
          <header><span>Personal Language Map</span><span>GS—YOU</span></header>
          <div className="map-completion__you"><span>Starting point</span><strong>{completedMap.name}</strong><i>{completedMap.language}</i></div>
          <dl className="map-completion__summary">
            <SummaryItem label="Language">{completedMap.language}</SummaryItem>
            <SummaryItem label="Goal">{completedMap.goal}</SummaryItem>
            <SummaryItem label="Level">{completedMap.level}</SummaryItem>
            <SummaryItem label="Real contexts">{completedMap.environments}</SummaryItem>
            <SummaryItem label="Focus">{completedMap.challenges.join(" · ")}</SummaryItem>
            <SummaryItem label="Interests">{completedMap.interests}</SummaryItem>
          </dl>
          <div className="map-completion__path" aria-label="Your learning path"><span>You</span><i>→</i><span>Intention</span><i>→</i><span>Real contexts</span><i>→</i><span>Interests</span><i>→</i><span>Your voice</span><i>→</i><span>Conversation</span></div>
        </div>
        <div className="map-completion__handoff">
          <div><p className="eyebrow">Your next conversation</p><h3>Ready to turn this into a learning plan?</h3><p>Nothing has been sent yet. WhatsApp opens with your map already prepared; you decide whether to send it.</p></div>
          <div className="map-completion__actions">
            {whatsappUrl ? <a className="button button--primary" href={whatsappUrl} target="_blank" rel="noreferrer"><span>Continue on WhatsApp</span><span aria-hidden="true">↗</span></a> : <button className="button button--primary" type="button" disabled aria-describedby="whatsapp-unavailable"><span>WhatsApp setup pending</span><span aria-hidden="true">—</span></button>}
            <button className="button button--secondary" type="button" onClick={copyMap}><span>{copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed — try again" : "Copy my Language Map"}</span><span aria-hidden="true">{copyState === "copied" ? "✓" : "⧉"}</span></button>
            <button className="map-completion__edit" type="button" onClick={editMap}>Edit my Language Map</button>
          </div>
          {!whatsappUrl ? <p className="map-completion__config" id="whatsapp-unavailable">This preview needs <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> before the handoff can open.</p> : null}
          <p className="copy-feedback" aria-live="polite">{copyState === "copied" ? "Your Language Map has been copied." : copyState === "failed" ? "Your browser blocked clipboard access. Select and copy the summary manually." : ""}</p>
        </div>
      </section>
    );
  }

  return (
    <form className="language-map-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="form-section__number">01</div>
        <div className="form-section__body">
          <ChoiceGroup legend="What do you want to learn?" name="language" choices={["English", "French", "Spanish"]} initialValue={draftMap?.language} />
          <ChoiceGroup legend="Why?" name="reason" choices={reasons} initialValue={draftMap?.goal} />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">02</div>
        <div className="form-section__body form-fields">
          <label htmlFor="environments">Where do you use or want to use the language?<span>Think about places, people, routines, or moments.</span></label>
          <textarea id="environments" name="environments" rows={4} required defaultValue={draftMap?.environments} placeholder="At work with hotel guests, with friends, when I travel…" />
          <label htmlFor="interests">What interests you?<span>Your interests make new language easier to remember.</span></label>
          <textarea id="interests" name="interests" rows={3} required defaultValue={draftMap?.interests} placeholder="Music, food, films, nature, technology…" />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">03</div>
        <div className="form-section__body">
          <ChoiceGroup legend="What feels hardest right now?" name="challenge" choices={challenges} initialValue={draftMap?.challenges} multiple error={challengeError} />
          <ChoiceGroup legend="Current approximate level" name="level" choices={levels} initialValue={draftMap?.level} />
        </div>
      </div>
      <div className="form-section">
        <div className="form-section__number">04</div>
        <div className="form-section__body form-fields form-fields--identity">
          <label htmlFor="name">What should we call you?<span>This personalizes your map. No contact details are collected here.</span></label>
          <input id="name" name="name" autoComplete="name" required defaultValue={draftMap?.name} placeholder="Your name" />
        </div>
      </div>
      <div className="form-submit">
        <p>Your answers stay in this browser until you choose to continue on WhatsApp. Global Speaker does not store or silently send this map.</p>
        <button className="button button--primary" type="submit"><span>Create my Language Map</span><span aria-hidden="true">↗</span></button>
      </div>
    </form>
  );
}
