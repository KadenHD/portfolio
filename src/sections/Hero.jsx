import { Button } from "@/components/Button"
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton"
import { LinkedInIcon } from "@/icons/LinkedInIcon"
import { ArrowRight, Download, ChevronDown } from "lucide-react"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { MaltIcon } from "@/icons/MaltIcon"
import { CollectiveWorkIcon } from "@/icons/CollectiveWorkIcon"
import { UTCIcon } from "@/icons/UTCIcon"
import {FadeUp} from "@/components/FadeUp"
import { useState } from "react";

const socialLinks = [
    {icon: LinkedInIcon, href: "https://www.linkedin.com/in/pierre--clement", label: "LinkedIn"},
    {icon: SiGithub, href: "https://github.com/KadenHD", label: "GitHub"},
    { icon: UTCIcon, href: "https://uteam.fr/consultant/presentation/pierre-clement", label: "UTeam"},
    {icon: MaltIcon, href: "https://www.malt.fr/profile/pierreclement1", label: "Malt"},
    {icon: CollectiveWorkIcon, href: "https://www.collective.work/profile/pierre-clement", label: "Collective Work"}
]

const skills = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "React Native",
  "Vue.js",
  "Node.js",
  "Express",
  "FastAPI",
  "API REST",
  "Full-Stack",
  "Front-End",
  "Back-End",
  "Applications mobiles",
  "Développement web",
  "SaaS",
  "Algorithmes",
  "POO",
  "MVC",
  "Microservices",
  "SQL",
  "NoSQL",
  "SGBD",
  "Docker",
  "CI/CD",
  "AWS",
  "Azure",
  "Cloud",
  "Git",
  "GitHub",
  "GitLab",
  "Linux",
  "IA",
  "Apprentissage automatique",
  "Analyse de données",
  "Traitement d’images",
  "R&D",
  "Systèmes embarqués",
  "ROS",
  "Tests unitaires",
  "Tests fonctionnels",
  "Agile",
  "Kanban",
  "Gantt",
  "Gestion de projet",
  "Automatisation",
  "Intégration",
  "SEO"
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const randomizedSkills = shuffle(skills);

export const Hero = () => {
    const experienceYears = new Date().getFullYear() - 2021;
    const downloadPDF = () => {
        const name = "pierre_clement_cv.pdf"
        const link = document.createElement("a");
        link.href = "/"+name;
        link.download = name;
        link.click();
    }

    const [dots] = useState(() => {
        // This function runs only once on initial mount
        return [...Array(30)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `slow-drift ${15 + Math.random() * 20}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 5}s`
        }));
    });

    return <section className="relative min-h-screen flex items-center overflow-hidden ">
        {/* Bg */}
        <div className="absolute inset-0">
            <img src="/hero-bg.webp" alt="Hero image" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background"></div>

        {/* Dots */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none animate-pulse blur-xs">
            {dots.map((dot, i) => (
            <div
                key={i}
                className="absolute w-3 h-3 rounded-full opacity-60 bg-primary"
                style={dot}
            />
            ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-8">
                    <FadeUp delay={0.0} direction="right">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs md:text-sm text-primary">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            Ingénieur Logiciel ✦ Conseil & Développement
                        </span>
                    </FadeUp>

                    {/* Content */}
                    <div className="space-y-4">
                        <FadeUp delay={0.1} direction="right">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                Conception et développement de <span className="text-primary glow-text">logiciels</span>
                                <span className="font-signature italic font-normal text-white">
                                    {" "}
                                    sur mesure.
                                </span>
                            </h1>
                        </FadeUp>

                        <FadeUp delay={0.2} direction="right">
                            <p className="text-lg text-muted-foreground max-w-lg">
                                Bonjour, je suis Pierre Clément, consultant indépendant spécialisé en ingénierie logicielle. J’accompagne startups et PME dans la conception et le développement de logiciels sur mesure, de l’analyse des besoins à la mise en production.
                            </p>
                        </FadeUp>
                    </div>

                    {/* CTAs */}
                    <FadeUp className="flex flex-wrap gap-4" delay={0.3} direction="right">
                        <Button onClick={()=> window.location.href="#contact"} size="lg">
                            Contactez-moi
                            <ArrowRight className="w-5 h-5" />
                        </Button>

                        <AnimatedBorderButton   onClick={() => downloadPDF()}>
                            <Download className="w-5 h-5" />
                            Télécharger mon CV
                        </AnimatedBorderButton>
                    </FadeUp>
                    {/* Social Links */}
                    <FadeUp className="flex items-center gap-4" delay={0.4} direction="right">
                        <span className="text-sm text-muted-foreground">Me retrouver: </span>
                        {socialLinks.map((social, index) => (
                            <a aria-label={social.label} key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300">
                                {<social.icon className="w-5 h-5" />}
                            </a>
                        ))}
                    </FadeUp>
                </div>
                {/* Right Column - Profile Image */}
                <FadeUp className="relative" delay={0.1} direction="left">
                        {/* Profile Image */}
                        <div className="relative max-w-md mx-auto">
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse " />
                            <div className="relative glass rounded-3xl p-2 glow-border">
                                <img src="/profile-photo.webp" alt="Pierre Clément" className="w-full aspect-4/5 object-cover rounded-2xl opacity-70" />
                                {/* Floating Badge */}
                                <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-sm font-medium">Disponible</span>
                                    </div>
                                </div>
                                {/* Stats Badge */}
                                <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500 flex items-center justify-center gap-2">
                                    <div className="text-2xl font-bold text-primary">{experienceYears}+</div>
                                    <div className="text-sm text-muted-foreground">Années d'expériences</div>
                                </div>
                            </div>
                        </div>
                </FadeUp>
            </div>
            {/* Skills Section */}
            <FadeUp className="pt-12 md:pt-0" delay={0.5}>
                <p className="font-semibold text-muted-foreground text-center">Compétences développées</p>
                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10" />
                    <div className="flex w-max animate-marquee">
                        {[...randomizedSkills, ...randomizedSkills].map((skill, idx) => (
                            <div key={idx} className="shrink-0 px-8 py-4">
                                <span className="cursor-pointer text-xl font-semibold text-white/90 transition-colors animate-pulse">
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeUp>
        </div>

        {/* Scroll Button */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <FadeUp delay={0.7}>
                <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary-foreground transition-colors group">
                    <span className="text-xs uppercase tracking-wider">Voir plus</span>
                    <ChevronDown className="w-6 h-6 animate-bounce" />
                </a>
            </FadeUp>
        </div>
    </section>
}
