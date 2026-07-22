import type { ReactNode } from "react";

interface MainLayoutProps {
    header?: ReactNode;
    sidebar?: ReactNode;
    children: ReactNode;
}

const MainLayout = ({
    header,
    sidebar,
    children,
}: MainLayoutProps) => {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">

            {/* Sidebar */}
            {sidebar && (
                <aside className="w-72 shrink-0 border-r border-slate-800 bg-slate-900">
                    {sidebar}
                </aside>
            )}

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Header */}
                {header && (
                    <header className="h-16 border-b border-slate-800 bg-slate-950 px-6">
                        {header}
                    </header>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-hidden">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default MainLayout;