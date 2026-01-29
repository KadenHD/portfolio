import { ArrowBigUpDash, X } from "lucide-react";
import { forwardRef, useEffect, useRef } from "react";
import {FadeUp} from "@/components/FadeUp"
import {Button} from "@/components/Button"

const linkClasses = "underline hover:text-primary/70 transition-colors";
const textClasses = "text-white/70";
const textsClasses = "flex flex-col gap-1.5";
const titleClasses = "text-xl font-semibold mb-1";

export const Popup = forwardRef(({ onClose, title, content }, ref) => {
    const containerRef = ref || useRef(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [containerRef, onClose]);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: 0,
                behavior: 'smooth', // smooth scrolling
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto overflow-x-hidden flex items-start justify-center p-6" ref={scrollRef}>
            <FadeUp direction="down" distance={50}>
                <div
                    className="container glass glow-border mx-auto md:max-w-1/3 p-8 flex flex-col gap-2 rounded-3xl border border-primary/30"
                    ref={containerRef}
                >
                    <div className={textsClasses}>
                        <div className="flex flex-row items-center justify-between">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <X
                                onClick={onClose}
                                className="h-5 w-5 text-muted-foreground hover:text-white transition-colors cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {content.map((c, idx) => (
                            <div key={idx}>
                                {c.title && <h3 className={titleClasses}>{c.title} :</h3>}
                                {(c.texts || c.links) && (
                                    <div className={c.spacing ? textsClasses : ''}>
                                        {c.texts &&
                                            c.texts.map((t, tIdx) => (
                                                <p key={tIdx} className={textClasses}>{t}</p>
                                            ))}
                                        {c.links &&
                                            c.links.map((l, lIdx) => (
                                                <p key={lIdx} className={textClasses}>
                                                    <a
                                                        className={linkClasses}
                                                        href={l.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {l.text}
                                                    </a>
                                                </p>
                                            ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <FadeUp className="flex flex-row gap-6 mt-4">
                        <Button className="w-full" onClick={onClose}>Fermer</Button>
                        <button className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all" onClick={scrollToTop}>
                            <ArrowBigUpDash className="h-6 w-8" />
                        </button>
                    </FadeUp>

                </div>
            </FadeUp>
        </div>
    );
});
