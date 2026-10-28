import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { languageHref, locales, pageHref } from "@/i18n/routing";

export function Navbar() {
  const { t, locale, page, changeLanguage } = useI18n();
  const homeHref = pageHref(locale);
  const sectionHref = (hash) => (page === "home" ? hash : homeHref + hash);
  const [open, setOpen] = useState(false);
  const [suffix, setSuffix] = useState(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  }));
  const toggle = useRef(null);
  const links = [
    ["#projects", t.nav.projects],
    ["#experience", t.nav.experience],
    ["#testimonials", t.nav.testimonials],
    ["#service-areas", t.nav.location],
    ["#faq", t.nav.faq],
    ["#contact", t.nav.contact],
  ];
  useEffect(() => {
    const syncLinks = () =>
      setSuffix({
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash,
      });
    window.addEventListener("hashchange", syncLinks);
    window.addEventListener("popstate", syncLinks);
    const close = (event) => {
      if (
        event.key === "Escape" &&
        toggle.current?.getAttribute("aria-expanded") === "true"
      ) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("hashchange", syncLinks);
      window.removeEventListener("popstate", syncLinks);
    };
  }, []);
  return (
    <header className="site-header page-width">
      <a
        href={page === "home" ? "#" : homeHref}
        className="wordmark"
        aria-label={t.nav.home}
      >
        <span className="wordmark-initial">P</span>ierre{" "}
        <span className="wordmark-initial">C</span>lément
        <span className="wordmark-dot">.</span>
      </a>
      <nav
        id="site-navigation"
        aria-label={t.nav.main}
        className={open ? "navigation is-open" : "navigation"}
      >
        {links.map(([href, label]) => (
          <a href={sectionHref(href)} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <nav className="language-switch" aria-label={t.nav.language}>
        {locales.map((language) => (
          <a
            key={language}
            href={languageHref(language, suffix)}
            hrefLang={language}
            lang={language}
            aria-label={language === "fr" ? "Français" : "English"}
            aria-current={locale === language ? "page" : undefined}
            onClick={(event) => {
              if (
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey ||
                event.button !== 0
              )
                return;
              event.preventDefault();
              changeLanguage(language);
              setOpen(false);
            }}
          >
            {language.toUpperCase()}
          </a>
        ))}
      </nav>
      <button
        ref={toggle}
        className="menu-toggle"
        aria-label={open ? t.common.close : t.nav.menu}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        <span>{open ? t.common.close : t.nav.menu}</span>
        {open ? (
          <X size={22} aria-hidden="true" />
        ) : (
          <Menu size={22} aria-hidden="true" />
        )}
      </button>
    </header>
  );
}
