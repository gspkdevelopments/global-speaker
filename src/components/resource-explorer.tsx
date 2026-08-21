"use client";

import { useMemo, useState } from "react";
import { ResourceCard } from "@/components/cards";
import type { Resource } from "@/content/resources";

const filters = ["All", "English", "Français", "Español", "Words & Meaning", "Expression", "Grammar in Context", "Work", "Culture", "Travel", "People", "Learning"];

export function ResourceExplorer({ resources }: { resources: Resource[] }) {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesFilter = filter === "All" || resource.languageLabel === filter || resource.category === filter;
      const haystack = `${resource.title} ${resource.subtitle} ${resource.description} ${resource.category} ${resource.languageLabel}`.toLowerCase();
      return matchesFilter && (!normalized || haystack.includes(normalized));
    });
  }, [filter, query, resources]);

  return (
    <div className="resource-explorer">
      <div className="resource-search">
        <label htmlFor="resource-search">What do you want to understand?</label>
        <div><span aria-hidden="true">⌕</span><input id="resource-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="A word, situation, or idea…" /></div>
      </div>
      <div className="filter-row" aria-label="Filter resources">
        {filters.map((item) => <button type="button" className={filter === item ? "is-active" : ""} aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}
      </div>
      <p className="filter-row__hint" aria-hidden="true">Swipe to see all topics →</p>
      <p className="results-count" aria-live="polite">{visible.length} {visible.length === 1 ? "resource" : "resources"}</p>
      {visible.length ? <div className="resource-grid resource-grid--library">{visible.map((resource, index) => <ResourceCard resource={resource} index={index} featured={index === 0} key={resource.slug} />)}</div> : <div className="empty-state"><p>No exact match yet.</p><span>Try a language, a broader idea, or build a Language Map around the question.</span></div>}
    </div>
  );
}
