"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

const SCROLL_REVEAL_MARGIN = "-100px";

export function useScrollReveal(once: boolean = true) {
    const elementRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(elementRef, {
        once,
        margin: SCROLL_REVEAL_MARGIN,
    });

    return { elementRef, isInView };
}
