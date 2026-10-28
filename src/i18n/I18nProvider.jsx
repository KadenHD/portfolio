import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { I18nContext } from "./context.js";
import { languageHref, localeFromPath, pageFromPath } from "./routing.js";
import { seoHead } from "../lib/seo.js";
import fr from "./fr.js";
import en from "./en.js";

const catalogs = { fr, en };

export function I18nProvider({ children }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const locale = localeFromPath(pathname);
  const page = pageFromPath(pathname);
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    const template = document.createElement("template");
    template.innerHTML = seoHead(locale, page);
    document.head
      .querySelectorAll("[data-site-seo]")
      .forEach((node) => node.remove());
    document.head.append(template.content);
  }, [locale, page]);
  const value = useMemo(
    () => ({
      locale,
      page,
      t: catalogs[locale],
      changeLanguage(nextLocale) {
        const href = languageHref(nextLocale, window.location);
        if (nextLocale === locale) return;
        window.history.pushState(null, "", href);
        setPathname(window.location.pathname);
      },
    }),
    [locale, page],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
