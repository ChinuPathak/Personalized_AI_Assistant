import { useChatStore } from "../store/chatStore";

export const useDocument = () => {
    const selectedFile = useChatStore(
        (state) => state.selectedFile
    );

    const loading = useChatStore(
        (state) => state.loading.upload
    );

    const error = useChatStore(
        (state) => state.error
    );

    const setSelectedFile = useChatStore(
        (state) => state.setSelectedFile
    );

    const uploadFile = useChatStore(
        (state) => state.uploadFile
    );

    const clearError = useChatStore(
        (state) => state.clearError
    );

    return {
        selectedFile,
        loading,
        error,
        setSelectedFile,
        uploadFile,
        clearError,
    };
};