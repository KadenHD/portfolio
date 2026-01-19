import { useEffect } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

const CalendlyPopup: React.FC = () => {
  useEffect(() => {
    // Load Calendly script only once
    if (!window.Calendly) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const openCalendly = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    window.Calendly?.initPopupWidget({
      url: "https://calendly.com/pierre-clement-oise/30min",
    });
  };

  return (
    <>
      {/* Calendly styles */}
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />

      <a href="#" onClick={openCalendly}>
        Calendly
      </a>
    </>
  );
};

export default CalendlyPopup;
