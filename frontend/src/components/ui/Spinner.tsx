import { Loader2 } from "lucide-react";

interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const Spinner = ({
    size = "md",
    text,
    fullScreen = false,
    className = "",
}: SpinnerProps) => {
    const sizes = {
        sm: "h-5 w-5",
        md: "h-8 w-8",
        lg: "h-12 w-12",
    };

    const content = (
        <div
            className={`flex flex-col items-center justify-center gap-3 ${className}`}
        >
            <Loader2
                className={`${sizes[size]} animate-spin text-blue-500`}
            />

            {text && (
                <p className="text-sm text-slate-400">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
};

export default Spinner;