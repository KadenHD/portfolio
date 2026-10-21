import { useI18n } from "@/i18n/useI18n";
import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, X } from "lucide-react";

export const Popup = forwardRef(function Popup(
  { onClose, title, content },
  forwardedRef,
) {
  const { t } = useI18n();
  const localRef = useRef(null);
  const contentRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    overflows: false,
    atTop: true,
  });

  const updateScrollState = useCallback(() => {
    const element = contentRef.current;
    if (!element) return;
    const overflows = element.scrollHeight > element.clientHeight + 1;
    const atTop = element.scrollTop < 2;
    setScrollState((previous) =>
      previous.overflows === overflows && previous.atTop === atTop
        ? previous
        : { overflows, atTop },
    );
  }, []);

  useEffect(() => {
    const dialog = localRef.current;
    const active = document.activeElement;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(updateScrollState);
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(contentRef.current);
    let mounted = true;
    document.fonts.ready.then(() => {
      if (mounted) updateScrollState();
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      dialog.close();
      document.body.style.overflow = previousOverflow;
      active?.focus();
    };
  }, [updateScrollState]);

  function scrollToTop() {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <dialog
      ref={(node) => {
        localRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      className="legal-dialog"
      aria-labelledby="legal-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === localRef.current) {
          const rect = event.target.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="dialog-heading">
        <h2 id="legal-dialog-title">{title}</h2>
        <button type="button" onClick={onClose} aria-label={t.legal.close}>
          <X size={22} aria-hidden="true" />
        </button>
      </div>
      <div
        className="legal-content"
        ref={contentRef}
        onScroll={updateScrollState}
        tabIndex={0}
        aria-label={title}
      >
        {content.map((section, index) => (
          <section key={index}>
            {section.title && <h3>{section.title}</h3>}
            {section.texts?.map((text, i) => (
              <p key={i}>
                {Array.isArray(text)
                  ? text.map((part, index) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <a
                          key={index}
                          href={part.href}
                          className={
                            part.noWrap ? "legal-identifier" : undefined
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {part.text}
                        </a>
                      ),
                    )
                  : text}
              </p>
            ))}
            {section.links?.map((link) => (
              <p key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </p>
            ))}
          </section>
        ))}
      </div>
      <div className="dialog-actions">
        <button type="button" className="button" onClick={onClose}>
          {t.common.close}
        </button>
        {scrollState.overflows && (
          <button
            type="button"
            className="dialog-scroll-top"
            onClick={scrollToTop}
            disabled={scrollState.atTop}
            aria-label={t.legal.top}
          >
            {t.common.top} <ArrowUp size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </dialog>
  );
});
