import { Bot, User } from "lucide-react";

import type { ChatRole } from "../../types/chat";

interface MessageBubbleProps {
    message: string;
    role: ChatRole;
    created_at?: string;
    loading?: boolean;
}

const MessageBubble = ({
    message,
    role,
    created_at,
    loading = false,
}: MessageBubbleProps) => {
    const isUser = role === "user";

    return (
        <div
            className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
            }`}
        >
            <div
                className={`flex max-w-3xl items-start gap-3 ${
                    isUser ? "flex-row-reverse" : ""
                }`}
            >
                {/* Avatar */}
                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        isUser
                            ? "bg-blue-600"
                            : "bg-slate-700"
                    }`}
                >
                    {isUser ? (
                        <User className="h-5 w-5 text-white" />
                    ) : (
                        <Bot className="h-5 w-5 text-white" />
                    )}
                </div>

                {/* Message Bubble */}
                <div
                    className={`rounded-2xl px-5 py-4 shadow-sm ${
                        isUser
                            ? "rounded-tr-md bg-blue-600 text-white"
                            : "rounded-tl-md border border-slate-700 bg-slate-800 text-slate-100"
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center gap-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]"></span>
                            <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.4s]"></span>
                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap break-words text-sm leading-7">
                            {message}
                        </p>
                    )}

                    {created_at && (
                        <p
                            className={`mt-3 text-xs ${
                                isUser
                                    ? "text-blue-100"
                                    : "text-slate-400"
                            }`}
                        >
                            {new Date(created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;