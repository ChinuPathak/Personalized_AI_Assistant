import {
    useEffect,
    useRef,
    type KeyboardEvent,
    type TextareaHTMLAttributes,
} from "react";

interface TextAreaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
    onEnterPress?: () => void;
    minimal?: boolean;
}

const TextArea = ({
    error,
    onEnterPress,
    minimal = false,
    className = "",
    value,
    onKeyDown,
    ...props
}: TextAreaProps) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto resize
    useEffect(() => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            220
        )}px`;
    }, [value]);

    const handleKeyDown = (
        event: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            onEnterPress?.();
        }

        onKeyDown?.(event);
    };

    return (
        <div className="w-full">
            <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                onKeyDown={handleKeyDown}
                className={`
                    w-full
                    resize-none

                    ${
                        minimal
                            ? `
                                bg-transparent
                                border-0
                                rounded-none
                                px-0
                                py-0
                                shadow-none
                                focus:border-transparent
                                focus:ring-0
                              `
                            : `
                                rounded-2xl
                                border
                                ${
                                    error
                                        ? "border-red-500"
                                        : "border-slate-700"
                                }
                                bg-slate-900
                                px-4
                                py-3
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-500/30
                              `
                    }

                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    overflow-y-auto
                    max-h-[220px]

                    ${className}
                `}
                {...props}
            />

            {!minimal && error && (
                <p className="mt-2 text-sm text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;