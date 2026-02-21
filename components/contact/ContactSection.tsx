"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import TerminalForm from "./TerminalForm";

const CONTACT_LINKS = [
    { label: "Email", value: "hizbullah3698@gmail.com", href: "mailto:hizbullah3698@gmail.com" },
    { label: "Phone", value: "+92 300 0943975", href: "tel:+923000943975" },
    { label: "GitHub", value: "github.com/Hizbullah3698", href: "https://github.com/Hizbullah3698" },
    { label: "LinkedIn", value: "linkedin.com/in/hizbullahwazir", href: "https://www.linkedin.com/in/hizbullahwazir" },
];

export default function ContactSection() {
    const { elementRef, isInView } = useScrollReveal();

    return (
        <section id="contact" className="py-12 px-4 md:py-20 md:px-6 pb-28 md:pb-32" ref={elementRef}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <span className="text-accent-blue font-jetbrains text-sm">06.</span>
                    <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">Contact</h2>
                    <div className="flex-1 h-px bg-border ml-4" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2 }}
                    className="text-text-secondary text-sm md:text-base mb-8 md:mb-10 max-w-xl"
                >
                    Open to frontend opportunities in Dubai and remote positions worldwide.
                    Drop a message or connect via the links below.
                </motion.p>

                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3 }}
                    >
                        <TerminalForm />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4 }}
                        className="space-y-3 md:space-y-4"
                    >
                        {CONTACT_LINKS.map((contactLink, linkIndex) => (
                            <motion.a
                                key={contactLink.label}
                                href={contactLink.href}
                                target={contactLink.href.startsWith("http") ? "_blank" : undefined}
                                rel={contactLink.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 + linkIndex * 0.1 }}
                                className="glass-card-hover p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 group block min-h-[44px]"
                            >
                                <span className="font-jetbrains text-xs md:text-sm text-text-muted">{contactLink.label}</span>
                                <span className="font-jetbrains text-xs md:text-sm text-text-secondary group-hover:text-accent-blue transition-colors break-all">
                                    {contactLink.value}
                                </span>
                            </motion.a>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.9, type: "spring" as const, stiffness: 150 }}
                            className="glass-card p-4 md:p-5 mt-4 md:mt-6"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                                <span className="font-jetbrains text-xs md:text-sm text-accent-green">Available for Hire</span>
                            </div>
                            <p className="font-jetbrains text-[10px] md:text-xs text-text-muted">
                                Relocating to Dubai next month. Open to on-site and remote opportunities.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
