"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeLanguages } from "@/content/site";

const links = [
  ["Professional", "/professional"],
  ["Polyglot", "/polyglot"],
  ["Method", "/method"],
  ["Resources", "/resources"],
  ["Culture", "/culture"],
  ["About", "/about"],
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/")) || (href === "/polyglot" && pathname.startsWith("/polyglot/"));
}

export function DesktopNav() {
  const pathname = usePathname();
  const learnIsCurrent = pathname === "/learn" || pathname.startsWith("/learn/");

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <div className="desktop-nav__learn">
        <Link className={learnIsCurrent ? "is-active" : ""} aria-current={learnIsCurrent ? "page" : undefined} href="/learn">Learn</Link>
        <div className="language-menu" aria-label="Learning languages">
          {activeLanguages.map((language) => {
            const href = `/learn/${language.key}`;
            const active = pathname === href;
            return (
              <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={language.key}>
                <span>{language.code}</span> {language.nativeName}
              </Link>
            );
          })}
        </div>
      </div>
      {links.map(([label, href]) => {
        const active = isCurrent(pathname, href);
        return <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={href}>{label}</Link>;
      })}
    </nav>
  );
}
