"use client";

import { useState } from "react";
import { lifeEnvironments } from "@/content/site";

export function LifeEnvironmentGrid() {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div className="life-grid">
      {lifeEnvironments.map((environment, index) => {
        const open = openIndex === index;
        return (
          <article className={`life-card${open ? " is-open" : ""}`} key={environment.name}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}>
              <span className="life-card__index">{environment.index}</span>
              <span className="life-card__title">{environment.name}</span>
              <span className="life-card__toggle" aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            <div className="life-card__content">
              <ul>{environment.examples.map((example) => <li key={example}>{example}</li>)}</ul>
            </div>
          </article>
        );
      })}
    </div>
  );
}
