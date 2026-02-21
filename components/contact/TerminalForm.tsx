"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type FormField = {
    label: string;
    fieldKey: string;
    placeholder: string;
    inputType: "text" | "email" | "textarea";
};

const FORM_FIELDS: FormField[] = [
    { label: "name", fieldKey: "name", placeholder: "Your Name", inputType: "text" },
    { label: "email", fieldKey: "email", placeholder: "your@email.com", inputType: "email" },
    { label: "message", fieldKey: "message", placeholder: "Type your message...", inputType: "textarea" },
];

type FormState = {
    name: string;
    email: string;
    message: string;
};

const INITIAL_FORM_STATE: FormState = {
    name: "",
    email: "",
    message: "",
};

export default function TerminalForm() {
    const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (fieldKey: string, value: string) => {
        setFormData((previousState) => ({ ...previousState, [fieldKey]: value }));
    };

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);

        const mailtoLink = `mailto:hizbullah3698@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.email}`;
        window.open(mailtoLink, "_blank");

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData(INITIAL_FORM_STATE);
        }, 3000);
    };

    return (
        <div className="glass-card overflow-hidden w-full terminal-scanlines">
            <div className="flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 bg-surface border-b border-border">
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F]" />
                <span className="ml-2 md:ml-3 text-[10px] md:text-xs text-text-muted font-jetbrains">contact — bash</span>
            </div>

            <form onSubmit={handleFormSubmit} className="p-4 md:p-5 space-y-4 font-jetbrains text-xs md:text-sm relative z-0">
                {FORM_FIELDS.map((field, fieldIndex) => (
                    <motion.div
                        key={field.fieldKey}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: fieldIndex * 0.1 }}
                    >
                        <div className="flex items-start gap-1.5 md:gap-2">
                            <span className="text-accent-green shrink-0 mt-2.5">$</span>
                            <span className="text-accent-purple shrink-0 mt-2.5">{field.label}:</span>
                            {field.inputType === "textarea" ? (
                                <textarea
                                    value={formData[field.fieldKey as keyof FormState]}
                                    onChange={(event) => handleInputChange(field.fieldKey, event.target.value)}
                                    placeholder={field.placeholder}
                                    required
                                    rows={4}
                                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none border-b border-border focus-glow transition-colors resize-none py-2 min-w-0"
                                />
                            ) : (
                                <input
                                    type={field.inputType}
                                    value={formData[field.fieldKey as keyof FormState]}
                                    onChange={(event) => handleInputChange(field.fieldKey, event.target.value)}
                                    placeholder={field.placeholder}
                                    required
                                    className="flex-1 bg-transparent text-text-primary placeholder-text-muted outline-none border-b border-border focus-glow transition-colors py-2 min-h-[44px] min-w-0"
                                />
                            )}
                        </div>
                    </motion.div>
                ))}

                <div className="flex items-center gap-2 pt-2">
                    <span className="text-accent-green">$</span>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 md:px-5 py-2.5 rounded-md font-jetbrains text-xs md:text-sm transition-all duration-300 min-h-[44px] ${isSubmitted
                                ? "bg-accent-green/20 text-accent-green border border-accent-green/30"
                                : "bg-accent-blue text-background hover:shadow-glow-strong"
                            }`}
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? "✓ Message sent!" : "./send-message.sh"}
                    </motion.button>
                </div>
            </form>
        </div>
    );
}
