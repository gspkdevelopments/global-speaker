import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div>
          <Link className="wordmark wordmark--footer" href="/">
            <span className="wordmark__mark" aria-hidden="true">G/S</span>
            <span>Global Speaker</span>
          </Link>
          <p className="site-footer__statement">Speak more<br />of the world.</p>
        </div>
        <div className="footer-column">
          <p>Learn</p>
          <Link href="/learn/english">English</Link>
          <Link href="/learn/french">Français</Link>
          <Link href="/learn/spanish">Español</Link>
        </div>
        <div className="footer-column">
          <p>Explore</p>
          <Link href="/method">The method</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/culture">Culture</Link>
          <Link href="/locations/tulum">Tulum</Link>
        </div>
        <div className="footer-column">
          <p>Begin</p>
          <Link href="/about">About</Link>
          <Link href="/language-map">Language Map</Link>
          <a href="mailto:hello@globalspeaker.world">Email us</a>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span>Language begins with your life.</span>
        <span>Based in the Riviera Maya · Open to the world</span>
        <span>© {new Date().getFullYear()} Global Speaker</span>
      </div>
    </footer>
  );
}
