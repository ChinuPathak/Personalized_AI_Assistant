import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    MessageSquarePlus,
    UserCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useChatStore } from "../../store/chatStore";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    // Auth Store
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    // Chat Store
    const sessions = useChatStore(
        (state) => state.sessions
    );

    const currentSession = useChatStore(
        (state) => state.currentSession
    );

    const createNewSession = useChatStore(
        (state) => state.createNewSession
    );

    const selectSession = useChatStore(
        (state) => state.selectSession
    );

    const reset = useChatStore(
        (state) => state.reset
    );

    const handleLogout = () => {
        reset();
        logout();

        navigate("/login", {
            replace: true,
        });
    };

    const handleNewChat = async () => {
        if (!user) return;

        try {
            console.log("Before:", useChatStore.getState().currentSession);
            await createNewSession(user.user_id);
            console.log("After:", useChatStore.getState().currentSession);
            console.log("New session created");
        } catch (error) {
            console.error("Unable to create chat session", error);
        }
    };

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
                    onClick={handleNewChat}
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
                        key={session.session_id}
                        onClick={() => {
                            void selectSession(session);
                        }}
                        className={`mb-2 flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                            currentSession?.session_id === session.session_id
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
                                {user?.name ?? "Guest"}
                            </p>

                            <p className="text-xs text-slate-400">
                                {user?.email ?? ""}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleLogout}
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