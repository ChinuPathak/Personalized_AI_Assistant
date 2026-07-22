import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({
    children,
}: AuthLayoutProps) => {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb25,transparent_60%)]" />

            {/* Decorative Blur - Top Left */}
            <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            {/* Decorative Blur - Bottom Right */}
            <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

            <motion.div
                initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.96,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                }}
                transition={{
                    duration: 0.45,
                    ease: "easeOut",
                }}
                className="relative z-10 w-full max-w-xl"
            >
                {/* Logo */}
                <div className="mb-8 flex flex-col items-center">

                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-blue-500 shadow-2xl shadow-blue-600/30">
                        <Sparkles
                            size={38}
                            className="text-white"
                        />
                    </div>

                    <h1 className="text-4xl font-bold text-white">
                        AI Assistant
                    </h1>

                    <p className="mt-2 text-center text-slate-400">
                        Intelligent Document & Voice Assistant
                    </p>

                </div>

                {children}

            </motion.div>

        </div>
    );
};

export default AuthLayout;