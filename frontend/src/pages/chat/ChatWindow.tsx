import {
    ChatInput,
    EmptyChat,
    MessageList,
} from "../../components/chat";

import { useAuth, useChat } from "../../hooks";

const ChatWindow = () => {
    const {
        messages,
        loading,
        sendMessage,
        uploadFile,
        startVoiceRecording,
    } = useChat();

    const { user } = useAuth();

    const handleSend = async (message: string) => {
        try {
            await sendMessage(message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileSelect = async (file: File) => {
        if (!user) return;
        try {
            await uploadFile(user.user_id, file);
        } catch (error) {
            console.error(error);
        }
    };

    const handleVoiceClick = async () => {
        if (!user) return;
        try {
            await startVoiceRecording(user.user_id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex h-full flex-col bg-slate-950">
            <div className="flex-1 overflow-y-auto">
                {messages.length === 0 ? (
                    <EmptyChat />
                ) : (
                    <MessageList messages={messages} />
                )}
            </div>

            <ChatInput
                loading={loading.generate}
                onSend={handleSend}
                onFileSelect={handleFileSelect}
                onVoiceClick={handleVoiceClick}
            />
        </div>
    );
};

export default ChatWindow;