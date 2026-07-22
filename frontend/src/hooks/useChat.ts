import { useChatStore } from "../store/chatStore";

export const useChat = () => {
    const currentSession = useChatStore(
        (state) => state.currentSession
    );

    const sessions = useChatStore(
        (state) => state.sessions
    );

    const messages = useChatStore(
        (state) => state.messages
    );

    const selectedFile = useChatStore(
        (state) => state.selectedFile
    );

    const transcript = useChatStore(
        (state) => state.transcript
    );

    const loading = useChatStore(
        (state) => state.loading
    );

    const error = useChatStore(
        (state) => state.error
    );

    const createNewSession = useChatStore(
        (state) => state.createNewSession
    );

    const selectSession = useChatStore(
        (state) => state.selectSession
    );

    const sendMessage = useChatStore(
        (state) => state.sendMessage
    );

    const uploadFile = useChatStore(
        (state) => state.uploadFile
    );

    const startVoiceRecording = useChatStore(
        (state) => state.startVoiceRecording
    );

    const setSelectedFile = useChatStore(
        (state) => state.setSelectedFile
    );

    const setTranscript = useChatStore(
        (state) => state.setTranscript
    );

    const clearChat = useChatStore(
        (state) => state.clearChat
    );

    const clearError = useChatStore(
        (state) => state.clearError
    );

    const reset = useChatStore(
        (state) => state.reset
    );

    return {
        currentSession,
        sessions,
        messages,
        selectedFile,
        transcript,
        loading,
        error,

        createNewSession,
        selectSession,
        sendMessage,
        uploadFile,
        startVoiceRecording,

        setSelectedFile,
        setTranscript,

        clearChat,
        clearError,
        reset,
    };
};