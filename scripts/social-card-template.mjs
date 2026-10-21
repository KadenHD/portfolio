import { escapeHtml } from "../src/lib/seo.js";

const copy = {
  fr: {
    role: ["Ingénieur", "logiciel", "indépendant."],
    offer: ["Conseil IT & développement", "sur mesure."],
    ai: "IA",
  },
  en: {
    role: ["Freelance", "software", "engineer."],
    offer: ["IT consulting & custom", "software development."],
    ai: "AI",
  },
};

export function socialCardHtml({ locale, font, portrait, icon }) {
  const text = copy[locale];
  if (!text) throw new Error(`Unsupported social card locale: ${locale}`);
  return `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <style>
    @font-face {
      font-family: Manrope;
      src: url(data:font/ttf;base64,${font});
      font-weight: 200 800;
      font-display: block;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      width: 1200px;
      height: 630px;
      display: grid;
      grid-template-columns: 744px 456px;
      background: #fff;
      color: #091638;
      font-family: Manrope, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .copy { padding: 52px 54px 44px; display: flex; flex-direction: column; }
    .signature { display: flex; align-items: center; gap: 18px; }
    .signature img { width: 52px; height: 52px; }
    .signature p { margin: 0; font-size: 30px; font-weight: 750; letter-spacing: -.035em; }
    .signature span { color: #f44b0b; }
    h1 { margin: 32px 0 22px; font-size: 92px; font-weight: 800; line-height: 1.02; letter-spacing: -.035em; }
    h1 span { display: block; }
    h1 span:last-child { color: #f44b0b; }
    .offer { margin: 0; font-size: 26px; line-height: 1.45; color: #516079; }
    .offer span { display: block; }
    .skills { display: flex; align-items: center; gap: 16px; margin-top: 22px; font-size: 18px; font-weight: 550; color: #516079; }
    .skills span + span::before { content: '/'; margin-right: 16px; color: #c83c0a; }
    .person { margin: 0; background: #fff; padding: 48px 42px 34px; display: flex; flex-direction: column; }
    .portrait { display: block; width: 372px; height: 465px; object-fit: cover; border-radius: 5px; }
    .person figcaption { margin-top: auto; padding-top: 22px; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .url { color: #091638; font-size: 16px; font-weight: 650; letter-spacing: -.015em; white-space: nowrap; }
    .arrow { display: block; width: 31px; height: 31px; color: #c83c0a; }
  </style>
</head>
<body>
  <main class="copy">
    <div class="signature">
      <img src="data:image/svg+xml;base64,${icon}" alt="">
      <p>Pierre Clément<span>.</span></p>
    </div>
    <h1>${text.role.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</h1>
    <p class="offer">${text.offer.map((line) => `<span>${escapeHtml(line)}</span>`).join("")}</p>
    <div class="skills"><span>Full-stack</span><span>DevOps</span><span>Architecture</span><span>${text.ai}</span><span>R&amp;D</span></div>
  </main>
  <figure class="person">
    <img class="portrait" alt="Pierre Clément" src="data:image/webp;base64,${portrait}">
    <figcaption>
      <span class="url">pierre-clement-oise.fr${locale === "en" ? "/en/" : ""}</span>
      <svg class="arrow" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M7 25 25 7M7 7h18v18" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"/></svg>
    </figcaption>
  </figure>
</body>
</html>`;
}
