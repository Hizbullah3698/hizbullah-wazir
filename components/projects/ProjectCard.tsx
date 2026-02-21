"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProjectItem } from "@/types/project.types";
import { MouseEvent, useRef } from "react";

type ProjectCardProps = {
    project: ProjectItem;
    projectIndex: number;
    isInView: boolean;
};

const STAGGER_DELAY = 0.15;
const TILT_MAX_DEGREES = 8;

export default function ProjectCard({ project, projectIndex, isInView }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
    const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
    const glareOpacity = useMotionValue(0);
    const glareX = useMotionValue(50);
    const glareY = useMotionValue(50);
    const springGlareOpacity = useSpring(glareOpacity, { stiffness: 200, damping: 30 });

    const glareBackground = useTransform(
        [glareX, glareY],
        ([latestX, latestY]) =>
            `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(88, 166, 255, 0.15), transparent 60%)`
    );

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
        const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

        rotateX.set(-normalizedY * TILT_MAX_DEGREES);
        rotateY.set(normalizedX * TILT_MAX_DEGREES);
        glareOpacity.set(0.15);
        glareX.set((normalizedX + 0.5) * 100);
        glareY.set((normalizedY + 0.5) * 100);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        glareOpacity.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: projectIndex * STAGGER_DELAY, type: "spring" as const, stiffness: 150 }}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-card-hover p-4 md:p-6 flex flex-col h-full relative overflow-hidden"
        >
            <motion.div
                className="absolute inset-0 pointer-events-none rounded-lg"
                style={{
                    opacity: springGlareOpacity,
                    background: glareBackground,
                }}
            />

            <div className="flex items-center gap-3 mb-3 md:mb-4 relative z-10">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-text-muted" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8V1.5zm-8 11h8v1h-8a1 1 0 010-2z" />
                </svg>
                <h3 className="font-syne text-base md:text-lg font-semibold text-accent-blue">
                    {project.name}
                </h3>
            </div>

            <p className="text-text-secondary text-xs md:text-sm leading-relaxed mb-4 md:mb-5 flex-1 relative z-10">
                {project.description}
            </p>

            <div className="space-y-3 md:space-y-4 relative z-10">
                <ul className="space-y-1.5">
                    {project.highlights.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-start gap-2 text-[10px] md:text-xs text-text-muted">
                            <span className="text-accent-green mt-0.5 shrink-0">▸</span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 md:gap-2 pt-2 border-t border-border">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="font-jetbrains text-[10px] md:text-[11px] text-text-secondary bg-surface px-2 py-1 rounded"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-1">
                    {project.repositoryUrl && (
                        <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-jetbrains text-xs text-text-muted hover:text-accent-blue transition-colors flex items-center gap-1.5 min-h-[44px]"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            Source
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
