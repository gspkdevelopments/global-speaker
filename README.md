# Global Speaker

Global Speaker is a static-first language-learning and cultural-content foundation for English, French, and Spanish. The product is built around a simple idea: language begins with the learner's real life.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Quality checks:

```bash
npm run lint
npm run build
```

## Architecture

- `src/app/` — App Router pages, metadata, sitemap, robots, and generated Open Graph image
- `src/components/` — reusable interface and interactive components
- `src/content/site.ts` — language, environment, method, and professional-path data
- `src/content/resources.ts` — typed article and culture content model with seed resources

Pages are React Server Components by default. Client-side JavaScript is limited to mobile navigation, language selection, expandable environment cards, resource filtering, and the Language Map form.

## Foundation behavior

The Language Map form deliberately uses a local confirmation state. It does not persist or transmit personal data. Its fields and handoff are structured for a future CRM or WhatsApp integration.

The canonical production URL is currently represented as `https://globalspeaker.world` in metadata and SEO outputs. Update it in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` if deployment uses another domain.
