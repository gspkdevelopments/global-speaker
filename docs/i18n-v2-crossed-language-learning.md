# Global Speaker i18n v2 — Crossed-language learning

## Product requirement

Global Speaker must be fully operable in three interface languages — English, Spanish, and French — independently from the language being learned.

Examples:
- Spanish UI → learn French
- French UI → learn English
- English UI → learn Spanish

The interface locale controls all website chrome and supporting copy: homepage, navigation, professional pages, method, resources, culture, about, Language Map, location pages, curriculum hubs, semantic discovery pages, lesson chrome, CTAs, forms, footer, errors, metadata, and accessibility labels.

The target language controls authored learning content only.

## Routing contract

- English default: `/...`
- Spanish interface: `/es/...`
- French interface: `/fr/...`

Target-language curriculum remains nested after the locale when localized, e.g.:
- `/es/learn/french`
- `/fr/learn/english/life/work`
- `/es/learn/french/<lesson-slug>`

Legacy unprefixed URLs remain canonical English routes.

## SEO contract

Every localizable public page should expose canonical + hreflang alternates for `en`, `es`, `fr`, and `x-default` where appropriate. Interface text must be server-rendered in the selected locale; localStorage-only translation is not sufficient for complete availability.

## Translation rule

Do not translate authored lesson content into the interface language. The authored lesson remains in the target language. Translate only the surrounding learning interface and explanatory chrome unless a separate translated lesson object exists.
