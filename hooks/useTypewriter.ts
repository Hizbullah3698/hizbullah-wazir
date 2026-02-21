"use client";

import { useState, useEffect, useCallback } from "react";

const TYPING_SPEED_MS = 40;
const LINE_PAUSE_MS = 500;

export function useTypewriter(lines: string[]) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    const resetTypewriter = useCallback(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsComplete(false);
    }, []);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex === 0) {
            setDisplayedLines((previousLines) => [...previousLines, ""]);
        }

        if (currentCharIndex < currentLine.length) {
            const typingTimeout = setTimeout(() => {
                setDisplayedLines((previousLines) => {
                    const updatedLines = [...previousLines];
                    updatedLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
                    return updatedLines;
                });
                setCurrentCharIndex((previousIndex) => previousIndex + 1);
            }, TYPING_SPEED_MS);

            return () => clearTimeout(typingTimeout);
        }

        const linePauseTimeout = setTimeout(() => {
            setCurrentLineIndex((previousIndex) => previousIndex + 1);
            setCurrentCharIndex(0);
        }, LINE_PAUSE_MS);

        return () => clearTimeout(linePauseTimeout);
    }, [currentLineIndex, currentCharIndex, lines]);

    return { displayedLines, isComplete, resetTypewriter };
}
