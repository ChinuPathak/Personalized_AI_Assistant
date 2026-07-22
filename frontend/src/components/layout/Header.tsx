import type { ReactNode } from "react";

interface HeaderProps {
    title?: string;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
}

const Header = ({
    title = "AI Assistant",
    leftContent,
    rightContent,
}: HeaderProps) => {
    return (
        <div className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {leftContent}

                <h1 className="text-lg font-semibold tracking-tight text-white">
                    {title}
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
                {rightContent}
            </div>
        </div>
    );
};

export default Header;