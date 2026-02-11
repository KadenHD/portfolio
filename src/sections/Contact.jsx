import {Button} from "@/components/Button"
import { AlertCircle, CheckCircle, Loader2, Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { SiCalendly } from "@icons-pack/react-simple-icons"
import { AnimatedButton } from "@/components/AnimatedButton"
import {FadeUp} from "@/components/FadeUp"

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "pierre.clement.oise@gmail.com",
        href: "mailto:pierre.clement.oise@gmail.com"
    },
    {
        icon: Phone,
        label: "Téléphone Portable",
        value: "+33 6 82 63 50 25",
        href: "tel:+330682635025"
    },
]

const maps = [
    {
        value: "Compiègne",
        href: "https://www.google.fr/maps?q=Compiègne"
    },
    {
        value: "Beauvais",
        href: "https://www.google.fr/maps?q=Beauvais"
    },
    {
        value: "Soissons",
        href: "https://www.google.fr/maps?q=Soissons"
    },
    {
        value: "Paris",
        href: "https://www.google.fr/maps?q=Paris"
    },
]

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        type: null, // 'success' or 'error'
        message: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmitStatus({type:null, message: ""});

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
                throw new Error("Configuration d'EmailJS manquante. Veuillez vérifier vos variables d'environnement.");
            }

            await emailjs.send(serviceId, templateId, {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            }, publicKey)

            setSubmitStatus({
                type: "success",
                message: "Message envoyé avec succès ! Je vous répondrai bientôt."
            });
            setFormData({ name:"", email: "", message: "" });
        } catch (err) {
            console.log("EmailJS error:", err)
            setSubmitStatus({
                type: "error",
                message: err.text || "Impossible d'envoyer le message. Veuillez réessayer plus tard."
            })
        } finally {
            setIsLoading(false);
        }
    }

    return <section id="contact" className="py-16 md:py-32 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <FadeUp delay={0.0}>
                    <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">Entrons En Contact</span>
                </FadeUp>
                <FadeUp delay={0.1}>
                    <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
                        Ton projet mérite d’être construit,
                        <span className="font-signature italic font-normal text-white">
                            {" "}
                            pas juste imaginé.
                        </span>
                    </h2>
                </FadeUp>
                <FadeUp delay={0.2}>
                    <p className="text-muted-foreground">
                        Vous avez un projet en tête à concrétiser ou juste envie de dire bonjour ? Remplissez le formulaire ci-dessous, prenez rendez-vous sur Calendly ou envoyez-moi un email directement.
                    </p>
                </FadeUp>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <FadeUp delay={0.3} className="glass p-8 flex flex-col gap-6 rounded-3xl border border-primary/30">
                    {/* Contact Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
                            <input id="name" type="text" required placeholder="Votre nom..." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input id="email" type="email" required placeholder="votre@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                            <textarea id="message" rows={5} required placeholder="Votre message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" />
                        </div>

                        <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                            { isLoading ? (<><Loader2 className="animate-spin" /></>) : (<>Envoyer le message <Send className="w-5 h-5" /></>) }
                        </Button>

                        { submitStatus.type && (
                            <div className={`flex items-center gap-3 p-4 rounded-xl ${submitStatus.type === "success" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                                { submitStatus.type === "success" ? (<CheckCircle className="w-5 h-5 shrink-0" />) : (<AlertCircle className="w-5 h-5 shrink-0" />) }
                                <p className="text-sm">{submitStatus.message}</p>
                            </div>
                        ) }
                    </form>
                    {/* Contact Divider */}
                    <div className="flex items-center w-full">
                        <div className="flex-1 h-0.5 bg-linear-to-r from-transparent via-muted-foreground/70 to-transparent"></div>
                        <p className="px-2 text-sm text-white/80 uppercase">
                            Ou bien
                        </p>
                        <div className="flex-1 h-0.5 bg-linear-to-l from-transparent via-muted-foreground/70 to-transparent"></div>
                    </div>
                    {/* Calendly Button */}
                    <div className="flex flex-row items-center justify-center">
                        <AnimatedButton size="lg" className="w-full" onClick={() => window.open("https://calendly.com/pierre-clement-oise/30min","_blank","noopener,noreferrer")}>
                            <SiCalendly className="w-5 h-5" />
                            Prendre rendez-vous sur Calendly
                        </AnimatedButton>
                    </div>
                </FadeUp>

                {/* Contact Info */}
                <div className="space-y-6">
                    {/* Personnal Info */}
                    <FadeUp delay={0.4} className="glass rounded-3xl p-8">
                        <h3 className="text-xl font-semibold mb-6">
                            Mes coordonnées
                        </h3>
                        <div className="space-y-4">
                            {contactInfo.map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        {item.label}
                                    </div>
                                    <div className="font-medium break-all">{item.value}</div>
                                </div>
                            </a>
                            ))}
                            <div className="p-4 flex flex-row items-center gap-4 rounded-xl hover:bg-surface group transition-colors">
                                <div className={`w-12 h-26 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">
                                        Mes disponibilités*
                                    </div>
                                    <div className="font-medium flex flex-col md:flex-row md:gap-2">
                                        {maps.map((m, idx) => (
                                            <a key={idx} href={m.href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium flex flex-row">
                                                <p className="hover:text-primary/80 transition-colors">
                                                    {m.value}
                                                </p>
                                                <span className="opacity-0 md:opacity-100">{idx < maps.length - 1 ? ',' : ''}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                
                            </div>
                            <p className="text-xs text-muted-foreground">* Dans un rayon alentour de 50 km, pour des missions sur site ou hybride.</p>
                        </div>
                    </FadeUp>

                    {/* Availability Card */}
                    <FadeUp delay={0.4} className="glass rounded-3xl p-8 border border-primary/30">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-medium">Actuellement Disponible</span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                            Disponible pour de nouvelles missions, je propose des interventions en régie (intégration à votre équipe) ou au forfait (projet complet livré clé en main), à distance, hybride ou sur site, à temps partiel ou plein. Je m’adapte à vos contraintes pour faire avancer votre projet efficacement.
                        </p>
                    </FadeUp>
                </div>
            </div>
        </div>
    </section>
}
