export const locales = ["fr", "en"];
export const localePaths = { fr: "/", en: "/en/" };

export function localeFromPath(pathname) {
  return /^\/en(?:\/|$)/.test(pathname) ? "en" : "fr";
}

export function languageHref(locale, { search = "", hash = "" } = {}) {
  if (!locales.includes(locale))
    throw new Error(`Unsupported locale: ${locale}`);
  return localePaths[locale] + search + hash;
}
