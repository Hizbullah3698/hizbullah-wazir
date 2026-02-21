"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const RELEVANT_COURSEWORK = [
    "Web Development",
    "Software Architecture",
    "Data Structures & Algorithms",
    "Databases",
    "UI/UX",
    "HCI",
    "REST APIs",
];

export default function EducationSection() {
    const { elementRef, isInView } = useScrollReveal();

    return (
        <section id="education" className="py-12 px-4 md:py-20 md:px-6" ref={elementRef}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-8 md:mb-10"
                >
                    <span className="text-accent-blue font-jetbrains text-sm">05.</span>
                    <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">Education</h2>
                    <div className="flex-1 h-px bg-border ml-4" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" as const, stiffness: 150 }}
                    className="glass-card-hover p-4 md:p-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                            <h3 className="font-syne text-lg md:text-xl font-semibold text-text-primary">
                                B.S. Software Engineering
                            </h3>
                            <p className="font-jetbrains text-xs md:text-sm text-accent-blue mt-1">
                                NUML Islamabad
                            </p>
                        </div>
                        <span className="font-jetbrains text-[10px] md:text-xs text-text-muted mt-2 sm:mt-0">
                            Graduated March 2025
                        </span>
                    </div>

                    <div className="border-t border-border pt-4">
                        <p className="font-jetbrains text-[10px] md:text-xs text-text-muted uppercase tracking-wider mb-3">
                            Relevant Coursework
                        </p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {RELEVANT_COURSEWORK.map((course, courseIndex) => (
                                <motion.span
                                    key={course}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + courseIndex * 0.05 }}
                                    className="font-jetbrains text-[10px] md:text-xs text-text-secondary bg-surface px-2 md:px-3 py-1 md:py-1.5 rounded border border-border hover:border-accent-blue hover:text-accent-blue transition-colors min-h-[32px] md:min-h-[36px] flex items-center"
                                >
                                    {course}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
