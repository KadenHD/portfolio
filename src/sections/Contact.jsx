import { useI18n } from "@/i18n/useI18n";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  LoaderCircle,
  Mail,
  Phone,
} from "lucide-react";
import { business } from "@/data/legal";
const address = business.email;
export function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);
  const [status, setStatus] = useState(null);
  const configured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
  async function submit(event) {
    event.preventDefault();
    if (inFlight.current) return;
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        key: "validation",
      });
      return;
    }
    if (!configured) return;
    inFlight.current = true;
    setSending(true);
    setStatus(null);
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      setStatus({
        type: "success",
        key: "success",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({
        type: "error",
        key: "error",
      });
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }
  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const emailDraft = `mailto:${address}?subject=${encodeURIComponent(t.contact.subject)}&body=${encodeURIComponent(`${t.contact.greeting}\n\n${form.message}\n\n${form.name}\n${form.email}`)}`;
  return (
    <section
      id="contact"
      className="contact-section page-width"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <h2 id="contact-title">
          {t.contact.title}
          <br />
          {t.contact.subtitle}
          <span className="accent">.</span>
        </h2>
        <p>{t.contact.intro}</p>
        <a className="contact-email" href={`mailto:${address}`}>
          <Mail size={20} aria-hidden="true" />
          {address}
        </a>
        <a className="contact-phone" href="tel:+33682635025">
          <Phone size={18} aria-hidden="true" />
          +33 6 82 63 50 25
        </a>
        <p className="contact-location">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Oise%2C%20France"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Oise ${t.contact.maps}, ${t.common.newTab}`}
          >
            Oise
          </a>
          {" : "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Compi%C3%A8gne%2C%20France"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compiègne ${t.contact.maps}, ${t.common.newTab}`}
          >
            Compiègne
          </a>
          {", "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Beauvais%2C%20France"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Beauvais ${t.contact.maps}, ${t.common.newTab}`}
          >
            Beauvais
          </a>
          <br />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Hauts-de-France%2C%20France"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Hauts-de-France ${t.contact.maps}, ${t.common.newTab}`}
          >
            Hauts-de-France
          </a>
          ,{" "}
          <a
            href="https://www.google.com/maps/search/?api=1&query=%C3%8Ele-de-France%2C%20France"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Île-de-France ${t.contact.maps}, ${t.common.newTab}`}
          >
            Île-de-France
          </a>
          <br />
          {t.contact.remote}
        </p>
        <a
          className="text-link"
          href="https://calendly.com/pierre-clement-oise/30min"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.contact.meeting}
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
      <form
        onSubmit={submit}
        className="contact-form"
        aria-busy={sending}
        aria-describedby="contact-privacy"
      >
        <div className="form-pair">
          <div>
            <label htmlFor="contact-name">{t.contact.name}</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              maxLength={120}
              required
              value={form.name}
              onChange={update}
              placeholder={t.contact.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="contact-email">{t.contact.email}</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              value={form.email}
              onChange={update}
              placeholder={t.contact.emailPlaceholder}
            />
          </div>
        </div>
        <label htmlFor="contact-message">{t.contact.message}</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={10000}
          required
          value={form.message}
          onChange={update}
          placeholder={t.contact.messagePlaceholder}
        />
        <p className="form-note" id="contact-privacy">
          {t.contact.privacy} <a href="#privacy-policy">{t.contact.policy}</a>.
        </p>
        {configured ? (
          <button className="button" type="submit" disabled={sending}>
            {sending ? (
              <>
                <LoaderCircle
                  className="loading-icon"
                  size={20}
                  aria-hidden="true"
                />
                {t.contact.sending}
              </>
            ) : (
              <>
                {t.contact.send}
                <ArrowRight size={20} aria-hidden="true" />
              </>
            )}
          </button>
        ) : (
          <>
            <p className="form-fallback">{t.contact.fallback}</p>
            <a className="button" href={emailDraft}>
              {t.contact.emailContinue}
              <ArrowRight size={20} aria-hidden="true" />
            </a>
          </>
        )}
        {status && (
          <div
            className={`form-status ${status.type}`}
            role={status.type === "error" ? "alert" : "status"}
          >
            <p>{t.contact[status.key]}</p>
            {status.type === "error" && (
              <a href={emailDraft}>
                {t.contact.emailSend}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        )}
      </form>
    </section>
  );
}
