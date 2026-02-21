"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PROJECTS_DATA } from "@/constants/PROJECTS_DATA";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsSection() {
    const { elementRef, isInView } = useScrollReveal();

    return (
        <section id="projects" className="py-12 px-4 md:py-20 md:px-6" ref={elementRef}>
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3 mb-8 md:mb-10"
                >
                    <span className="text-accent-blue font-jetbrains text-sm">03.</span>
                    <h2 className="font-syne text-xl md:text-3xl font-bold text-text-primary">Projects</h2>
                    <div className="flex-1 h-px bg-border ml-4" />
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                    {PROJECTS_DATA.map((project, projectIndex) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            projectIndex={projectIndex}
                            isInView={isInView}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
