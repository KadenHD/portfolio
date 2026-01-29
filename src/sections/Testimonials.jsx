import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState } from "react"
import {FadeUp} from "@/components/FadeUp"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
    {
        quote: "J'ai eu l'occasion de travailler avec Pierre pendant plusieurs années, et ce fut un réel plaisir! Pierre est à la fois très rigoureux dans son approche technique, extrèmement autonome et débrouillard. Le genre de personne à qui l'on peut confier une tâche et être sûr qu'elle va être parfaitement exécutée.",
        author: "Stéphane Aubry, PhD",
        role: "CTO & Co-fondateur, ONTBO",
        avatar: "/testimonials/sa_ontbo.webp"
    },
    {
        quote: "Dans le milieu du streaming, il est à la fois difficile et rare de trouver des personnes capables de répondre à des demandes qui sortent des sentiers battus. J’ai fait appel à ses services pour l’aspect technique lié à mes streams (chatbox personnalisée, site web, etc.), et il est depuis devenu ma référence lorsque j’ai besoin d’un professionnel disposant de ce niveau de compétences. Respectueux des délais et capable de comprendre les tenants et aboutissants d’un projet, Pierre garantit une réalisation toujours conforme au cahier des charges.",
        author: "Kharnaim",
        role: "Streamer / Youtuber",
        avatar: "testimonials/kharnaim.webp"
    },
    {
        quote: "Notre secteur est un milieu où l’originalité est essentielle pour trouver sa place, et où la technicité est omniprésente. Pierre est, et continue d’être, notre prestataire pour les services techniques les plus pointus. Il est notamment responsable de la réalisation technique de notre site internet front et back end. Autonome, force de proposition et compétent, il n’a pas volé son titre d’ingénieur. Je ne peux que le recommander pour des fonctions techniques exigeantes, où les missions doivent être exécutées avec rigueur et précision.",
        author: "Jeremy Provost",
        role: "Fondateur, Fallen Order",
        avatar: "testimonials/jp_fo.webp"
    }
]

export const Testimonials = () => {
    const [activeIdx, setActiveIdx] = useState(0);
    const next = () => {
        setActiveIdx((prev) => (prev+1) % testimonials.length)
    }
    const previous = () => {
        setActiveIdx((prev) => (prev-1+testimonials.length) % testimonials.length)
    }

    return <section id="testimonials" className="py-16 md:py-32 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/2 w-200 h-200 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <FadeUp delay={0.0}>
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">Témoignages</span>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
                        Des mots sincères de
                        <span className="font-signature italic font-normal text-white">
                            {" "}
                            personnes extraordinaires.
                        </span>
                    </h2>
                </FadeUp>
            </div>
            {/* Testimonial Carousel */}
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    {/* Main Testimonial */}
                    <FadeUp delay={0.2} className="glass p-8 rounded-3xl md:p-12 glow-border">
                        <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                            <Quote className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="relative"
                            >
                                <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 pt-4">
                                "{testimonials[activeIdx].quote}"
                                </blockquote>

                                <div className="flex items-center gap-4">
                                <img
                                    src={testimonials[activeIdx].avatar}
                                    alt={testimonials[activeIdx].author}
                                    className="w-14 h-14 rounded-full object-cover ring-3 ring-primary/20"
                                />
                                <div>
                                    <div className="font-semibold">
                                    {testimonials[activeIdx].author}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                    {testimonials[activeIdx].role}
                                    </div>
                                </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </FadeUp>
                    {/* Testimonials Navigation */}
                    <FadeUp delay={0.3} className="flex items-center justify-center gap-4 mt-8">
                        <button aria-label="Gauche" onClick={previous} className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all">
                            <ChevronLeft />
                        </button>

                        <div className="flex gap-2">
                            {testimonials.map((_, idx) => (
                                <button aria-label={`Témoignage ${idx}`} key={idx} onClick={() => setActiveIdx(idx)} className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "w-8 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />
                            ))}
                        </div>

                        <button aria-label="Droite" onClick={next} className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all">
                            <ChevronRight />
                        </button>
                    </FadeUp>
                </div>
            </div>
        </div>
    </section>
}
