"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Method", "/method"],
  ["Resources", "/resources"],
  ["Culture", "/culture"],
  ["About", "/about"],
];

function isCurrent(pathname: string, href: string) {
  return pathname === href || (href === "/resources" && pathname.startsWith("/resources/"));
}

export function DesktopNav() {
  const pathname = usePathname();
  const learnIsCurrent = pathname === "/learn" || pathname.startsWith("/learn/");

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      <div className="desktop-nav__learn">
        <Link className={learnIsCurrent ? "is-active" : ""} aria-current={learnIsCurrent ? "page" : undefined} href="/learn">Learn</Link>
        <div className="language-menu" aria-label="Learning languages">
          <Link className={pathname === "/learn/english" ? "is-active" : ""} aria-current={pathname === "/learn/english" ? "page" : undefined} href="/learn/english"><span>EN</span> English</Link>
          <Link className={pathname === "/learn/french" ? "is-active" : ""} aria-current={pathname === "/learn/french" ? "page" : undefined} href="/learn/french"><span>FR</span> Français</Link>
          <Link className={pathname === "/learn/spanish" ? "is-active" : ""} aria-current={pathname === "/learn/spanish" ? "page" : undefined} href="/learn/spanish"><span>ES</span> Español</Link>
        </div>
      </div>
      {links.map(([label, href]) => {
        const active = isCurrent(pathname, href);
        return <Link className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} href={href} key={href}>{label}</Link>;
      })}
    </nav>
  );
}
