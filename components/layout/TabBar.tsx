"use client";

import { NAV_LINKS } from "@/constants/NAV_LINKS";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll-utils";

export default function TabBar() {
    const activeSectionId = useActiveSection();

    const handleTabClick = (sectionId: string) => {
        scrollToSection(sectionId);
    };

    return (
        <div
            className="sticky top-0 z-20 bg-background border-b border-border overflow-x-auto scrollbar-none"
            role="tablist"
            aria-label="Section tabs"
        >
            <div className="flex font-jetbrains text-[11px] md:text-[13px]">
                {NAV_LINKS.map((link) => {
                    const isActive = activeSectionId === link.sectionId;

                    return (
                        <button
                            key={link.sectionId}
                            onClick={() => handleTabClick(link.sectionId)}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={link.sectionId}
                            tabIndex={isActive ? 0 : -1}
                            className={`relative px-3 md:px-4 min-h-[44px] flex items-center gap-1.5 md:gap-2 whitespace-nowrap transition-all duration-200 border-r border-border shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-[-2px]
                ${isActive
                                    ? "bg-surface text-text-primary"
                                    : "text-text-muted hover:text-text-secondary hover:bg-surface-hover"
                                }`}
                        >
                            <span className="text-xs opacity-60" aria-hidden="true">📄</span>
                            {link.fileName}
                            {isActive && (
                                <span className="absolute top-0 left-0 right-0 h-[2px] bg-accent-blue" aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
