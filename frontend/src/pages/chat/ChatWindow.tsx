import {
    ChatInput,
    EmptyChat,
    MessageList,
} from "../../components/chat";

import { useChatStore } from "../../store/chatStore";

const ChatWindow = () => {
    const messages = useChatStore(
        (state) => state.messages
    );

    return (
        <div className="flex h-full flex-col bg-slate-950">
            {/* Conversation Area */}
            <div className="flex flex-1 justify-center overflow-y-auto">
                <div className="flex w-full max-w-6xl flex-col">
                    {messages.length === 0 ? (
                        <EmptyChat />
                    ) : (
                        <MessageList />
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-slate-800">
                <ChatInput />
            </div>
        </div>
    );
};

export default ChatWindow;