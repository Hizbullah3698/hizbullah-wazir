"use client";

import { useTypewriter } from "@/hooks/useTypewriter";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { scrollToSection } from "@/lib/scroll-utils";

const TERMINAL_LINES = [
    "> Initializing portfolio...",
    "> Loading: Hizbullah Wazir",
    "> Role: Frontend React Developer",
    "> Status: Open to opportunities — Dubai & Remote",
    "> Stack: React · Next.js · TypeScript · Node.js",
];

type TerminalHistory = {
    command: string;
    output: string | React.ReactNode;
};

export default function TerminalWindow() {
    const { displayedLines, isComplete } = useTypewriter(TERMINAL_LINES);
    const [history, setHistory] = useState<TerminalHistory[]>([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, displayedLines]);

    const handleCommand = (command: string) => {
        const cmd = command.toLowerCase().trim();
        let output: string | React.ReactNode = "";

        switch (cmd) {
            case "help":
                output = (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <div>help</div> <div className="text-text-muted">- Show available commands</div>
                        <div>about</div> <div className="text-text-muted">- Brief introduction</div>
                        <div>skills</div> <div className="text-text-muted">- List technologies</div>
                        <div>projects</div> <div className="text-text-muted">- View my work</div>
                        <div>contact</div> <div className="text-text-muted">- Get in touch</div>
                        <div>social</div> <div className="text-text-muted">- LinkedIn & GitHub</div>
                        <div>clear</div> <div className="text-text-muted">- Reset terminal</div>
                    </div>
                );
                break;
            case "about":
                output = "I am a Frontend React Developer based in Dubai, specialized in building premium, accessible web experiences using React 19 and Next.js.";
                break;
            case "skills":
                output = "Expertise: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Node.js, and Gemini AI integration.";
                break;
            case "projects":
                output = "Scrolling to projects section...";
                scrollToSection("projects");
                break;
            case "contact":
                output = "Scrolling to contact section...";
                scrollToSection("contact");
                break;
            case "social":
                output = (
                    <div className="flex flex-col">
                        <span>LinkedIn: linkedin.com/in/hizbullahwazir</span>
                        <span>GitHub: github.com/Hizbullah3698</span>
                    </div>
                );
                break;
            case "clear":
                setHistory([]);
                return;
            default:
                output = `Command not found: ${cmd}. Type 'help' for available commands.`;
        }

        setHistory((prev) => [...prev, { command, output }]);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(inputValue);
            setInputValue("");
        }
    };

    return (
        <div
            className="glass-card overflow-hidden max-w-2xl w-full terminal-scanlines cursor-text"
            onClick={handleFocus}
        >
            <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-surface border-b border-border">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-2 md:ml-3 text-[10px] md:text-xs text-text-muted font-jetbrains">user@portfolio — bash</span>
            </div>

            <div
                ref={scrollRef}
                className="p-4 md:p-5 font-jetbrains text-xs md:text-sm lg:text-base leading-relaxed h-[220px] md:h-[250px] overflow-y-auto scrollbar-none relative z-0"
            >
                {displayedLines.map((line, index) => (
                    <div key={`init-${index}`} className="text-accent-green">{line}</div>
                ))}

                {history.map((item, index) => (
                    <div key={`hist-${index}`} className="mt-2">
                        <div className="flex text-accent-blue">
                            <span>$ {item.command}</span>
                        </div>
                        <div className="mt-1 text-text-primary opacity-90">{item.output}</div>
                    </div>
                ))}

                {isComplete && (
                    <div className="flex items-center mt-2 text-accent-blue">
                        <span className="shrink-0">$ </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            autoFocus
                            className="bg-transparent border-none outline-none flex-1 ml-2 text-text-primary caret-accent-blue"
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </div>
                )}

                {!isComplete && displayedLines.length > 0 && (
                    <span className="inline-block w-2 h-4 md:w-2.5 md:h-5 bg-accent-green animate-pulse ml-0.5" />
                )}
            </div>
        </div>
    );
}
