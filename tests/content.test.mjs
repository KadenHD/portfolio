import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import fr from "../src/i18n/fr.js";
import en from "../src/i18n/en.js";
import {
  languageHref,
  localeFromPath,
  pageFromPath,
  pageHref,
  siteRoutes,
} from "../src/i18n/routing.js";
import {
  canonicalUrl,
  pageMetadata,
  seoHead,
  structuredData,
} from "../src/lib/seo.js";
import { sitemapXml } from "../scripts/generate-site.mjs";
import prerenderConfig from "../prerender.config.js";

function shape(value) {
  if (Array.isArray(value)) return value.map(shape);
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, shape(item)]),
    );
  assert.ok(
    typeof value !== "string" || value.trim(),
    "Translation must not be empty",
  );
  return typeof value;
}

test("French and English UI catalogs have the same complete keys", () => {
  const { data: _fr, ...frUI } = fr;
  const { data: _en, ...enUI } = en;
  // Emphasis terms are locale-specific expressions, not word-for-word tokens.
  frUI.experience = { ...frUI.experience, emphasis: [] };
  enUI.experience = { ...enUI.experience, emphasis: [] };
  assert.deepEqual(shape(enUI), shape(frUI));
});

test("All projects, all 54 tags and original links/assets are retained", () => {
  assert.equal(en.data.projects.length, 4);
  assert.deepEqual(
    fr.data.projects.map((item) => item.tags.length),
    [13, 13, 13, 15],
  );
  en.data.projects.forEach((project, index) => {
    const source = fr.data.projects[index];
    assert.equal(project.id, source.id);
    assert.equal(project.tags.length, source.tags.length);
    for (const key of ["image", "link", "github", "docs", "demo"])
      assert.equal(project[key], source[key]);
    assert.notEqual(project.description, source.description);
    assert.ok(project.description.length > 100);
  });
  for (const catalog of [fr, en]) {
    assert.deepEqual(
      catalog.projects.summaries.map((summary) => summary.id),
      catalog.data.projects.map((project) => project.id),
      "Every project, including ONTBO, needs a card summary in display order",
    );
    for (const summary of catalog.projects.summaries)
      assert.ok(
        catalog.data.projects.some((project) => project.id === summary.id),
      );
  }
});

test("All career entries and responsibilities have an English counterpart", () => {
  assert.equal(en.data.experiences.length, 5);
  for (const item of en.data.experiences) {
    const source = fr.data.experiences.find((source) => source.id === item.id);
    assert.equal(item.started, source.started);
    assert.equal(item.current, source.current);
    assert.equal(item.description.length, source.description.length);
    assert.equal(
      item.description.length,
      4,
      `${item.id}: keep all four CV missions`,
    );
    assert.equal(item.technologies.length, source.technologies.length);
    assert.deepEqual(item.links, source.links);
    item.description.forEach((line, index) =>
      assert.notEqual(line, source.description[index]),
    );
  }
  const ordered = [...en.data.experiences].sort((a, b) =>
    b.started.localeCompare(a.started),
  );
  assert.deepEqual(
    ordered.map((item) => item.id),
    ["weldom", "independent", "nightingale", "ontbo", "uteam"],
  );
});

test("Restored CV outcomes retain their figures, units and meaning in both languages", () => {
  const checks = {
    fr: {
      weldom: [/plus de 300 magasins/],
      independent: [
        /architectures cloud scalables/,
        /Docker, CI\/CD, Serveurs/,
        /délais réduits de plusieurs mois/,
        /renfort d’équipe technique/,
        /de la conception au déploiement/,
      ],
      ontbo: [
        /GenAI, data science et informatique affective/,
        /APIs REST/,
        /\+8 services déployés en -5 minutes/,
        /prototypes R&D/,
        /cycle court/,
      ],
      nightingale: [
        /détection automatique de blessures en 2D\/3D/,
        /\+1 500 images de plaies provenant de \+450 patients/,
        /pipelines d’analyse d’images temps réel/,
        /features biomédicales/,
        /déploiement 400% plus rapide et agnostique/,
      ],
      uteam: [
        /applications métiers full-stack/,
        /systèmes embarqués/,
        /robotique et R&D/,
        /accompagnement technique de startups, PME et laboratoires/,
        /\+10 projets menés/,
      ],
    },
    en: {
      weldom: [/more than 300 stores/],
      independent: [
        /scalable cloud architectures/,
        /Docker, CI\/CD and servers/,
        /reducing timelines by several months/,
        /Supporting technical teams/,
        /from design to deployment/,
      ],
      ontbo: [
        /GenAI, data science and affective computing/,
        /REST APIs/,
        /more than 8 services deployed in under 5 minutes/,
        /R&D prototypes/,
        /short development cycles/,
      ],
      nightingale: [
        /automatic 2D\/3D wound detection/,
        /more than 1,500 wound images from more than 450 patients/,
        /real-time image analysis pipelines/,
        /biomedical features/,
        /400% faster deployment, independent of the target environment/,
      ],
      uteam: [
        /full-stack business applications/,
        /embedded systems/,
        /robotics and R&D/,
        /technical support to startups, SMEs and laboratories/,
        /more than 10 projects delivered/,
      ],
    },
  };
  for (const [locale, catalog] of Object.entries({ fr, en })) {
    for (const experience of catalog.data.experiences) {
      const text = experience.description.join("\n");
      for (const pattern of checks[locale][experience.id])
        assert.match(text, pattern, `${locale}: ${experience.id}`);
    }
  }
});

