"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { InterfaceLocale } from "@/lib/interface-locale";

const copy = {
  en: { progress: "Progress", of: "of", saved: "Saved on this device" },
  es: { progress: "Progreso", of: "de", saved: "Guardado en este dispositivo" },
  fr: { progress: "Progression", of: "sur", saved: "Enregistré sur cet appareil" },
} as const;

export function LessonProgress({ lessonId, checkpoints, locale }: { lessonId: string; checkpoints: string[]; locale: InterfaceLocale }) {
  const storageKey = `gspk-lesson-progress:${lessonId}`;
  const subscribe = useCallback((onStoreChange: () => void) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === storageKey) onStoreChange();
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("gspk-lesson-progress", onStoreChange);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("gspk-lesson-progress", onStoreChange);
    };
  }, [storageKey]);
  const getSnapshot = useCallback(() => window.localStorage.getItem(storageKey) ?? "[]", [storageKey]);
  const serialized = useSyncExternalStore(subscribe, getSnapshot, () => "[]");
  const checked = useMemo(() => {
    try {
      const parsed = JSON.parse(serialized);
      return Array.isArray(parsed) ? parsed.filter((item): item is number => Number.isInteger(item)) : [];
    } catch {
      return [];
    }
  }, [serialized]);

  const toggle = (index: number) => {
    const next = checked.includes(index) ? checked.filter((item) => item !== index) : [...checked, index];
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event("gspk-lesson-progress"));
  };

  return (
    <div className="lesson-progress">
      <div className="lesson-progress__summary">
        <strong>{copy[locale].progress}: {checked.length} {copy[locale].of} {checkpoints.length}</strong>
        <span>{copy[locale].saved}</span>
      </div>
      <div className="lesson-progress__checks">
        {checkpoints.map((checkpoint, index) => (
          <label key={checkpoint}>
            <input type="checkbox" checked={checked.includes(index)} onChange={() => toggle(index)} />
            <span>{checkpoint}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
