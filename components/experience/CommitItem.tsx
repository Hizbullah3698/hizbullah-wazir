"use client";

import { motion } from "framer-motion";
import { ExperienceItem } from "@/types/experience.types";

type CommitItemProps = {
    experience: ExperienceItem;
    commitIndex: number;
    isInView: boolean;
};

const STAGGER_DELAY = 0.2;

export default function CommitItem({ experience, commitIndex, isInView }: CommitItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: commitIndex * STAGGER_DELAY }}
            className="relative pl-6 md:pl-8 pb-8 md:pb-10 last:pb-0"
        >
            <div className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-text-muted/30" />
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: commitIndex * STAGGER_DELAY + 0.1, type: "spring" as const, stiffness: 300 }}
                className="absolute left-[-5px] top-1.5 w-[11px] h-[11px] rounded-full bg-accent-green border-2 border-background"
                style={{ animation: isInView ? "commitPulse 2s ease-in-out 1" : "none" }}
            />

            <div className="glass-card-hover p-4 md:p-5">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3">
                    <span className="font-jetbrains text-[10px] md:text-xs text-accent-purple bg-accent-purple/10 px-2 py-0.5 rounded">
                        {experience.commitHash}
                    </span>
                    <span className="font-jetbrains text-[10px] md:text-xs text-text-muted">
                        {experience.period}
                    </span>
                </div>

                <h3 className="font-syne text-base md:text-lg font-semibold text-text-primary mb-1">
                    {experience.company}
                </h3>
                <p className="font-jetbrains text-xs md:text-sm text-accent-blue mb-3 md:mb-4">
                    {experience.role}
                </p>

                <ul className="space-y-2">
                    {experience.highlights.map((highlight, highlightIndex) => (
                        <motion.li
                            key={highlightIndex}
                            initial={{ opacity: 0, x: -15 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: commitIndex * STAGGER_DELAY + 0.3 + highlightIndex * 0.1 }}
                            className="flex items-start gap-2 text-xs md:text-sm text-text-secondary"
                        >
                            <span className="text-accent-green mt-0.5 shrink-0">+</span>
                            <span>{highlight}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
