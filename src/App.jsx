import { useI18n } from "@/i18n/useI18n";
import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { ServiceAreas } from "@/sections/ServiceAreas";

export default function App() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <ServiceAreas />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
