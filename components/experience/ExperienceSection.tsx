"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { EXPERIENCE_DATA } from "@/constants/EXPERIENCE_DATA";
import CommitItem from "./CommitItem";
import { motion } from "framer-motion";

export default function ExperienceSection() {
    const { elementRef, isInView } = useScrollReveal();

    return (
        <section id="experience" className="py-12 px-4 md:py-20 md:px-6" ref={elementRef}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-accent-blue font-jetbrains text-sm">02.</span>
                        <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">Experience</h2>
                        <div className="flex-1 h-px bg-border ml-4" />
                    </div>
                    <p className="font-jetbrains text-[10px] md:text-xs text-text-muted mb-8 md:mb-10">
                        git log --oneline --graph
                    </p>
                </motion.div>

                <div className="ml-2">
                    {EXPERIENCE_DATA.map((experience, experienceIndex) => (
                        <CommitItem
                            key={experience.company}
                            experience={experience}
                            commitIndex={experienceIndex}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
