import { business } from "../data/legal.js";
import { locales, localePaths } from "../i18n/routing.js";
import { servicePlaces } from "../data/serviceAreas.js";

export const site = {
  origin: business.site.replace(/\/$/, ""),
  name: "Pierre Clément",
  profiles: [
    "https://www.linkedin.com/in/pierre--clement",
    "https://github.com/KadenHD",
    "https://www.pappers.fr/entreprise/994768406",
    "https://www.malt.fr/profile/pierreclement1",
    "https://uteam.fr/consultant/presentation/pierre-clement",
  ],
};
export const metadata = {
  fr: {
    title: "Ingénieur logiciel freelance dans l’Oise | Pierre Clément",
    description:
      "Conseil IT et logiciels sur mesure : full-stack, DevOps, architecture, IA et R&D. Compiègne, Beauvais et Oise ; Hauts-de-France, Île-de-France et à distance.",
    role: "Ingénieur logiciel indépendant",
    headline: ["Votre besoin.", "Le bon logiciel."],
    offer: "Conseil IT & développement sur mesure",
    terms:
      "En régie ou au forfait · Oise, Hauts-de-France, Île-de-France et à distance",
    imageAlt:
      "Pierre Clément, ingénieur logiciel indépendant. Conseil IT et développement sur mesure : full-stack, DevOps, architecture, IA et R&D.",
    ogLocale: "fr_FR",
    area: "Oise, Compiègne, Beauvais, Hauts-de-France et Île-de-France ; à distance à l’international",
    serviceType: [
      "Développement logiciel sur mesure",
      "Conseil IT",
      "Développement full-stack",
      "DevOps",
      "Architecture logicielle",
      "Automatisation et intégration IA",
      "Recherche et développement (R&D)",
    ],
    remoteService: "Conseil IT et développement logiciel à distance",
    businessDescription:
      "Entreprise individuelle de Pierre Clément. L’adresse à Paris est une domiciliation administrative ; les modalités de rencontre sont convenues selon la mission.",
  },
  en: {
    title: "Freelance Software Engineer in Oise | Pierre Clément",
    description:
      "Custom software and IT consulting: full-stack, DevOps, architecture, AI and R&D. Oise, Compiègne, Beauvais, Hauts-de-France, Île-de-France and remotely.",
    role: "Freelance Software Engineer",
    headline: ["Your needs.", "The right software."],
    offer: "IT consulting & custom software development",
    terms:
      "Team support or fixed-price projects · Oise, Hauts-de-France, Île-de-France and remotely",
    imageAlt:
      "Pierre Clément, freelance software engineer. IT consulting and custom software development: full-stack, DevOps, architecture, AI and R&D.",
    ogLocale: "en_GB",
    area: "Oise, Compiègne, Beauvais, Hauts-de-France and Île-de-France; remote collaboration internationally",
    serviceType: [
      "Custom software development",
      "IT consulting",
      "Full-stack development",
      "DevOps",
      "Software architecture",
      "Automation and AI integration",
      "Research and development (R&D)",
    ],
    remoteService: "Remote IT consulting and software development",
    businessDescription:
      "Pierre Clément’s sole trader business. The address in Paris is an administrative domiciliation address; meeting arrangements are agreed for each assignment.",
  },
};

export function canonicalUrl(locale) {
  if (!locales.includes(locale))
    throw new Error(`Unsupported locale: ${locale}`);
  return site.origin + localePaths[locale];
}

export function structuredData(locale) {
  canonicalUrl(locale);
  const meta = metadata[locale];
  const personId = `${site.origin}/#person`;
  const businessId = `${site.origin}/#business`;
  const serviceId = `${canonicalUrl(locale)}#service`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: canonicalUrl(locale),
        jobTitle: meta.role,
        image: `${site.origin}/images/pierre-clement-portrait-relaxed.webp`,
        sameAs: site.profiles,
        knowsLanguage: ["fr", "en"],
        knowsAbout: meta.serviceType,
      },
      {
        // Paris is an administrative address, not a claimed physical branch.
        "@type": "Organization",
        "@id": businessId,
        name: site.name,
        url: canonicalUrl(locale),
        description: meta.businessDescription,
        founder: { "@id": personId },
        email: business.email,
        telephone: business.phone,
        address: {
          "@type": "PostalAddress",
          name:
            locale === "fr"
              ? "Adresse de domiciliation administrative"
              : "Administrative domiciliation address",
          streetAddress: "60 rue François Ier",
          postalCode: "75008",
          addressLocality: "Paris",
          addressCountry: "FR",
        },
        sameAs: site.profiles,
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: meta.offer,
        url: canonicalUrl(locale),
        description: meta.description,
        serviceType: meta.serviceType,
        provider: { "@id": businessId },
        areaServed: servicePlaces,
      },
      {
        "@type": "Service",
        "@id": `${site.origin}/#remote-service`,
        name: meta.remoteService,
        provider: { "@id": businessId },
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${canonicalUrl(locale)}#contact`,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.origin}/#website`,
        url: `${site.origin}/`,
        name: site.name,
        inLanguage: ["fr", "en"],
        publisher: { "@id": businessId },
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl(locale),
        url: canonicalUrl(locale),
        name: meta.title,
        description: meta.description,
        inLanguage: locale,
        isPartOf: { "@id": `${site.origin}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": serviceId },
      },
    ],
  };
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
}

export function seoHead(locale) {
  canonicalUrl(locale);
  const meta = metadata[locale];
  const tag = (key, content, property = false) =>
    `<meta data-site-seo ${property ? "property" : "name"}="${key}" content="${escapeHtml(content)}">`;
  // Bump when the artwork changes so a refreshed share card requests new pixels.
  const image = `${site.origin}/images/social-${locale}.png?v=7`;
  return [
    `<title data-site-seo>${escapeHtml(meta.title)}</title>`,
    tag("description", meta.description),
    `<link data-site-seo rel="canonical" href="${canonicalUrl(locale)}">`,
    ...[...locales, "x-default"].map(
      (language) =>
        `<link data-site-seo rel="alternate" hreflang="${language}" href="${canonicalUrl(language === "x-default" ? "fr" : language)}">`,
    ),
    `<link data-site-seo rel="manifest" href="${locale === "en" ? "/en/" : "/"}site.webmanifest">`,
    ...Object.entries({
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl(locale),
      site_name: site.name,
      locale: meta.ogLocale,
      "locale:alternate": metadata[locale === "fr" ? "en" : "fr"].ogLocale,
      image,
      "image:width": "1200",
      "image:height": "630",
      "image:alt": meta.imageAlt,
    }).map(([key, value]) => tag(`og:${key}`, value, true)),
    ...Object.entries({
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      image,
      "image:alt": meta.imageAlt,
    }).map(([key, value]) => tag(`twitter:${key}`, value)),
    `<script data-site-seo type="application/ld+json">${JSON.stringify(structuredData(locale)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
