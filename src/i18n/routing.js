export const locales = ["fr", "en"];
export const pagePaths = {
  home: { fr: "/", en: "/en/" },
  legalNotice: { fr: "/mentions-legales/", en: "/en/legal-notice/" },
  privacyPolicy: { fr: "/confidentialite/", en: "/en/privacy-policy/" },
};
export const localePaths = pagePaths.home;
export const siteRoutes = Object.entries(pagePaths).flatMap(([page, paths]) =>
  locales.map((locale) => ({ page, locale, pathname: paths[locale] })),
);

export function localeFromPath(pathname) {
  return /^\/en(?:\/|$)/.test(pathname) ? "en" : "fr";
}

export function pageHref(locale, page = "home") {
  if (!locales.includes(locale))
    throw new Error(`Unsupported locale: ${locale}`);
  if (!Object.hasOwn(pagePaths, page))
    throw new Error(`Unsupported page: ${page}`);
  return pagePaths[page][locale];
}

export function pageFromPath(pathname = "/") {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return (
    siteRoutes.find(
      (route) => (route.pathname.replace(/\/+$/, "") || "/") === normalized,
    )?.page ?? "home"
  );
}

export function languageHref(
  locale,
  { pathname = "/", search = "", hash = "" } = {},
) {
  return pageHref(locale, pageFromPath(pathname)) + search + hash;
}
