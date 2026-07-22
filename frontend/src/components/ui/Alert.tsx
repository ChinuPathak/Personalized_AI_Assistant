import {
    AlertCircle,
    CheckCircle2,
    Info,
    TriangleAlert,
    X,
} from "lucide-react";

import { useState } from "react";

interface AlertProps {
    variant?: "success" | "error" | "warning" | "info";

    title?: string;

    description: string;

    dismissible?: boolean;
}

const Alert = ({
    variant = "info",
    title,
    description,
    dismissible = false,
}: AlertProps) => {
    const [visible, setVisible] =
        useState(true);

    if (!visible) return null;

    const variants = {
        success: {
            container:
                "border-green-500/30 bg-green-500/10",
            icon: (
                <CheckCircle2
                    className="text-green-400"
                    size={20}
                />
            ),
            title: "text-green-300",
            description: "text-green-200",
        },

        error: {
            container:
                "border-red-500/30 bg-red-500/10",
            icon: (
                <AlertCircle
                    className="text-red-400"
                    size={20}
                />
            ),
            title: "text-red-300",
            description: "text-red-200",
        },

        warning: {
            container:
                "border-yellow-500/30 bg-yellow-500/10",
            icon: (
                <TriangleAlert
                    className="text-yellow-400"
                    size={20}
                />
            ),
            title: "text-yellow-300",
            description: "text-yellow-200",
        },

        info: {
            container:
                "border-blue-500/30 bg-blue-500/10",
            icon: (
                <Info
                    className="text-blue-400"
                    size={20}
                />
            ),
            title: "text-blue-300",
            description: "text-blue-200",
        },
    };

    const style =
        variants[variant];

    return (
        <div
            className={`
                flex
                items-start
                gap-3

                rounded-xl
                border

                p-4

                ${style.container}
            `}
        >
            <div className="mt-0.5">
                {style.icon}
            </div>

            <div className="flex-1">

                {title && (
                    <h4
                        className={`
                            mb-1
                            font-semibold
                            ${style.title}
                        `}
                    >
                        {title}
                    </h4>
                )}

                <p
                    className={`
                        text-sm
                        ${style.description}
                    `}
                >
                    {description}
                </p>

            </div>

            {dismissible && (
                <button
                    type="button"
                    onClick={() =>
                        setVisible(false)
                    }
                    className="text-slate-400 transition hover:text-white"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Alert;