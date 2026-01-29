import {AnimatedBorderButton} from "@/components/AnimatedBorderButton"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { ArrowUpRight, BookOpenText, TestTubeDiagonal } from "lucide-react"
import {FadeUp} from "@/components/FadeUp"

const projects = [
    // { title, description, image, tags, link, github, docs, demo }
    {
        title: "ONTBO ✦ Couche de Mémoire et de Contexte pour Agents IA",
        description: "En conservant et en structurant l’information issue des échanges précédents, ONTBO permet aux agents IA d’être plus cohérents, personnalisés et adaptatifs dans leurs interactions avec les utilisateurs ou dans l’exécution de tâches complexes. J’ai participé au développement complet de l'outil, de sa conception jusqu'à la mise en production.",
        image: "/projects/ontbo.webp",
        tags: ["Innovation", "R&D", "IA", "Data", "Informatique Affective", "LLM", "Prompt engineering", "React.js", "FastAPI", "CI/CD", "Git", "Microservices", "Cloud Computing"],
        link: "https://ontbo.com",
        docs: "https://api.ontbo.com/docs",
        github: "https://github.com/Ontbo/ontbo-context-api"

    },
    {
        title: "Nightingale Project ✦ Segmentation de blessures 3D",
        description: "Projet de recherche appliquée sur la segmentation automatique des blessures de guerre à partir de scans 3D. Le système utilise DeepSkin pour détecter les plaies sur des projections 2D, puis reprojette les résultats sur le modèle 3D pour une visualisation interactive en web. J’ai contribué à ce projet en Allemagne durant la phase de R&D et les tests itératifs, en réalisant l’intégration du modèle DeepSkin, pour une segmentation en temps réel, jusqu’à la conception et mise à disposition de l’API.",
        image: "/projects/nightingale.webp",
        tags: ["Santé", "R&D", "CNN", "Machine Learning", "3D", "IA", "Traitement d'image", "Temps réel", "Pipeline", "Python", "API", "Docker", "Git"],
        link: "https://www.nightingaleheart.com/",
        github: "https://github.com/Nico-Curti/Deepskin",
        demo: "https://healthview.uni-mainz.de/segmentation-3d-prediction"
    },
    {
        title: "LynxJS ✦ Développement Cross-Platform",
        description: "Projet visant à rendre LynxJS compatible pour le développement cross-platform (Web, Mobile et Desktop). Grâce à l'intégration d'Electron, il est possible de développer, déployer et tester des applications de bureau avec hot-reload. Ce projet fournit une base permettant d’exécuter LynxJS en version web tout en conservant la compatibilité mobile, facilitant ainsi le développement multi-environnements avec un seul codebase.",
        image: "/projects/lynxjs.webp",
        tags: ["JavaScript", "LynxJS", "Cross-Platform", "Web", "Mobile", "Electron", "Desktop", "Hot-Reload", "Frontend", "DevOps", "Template", "Contribution", "Reddit"],
        link: "https://www.reddit.com/r/lynxjs/comments/1jpbgo5/start_lynxjs_with_crossplatform_development_web",
        github: "https://github.com/KadenHD/lynxjs-crossplatform",
        docs: "https://lynxjs.org/guide/start/quick-start"
    },
    {
        title: "DragN'Receive ✦ Application de Click&Collect, produits locaux",
        description: "Drag-n-Receive est un projet étudiant visant à présenter, lors d’un stand, un système de Click & Collect à l’échelle d’une agglomération, mettant en avant exclusivement des partenaires proposant des produits locaux. Ce prototype a été conçu comme une preuve de concept, illustrant la faisabilité technique et l’intérêt d’un outil numérique au service de l’économie locale et des commerçants de proximité.",
        image: "/projects/dragnreceive.webp",
        tags: ["Click & Collect", "Environnement", "Web", "Mobile", "API", "Full-stack", "JavaScript", "NodeJS", "Ionic", "VueJS", "ExpressJS", "Admin", "Auth", "SGBDR", "Tests"],
        link: "https://github.com/KadenHD/drag-n-receive/blob/main/docs/DragNReceive%20-%20%20Projet%20Innovation.pdf",
        docs: "https://github.com/KadenHD/drag-n-receive/blob/main/docs/DragNReceive%20-%20%20Projet%20Innovation%20Technique.pdf",
        github: "https://github.com/KadenHD/drag-n-receive"
    }
]

export const Projects = () => {
    return <section id="projects" className="py-16 md:py-32 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mx-auto max-w-3xl mb-16">
                <FadeUp delay={0.0}>
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">Mes Projets Vedettes</span>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
                        Projets avancés grâce à
                        <span className="font-signature italic font-normal text-white">
                            {" "}
                            mon intervention.
                        </span>
                    </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p className="text-muted-foreground">
                        J’ai contribué à faire avancer des projets ambitieux et porteurs de sens.  
                        Mon intervention a permis de transformer des idées en résultats concrets et impactants.
                    </p>
                </FadeUp>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                    <FadeUp delay={((idx+1)*0.1)+0.2} key={idx} className="group glass rounded-2xl overflow-hidden md:row-span-1">
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-video">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent opacity-60" />
                            {/* Overlay Links */}
                            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 invisible md:visible group-hover:opacity-100 transition-opacity duration-300">
                                {
                                    project.link && (
                                        <a aria-label="Site" href={project.link} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all`}>
                                            <ArrowUpRight className="w-5 h-5" />
                                        </a>
                                    )
                                }
                                {
                                    project.github && (
                                        <a aria-label="GitHub" href={project.github} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all`}>
                                            <SiGithub className="w-5 h-5" />
                                        </a>
                                    )
                                }
                                {
                                    project.docs && (
                                        <a aria-label="Documentation" href={project.docs} target="_blank" rel="noopener noreferrer" className={` p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all`}>
                                            <BookOpenText className="w-5 h-5" />
                                        </a>
                                    )
                                }
                                {
                                    project.demo && (
                                        <a aria-label="Demo" href={project.demo} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all`}>
                                            <TestTubeDiagonal className="w-5 h-5" />
                                        </a>
                                    )
                                }
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                            </div>
                            <p className="text-muted-foreground text-sm">{project.description}</p>
                            <div className="flex flex-wrap gap-2">{project.tags.map((tag, tagIdx) => (
                                <span key={tagIdx} className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300">{tag}</span>
                            ))}</div>
                        </div>
                    </FadeUp>
                ))}
            </div>

            {/* View All Projects */}
            <FadeUp delay={0.2} className="text-center mt-12">
                <AnimatedBorderButton onClick={() => window.location.href="#projects"}>
                    Voir tous les Projets
                    <ArrowUpRight className="w-5 h-5" />
                </AnimatedBorderButton>
            </FadeUp>
        </div>
    </section>
}
