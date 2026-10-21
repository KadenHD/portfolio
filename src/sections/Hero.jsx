import { useI18n } from "@/i18n/useI18n";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { socialLinks } from "@/data/socials";

export function Hero() {
  const { t } = useI18n();
  const experienceYears = new Date().getFullYear() - 2020 - 1;
  return (
    <section className="hero page-width" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          {t.hero.title}
          <br />
          <span>{t.hero.accent}</span>
        </h1>
        <p className="hero-offer">
          {t.hero.role}
          <br />
          {t.hero.offer}
        </p>
        <p className="hero-intro">
          {t.hero.intro}
          <br className="desktop-break" /> {t.hero.terms}
        </p>
        <p className="hero-location">{t.hero.location}</p>
        <div className="hero-actions">
          <a className="button" href="#contact">
            {t.hero.cta} <ArrowRight size={20} aria-hidden="true" />
          </a>
          <a className="text-link" href="#experience">
            {t.hero.career} <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
      <figure className="portrait">
        <div className="portrait-image">
          <img
            className="portrait-photo"
            src="/images/pierre-clement-portrait-relaxed.webp"
            srcSet="/images/pierre-clement-portrait-relaxed-640.webp 640w, /images/pierre-clement-portrait-relaxed.webp 1024w"
            sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 33vw, 364px"
            width="1024"
            height="1280"
            alt={t.hero.alt}
            fetchPriority="high"
            decoding="async"
          />
          <div className="portrait-badges">
            <p className="portrait-experience portrait-glass">
              <BriefcaseBusiness size={16} aria-hidden="true" />
              <span aria-hidden="true">
                <span className="portrait-experience-years">
                  +{experienceYears}
                </span>{" "}
                {t.hero.yearsShort}
              </span>
              <span className="sr-only">
                {t.hero.experienceLabel.replace("{years}", experienceYears)}
              </span>
            </p>
            <nav className="portrait-socials" aria-label={t.hero.socials}>
              {socialLinks.map((social) => {
                const { id, label, href, icon: Icon } = social;
                return (
                  <a
                    key={id}
                    className="portrait-social-link portrait-glass"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                  >
                    <span aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <span className="sr-only">
                      {label}, {t.common.newTab}
                    </span>
                  </a>
                );
              })}
            </nav>
          </div>
          <p className="portrait-availability portrait-glass">
            <span className="availability-dot" aria-hidden="true" />
            {t.hero.available}
          </p>
        </div>
        <figcaption>
          <strong>Pierre Clément</strong>
          <span>{t.hero.captionRole}</span>
          <span>{t.hero.offer}</span>
        </figcaption>
      </figure>
    </section>
  );
}
