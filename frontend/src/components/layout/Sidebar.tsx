import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    MessageSquarePlus,
    UserCircle2,
} from "lucide-react";

interface ChatSession {
    id: number;
    title: string;
}

interface SidebarProps {
    sessions?: ChatSession[];
    activeSessionId?: number;
    onSessionSelect?: (id: number) => void;
    onNewChat?: () => void;
    onLogout?: () => void;
}

const Sidebar = ({
    sessions = [],
    activeSessionId,
    onSessionSelect,
    onNewChat,
    onLogout,
}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`flex h-full flex-col border-r border-slate-800 bg-slate-900 transition-all duration-300 ${
                collapsed ? "w-20" : "w-72"
            }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-4">
                {!collapsed && (
                    <h2 className="text-lg font-semibold text-white">
                        AI Assistant
                    </h2>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                >
                    {collapsed ? (
                        <ChevronRight size={20} />
                    ) : (
                        <ChevronLeft size={20} />
                    )}
                </button>
            </div>

            {/* New Chat */}
            <div className="p-4">
                <button
                    onClick={onNewChat}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <MessageSquarePlus size={20} />

                    {!collapsed && <span>New Chat</span>}
                </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-2">
                {sessions.map((session) => (
                    <button
                        key={session.id}
                        onClick={() => onSessionSelect?.(session.id)}
                        className={`mb-2 flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                            activeSessionId === session.id
                                ? "bg-slate-700 text-white"
                                : "text-slate-300 hover:bg-slate-800"
                        }`}
                    >
                        {!collapsed ? (
                            <span className="truncate">
                                {session.title}
                            </span>
                        ) : (
                            <MessageSquarePlus size={18} />
                        )}
                    </button>
                ))}

                {sessions.length === 0 && !collapsed && (
                    <p className="px-3 py-4 text-sm text-slate-500">
                        No conversations yet.
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4">
                <div className="mb-3 flex items-center gap-3">
                    <UserCircle2
                        size={36}
                        className="text-slate-300"
                    />

                    {!collapsed && (
                        <div>
                            <p className="font-medium text-white">
                                User
                            </p>

                            <p className="text-xs text-slate-400">
                                AI Assistant
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={onLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition hover:bg-red-500 hover:text-white"
                >
                    <LogOut size={18} />

                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;