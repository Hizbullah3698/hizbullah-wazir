"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Image from "next/image";

const STAGGER_DELAY = 0.1;

const aboutHighlights = [
    { label: "Framework", value: "React 18/19 + Next.js" },
    { label: "Language", value: "TypeScript (Strict)" },
    { label: "Location", value: "Islamabad → Dubai" },
    { label: "Status", value: "Open to Work" },
];

export default function AboutSection() {
    const { elementRef, isInView } = useScrollReveal();

    return (
        <section id="about" className="py-12 px-4 md:py-20 md:px-6" ref={elementRef}>
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                    <span className="text-accent-blue font-jetbrains text-sm">01.</span>
                    <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">About Me</h2>
                    <div className="flex-1 h-px bg-border ml-4" />
                </div>

                <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                Frontend React Developer with production experience building enterprise-level web applications.
                                I specialize in React 18/19, TypeScript, and modern frontend architecture — delivering clean,
                                performant, and scalable solutions.
                            </p>
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                Currently working at Oileum Global FZ LLC, building production web applications with React 19
                                and REST API integration. Previously at Aiztek Technology, where I migrated legacy applications
                                and built reusable component systems that improved team velocity by 60%.
                            </p>
                            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                B.S. Software Engineering graduate from NUML Islamabad. Relocating to Dubai next month and
                                actively seeking frontend opportunities — on-site or remote.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                            className="grid grid-cols-2 gap-3"
                        >
                            {aboutHighlights.map((highlight, highlightIndex) => (
                                <motion.div
                                    key={highlight.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.4 + highlightIndex * STAGGER_DELAY, type: "spring" as const, stiffness: 200 }}
                                    className="glass-card-hover p-3 md:p-4 flex flex-col gap-1 min-h-[44px]"
                                >
                                    <span className="font-jetbrains text-[10px] md:text-xs text-text-muted">{highlight.label}</span>
                                    <span className="font-jetbrains text-xs md:text-sm text-accent-blue">{highlight.value}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3, type: "spring" as const, stiffness: 150 }}
                        className="flex justify-center md:justify-end"
                    >
                        <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden glass-card-hover p-1">
                            <Image
                                src="/profile.jpg"
                                alt="Hizbullah Wazir — Frontend React Developer"
                                fill
                                className="object-cover rounded-xl"
                                sizes="(max-width: 768px) 192px, 224px"
                                priority
                            />
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
