import assert from "node:assert/strict";
import { readFile, mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import { canonicalUrl, metadata, pageMetadata, structuredData } from "../src/lib/seo.js";
import { localePaths, pageHref, siteRoutes } from "../src/i18n/routing.js";
import fr from "../src/i18n/fr.js";
import en from "../src/i18n/en.js";

const output = path.resolve("static-pages");
const origin = "https://portfolio.test";
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json",
};
const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const screenshots = process.env.PORTFOLIO_SCREENSHOTS;
if (screenshots) await mkdir(screenshots, { recursive: true });
let emailResult = "success";
let emailRequests = 0;
const externalRequests = [];
const errors = [];
async function pageFor({
  javaScript = true,
  width = 1440,
  height = 1000,
} = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.setJavaScriptEnabled(javaScript);
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setRequestInterception(true);
  page.on("request", async (request) => {
    const url = new URL(request.url());
    if (url.origin === origin) {
      let pathname = decodeURIComponent(url.pathname);
      if (pathname.endsWith("/")) pathname += "index.html";
      const file = path.resolve(output, "." + pathname);
      if (!file.startsWith(output + path.sep)) return request.abort();
      try {
        const body = await readFile(file);
        return request.respond({
          status: 200,
          contentType: mime[path.extname(file)] ?? "application/octet-stream",
          body,
        });
      } catch {
        errors.push(`Missing local file: ${pathname}`);
        return request.respond({ status: 404, body: "Not found" });
      }
    }
    if (url.hostname === "api.emailjs.com") {
      const headers = {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-headers": "Content-Type",
      };
      if (request.method() === "OPTIONS")
        return request.respond({ status: 204, headers });
      emailRequests += 1;
      return request.respond({
        status: emailResult === "success" ? 200 : 500,
        headers,
        body: emailResult === "success" ? "OK" : "Simulated failure",
      });
    }
    externalRequests.push(url.hostname);
    return request.abort();
  });
  return page;
}
async function ready(page, locale, pageKey = "home") {
  const catalog = locale === "fr" ? fr : en;
  await page.waitForFunction(
    ({ language, heading }) =>
      document.documentElement.lang === language &&
      document.querySelector("h1")?.textContent.includes(heading),
    {},
    {
      language: locale,
      heading: pageKey === "home"
        ? metadata[locale].headline[0]
        : catalog.legal[pageKey === "legalNotice" ? "notice" : "privacy"],
    },
  );
  await page.evaluate(() => document.fonts.ready);
}

