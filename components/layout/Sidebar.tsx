"use client";

import { NAV_LINKS } from "@/constants/NAV_LINKS";
import { useActiveSection } from "@/hooks/useActiveSection";
import { scrollToSection } from "@/lib/scroll-utils";
import { motion } from "framer-motion";
import { useState } from "react";

type SidebarProps = {
    isOpen: boolean;
    onToggle: () => void;
};

const MOBILE_BREAKPOINT = 1024;

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    const activeSectionId = useActiveSection();
    const [isExplorerExpanded, setIsExplorerExpanded] = useState(true);

    const handleNavClick = (sectionId: string) => {
        scrollToSection(sectionId);
        if (window.innerWidth < MOBILE_BREAKPOINT) {
            onToggle();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent, sectionId: string) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleNavClick(sectionId);
        }
    };

    return (
        <>
            <button
                onClick={onToggle}
                className="fixed top-3 left-3 z-50 lg:hidden flex flex-col items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] rounded-md bg-surface border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                aria-controls="sidebar-nav"
            >
                <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onToggle}
                    aria-hidden="true"
                />
            )}

            <aside
                id="sidebar-nav"
                role="navigation"
                aria-label="File explorer navigation"
                className={`fixed top-0 left-0 h-full z-40 bg-surface border-r border-border flex flex-col font-jetbrains text-sm transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto w-[calc(100vw-60px)] max-w-[260px] lg:w-[260px] ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="px-4 py-3 text-[11px] tracking-widest uppercase text-text-muted border-b border-border">
                    Explorer
                </div>

                <div className="flex-1 overflow-y-auto">
                    <button
                        onClick={() => setIsExplorerExpanded(!isExplorerExpanded)}
                        className="w-full px-4 min-h-[44px] flex items-center gap-2 text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-[-2px]"
                        aria-expanded={isExplorerExpanded}
                        aria-controls="explorer-file-list"
                    >
                        <span className={`transition-transform duration-200 text-xs ${isExplorerExpanded ? "rotate-90" : ""}`} aria-hidden="true">
                            ▶
                        </span>
                        <span className="text-xs" aria-hidden="true">📁</span>
                        <span className="text-[13px] font-semibold tracking-wide">portfolio</span>
                    </button>

                    {isExplorerExpanded && (
                        <nav id="explorer-file-list" aria-label="Portfolio sections">
                            <ul className="pl-6" role="list">
                                {NAV_LINKS.map((link, linkIndex) => {
                                    const isActive = activeSectionId === link.sectionId;

                                    return (
                                        <li key={link.sectionId} role="listitem">
                                            <motion.button
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: linkIndex * 0.05 }}
                                                onClick={() => handleNavClick(link.sectionId)}
                                                onKeyDown={(event) => handleKeyDown(event, link.sectionId)}
                                                aria-current={isActive ? "true" : undefined}
                                                className={`w-full px-3 min-h-[44px] flex items-center gap-2 text-left transition-all duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-[-2px]
                          ${isActive
                                                        ? "bg-accent-blue/10 text-accent-blue border-l-2 border-accent-blue"
                                                        : "text-text-secondary hover:text-text-primary hover:bg-surface-hover"
                                                    }`}
                                            >
                                                <span className="text-xs opacity-70" aria-hidden="true">📄</span>
                                                <span className="text-[13px]">{link.fileName}</span>
                                            </motion.button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    )}
                </div>

                <div className="px-4 py-3 border-t border-border text-[11px] text-text-muted" aria-label="Availability status">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-accent-green" aria-hidden="true" />
                        Open to Work
                    </div>
                    <div className="text-text-muted">Dubai & Remote</div>
                </div>
            </aside>
        </>
    );
}
