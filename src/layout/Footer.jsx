import { useI18n } from "@/i18n/useI18n";
import { ArrowUp } from "lucide-react";
import { pageHref } from "@/i18n/routing";
import { socialLinks } from "@/data/socials";
export function Footer() {
  const { t, locale, page } = useI18n();
  const homeHref = pageHref(locale);
  const sectionHref = (hash) => (page === "home" ? hash : homeHref + hash);
  return (
    <footer className="site-footer page-width">
      <div className="footer-top">
        <a
          className="wordmark"
          href={page === "home" ? "#" : homeHref}
          aria-label={t.nav.home}
        >
          <span className="wordmark-initial">P</span>ierre{" "}
          <span className="wordmark-initial">C</span>lément
          <span className="wordmark-dot">.</span>
        </a>
        <p>{t.footer.tagline}</p>
        <div className="social-links">
          {socialLinks.map((social) => {
            const { id, label, href, icon: Icon } = social;
            return (
              <a key={id} href={href} target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">
                  <Icon size={18} />
                </span>
                {label}
              </a>
            );
          })}
        </div>
      </div>
      <nav className="footer-section-links" aria-label={t.serviceAreas.heading}>
        <a href={sectionHref("#service-areas")}>{t.serviceAreas.areasLink}</a>
        <a href={sectionHref("#faq")}>{t.serviceAreas.faqLink}</a>
      </nav>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Pierre Clément</small>
        <div>
          <a
            href={pageHref(locale, "legalNotice")}
            aria-current={page === "legalNotice" ? "page" : undefined}
          >
            {t.footer.legal}
          </a>
          <a
            href={pageHref(locale, "privacyPolicy")}
            aria-current={page === "privacyPolicy" ? "page" : undefined}
          >
            {t.footer.privacy}
          </a>
          <a href="#">
            {t.common.top} <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
