import { useRef, useState } from "react";
import {
    Mic,
    Paperclip,
    SendHorizontal,
    FileText,
    X,
} from "lucide-react";

import { useChatStore } from "../../store/chatStore";
import { useAuthStore } from "../../store/authStore";

import { Button, TextArea } from "../ui";

const ChatInput = () => {
    const user = useAuthStore((state) => state.user);

    const loading = useChatStore(
        (state) => state.loading.generate
    );

    const uploading = useChatStore(
        (state) => state.loading.upload
    );

    const recording = useChatStore(
        (state) => state.loading.voice
    );

    const sendMessage = useChatStore(
        (state) => state.sendMessage
    );

    const uploadFile = useChatStore(
        (state) => state.uploadFile
    );

    const selectedFile = useChatStore(
        (state) => state.selectedFile
    );

    const setSelectedFile = useChatStore(
        (state) => state.setSelectedFile
    );

    const startVoiceRecording = useChatStore(
        (state) => state.startVoiceRecording
    );

    const [message, setMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSend = () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) return;

        void sendMessage(trimmedMessage);

        setMessage("");

        useChatStore.getState().setTranscript("");
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (user) {
            void uploadFile(user.user_id, file);
        }

        event.target.value = "";
    };

    return (
        <div className="mx-auto w-full max-w-4xl px-6 py-4">

                <div className="rounded-[28px] border border-slate-700 bg-slate-900 shadow-xl">

                    {/* Uploaded File */}
                    {selectedFile && (
                        <div className="px-5 pt-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-2">
                                <FileText
                                    size={15}
                                    className="text-blue-400"
                                />

                                <span className="max-w-[220px] truncate text-sm text-slate-200">
                                    {selectedFile.name}
                                </span>

                                <button
                                    onClick={() =>
                                        setSelectedFile(null)
                                    }
                                    className="rounded-full p-1 transition hover:bg-slate-700 hover:text-red-400"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Upload Status */}
                    {uploading && (
                        <div className="px-5 pt-4 text-sm text-blue-400">
                            Uploading document...
                        </div>
                    )}

                    {/* Recording */}
                    {recording && (
                        <div className="flex items-center gap-2 px-5 pt-4 text-sm text-red-400 animate-pulse">
                            <Mic size={16} />
                            Recording...
                        </div>
                    )}

                    {/* Composer */}
                    <div className="px-5 pt-4 pb-3">

                        <TextArea
                            minimal
                            value={message}
                            placeholder="Ask anything..."
                            disabled={loading}
                            onChange={(e) => setMessage(e.target.value)}
                            onEnterPress={handleSend}
                            className="min-h-[28px] text-base placeholder:text-slate-500"
                        />

                        <div className="mt-4 flex items-center justify-between">

                            <div className="flex items-center gap-2">

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={loading}
                                    className="h-10 w-10 rounded-full !p-0"
                                >
                                    <Paperclip className="text-white" size={18} />
                                </Button>

                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={async () => {
                                        if (!user) return;

                                        await startVoiceRecording(user.user_id);

                                        const transcript =
                                            useChatStore.getState().transcript;

                                        if (transcript) {
                                            setMessage(transcript);
                                        }
                                    }}
                                    disabled={loading}
                                    className="h-10 w-10 rounded-full !p-0"
                                >
                                    <Mic className="text-white" size={18} />
                                </Button>
                            </div>

                            <Button
                                type="button"
                                onClick={handleSend}
                                loading={loading}
                                disabled={!message.trim()}
                                className="h-10 w-10 rounded-full !p-0"
                            >
                                <SendHorizontal className="text-white" size={18} />
                            </Button>
                        </div>
                    </div>
                </div>

                <p className="mt-2 text-center text-[11px] text-slate-500">
                    AI can make mistakes. Verify important information before relying on it.
                </p>
            </div>
    );
};

export default ChatInput;