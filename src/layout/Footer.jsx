import { SiGithub } from "@icons-pack/react-simple-icons"
import { MaltIcon } from "@/icons/MaltIcon"
import { LinkedInIcon } from "@/icons/LinkedInIcon"
import { UTCIcon } from "@/icons/UTCIcon"
import { useState, useEffect, useRef } from "react";
import { LegalNoticePopup } from "@/layout/LegalNoticePopup";
import { PrivacyPolicyPopup } from "@/layout/PrivacyPolicyPopup"
import {FadeUp} from "@/components/FadeUp"

const socialLinks = [
    {icon: LinkedInIcon, href: "https://www.linkedin.com/in/pierre--clement", label: "LinkedIn"},
    {icon: SiGithub, href: "https://github.com/KadenHD", label: "GitHub"},
    { icon: UTCIcon, href: "https://uteam.fr/consultant/presentation/pierre-clement", label: "UTeam"},
    {icon: MaltIcon, href: "https://www.malt.fr/profile/pierreclement1", label: "Malt"},
]

const footerLinks = [
  { href: "#about", label: "À propos" },
  { href: "#projects", label: "Projets" },
  { href: "#experience", label: "Expériences" },
  { href: "#testimonials", label: "Témoignages" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const legalRef = useRef(null);
  const privacyRef = useRef(null)
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const [isLegalOpen, setLegalOpen] = useState(false);
  const openPrivacyPolicy = () => {setPrivacyOpen(true); setLegalOpen(false); window.location.href="#privacy-policy";}
  const openLegalNotice = () => {setLegalOpen(true); setPrivacyOpen(false); window.location.href="#legal-notice";}
  const closePrivacyPolicy = () => {
    if (privacyRef.current) {
      privacyRef.current.classList.add("animate-fade-out");
      privacyRef.current.addEventListener(
        "animationend",
        () => setPrivacyOpen(false),
        { once: true }
      );
    }
  };
  const closeLegalNotice = () => {
    if (legalRef.current) {
      legalRef.current.classList.add("animate-fade-out");
      legalRef.current.addEventListener(
        "animationend",
        () => setLegalOpen(false),
        { once: true }
      );
    }
  };

  useEffect(() => {
    if (isPrivacyOpen || isLegalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPrivacyOpen, isLegalOpen]);

  useEffect(() => {
      const hash = window.location.hash;

      if (hash === "#privacy-policy") {
          requestAnimationFrame(() => openPrivacyPolicy());
      } else if (hash === "#legal-notice") {
          requestAnimationFrame(() => openLegalNotice());
      }
  }, []);

  return (
    <footer className="py-8 border-t border-border overflow-hidden">
      <FadeUp direction="up">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo & Copyright */}
            <div className="text-center md:text-left">
              <a href="#" className="text-xl font-bold tracking-tigh group">
                  <span className="group-hover:text-primary transition-colors">P</span>ierre <span className="group-hover:text-primary transition-colors">C</span>lément<span className="text-primary">.</span>
              </a>
              <p className="text-sm text-muted-foreground mt-2">
                © {currentYear} Pierre Clément. Tous droits réservés.
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-6">
              <button onClick={openPrivacyPolicy} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Politique de confidentialité
              </button>
              <button onClick={openLegalNotice} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Mentions légales
              </button>
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </FadeUp>
      
      {/* Legal Popups */}
      {isPrivacyOpen && <PrivacyPolicyPopup ref={privacyRef} onClose={closePrivacyPolicy} />}
      {isLegalOpen && <LegalNoticePopup ref={legalRef} onClose={closeLegalNotice} />}
    </footer>
  );
};
