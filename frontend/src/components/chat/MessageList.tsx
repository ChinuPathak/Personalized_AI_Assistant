import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";

interface MessageListProps {
    messages: ChatMessage[];
}

const MessageList = ({
    messages,
}: MessageListProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
            <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
                {messages.map((message) => (
                    <MessageBubble
                        key={
                            message.chat_id ??
                            `${message.session_id}-${message.created_at}`
                        }
                        role={message.role}
                        message={message.message}
                        created_at={message.created_at}
                    />
                ))}

                <div ref={bottomRef} />
            </div>
        </div>
    );
};

export default MessageList;