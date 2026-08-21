import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return <section className="not-found"><div><p className="eyebrow">404 · A missing word</p><h1>This path has not been mapped yet.</h1><p>The language platform is growing. Return to the beginning or follow a useful question.</p><div><ButtonLink href="/">Return home</ButtonLink><ButtonLink href="/resources" variant="secondary">Explore resources</ButtonLink></div></div></section>;
}
