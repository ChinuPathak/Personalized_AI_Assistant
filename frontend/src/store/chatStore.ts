import { create } from "zustand";
import axios from "axios";

import {
    createSession,
    generateResponse,
    getChatHistory,
} from "../api/chat";

import { uploadDocument } from "../api/document";

import { recordVoice } from "../api/voice";

import type {
    ChatMessage,
    Session,
    ChatLoading
} from "../types";



interface ChatState {
    currentSession: Session | null;

    sessions: Session[];

    messages: ChatMessage[];

    selectedFile: File | null;

    transcript: string;

    loading: ChatLoading;

    error: string | null;

    setCurrentSession: (
        session: Session
    ) => void;

    createNewSession: (
        userId: number
    ) => Promise<void>;

    selectSession: (
        session: Session
    ) => Promise<void>;

    sendMessage: (
        query: string
    ) => Promise<void>;

    uploadFile: (
        userId: number,
        file: File
    ) => Promise<void>;

    startVoiceRecording: (
        userId: number
    ) => Promise<void>;

    setSelectedFile: (
        file: File | null
    ) => void;

    setTranscript: (
        transcript: string
    ) => void;

    clearChat: () => void;

    clearError: () => void;

    reset: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({

    currentSession: null,

    sessions: [],

    messages: [],

    selectedFile: null,

    transcript: "",

    loading: {
        session: false,
        generate: false,
        upload: false,
        voice: false,
    },

    error: null,

    setCurrentSession: (session) => {
        set((state) => ({
            currentSession: session,

            sessions: state.sessions.some(
                (item) => item.session_id === session.session_id
            )
                ? state.sessions
                : [session, ...state.sessions],

            messages: [],

            transcript: "",

            selectedFile: null,

            error: null,
        }));
    },

    createNewSession: async (userId) => {

        set((state) => ({
            loading: {
                ...state.loading,
                session: true,
            },
            error: null,
        }));

        try {

            const response =
                await createSession({
                    user_id: userId,
                });

            const session = response.session;

            set((state) => ({
                currentSession: session,

                sessions: [
                    session,
                    ...state.sessions,
                ],

                messages: [],

                transcript: "",

                selectedFile: null,

                loading: {
                    ...state.loading,
                    session: false,
                },
            }));

        } catch (error: unknown) {

            let message = "Unable to create session.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({
                error: message,

                loading: {
                    ...state.loading,
                    session: false,
                },
            }));

            throw error;
        }

    },

    selectSession: async (session) => {

        set({
            currentSession: session,
            transcript: "",
            selectedFile: null,
            error: null,
        });

        try {

            const response = await getChatHistory(
                session.session_id
            );

            const history: ChatMessage[] =
                response.messages.map((msg) => ({
                    id: String(msg.message_id),
                    session_id: session.session_id,
                    role: msg.role,
                    message: msg.message,
                    created_at: new Date().toISOString(),
                }));

            set({
                messages: history,
            });

        } catch (error) {

            console.error(
                "Unable to load history",
                error
            );

            set({
                messages: [],
            });

        }

    },

    sendMessage: async (query) => {

        const session = get().currentSession;

        if (!session) {
            throw new Error("No active session.");
        }

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            session_id: session.session_id,
            role: "user",
            message: query,
            created_at: new Date().toISOString(),
        };

        const loadingMessage: ChatMessage = {
            id: crypto.randomUUID(),
            session_id: session.session_id,
            role: "assistant",
            message: "",
            loading: true,
            created_at: new Date().toISOString(),
        };

        set((state) => ({
            messages: [
                ...state.messages,
                userMessage,
                loadingMessage,
            ],

            loading: {
                ...state.loading,
                generate: true,
            },

            error: null,
        }));

        try {

            const response =
                await generateResponse({
                    session_id: session.session_id,
                    query,
                });

            const assistantMessage: ChatMessage = {
                id: loadingMessage.id,
                session_id: session.session_id,
                role: "assistant",
                message: response.response,
                created_at: loadingMessage.created_at,
                loading: false,
            };

            set((state) => ({

                messages: state.messages.map((message) =>

                    message.loading
                        ? {
                            ...assistantMessage,
                            loading: false,
                        }
                        : message
                ),

                currentSession: {
                    ...session,
                    title:
                        session.title === "New Chat"
                            ? query
                            : session.title,
                    status: "ACTIVE",
                },

                sessions: state.sessions.map((item) =>
                    item.session_id === session.session_id
                        ? {
                            ...item,
                            title:
                                item.title === "New Chat"
                                    ? query
                                    : item.title,
                            status: "ACTIVE",
                        }
                        : item
                ),

                loading: {
                    ...state.loading,
                    generate: false,
                },

            }));

        } catch (error: unknown) {

            let message = "Unable to generate response.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({
                messages: state.messages.filter(
                    (message) => !message.loading
                ),

                error: message,

                loading: {
                    ...state.loading,
                    generate: false,
                },
            }));

            throw error;
        }

    },

    uploadFile: async (
        userId,
        file
    ) => {

        const session = get().currentSession;

        if (!session) {
            throw new Error("No active session.");
        }

        set((state) => ({

            loading: {
                ...state.loading,
                upload: true,
            },

            error: null,

        }));

        try {

            await uploadDocument(
                userId,
                session.session_id,
                file
            );

            set((state) => ({

                selectedFile: file,

                loading: {
                    ...state.loading,
                    upload: false,
                },

            }));

        } catch (error: unknown) {

            let message = "Document upload failed.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({

                error: message,

                loading: {
                    ...state.loading,
                    upload: false,
                },

            }));

            throw error;
        }

    },

    startVoiceRecording: async (
        userId
    ) => {

        const session = get().currentSession;

        if (!session) {
            throw new Error("No active session.");
        }

        set((state) => ({

            loading: {
                ...state.loading,
                voice: true,
            },

            error: null,

        }));

        try {

            const response =
                await recordVoice(
                    userId,
                    session.session_id
                );

            set((state) => ({

                transcript: response.data,

                loading: {
                    ...state.loading,
                    voice: false,
                },

            }));

        } catch (error: unknown) {

            let message = "Voice recording failed.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({

                error: message,

                loading: {
                    ...state.loading,
                    voice: false,
                },

            }));

            throw error;
        }

    },

    setSelectedFile: (file) => {

        set({
            selectedFile: file,
        });

    },

    setTranscript: (transcript) => {

        set({
            transcript,
        });

    },

    clearChat: () => {

        set({

            currentSession: null,

            messages: [],

            transcript: "",

            selectedFile: null,

        });

    },

    clearError: () => {

        set({
            error: null,
        });

    },

    reset: () => {

    set({

        currentSession: null,

        sessions: [],

        messages: [],

        selectedFile: null,

        transcript: "",

        error: null,

        loading: {
            session: false,
            generate: false,
            upload: false,
            voice: false,
        },

    });

},

}));