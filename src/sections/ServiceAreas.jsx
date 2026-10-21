import { ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/useI18n";

export function ServiceAreas() {
  const { t } = useI18n();
  const content = t.serviceAreas;
  return (
    <section
      id="service-areas"
      className="service-areas page-width"
      aria-labelledby="service-areas-title"
    >
      <div className="local-presence">
        <div className="local-references">
          <h2 id="service-areas-title">
            {content.heading}
            <span className="accent">.</span>
          </h2>
          <p>{content.intro}</p>
          <p>{content.audience}</p>
          <h3>{content.evidence}</h3>
          <ul>
            {content.references.map((reference) => (
              <li key={reference.experienceId}>
                <a
                  className="text-link"
                  href={`#experience-${reference.experienceId}`}
                >
                  {reference.label}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="local-faq" id="faq" aria-labelledby="faq-title">
          <h3 id="faq-title">{content.faqHeading}</h3>
          {content.questions.map((item, index) => (
            <details
              className="faq-item"
              id={`faq-${item.id}`}
              key={item.id}
              open={index === 0}
            >
              <summary>
                {item.question}
                <ArrowRight size={18} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
