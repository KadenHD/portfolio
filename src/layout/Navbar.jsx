import { Button } from "@/components/Button"
import { X, Menu } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {FadeUp} from "@/components/FadeUp"

const navLinks = [
    { href: "#about", label: "À propos" },
    { href: "#projects", label: "Projets" },
    { href: "#experience", label: "Expériences" },
    { href: "#testimonials", label: "Témoignages" },
]

export const Navbar = () => {
    const mobileMenuRef = useRef(null)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScroll, setIsScroll] = useState(false)

    const openMobileMenu = () => {setIsMobileMenuOpen(true);}
    const closeMobileMenu = () => {
        if (mobileMenuRef.current) {
                mobileMenuRef.current.classList.add("animate-fade-out");
                mobileMenuRef.current.addEventListener(
                    "animationend",
                    () => setIsMobileMenuOpen(false),
                    { once: true }
                );
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScroll(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.addEventListener("scroll", handleScroll)
    }, [])

    return <header className={`fixed top-0 left-0 right-0 ${isScroll ? "glass-strong py-3" : "bg-transparent py-5"} transition-[background-color,padding] duration-500 z-50`}>
        <FadeUp direction="down" distance={60}>
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tigh group">
                    <span className="group-hover:text-primary transition-colors">P</span>ierre <span className="group-hover:text-primary transition-colors">C</span>lément<span className="text-primary">.</span>
                </a>
                
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) => (
                            <a href={link.href} key={index} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-muted/70 transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Button onClick={()=> window.location.href="#contact"} size="sm">
                        Contactez-moi
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button aria-label="Menu" onClick={() => isMobileMenuOpen ? closeMobileMenu() : openMobileMenu()} className="md:hidden p-2 text-foreground cursor-pointer">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
        </FadeUp>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <FadeUp direction="down" distance={40} duration={0.3}>
                <div className="md:hidden glass-strong mt-3" ref={mobileMenuRef}>
                    <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                        {navLinks.map((link, index) => (
                            <a href={link.href} key={index} onClick={closeMobileMenu} className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2">
                                {link.label}
                            </a>
                        ))}

                        <Button onClick={() => {closeMobileMenu(); window.location.href="#contact"}}>
                            Contactez-moi
                        </Button>
                    </div>
                </div>
            </FadeUp>
        )}
    </header>
}
