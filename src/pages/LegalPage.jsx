import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";
import { pageHref } from "@/i18n/routing";

function LegalLink({ href, text, noWrap }) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={noWrap ? "legal-identifier" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {text}
    </a>
  );
}

export function LegalPage() {
  const { t, locale, page } = useI18n();
  const isNotice = page === "legalNotice";
  const title = isNotice ? t.legal.notice : t.legal.privacy;
  const otherPage = isNotice ? "privacyPolicy" : "legalNotice";
  const otherTitle = isNotice ? t.legal.privacy : t.legal.notice;

  return (
    <main id="main" className="legal-page page-width">
      <article className="legal-document" aria-labelledby="legal-title">
        <a className="legal-back" href={pageHref(locale)}>
          <ArrowLeft size={18} aria-hidden="true" /> {t.legal.back}
        </a>
        <header className="legal-heading">
          <h1 id="legal-title">
            {title}
            <span className="accent">.</span>
          </h1>
        </header>
        <div className="legal-content">
          {t.data[page].map((section, index) => (
            <section key={index}>
              {section.title && <h2>{section.title}</h2>}
              {section.texts?.map((text, i) => (
                <p key={i}>
                  {Array.isArray(text)
                    ? text.map((part, j) =>
                        typeof part === "string" ? (
                          part
                        ) : (
                          <LegalLink key={j} {...part} />
                        ),
                      )
                    : text}
                </p>
              ))}
              {section.links?.map((link) => (
                <p key={link.href}>
                  <LegalLink {...link} />
                </p>
              ))}
            </section>
          ))}
        </div>
        <nav className="legal-page-actions" aria-label={t.legal.navigation}>
          <a className="legal-back" href={pageHref(locale)}>
            <ArrowLeft size={18} aria-hidden="true" /> {t.legal.back}
          </a>
          <a className="legal-back" href={pageHref(locale, otherPage)}>
            {otherTitle} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </nav>
      </article>
    </main>
  );
}
