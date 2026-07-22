import { Eye, EyeOff } from "lucide-react";
import {
    useState,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

interface InputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const Input = ({
    label,
    error,
    leftIcon,
    rightIcon,

    type = "text",

    className = "",

    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] =
        useState(false);

    const isPassword =
        type === "password";

    return (
        <div className="w-full space-y-2">

            {label && (
                <label className="block text-sm font-medium text-slate-300">
                    {label}
                </label>
            )}

            <div
                className={`
                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border

                    ${
                        error
                            ? "border-red-500"
                            : "border-slate-700"
                    }

                    bg-slate-900

                    px-4

                    transition-all

                    duration-200

                    focus-within:border-blue-500

                    focus-within:ring-2

                    focus-within:ring-blue-500/30
                `}
            >
                {leftIcon && (
                    <span className="text-slate-400">
                        {leftIcon}
                    </span>
                )}

                <input
                    {...props}
                    type={
                        isPassword
                            ? showPassword
                                ? "text"
                                : "password"
                            : type
                    }
                    className={`
                        h-12

                        w-full

                        border-none

                        bg-transparent

                        text-white

                        outline-none

                        placeholder:text-slate-500

                        ${className}
                    `}
                />

                {isPassword ? (
                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                ) : (
                    rightIcon && (
                        <span className="text-slate-400">
                            {rightIcon}
                        </span>
                    )
                )}
            </div>

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Input;