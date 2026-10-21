import { useI18n } from "@/i18n/useI18n";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { LegalNoticePopup } from "@/layout/LegalNoticePopup";
import { PrivacyPolicyPopup } from "@/layout/PrivacyPolicyPopup";
import { socialLinks } from "@/data/socials";
export function Footer() {
  const { t } = useI18n();
  const [panel, setPanel] = useState(() =>
    window.location.hash === "#privacy-policy"
      ? "privacy"
      : window.location.hash === "#legal-notice"
        ? "legal"
        : null,
  );
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#privacy-policy") setPanel("privacy");
      else if (window.location.hash === "#legal-notice") setPanel("legal");
      else setPanel(null);
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  function show(type) {
    setPanel(type);
  }
  const close = () => {
    setPanel(null);
    if (["#privacy-policy", "#legal-notice"].includes(window.location.hash)) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
  };
  return (
    <footer className="site-footer page-width">
      <div className="footer-top">
        <a className="wordmark" href="#" aria-label={t.nav.home}>
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
        <a href="#service-areas">{t.serviceAreas.areasLink}</a>
        <a href="#faq">{t.serviceAreas.faqLink}</a>
      </nav>
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Pierre Clément</small>
        <div>
          <button onClick={() => show("legal")}>{t.footer.legal}</button>
          <button onClick={() => show("privacy")}>{t.footer.privacy}</button>
          <a href="#">
            {t.common.top} <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      {panel === "legal" && <LegalNoticePopup onClose={close} />}
      {panel === "privacy" && <PrivacyPolicyPopup onClose={close} />}
    </footer>
  );
}
