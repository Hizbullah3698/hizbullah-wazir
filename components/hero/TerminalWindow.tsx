"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

const TERMINAL_LINES = [
    "> Initializing portfolio...",
    "> Loading: Hizbullah Wazir",
    "> Role: Frontend React Developer",
    "> Status: Open to opportunities — Dubai & Remote",
    "> Stack: React · Next.js · TypeScript · Node.js",
];

export default function TerminalWindow() {
    const { displayedLines, isComplete } = useTypewriter(TERMINAL_LINES);

    return (
        <div className="glass-card overflow-hidden max-w-2xl w-full terminal-scanlines">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-surface border-b border-border">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-2 md:ml-3 text-[10px] md:text-xs text-text-muted font-jetbrains">portfolio — bash</span>
            </div>

            <div className="p-4 md:p-5 font-jetbrains text-xs md:text-sm lg:text-base leading-relaxed min-h-[180px] md:min-h-[200px] relative z-0">
                {displayedLines.map((line, lineIndex) => (
                    <div key={lineIndex} className="flex">
                        <span className="text-accent-green break-all">{line}</span>
                    </div>
                ))}
                {isComplete && (
                    <div className="flex items-center mt-1">
                        <span className="text-accent-green">&gt; </span>
                        <span className="w-2 h-4 md:w-2.5 md:h-5 bg-accent-green animate-pulse ml-0.5" />
                    </div>
                )}
                {!isComplete && displayedLines.length > 0 && (
                    <span className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-accent-green animate-pulse ml-0.5" />
                )}
            </div>
        </div>
    );
}
