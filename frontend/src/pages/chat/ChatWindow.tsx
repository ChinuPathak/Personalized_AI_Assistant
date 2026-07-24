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
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                    <EmptyChat />
                ) : (
                    <MessageList />
                )}
            </div>

            <ChatInput />
        </div>
    );
};

export default ChatWindow;