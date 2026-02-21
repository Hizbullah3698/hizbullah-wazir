"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SKILLS_DATA } from "@/constants/SKILLS_DATA";
import SkillBlock from "./SkillBlock";
import { motion } from "framer-motion";

export default function SkillsSection() {
    const { elementRef, isInView } = useScrollReveal();

    let runningLineNumber = 1;

    return (
        <section id="skills" className="py-12 px-4 md:py-20 md:px-6" ref={elementRef}>
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-8 md:mb-10"
                >
                    <span className="text-accent-blue font-jetbrains text-sm">04.</span>
                    <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">Skills</h2>
                    <div className="flex-1 h-px bg-border ml-4" />
                </motion.div>

                <div className="glass-card overflow-hidden terminal-scanlines">
                    <div className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-surface border-b border-border">
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                        <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
                        <span className="ml-2 md:ml-3 text-[10px] md:text-xs text-text-muted font-jetbrains">skills.ts — portfolio</span>
                    </div>

                    <div className="p-3 md:p-5 space-y-3 md:space-y-4 overflow-x-auto scrollbar-none relative z-0">
                        {SKILLS_DATA.map((category, categoryIndex) => {
                            const blockStartLine = runningLineNumber;
                            runningLineNumber += category.skills.length + 2;

                            return (
                                <SkillBlock
                                    key={category.categoryKey}
                                    category={category}
                                    categoryIndex={categoryIndex}
                                    isInView={isInView}
                                    startingLineNumber={blockStartLine}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
