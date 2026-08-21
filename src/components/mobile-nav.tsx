"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

const links = [
  ["Learn", "/learn"],
  ["Professional", "/professional"],
  ["Method", "/method"],
  ["Resources", "/resources"],
  ["Culture", "/culture"],
  ["About", "/about"],
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus({ preventScroll: true });
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        className="mobile-nav__toggle"
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>
      {open ? (
        <div className="mobile-nav__panel" id="mobile-menu">
          <nav aria-label="Mobile navigation">
            {links.map(([label, href], index) => {
              const active = pathname === href || (href === "/learn" && pathname.startsWith("/learn/")) || (href === "/resources" && pathname.startsWith("/resources/")) || (href === "/professional" && pathname.startsWith("/professional/"));
              return (
              <Fragment key={href}>
              <Link ref={index === 0 ? firstLinkRef : undefined} className={active ? "is-active" : ""} aria-current={active ? "page" : undefined} key={href} href={href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{label}
              </Link>
              {index === 0 ? (
                <div className="mobile-nav__languages" aria-label="Choose a learning language">
                  <Link className={pathname === "/learn/english" ? "is-active" : ""} aria-current={pathname === "/learn/english" ? "page" : undefined} href="/learn/english" onClick={() => setOpen(false)}><span>EN</span>English</Link>
                  <Link className={pathname === "/learn/french" ? "is-active" : ""} aria-current={pathname === "/learn/french" ? "page" : undefined} href="/learn/french" onClick={() => setOpen(false)}><span>FR</span>Français</Link>
                  <Link className={pathname === "/learn/spanish" ? "is-active" : ""} aria-current={pathname === "/learn/spanish" ? "page" : undefined} href="/learn/spanish" onClick={() => setOpen(false)}><span>ES</span>Español</Link>
                </div>
              ) : null}
              </Fragment>
              );
            })}
          </nav>
          <Link className="button button--primary" href="/language-map" onClick={() => setOpen(false)}>
            <span>Start learning</span><span aria-hidden="true">↗</span>
          </Link>
          <p>Interface language · EN <span aria-hidden="true">/</span> ES <span aria-hidden="true">/</span> FR</p>
        </div>
      ) : null}
    </div>
  );
}
