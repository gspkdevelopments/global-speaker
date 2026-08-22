# Global Speaker Curriculum Corpus v1 — Authored Content

This directory is the runtime home for the authored Curriculum Corpus v1 lesson prose.

## Source and materialization

The committed authored source is stored as a deterministic, gzip-compressed base64 payload under:

```text
src/content/curriculum-packed/v1/
├── part-01.b64
├── …
└── part-11.b64
```

`npm run corpus:unpack` reconstructs the 175 canonical UTF-8 Markdown lessons into the generated runtime tree:

```text
src/content/curriculum/generated/
├── english/
├── spanish/
└── french/
```

Generated Markdown is intentionally ignored by Git. `predev`, `prebuild`, and `qa:corpus` materialize it automatically, so the committed packed source and the frozen canonical inventory remain the auditable inputs.

Each generated lesson is named by canonical lesson ID, for example:

```text
src/content/curriculum/generated/english/eng-home-greet-housemate-v1.md
```

## Canonical contract

The frozen graph/taxonomy inventory remains `src/content/curriculum-corpus-v1.json`. Authored Markdown must preserve its canonical:

- ID
- slug
- title
- language
- level
- lesson type
- primary environment
- communication functions
- learning objective

Run:

```bash
npm run qa:corpus
```

The validation gate requires exactly 175 authored objects, rejects missing/extra/duplicate IDs, checks the canonical metadata above, and verifies the complete lesson anatomy.

## Required lesson anatomy

1. Context
2. Objective
3. Notice
4. Understand
5. Language toolkit
6. Examples
7. Culture & register
8. Guided practice
9. Production
10. Real-world challenge
11. Reflection
12. Continue

Do not duplicate existing WO-005 professional lessons conceptually. Corpus objects that reconcile those lessons remain the canonical nodes.