test("CV downloads follow the selected language and remote work stays unrestricted", () => {
  assert.equal(
    fr.experience.cvHref,
    "https://raw.githubusercontent.com/KadenHD/KadenHD/main/CV_Pierre_Clement.pdf",
  );
  assert.equal(
    en.experience.cvHref,
    "https://raw.githubusercontent.com/KadenHD/KadenHD/main/CV_Pierre_Clement_EN.pdf",
  );
  assert.equal(en.experience.cv, "Download my CV");
  assert.equal(fr.contact.remote, "et à distance.");
  assert.equal(en.contact.remote, "and remotely.");
});

test("Testimonial translations keep authors and portraits and disclose translation", () => {
  assert.equal(en.data.testimonials.length, fr.data.testimonials.length);
  en.data.testimonials.forEach((item, index) => {
    assert.equal(item.author, fr.data.testimonials[index].author);
    assert.equal(item.avatar, fr.data.testimonials[index].avatar);
    assert.ok(item.traduce_from);
    assert.notEqual(item.quote, fr.data.testimonials[index].quote);
  });
});

test("Both legal translations retain every section, paragraph and supporting link", () => {
  for (const key of ["legalNotice", "privacyPolicy"]) {
    assert.equal(en.data[key].length, fr.data[key].length);
    en.data[key].forEach((section, index) => {
      const source = fr.data[key][index];
      assert.equal(section.texts.length, source.texts.length);
      assert.equal(section.links?.length, source.links?.length);
      section.links?.forEach((link, linkIndex) => {
        const actual = new URL(link.href, canonicalUrl("en"));
        const original = new URL(
          source.links[linkIndex].href,
          canonicalUrl("fr"),
        );
        actual.searchParams.delete("hl");
        original.searchParams.delete("hl");
        assert.equal(actual.href, original.href);
      });
    });
  }
  assert.deepEqual(
    en.data.legalNotice[1].texts[2],
    fr.data.legalNotice[1].texts[2],
  );
});

test("Language links preserve the page, query and section", () => {
  assert.equal(localeFromPath("/en/"), "en");
  assert.equal(localeFromPath("/en"), "en");
  assert.equal(localeFromPath("/"), "fr");
  assert.equal(localeFromPath("/english"), "fr");
  assert.equal(
    languageHref("en", { search: "?ref=portfolio", hash: "#contact" }),
    "/en/?ref=portfolio#contact",
  );
  assert.equal(
    languageHref("fr", { pathname: "/en/privacy-policy/", search: "?ref=contact" }),
    "/confidentialite/?ref=contact",
  );
  assert.throws(() => languageHref("es"));
  assert.equal(languageHref("en", { hash: "#faq" }), "/en/#faq");
});

test("Legal documents have distinct static routes and translate to the same document", () => {
  assert.deepEqual(siteRoutes.map((route) => route.pathname), [
    "/", "/en/", "/mentions-legales/", "/en/legal-notice/",
    "/confidentialite/", "/en/privacy-policy/",
  ]);
  for (const route of siteRoutes) {
    assert.equal(pageFromPath(route.pathname), route.page);
    assert.equal(pageFromPath(route.pathname.replace(/\/$/, "") || "/"), route.page);
    assert.equal(localeFromPath(route.pathname), route.locale);
    assert.equal(pageHref(route.locale, route.page), route.pathname);
    for (const locale of ["fr", "en"])
      assert.equal(
        languageHref(locale, { pathname: route.pathname, search: "?source=footer" }),
        pageHref(locale, route.page) + "?source=footer",
      );
  }
  assert.throws(() => pageHref("es"));
  assert.throws(() => pageHref("fr", "unknown"));
  assert.deepEqual(
    prerenderConfig.routes,
    ["/", "/en", "/mentions-legales", "/en/legal-notice", "/confidentialite", "/en/privacy-policy"],
  );
});

