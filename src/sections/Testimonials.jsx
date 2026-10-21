import { useI18n } from "@/i18n/useI18n";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
export function Testimonials() {
  const { t } = useI18n();
  const { testimonials } = t.data;
  const [active, setActive] = useState(0);
  const item = testimonials[active];
  return (
    <section
      id="testimonials"
      className="testimonials-section"
      aria-labelledby="testimonials-title"
    >
      <div className="page-width testimonial-layout">
        <div className="testimonial-heading">
          <h2 id="testimonials-title">
            {t.testimonials.title}
            <br />
            {t.testimonials.subtitle}
            <span className="accent">.</span>
          </h2>
          <div className="testimonial-controls">
            <button
              aria-label={t.testimonials.previous}
              onClick={() =>
                setActive(
                  (active + testimonials.length - 1) % testimonials.length,
                )
              }
            >
              <ArrowLeft aria-hidden="true" size={21} />
            </button>
            <span>
              {active + 1} / {testimonials.length}
            </span>
            <button
              aria-label={t.testimonials.next}
              onClick={() => setActive((active + 1) % testimonials.length)}
            >
              <ArrowRight aria-hidden="true" size={21} />
            </button>
          </div>
        </div>
        <div
          className="testimonial-content"
          aria-live="polite"
          aria-atomic="true"
        >
          <Quote className="quote-icon" size={32} aria-hidden="true" />
          <blockquote>{item.quote}</blockquote>
          <div className="quote-author">
            <img
              src={item.avatar}
              alt=""
              width="52"
              height="52"
              loading="lazy"
            />
            <div>
              <strong>{item.author}</strong>
              <span>{item.role}</span>
              {item.traduce_from && <small>{t.testimonials.translated}</small>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
