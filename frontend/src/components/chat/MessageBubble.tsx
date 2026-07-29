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
                className={`flex items-end gap-3 ${
                    isUser ? "max-w-[75%] flex-row-reverse" : "w-full max-w-[90%]"
                }`}
            >
                {/* Avatar */}
                <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        isUser
                            ? "bg-blue-600"
                            : "bg-slate-700"
                    }`}
                >
                    {isUser ? (
                        <User className="h-[18px] w-[18px] text-white" />
                    ) : (
                        <Bot className="h-[18px] w-[18px] text-white" />
                    )}
                </div>

                {/* Message Bubble */}
                <div
                    className={`rounded-2xl shadow-sm transition-all ${
                        isUser
                            ? "w-fit max-w-full rounded-tr-lg bg-blue-600 px-4 py-3 text-white"
                            : "w-full rounded-tl-lg border border-slate-700 bg-slate-800 px-5 py-4 text-slate-100"
                    }`}
                >
                    {loading ? (
                        <div className="flex flex-col gap-3">

                            <div className="text-sm font-medium text-slate-400">
                                Thinking...
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400"></span>
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 [animation-delay:0.15s]"></span>
                                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 [animation-delay:0.3s]"></span>
                            </div>

                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap break-words text-base leading-7">
                            {message}
                        </p>
                    )}

                    {!loading && created_at &&  (
                        <div className="mt-2 flex justify-end">
                            <span
                                className={`text-[11px] ${
                                    isUser
                                        ? "text-blue-100"
                                        : "text-slate-400"
                                }`}
                            >
                                {new Date(created_at).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;