test("The local FAQ preserves stable question and reference anchors in both languages", () => {
  assert.deepEqual(
    fr.serviceAreas.questions.map((item) => item.id),
    en.serviceAreas.questions.map((item) => item.id),
  );
  assert.equal(fr.serviceAreas.questions.length, 5);
  assert.equal(
    new Set(fr.serviceAreas.questions.map((item) => item.id)).size,
    5,
  );
  for (const catalog of [fr, en]) {
    for (const reference of catalog.serviceAreas.references)
      assert.ok(
        catalog.data.experiences.some(
          (item) => item.id === reference.experienceId,
        ),
      );
    assert.ok(!Object.hasOwn(catalog.serviceAreas, "pages"));
  }
});

test("Paris is an administrative address, service areas are explicit and remote work stays international", () => {
  for (const locale of ["fr", "en"]) {
    const graph = structuredData(locale)["@graph"];
    assert.ok(
      !graph.some((item) =>
        [
          "LocalBusiness",
          "ProfessionalService",
          "FAQPage",
          "BreadcrumbList",
        ].includes(item["@type"]),
      ),
    );
    const business = graph.find((item) => item["@type"] === "Organization");
    assert.equal(business.address.addressLocality, "Paris");
    assert.match(business.address.name, /domiciliation/);
    assert.ok(
      !business.geo && !business.openingHours && !business.aggregateRating,
    );
    const local = graph.find(
      (item) => item["@type"] === "Service" && Array.isArray(item.areaServed),
    );
    for (const name of [
      "Oise",
      "Compiègne",
      "Beauvais",
      "Hauts-de-France",
      "Île-de-France",
    ])
      assert.ok(local.areaServed.some((item) => item.name === name));
    assert.ok(
      graph.some(
        (item) =>
          item["@type"] === "Service" && item.areaServed === "Worldwide",
      ),
    );
    assert.equal(new Set(graph.map((item) => item["@id"])).size, graph.length);
  }
});

test("Every page has one canonical, reciprocal document alternates and matching structured data", () => {
  const titles = new Set();
  for (const { locale, page: pageKey } of siteRoutes) {
    const head = seoHead(locale, pageKey);
    const meta = pageMetadata(locale, pageKey);
    titles.add(meta.title);
    assert.equal((head.match(/rel="canonical"/g) ?? []).length, 1);
    assert.ok(head.includes(`rel="canonical" href="${canonicalUrl(locale, pageKey)}"`));
    for (const language of ["fr", "en", "x-default"])
      assert.ok(head.includes(`hreflang="${language}" href="${canonicalUrl(language === "x-default" ? "fr" : language, pageKey)}"`));
    assert.ok(head.includes(`property="og:url" content="${canonicalUrl(locale, pageKey)}"`));
    assert.equal((head.match(/<title /g) ?? []).length, 1);
    assert.ok(
      head.includes(
        `https://pierre-clement-oise.fr/images/social-${locale}.png`,
      ),
    );
    const schema = structuredData(locale, pageKey);
    const page = schema["@graph"].find((item) => item["@type"] === "WebPage");
    assert.equal(page.url, canonicalUrl(locale, pageKey));
    assert.equal(page.inLanguage, locale);
    assert.equal(page.name, meta.title);
    assert.equal(page.description, meta.description);
    if (pageKey !== "home") {
      assert.ok(!schema["@graph"].some((item) => item["@type"] === "Service"));
      assert.ok(!page.mainEntity);
    }
    assert.ok(!head.includes("devbox"));
  }
  assert.equal(titles.size, 6);
});

test("Generated SEO files are current and sitemap includes six routes with document-specific alternatives", async () => {
  const sitemap = sitemapXml();
  assert.equal(
    await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    sitemap,
  );
  assert.equal((sitemap.match(/<loc>/g) ?? []).length, 6);
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (match) => match[1],
  );
  for (const { locale, page } of siteRoutes) {
    const entry = entries.find((item) =>
      item.includes(`<loc>${canonicalUrl(locale, page)}</loc>`),
    );
    assert.ok(entry);
    assert.equal((entry.match(/hreflang=/g) ?? []).length, 3);
    for (const language of ["fr", "en", "x-default"])
      assert.ok(
        entry.includes(
          `hreflang="${language}" href="${canonicalUrl(language === "x-default" ? "fr" : language, page)}"`,
        ),
      );
  }
  assert.ok(
    sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  );
  for (const locale of ["fr", "en"]) {
    assert.ok(sitemap.includes(`<loc>${canonicalUrl(locale)}</loc>`));
    const manifest = JSON.parse(
      await readFile(
        new URL(
          `../public/${locale === "en" ? "en/" : ""}site.webmanifest`,
          import.meta.url,
        ),
        "utf8",
      ),
    );
    assert.equal(manifest.lang, locale);
    assert.equal(manifest.start_url, locale === "en" ? "/en/" : "/");
  }
  const html = await readFile(
    new URL("../index.html", import.meta.url),
    "utf8",
  );
  assert.ok(html.includes(seoHead("fr")));
});