async function checkExperiences(page, name) {
  const rendered = await page.evaluate(() => ({
    locale: document.documentElement.lang,
    entries: [...document.querySelectorAll(".experience-entry")].map(
      (entry) => ({
        id: entry.dataset.experienceId,
        lines: [...entry.querySelectorAll(".experience-description > li")].map(
          (line) => ({
            text: line.textContent.trim(),
            bold: [...line.querySelectorAll("strong")].map(
              (element) => element.textContent,
            ),
            boldWeights: [...line.querySelectorAll("strong")].map((element) =>
              Number(getComputedStyle(element).fontWeight),
            ),
            fontSize: parseFloat(getComputedStyle(line).fontSize),
            lineHeight: parseFloat(getComputedStyle(line).lineHeight),
            clipped:
              line.scrollWidth > line.clientWidth + 1 ||
              line.scrollHeight > line.clientHeight + 1,
            markerColor: getComputedStyle(line, "::marker").color,
          }),
        ),
      }),
    ),
    cv: {
      href: document.querySelector("#experience .section-heading a").href,
      label: document
        .querySelector("#experience .section-heading a")
        .textContent.trim(),
    },
    location: document.querySelector(".contact-location").textContent,
  }));
  const catalog = rendered.locale === "fr" ? fr : en;
  assert.equal(rendered.entries.length, 5, `${name}: all five experiences`);
  for (const experience of catalog.data.experiences) {
    const entry = rendered.entries.find((item) => item.id === experience.id);
    assert.ok(entry, `${name}: ${experience.id} is present`);
    assert.deepEqual(
      entry.lines.map((line) => line.text),
      experience.description.map((line) => line.trim()),
      `${name}: complete descriptions for ${experience.id}`,
    );
    for (const line of entry.lines) {
      assert.equal(line.clipped, false, `${name}: clipped experience text`);
      assert.ok(
        line.fontSize >= 13 && line.lineHeight >= line.fontSize * 1.5,
        `${name}: readable experience typography`,
      );
      assert.equal(
        line.markerColor,
        "rgb(244, 75, 11)",
        `${name}: orange bullets`,
      );
      assert.ok(
        line.bold.length && line.boldWeights.every((weight) => weight >= 700),
        `${name}: visible emphasis`,
      );
      // Longer phrases must remain intact, even when they contain another keyword.
      for (const phrase of catalog.experience.emphasis) {
        if (
          line.text.toLocaleLowerCase().includes(phrase.toLocaleLowerCase())
        ) {
          assert.ok(
            line.bold.some((text) =>
              text.toLocaleLowerCase().includes(phrase.toLocaleLowerCase()),
            ),
            `${name}: missing complete emphasis for ${phrase}`,
          );
        }
      }
    }
  }
  assert.equal(rendered.cv.href, catalog.experience.cvHref);
  assert.equal(rendered.cv.label, catalog.experience.cv);
  assert.ok(rendered.location.includes(catalog.contact.remote));
  assert.doesNotMatch(
    rendered.location,
    /partout en France|throughout France|France only/i,
  );
  if (screenshots && page.viewport().width <= 390) {
    const entry = await page.$('[data-experience-id="nightingale"]');
    await entry.screenshot({
      path: path.join(screenshots, `${name}-experience-detail.png`),
    });
  }
}
async function layout(page, name) {
  // Force lazy assets to load so missing files below the fold are checked too.
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((image) => {
        image.loading = "eager";
        if (image.complete) return;
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  });
  const info = await page.evaluate(() => ({
    locale: document.documentElement.lang,
    overflow: document.documentElement.scrollWidth > innerWidth,
    brokenImages: [...document.images]
      .filter((image) => image.complete && !image.naturalWidth)
      .map((image) => image.getAttribute("src")),
    tagCounts: [...document.querySelectorAll(".project-tags")].map(
      (list) => list.children.length,
    ),
    headings: document.querySelectorAll("h1").length,
    projectHeadings: document.querySelectorAll("#projects h2").length,
    projectNames: [...document.querySelectorAll("#projects article h3")].map(
      (heading) => heading.textContent,
    ),
    projectContributions: [...document.querySelectorAll("#projects article .contribution")].map(
      (paragraph) => paragraph.textContent,
    ),
  }));
  assert.equal(info.overflow, false, `${name}: horizontal overflow`);
  assert.deepEqual(info.brokenImages, [], `${name}: broken images`);
  assert.deepEqual(info.tagCounts, [13, 13, 13, 15]);
  assert.equal(info.headings, 1);
  assert.equal(info.projectHeadings, 1, `${name}: one heading for all projects`);
  const catalog = info.locale === "en" ? en : fr;
  assert.deepEqual(
    info.projectNames,
    catalog.projects.summaries.map((summary) => summary.name),
  );
  assert.deepEqual(
    info.projectContributions,
    catalog.projects.summaries.map(
      (summary) => `${catalog.projects.contribution} ${summary.contribution}`,
    ),
  );
  await checkExperiences(page, name);
  if (screenshots)
    await page.screenshot({
      path: path.join(screenshots, `${name}.png`),
      fullPage: true,
    });
}
async function legalLayout(page, { locale, page: pageKey }, name) {
  const catalog = locale === "fr" ? fr : en;
  const info = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    headings: document.querySelectorAll("h1").length,
    dialogs: document.querySelectorAll("dialog").length,
    contentOverflow: getComputedStyle(document.querySelector(".legal-content")).overflowY,
    sections: [...document.querySelectorAll(".legal-content section")].map((section) => ({
      title: section.querySelector("h2")?.textContent ?? null,
      texts: [...section.querySelectorAll("p")].map((node) => node.textContent),
    })),
    fonts: [...document.querySelectorAll(".legal-content section:not(:first-child) p")].map((node) => parseFloat(getComputedStyle(node).fontSize)),
    back: document.querySelector(".legal-back").getAttribute("href"),
    menuLinks: [...document.querySelectorAll(".navigation a")].map((node) => node.getAttribute("href")),
    legacyLinks: document.querySelectorAll('a[href="#legal-notice"], a[href="#privacy-policy"]').length,
  }));
  assert.equal(info.overflow, false, `${name}: horizontal overflow`);
  assert.equal(info.headings, 1, `${name}: one H1`);
  assert.equal(info.dialogs, 0, `${name}: native document page`);
  assert.equal(info.contentOverflow, "visible", `${name}: normal page scrolling`);
  assert.equal(info.legacyLinks, 0);
  assert.equal(info.back, localePaths[locale]);
  assert.ok(info.fonts.every((font) => font >= 16), `${name}: readable paragraphs`);
  assert.deepEqual(info.sections, catalog.data[pageKey].map((section) => ({
    title: section.title ?? null,
    texts: [
      ...(section.texts ?? []).map((text) => Array.isArray(text)
        ? text.map((part) => typeof part === "string" ? part : part.text).join("")
        : text),
      ...(section.links ?? []).map((link) => link.text),
    ],
  })), `${name}: complete legal copy`);
  for (const href of info.menuLinks)
    assert.ok(href.startsWith(`${localePaths[locale]}#`), `${name}: menu returns to portfolio`);
  const contentLink = await page.$(".legal-content a");
  await contentLink.hover();
  assert.equal(await contentLink.evaluate((node) => getComputedStyle(node).color), "rgb(200, 60, 10)");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  if (screenshots && [1440, 390, 320].includes(page.viewport().width))
    await page.screenshot({ path: path.join(screenshots, `${name}.png`) });
}

