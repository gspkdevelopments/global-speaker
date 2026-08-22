# Global Speaker Curriculum Corpus v1 — Authored Content

This directory is the canonical home for the authored Curriculum Corpus v1 lesson prose.

Expected layout:

```text
src/content/curriculum/
├── english/
│   ├── batch-01/
│   └── … batch-10/
├── spanish/
│   ├── batch-11/
│   └── … batch-17/
└── french/
    ├── batch-18/
    └── … batch-23/
```

Each lesson is a UTF-8 Markdown file named by canonical lesson ID, for example:

```text
eng-home-greet-housemate-v1.md
```

The frozen graph/taxonomy inventory remains `src/content/curriculum-corpus-v1.json`. Authored Markdown must preserve its canonical ID, slug, title, language, level, lesson type, primary environment, communication functions, and learning objective.

Required lesson anatomy:

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
