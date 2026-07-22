import type {
    HTMLAttributes,
    ReactNode,
} from "react";

interface CardProps
    extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

const Card = ({
    children,
    title,
    subtitle,
    className = "",
    ...props
}: CardProps) => {
    return (
        <div
            className={`
                w-full
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/70
                backdrop-blur-xl
                shadow-2xl
                p-8
                ${className}
            `}
            {...props}
        >
            {(title || subtitle) && (
                <div className="mb-8 text-center">
                    {title && (
                        <h2 className="text-3xl font-bold text-white">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-2 text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {children}
        </div>
    );
};

export default Card;