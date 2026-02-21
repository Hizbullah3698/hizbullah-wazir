"use client";

import TerminalWindow from "./TerminalWindow";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { scrollToSection } from "@/lib/scroll-utils";
import { useRef, MouseEvent } from "react";

const HERO_ANIMATION_DELAY = 0.2;
const BUTTON_STAGGER_DELAY = 0.1;
const MAGNETIC_STRENGTH = 0.3;
const MAGNETIC_DISTANCE = 80;

const heroCtaButtons = [
    { label: "View Projects", sectionId: "projects", variant: "primary" as const },
    { label: "Download CV", sectionId: "download-cv", variant: "secondary" as const },
    { label: "Contact Me", sectionId: "contact", variant: "secondary" as const },
];

type MagneticButtonProps = {
    label: string;
    sectionId: string;
    variant: "primary" | "secondary";
    buttonIndex: number;
    onCtaClick: (sectionId: string) => void;
};

function MagneticButton({ label, sectionId, variant, buttonIndex, onCtaClick }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const magneticX = useMotionValue(0);
    const magneticY = useMotionValue(0);
    const springX = useSpring(magneticX, { stiffness: 300, damping: 20 });
    const springY = useSpring(magneticY, { stiffness: 300, damping: 20 });

    const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = event.clientX - centerX;
        const distanceY = event.clientY - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        if (distance < MAGNETIC_DISTANCE) {
            magneticX.set(distanceX * MAGNETIC_STRENGTH);
            magneticY.set(distanceY * MAGNETIC_STRENGTH);
        }
    };

    const handleMouseLeave = () => {
        magneticX.set(0);
        magneticY.set(0);
    };

    return (
        <motion.button
            ref={buttonRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: HERO_ANIMATION_DELAY * 2 + buttonIndex * BUTTON_STAGGER_DELAY }}
            style={{ x: springX, y: springY }}
            whileTap={{ scale: 0.95 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onCtaClick(sectionId)}
            className={`font-jetbrains text-sm px-6 py-3 min-h-[44px] rounded-lg transition-all duration-300
        ${variant === "primary"
                    ? "bg-accent-blue text-background hover:shadow-glow-strong"
                    : "glass-card-hover text-text-primary hover:border-accent-blue"
                }`}
        >
            {label}
        </motion.button>
    );
}

export default function HeroSection() {
    const handleCtaClick = (sectionId: string) => {
        if (sectionId === "download-cv") {
            const link = document.createElement("a");
            link.href = "/resume.pdf";
            link.download = "Hizbullah_Wazir_CV.pdf";
            link.click();
            return;
        }
        if (sectionId) {
            scrollToSection(sectionId);
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20 relative">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-6 md:mb-8"
            >
                <h1 className="font-syne text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-green bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradientShift_3s_ease_infinite]">
                    Hizbullah Wazir
                </h1>
                <p className="font-jetbrains text-text-secondary text-sm md:text-lg">
                    Frontend React Developer
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: HERO_ANIMATION_DELAY }}
                className="w-full flex justify-center mb-8 md:mb-10"
            >
                <TerminalWindow />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: HERO_ANIMATION_DELAY * 2 }}
                className="flex flex-wrap gap-3 md:gap-4 justify-center"
            >
                {heroCtaButtons.map((button, buttonIndex) => (
                    <MagneticButton
                        key={button.label}
                        label={button.label}
                        sectionId={button.sectionId}
                        variant={button.variant}
                        buttonIndex={buttonIndex}
                        onCtaClick={handleCtaClick}
                    />
                ))}
            </motion.div>
        </section>
    );
}