try {
  const staticPages = new Map();
  for (const { locale, page: pageKey, pathname } of siteRoutes) {
    const page = await pageFor({ javaScript: false });
    await page.goto(`${origin}${pathname}`, {
      waitUntil: "networkidle0",
    });
    await ready(page, locale, pageKey);
    assert.equal(await page.title(), pageMetadata(locale, pageKey).title);
    assert.equal(
      await page.$eval('link[rel="canonical"]', (node) => node.href),
      canonicalUrl(locale, pageKey),
    );
    assert.equal(
      await page.$$eval("link[hreflang]", (nodes) => nodes.length),
      3,
    );
    const data = await page.evaluate(() => ({
      ids: [...document.querySelectorAll("[id]")].map((node) => node.id),
      links: [...document.querySelectorAll("a[href]")].map((node) => node.href),
      schemas: [
        ...document.querySelectorAll('script[type="application/ld+json"]'),
      ].map((node) => JSON.parse(node.textContent)),
      alternates: [...document.querySelectorAll("link[hreflang]")].map(
        (node) => [node.hreflang, node.href],
      ),
      h1Count: document.querySelectorAll("h1").length,
    }));
    assert.equal(data.h1Count, 1);
    assert.deepEqual(data.schemas, [structuredData(locale, pageKey)]);
    for (const language of ["fr", "en", "x-default"])
      assert.ok(
        data.alternates.some(
          ([name, href]) =>
            name === language &&
            href === canonicalUrl(language === "x-default" ? "fr" : language, pageKey),
        ),
      );
    staticPages.set(pathname, data);
    if (pageKey === "home") await layout(page, `${locale}-no-javascript`);
    else await legalLayout(page, { locale, page: pageKey }, `${locale}-${pageKey}-no-javascript`);
    await page.close();
  }
  // Check real static destinations and cross-page fragment targets, not SPA fallbacks.
  for (const [pathname, data] of staticPages)
    for (const href of data.links) {
      const url = new URL(href);
      if (url.origin !== origin) continue;
      if (url.hash && staticPages.has(url.pathname)) {
        const id = decodeURIComponent(url.hash.slice(1));
        assert.ok(
          staticPages.get(url.pathname).ids.includes(id),
          `${pathname}: missing target ${href}`,
        );
      }
      const file = url.pathname.endsWith("/")
        ? url.pathname + "index.html"
        : url.pathname;
      await readFile(path.resolve(output, "." + file));
    }
  for (const width of [1440, 1024, 901, 900, 768, 701, 390, 320]) {
    for (const locale of ["fr", "en"]) {
      const page = await pageFor({ width, height: width < 768 ? 844 : 1000 });
      await page.goto(`${origin}${locale === "en" ? "/en/" : "/"}`, {
        waitUntil: "networkidle0",
      });
      await ready(page, locale);
      const menuCollapsed = await page.$eval(
        ".menu-toggle",
        (node) => getComputedStyle(node).display !== "none",
      );
      await layout(page, `${locale}-${width}`);
      const expected = (locale === "fr" ? fr : en).serviceAreas.questions;
      const questions = await page.$$eval(".faq-item", (nodes) =>
        nodes.map((node) => ({
          id: node.id,
          question: node.querySelector("summary").textContent.trim(),
          answer: node.querySelector("p").textContent.trim(),
        })),
      );
      assert.deepEqual(
        questions,
        expected.map((item) => ({
          id: `faq-${item.id}`,
          question: item.question,
          answer: item.answer,
        })),
      );
      await page.focus("#faq-engagement summary");
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval("#faq-engagement", (node) => node.open),
        true,
      );
      assert.equal(
        await page.$eval(
          "#faq-engagement p",
          (node) =>
            node.getBoundingClientRect().height > 0 &&
            node.scrollWidth <= node.clientWidth + 1,
        ),
        true,
      );
      await page.keyboard.press("Enter");
      assert.equal(
        await page.$eval("#faq-engagement", (node) => node.open),
        false,
      );
      if (screenshots && [1440, 390, 320].includes(width))
        await (
          await page.$("#service-areas")
        ).screenshot({
          path: path.join(screenshots, `${locale}-${width}-local-faq.png`),
        });

      // End any smooth scrolling from focus/captures before pointer navigation.
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      if (menuCollapsed) {
        await page.click(".menu-toggle");
        assert.equal(
          await page.$eval(".menu-toggle", (node) =>
            node.getAttribute("aria-expanded"),
          ),
          "true",
        );
        await page.click('.navigation a[href="#experience"]');
        assert.equal(
          await page.$eval(".menu-toggle", (node) =>
            node.getAttribute("aria-expanded"),
          ),
          "false",
        );
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        await page.click(".menu-toggle");
      }
      assert.equal(
        await page.$eval('.navigation a[href="#testimonials"]', (node) =>
          node.textContent.trim(),
        ),
        locale === "fr" ? "Avis" : "Testimonials",
      );
      await page.click('.navigation a[href="#testimonials"]');
      await page.waitForFunction(
        () => window.location.hash === "#testimonials",
      );
      assert.equal(new URL(page.url()).hash, "#testimonials");
      await page.waitForFunction(() => {
        const top = document
          .querySelector("#testimonials h2")
          .getBoundingClientRect().top;
        return Math.abs(top - 24) <= 2;
      });
      if (menuCollapsed)
        assert.equal(
          await page.$eval(".menu-toggle", (node) =>
            node.getAttribute("aria-expanded"),
          ),
          "false",
        );
      for (const [hash, label] of [
        ["#faq", "FAQ"],
        ["#service-areas", locale === "fr" ? "Localisation" : "Service areas"],
      ]) {
        await page.evaluate(() =>
          window.scrollTo({ top: 0, behavior: "instant" }),
        );
        if (menuCollapsed) await page.click(".menu-toggle");
        const selector = `.navigation a[href="${hash}"]`;
        assert.equal(
          await page.$eval(selector, (node) => node.textContent.trim()),
          label,
        );
        await page.click(selector);
        await page.waitForFunction(
          (target) => window.location.hash === target,
          {},
          hash,
        );
        await page.waitForFunction(
          (target) => {
            const top = document
              .querySelector(target)
              .querySelector("h2, h3")
              .getBoundingClientRect().top;
            return Math.abs(top - 24) <= 2;
          },
          {},
          hash,
        );
        if (menuCollapsed)
          assert.equal(
            await page.$eval(".menu-toggle", (node) =>
              node.getAttribute("aria-expanded"),
            ),
            "false",
          );
      }
      await page.close();
    }
  }
  for (const width of [1440, 1024, 901, 900, 768, 701, 390, 320]) {
    for (const route of siteRoutes.filter(({ page }) => page !== "home")) {
      const page = await pageFor({ width, height: width < 768 ? 844 : 1000 });
      await page.goto(`${origin}${route.pathname}`, { waitUntil: "networkidle0" });
      await ready(page, route.locale, route.page);
      await legalLayout(page, route, `${route.locale}-${route.page}-${width}`);
      if (width === 390) {
        const otherLocale = route.locale === "fr" ? "en" : "fr";
        await page.click(`.language-switch a[lang="${otherLocale}"]`);
        await ready(page, otherLocale, route.page);
        assert.equal(page.url(), origin + pageHref(otherLocale, route.page));
        assert.equal(await page.title(), pageMetadata(otherLocale, route.page).title);
      }
      if (width === 320 && route.locale === "fr" && route.page === "legalNotice") {
        await page.click(".menu-toggle");
        await page.click('.navigation a[href="/#contact"]');
        await ready(page, "fr");
        assert.equal(page.url(), `${origin}/#contact`);
        assert.equal(await page.$eval(".menu-toggle", (node) => node.getAttribute("aria-expanded")), "false");
      }
      await page.close();
    }
  }
  const page = await pageFor();
  await page.goto(`${origin}/#contact`, { waitUntil: "networkidle0" });
  await ready(page, "fr");
  assert.equal(emailRequests, 0, "No EmailJS request before submission");
  await page.type("#contact-name", "Recette Portfolio");
  await page.type("#contact-email", "recette@example.com");
  await page.type(
    "#contact-message",
    "Message de recette intercepté, sans envoi réel.",
  );
  await page.click('.language-switch a[lang="en"]');
  await ready(page, "en");
  assert.equal(page.url(), `${origin}/en/#contact`);
  assert.equal(
    await page.$eval("#contact-name", (node) => node.value),
    "Recette Portfolio",
  );
  assert.equal(
    await page.$eval('link[rel="canonical"]', (node) => node.href),
    canonicalUrl("en"),
  );
  assert.equal(
    await page.$eval('label[for="contact-name"]', (node) => node.textContent),
    "Your name (required)",
  );
  assert.equal(await page.$$eval("head title", (nodes) => nodes.length), 1);
  assert.equal(
    await page.$$eval(
      'script[type="application/ld+json"]',
      (nodes) => nodes.length,
    ),
    1,
  );
  await page.goBack({ waitUntil: "domcontentloaded" });
  await ready(page, "fr");
  assert.equal(page.url(), `${origin}/#contact`);
  assert.equal(
    await page.$eval("#contact-message", (node) => node.value),
    "Message de recette intercepté, sans envoi réel.",
  );
  await page.goForward({ waitUntil: "domcontentloaded" });
  await ready(page, "en");
  const submit = await page.$('.contact-form button[type="submit"]');
  if (submit) {
    await submit.click();
    await page.waitForSelector(".form-status.success");
    assert.equal(emailRequests, 1);
    assert.equal(
      await page.$eval("#contact-message", (node) => node.value),
      "",
    );
    emailResult = "error";
    await page.type("#contact-name", "Recette Portfolio");
    await page.type("#contact-email", "recette@example.com");
    await page.type(
      "#contact-message",
      "Brouillon conservé après erreur simulée.",
    );
    await submit.click();
    await page.waitForSelector(".form-status.error");
    assert.equal(emailRequests, 2);
    assert.equal(
      await page.$eval("#contact-message", (node) => node.value),
      "Brouillon conservé après erreur simulée.",
    );
    assert.ok(
      (await page.$eval(".form-status a", (node) => node.href)).startsWith(
        "mailto:",
      ),
    );
  } else {
    const draft = await page.$eval(
      ".contact-form a.button",
      (node) => node.href,
    );
    assert.ok(decodeURIComponent(draft).includes("Hello Pierre,"));
    assert.equal(emailRequests, 0);
  }
  const privacyLink = await page.$eval(".form-note a", (node) => ({ href: node.href, target: node.target }));
  assert.equal(privacyLink.href, `${origin}/en/privacy-policy/`);
  assert.equal(privacyLink.target, "_blank", "Reading privacy preserves the contact draft");
  await page.goto(`${origin}/mentions-legales/`, { waitUntil: "networkidle0" });
  await ready(page, "fr", "legalNotice");
  await page.click('.language-switch a[lang="en"]');
  await ready(page, "en", "legalNotice");
  assert.equal(page.url(), `${origin}/en/legal-notice/`);
  assert.equal(await page.title(), pageMetadata("en", "legalNotice").title);
  assert.equal(await page.$eval('link[rel="canonical"]', (node) => node.href), canonicalUrl("en", "legalNotice"));
  await page.goBack({ waitUntil: "domcontentloaded" });
  await ready(page, "fr", "legalNotice");
  await page.goForward({ waitUntil: "domcontentloaded" });
  await ready(page, "en", "legalNotice");
  await page.reload({ waitUntil: "networkidle0" });
  await ready(page, "en", "legalNotice");
  assert.equal(
    await page.$eval('.language-switch a[lang="fr"]', (node) => node.getAttribute("href")),
    "/mentions-legales/",
  );
  const siret = await page.$eval(".legal-identifier:last-of-type", (node) => ({
    text: node.textContent,
    nowrap: getComputedStyle(node).whiteSpace,
  }));
  assert.equal(siret.text, "994 768 406 00013");
  assert.equal(siret.nowrap, "nowrap");
  await page.click('.footer-bottom a[href="/en/privacy-policy/"]');
  await ready(page, "en", "privacyPolicy");
  await page.click('.language-switch a[lang="fr"]');
  await ready(page, "fr", "privacyPolicy");
  assert.equal(page.url(), `${origin}/confidentialite/`);
  await page.click(".legal-back");
  await ready(page, "fr");
  assert.equal(page.url(), `${origin}/`);
  await page.click('.footer-bottom a[href="/mentions-legales/"]');
  await ready(page, "fr", "legalNotice");
  await page.click('.navigation a[href="/#faq"]');
  await ready(page, "fr");
  assert.equal(page.url(), `${origin}/#faq`);
  await page.goto(`${origin}/en/privacy-policy/`, { waitUntil: "networkidle0" });
  await ready(page, "en", "privacyPolicy");
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await page.click('.footer-bottom a[href="#"]');
  await page.waitForFunction(() => window.scrollY < 2);
  assert.equal(new URL(page.url()).hash, "");
  assert.deepEqual(externalRequests, [], "No unexpected third-party requests");
  assert.deepEqual(errors, [], "No browser errors or missing files");
  console.log(
    `Browser checks passed: 6 static FR/EN routes, local section and keyboard-accessible FAQ, internal links and fragments, 1440/1024/901/900/768/701/390/320px, testimonial and language navigation, draft retention, legal pages, document history/reload and contact flow (${emailRequests} mocked submissions).`,
  );
} finally {
  await browser.close();
}
