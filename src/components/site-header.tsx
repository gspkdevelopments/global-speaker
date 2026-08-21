import Link from "next/link";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="wordmark" href="/" aria-label="Global Speaker home">
          <span className="wordmark__mark" aria-hidden="true">G/S</span>
          <span>Global Speaker</span>
        </Link>
        <DesktopNav />
        <div className="site-header__actions">
          <span className="interface-label" title="Additional interface languages are planned">EN / ES / FR</span>
          <Link className="nav-cta" href="/language-map">Start learning <span aria-hidden="true">↗</span></Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
