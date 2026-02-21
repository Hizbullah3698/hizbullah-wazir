"use client";

import { useEffect, useRef, useCallback } from "react";

const CURSOR_LERP_FACTOR = 0.25;
const OUTLINE_LERP_FACTOR = 0.14;

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const dotPosition = useRef({ x: 0, y: 0 });
    const outlinePosition = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        mousePosition.current = { x: event.clientX, y: event.clientY };
    }, []);

    const handleMouseEnterInteractive = useCallback(() => {
        dotRef.current?.classList.add("is-hovering");
        outlineRef.current?.classList.add("is-hovering");
    }, []);

    const handleMouseLeaveInteractive = useCallback(() => {
        dotRef.current?.classList.remove("is-hovering");
        outlineRef.current?.classList.remove("is-hovering");
    }, []);

    useEffect(() => {
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return;

        const animateCursor = () => {
            dotPosition.current.x += (mousePosition.current.x - dotPosition.current.x) * CURSOR_LERP_FACTOR;
            dotPosition.current.y += (mousePosition.current.y - dotPosition.current.y) * CURSOR_LERP_FACTOR;

            outlinePosition.current.x += (mousePosition.current.x - outlinePosition.current.x) * OUTLINE_LERP_FACTOR;
            outlinePosition.current.y += (mousePosition.current.y - outlinePosition.current.y) * OUTLINE_LERP_FACTOR;

            if (dotRef.current) {
                dotRef.current.style.left = `${dotPosition.current.x}px`;
                dotRef.current.style.top = `${dotPosition.current.y}px`;
            }

            if (outlineRef.current) {
                outlineRef.current.style.left = `${outlinePosition.current.x}px`;
                outlineRef.current.style.top = `${outlinePosition.current.y}px`;
            }

            animationFrameId.current = requestAnimationFrame(animateCursor);
        };

        window.addEventListener("mousemove", handleMouseMove);
        animationFrameId.current = requestAnimationFrame(animateCursor);

        const interactiveElements = document.querySelectorAll("a, button, input, textarea, [role='button']");
        interactiveElements.forEach((element) => {
            element.addEventListener("mouseenter", handleMouseEnterInteractive);
            element.addEventListener("mouseleave", handleMouseLeaveInteractive);
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId.current);
            interactiveElements.forEach((element) => {
                element.removeEventListener("mouseenter", handleMouseEnterInteractive);
                element.removeEventListener("mouseleave", handleMouseLeaveInteractive);
            });
        };
    }, [handleMouseMove, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden sm:block" />
            <div ref={outlineRef} className="cursor-outline hidden sm:block" />
        </>
    );
}
