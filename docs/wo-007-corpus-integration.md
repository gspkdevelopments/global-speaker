# WO-007 — Curriculum Corpus v1 Integration

Status: INTEGRATION CANDIDATE

The complete authored Curriculum Corpus v1 is integrated on `feature/curriculum-corpus-v1-integration` as a lossless Brotli-packed content store with a server-side loader. No lesson prose is generated or rewritten at runtime.

## Frozen validation targets
- 175 objects
- English 72 / Spanish 55 / French 48
- A1 18 / A2 34 / B1 46 / B2 43 / C1 27 / C2 7
- scenario-lesson 96 / language-toolkit 20 / conversation-lab 14 / pronunciation-lab 12 / cultural-interpretation 12 / professional-simulation 9 / story-and-reflection 6 / written-clarity-lab 6
- 0 duplicate IDs
- 0 duplicate slugs
- full 12-section lesson anatomy

## Application integration
- `src/content/curriculum-authored-v1.ts` decodes and indexes the exact authored Markdown.
- `/learn/[language]/[slug]` statically generates lesson routes.
- Language hubs expose the authored curriculum by CEFR level.
- `sitemap.ts` adds all authored lesson routes.
- `npm run qa:corpus` validates the packed corpus independently of the UI.

## Safety
The integration is isolated on a feature branch. Merge to `master` only after corpus QA, lint, build, and route checks are green.
