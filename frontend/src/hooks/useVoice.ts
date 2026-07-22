import { useChatStore } from "../store/chatStore";

export const useVoice = () => {
    const transcript = useChatStore(
        (state) => state.transcript
    );

    const loading = useChatStore(
        (state) => state.loading.voice
    );

    const error = useChatStore(
        (state) => state.error
    );

    const startVoiceRecording = useChatStore(
        (state) => state.startVoiceRecording
    );

    const setTranscript = useChatStore(
        (state) => state.setTranscript
    );

    const clearError = useChatStore(
        (state) => state.clearError
    );

    return {
        transcript,
        loading,
        error,
        startVoiceRecording,
        setTranscript,
        clearError,
    };
};