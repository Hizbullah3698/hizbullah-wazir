"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

const SUGGESTED_QUESTIONS = [
    "What's his tech stack?",
    "Tell me about his experience",
    "Is he available for Dubai roles?",
    "What projects has he built?",
];

const WELCOME_MESSAGE: ChatMessage = {
    role: "assistant",
    content: "Hi! I'm Hizbullah's AI assistant. Ask me anything about his skills, experience, projects, or availability. 👋",
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: "user", content: messageText.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageText.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
            } else {
                setMessages((prev) => [...prev, {
                    role: "assistant",
                    content: data.error || "Sorry, I couldn't process that. Try again.",
                }]);
            }
        } catch {
            setMessages((prev) => [...prev, {
                role: "assistant",
                content: "Connection error. Please try again.",
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        sendMessage(inputValue);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage(inputValue);
        }
    };

    return (
        <>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-16 right-4 md:bottom-10 md:right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent-blue text-background flex items-center justify-center shadow-lg hover:shadow-glow-strong transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-[7.5rem] right-4 md:bottom-28 md:right-6 z-40 w-[calc(100vw-32px)] max-w-[380px] h-[450px] md:h-[500px] glass-card flex flex-col overflow-hidden"
                        role="dialog"
                        aria-label="AI assistant chat"
                    >
                        <div className="px-4 py-3 bg-surface border-b border-border flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                            <span className="font-jetbrains text-xs text-text-primary font-semibold">AI Assistant</span>
                            <span className="font-jetbrains text-[10px] text-text-muted ml-auto">Powered by Gemini</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 scrollbar-none">
                            {messages.map((message, messageIndex) => (
                                <div
                                    key={messageIndex}
                                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-3 py-2 rounded-lg font-jetbrains text-xs md:text-[13px] leading-relaxed ${message.role === "user"
                                                ? "bg-accent-blue text-background rounded-br-none"
                                                : "bg-surface text-text-secondary border border-border rounded-bl-none"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-surface border border-border rounded-lg rounded-bl-none px-3 py-2">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length <= 1 && !isLoading && (
                            <div className="px-3 md:px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTED_QUESTIONS.map((question) => (
                                    <button
                                        key={question}
                                        onClick={() => sendMessage(question)}
                                        className="font-jetbrains text-[10px] md:text-[11px] text-text-secondary bg-surface border border-border px-2 py-1.5 rounded hover:border-accent-blue hover:text-accent-blue transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="p-3 border-t border-border flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(event) => setInputValue(event.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask about Hizbullah..."
                                disabled={isLoading}
                                className="flex-1 bg-surface text-text-primary placeholder-text-muted font-jetbrains text-xs md:text-sm px-3 py-2 rounded-md border border-border focus:border-accent-blue focus:outline-none transition-colors min-w-0 min-h-[44px]"
                                aria-label="Chat message input"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !inputValue.trim()}
                                className="min-w-[44px] min-h-[44px] rounded-md bg-accent-blue text-background flex items-center justify-center disabled:opacity-40 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-blue focus-visible:outline-offset-2"
                                aria-label="Send message"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
