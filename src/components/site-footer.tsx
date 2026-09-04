"use client";

import Link from "next/link";
import { useInterfaceLocale } from "@/components/interface-locale";
import { contactConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/language-map";
import { pickLocaleCopy } from "@/lib/locale-copy";

const copy = {
  en: { statement: <>Speak more<br />of the world.</>, learn: "Learn", explore: "Explore", begin: "Begin", method: "The method", professional: "Professional paths", resources: "Resources", culture: "Culture", about: "About", map: "Language Map", email: "Email us", bottom: "Language begins with your life.", location: "Based in the Riviera Maya · Open to the world", whatsapp: "Hi! I'd like to learn more about Global Speaker." },
  es: { statement: <>Habla más<br />del mundo.</>, learn: "Aprender", explore: "Explorar", begin: "Empezar", method: "El método", professional: "Rutas profesionales", resources: "Recursos", culture: "Cultura", about: "Acerca de", map: "Mapa de Idioma", email: "Escríbenos", bottom: "El idioma comienza con tu vida.", location: "Desde la Riviera Maya · Abierto al mundo", whatsapp: "¡Hola! Quiero saber más sobre Global Speaker." },
  fr: { statement: <>Parlez davantage<br />du monde.</>, learn: "Apprendre", explore: "Explorer", begin: "Commencer", method: "La méthode", professional: "Parcours professionnels", resources: "Ressources", culture: "Culture", about: "À propos", map: "Carte Linguistique", email: "Écrivez-nous", bottom: "La langue commence avec votre vie.", location: "Depuis la Riviera Maya · Ouvert sur le monde", whatsapp: "Bonjour ! J'aimerais en savoir plus sur Global Speaker." },
} as const;

export function SiteFooter() {
  const { locale } = useInterfaceLocale();
  const t = pickLocaleCopy(copy, locale);
  const directWhatsappUrl = buildWhatsAppUrl(contactConfig.whatsappNumber, t.whatsapp);
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <Link className="wordmark wordmark--footer" href="/">
            <span className="wordmark__mark" aria-hidden="true">G/S</span>
            <span>Global Speaker</span>
          </Link>
          <p className="site-footer__statement">{t.statement}</p>
        </div>
        <div className="footer-column">
          <p>{t.learn}</p>
          <Link href="/learn/english">English</Link>
          <Link href="/learn/french">Français</Link>
          <Link href="/learn/spanish">Español</Link>
        </div>
        <div className="footer-column">
          <p>{t.explore}</p>
          <Link href="/method">{t.method}</Link>
          <Link href="/professional">{t.professional}</Link>
          <Link href="/resources">{t.resources}</Link>
          <Link href="/culture">{t.culture}</Link>
          <Link href="/locations/tulum">Tulum</Link>
        </div>
        <div className="footer-column">
          <p>{t.begin}</p>
          <Link href="/about">{t.about}</Link>
          <Link href="/language-map">{t.map}</Link>
          {directWhatsappUrl ? <a href={directWhatsappUrl}>WhatsApp</a> : null}
          {contactConfig.email ? <a href={`mailto:${contactConfig.email}`}>{t.email}</a> : null}
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>{t.bottom}</span>
        <span>{t.location}</span>
        <span>© {new Date().getFullYear()} Global Speaker</span>
      </div>
    </footer>
  );
}
