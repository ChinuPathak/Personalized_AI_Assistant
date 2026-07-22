import type { ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    fullWidth?: boolean;
    variant?: "primary" | "secondary" | "danger";
}

const Button = ({
    children,
    loading = false,
    fullWidth = false,
    variant = "primary",
    className = "",
    disabled,
    ...props
}: ButtonProps) => {
    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-500 text-white",

        secondary:
            "bg-slate-700 hover:bg-slate-600 text-white",

        danger:
            "bg-red-600 hover:bg-red-500 text-white",
    };

    return (
        <button
            className={`
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-xl

                px-5
                py-3

                font-medium

                transition-all
                duration-200

                shadow-lg

                disabled:opacity-50
                disabled:cursor-not-allowed

                ${variants[variant]}

                ${
                    fullWidth
                        ? "w-full"
                        : ""
                }

                ${className}
            `}
            disabled={
                loading ||
                disabled
            }
            {...props}
        >
            {loading && (
                <Loader2
                    size={18}
                    className="animate-spin"
                />
            )}

            {children}
        </button>
    );
};

export default Button;