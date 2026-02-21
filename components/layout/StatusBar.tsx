export default function StatusBar() {
    return (
        <footer
            className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-border font-jetbrains text-[10px] md:text-xs"
            role="contentinfo"
            aria-label="Status bar"
        >
            <div className="flex items-center justify-between px-3 md:px-4 py-1.5">
                <div className="flex items-center gap-2 md:gap-4 text-text-secondary">
                    <span className="flex items-center gap-1">
                        <span className="text-accent-blue" aria-hidden="true">⎇</span> main
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="text-accent-green" aria-hidden="true">✓</span> TypeScript
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                        <span aria-hidden="true">📍</span> Dubai-ready
                    </span>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-text-secondary">
                    <span className="hidden sm:flex items-center gap-1">
                        <span className="text-accent-green" aria-hidden="true">⚡</span> Open to work
                    </span>
                    <span className="text-text-primary">Hizbullah Wazir</span>
                </div>
            </div>
        </footer>
    );
}
