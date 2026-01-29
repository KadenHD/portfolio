import { Code2, Lightbulb, Rocket, Cpu } from "lucide-react"
import { FadeUp } from "@/components/FadeUp"

const highlights = [
    {
        icon: Lightbulb,
        title: "R&D & Innovation",
        description: "R&D, prototypage, PoC et tests itératifs pour explorer des solutions innovantes et valider rapidement la faisabilité."
    },
    {
        icon: Rocket,
        title: "Pilotage de projet",
        description: "Accompagnement et pilotage de A à Z de ton projet numérique."
    },
    {
        icon: Code2,
        title: "Développement sur mesure",
        description: "Conception et développement de solutions logicielles sur mesure, robustes et scalables."
    },
    {
        icon: Cpu,
        title: "Automatisation & IA",
        description: "Automatisation des processus métiers, intégrations des systèmes, assistance aux évolutions et insertion d’IA."
    },
]

export const About = () => {
    return <section id="about" className="py-16 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div className="space-y-8">
                    <FadeUp delay={0.0}>
                        <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">À propos de moi</span>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-secondary-foreground">
                            Créateur d'expériences digitales,
                            <span className="font-signature italic font-normal text-white">
                                {" "}
                                robustes et intelligentes.
                            </span>
                        </h2>
                    </FadeUp>

                    <div className="space-y-4 text-muted-foreground">
                        <FadeUp delay={0.2}>
                            <p>
                                Ingénieur logiciel et consultant indépendant, j’accompagne les startups et PME
                                dans la conception, le développement et l’évolution de leurs produits numériques.
                                Mon objectif : transformer une idée ou un besoin métier en une solution
                                opérationnelle, fiable et maintenable.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.3}>
                            <p>
                                Polyvalent par nature, j’interviens à n'importe quelle étape du cycle de développement :
                                analyse des besoins, architecture logicielle, développement logiciel,
                                intégration d’APIs, automatisation des processus et déploiement cloud.
                                J’accorde une attention particulière à la qualité du code, à la performance
                                et à la scalabilité.
                            </p>
                        </FadeUp>
                        <FadeUp delay={0.4}>
                            <p>
                                Curieux et orienté R&D, je travaille régulièrement sur des projets intégrant
                                l’intelligence artificielle, le machine learning et l’expérimentation technique.
                                J’aime explorer, prototyper rapidement et itérer pour construire des solutions
                                pertinentes, alignées avec les enjeux réels du projet.
                            </p>
                        </FadeUp>
                    </div>

                    <FadeUp delay={0.5} className="glass rounded-2xl p-6 glow-border">
                        <p className="font-medium text-foreground">
                            Seul ou en équipe, je m’implique comme un véritable partenaire technique :
                            autonome, rigoureux et force de proposition. Mon rôle ne se limite pas à coder,
                            mais à faire avancer le projet avec des choix techniques clairs, durables
                            et orientés impact.
                        </p>
                    </FadeUp>
                </div>
                {/* Right Column - Highlights */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {highlights.map((item, idx) => (
                        <FadeUp key={idx} delay={((idx+1)*0.1)+0.1} className="glass p-6 rounded-2xl">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20 transition-colors">
                                <item.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </FadeUp>
                    ))}
                </div>
            </div>
        </div>
    </section>
}
