"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/constants/NAV_LINKS";

const OBSERVER_ROOT_MARGIN = "-20% 0px -60% 0px";

export function useActiveSection() {
    const [activeSectionId, setActiveSectionId] = useState<string>(NAV_LINKS[0].sectionId);

    useEffect(() => {
        const sectionElements = NAV_LINKS.map((link) =>
            document.getElementById(link.sectionId)
        ).filter(Boolean) as HTMLElement[];

        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSectionId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: OBSERVER_ROOT_MARGIN,
        });

        sectionElements.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return activeSectionId;
}
