"use client";

import { motion } from "framer-motion";
import { SkillCategory } from "@/types/skill.types";

type SkillBlockProps = {
    category: SkillCategory;
    categoryIndex: number;
    isInView: boolean;
    startingLineNumber: number;
};

const STAGGER_DELAY = 0.06;

const SYNTAX_COLORS: Record<string, string> = {
    languagesAndFrameworks: "text-[#79C0FF]",
    aiAndIntegration: "text-[#D2A8FF]",
    stylingAndUI: "text-[#7EE787]",
    stateAndArchitecture: "text-[#FFA657]",
    backendAndAPIs: "text-[#FF7B72]",
    toolsAndDeployment: "text-[#79C0FF]",
};

export default function SkillBlock({ category, categoryIndex, isInView, startingLineNumber }: SkillBlockProps) {
    const syntaxColor = SYNTAX_COLORS[category.categoryKey] || "text-accent-blue";
    let currentLineNumber = startingLineNumber;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: categoryIndex * 0.12, duration: 0.5 }}
            className="font-jetbrains text-[11px] md:text-sm leading-relaxed"
        >
            <div className="flex items-start gap-1">
                <span className="text-text-muted/50 select-none w-5 md:w-7 text-right shrink-0 text-[10px] md:text-xs">
                    {currentLineNumber++}
                </span>
                <div className="min-w-0">
                    <span className="text-[#FF7B72]">const </span>
                    <span className={syntaxColor}>{category.categoryKey}</span>
                    <span className="text-text-primary"> = [</span>
                </div>
            </div>

            {category.skills.map((skill, skillIndex) => {
                const lineNum = currentLineNumber++;
                return (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: categoryIndex * 0.12 + skillIndex * STAGGER_DELAY + 0.15 }}
                        className="flex items-start gap-1 pl-3 md:pl-5"
                    >
                        <span className="text-text-muted/50 select-none w-5 md:w-7 text-right shrink-0 text-[10px] md:text-xs">
                            {lineNum}
                        </span>
                        <span className="text-[#A5D6FF] break-all">&quot;{skill}&quot;</span>
                        {skillIndex < category.skills.length - 1 && (
                            <span className="text-text-primary">,</span>
                        )}
                    </motion.div>
                );
            })}

            <div className="flex items-start gap-1">
                <span className="text-text-muted/50 select-none w-5 md:w-7 text-right shrink-0 text-[10px] md:text-xs">
                    {currentLineNumber}
                </span>
                <span className="text-text-primary">];</span>
            </div>
        </motion.div>
    );
}
