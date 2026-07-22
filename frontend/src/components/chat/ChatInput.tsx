import { useRef, useState } from "react";
import { Mic, Paperclip, SendHorizontal } from "lucide-react";

import { Button, TextArea } from "../ui";

interface ChatInputProps {
    onSend: (message: string) => void;
    onFileSelect?: (file: File) => void;
    onVoiceClick?: () => void;
    loading?: boolean;
}

const ChatInput = ({
    onSend,
    onFileSelect,
    onVoiceClick,
    loading = false,
}: ChatInputProps) => {
    const [message, setMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) return;

        onSend(trimmedMessage);
        setMessage("");
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        onFileSelect?.(file);

        event.target.value = "";
    };

    return (
        <div className="border-t border-slate-800 bg-slate-900 px-6 py-5">
            <div className="mx-auto max-w-4xl">
                <div className="rounded-3xl border border-slate-700 bg-slate-800 p-3 shadow-lg">
                    <TextArea
                        value={message}
                        placeholder="Ask anything..."
                        disabled={loading}
                        onChange={(e) => setMessage(e.target.value)}
                        onEnterPress={handleSend}
                        className="border-none bg-transparent focus:ring-0"
                    />

                    <div className="mt-3 flex items-center justify-between">
                        {/* Left Actions */}
                        <div className="flex items-center gap-2">
                            <input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                disabled={loading}
                            >
                                <Paperclip size={18} />
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={onVoiceClick}
                                disabled={loading}
                            >
                                <Mic size={18} />
                            </Button>
                        </div>

                        {/* Send Button */}
                        <Button
                            type="button"
                            onClick={handleSend}
                            loading={loading}
                            disabled={!message.trim()}
                        >
                            <SendHorizontal size={18} />
                        </Button>
                    </div>
                </div>

                <p className="mt-3 text-center text-xs text-slate-500">
                    AI can make mistakes. Verify important information before
                    relying on it.
                </p>
            </div>
        </div>
    );
};

export default ChatInput;