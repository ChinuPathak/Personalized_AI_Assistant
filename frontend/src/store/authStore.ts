import { create } from "zustand";
import axios from "axios";

import { login, signup } from "../api/auth";
import { useChatStore } from "./chatStore";

import type {
    LoginRequest,
    SignupRequest,
    User,
} from "../types";

interface AuthState {
    user: User | null;

    isAuthenticated: boolean;

    loading: {
        login: boolean;
        signup: boolean;
    };

    error: string | null;

    login: (payload: LoginRequest) => Promise<void>;

    signup: (payload: SignupRequest) => Promise<void>;

    logout: () => void;

    clearError: () => void;

    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,

    isAuthenticated: false,

    loading: {
        login: false,
        signup: false,
    },

    error: null,

    initializeAuth: async () => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) return;

        try {
            const user: User = JSON.parse(storedUser);

            set({
                user,
                isAuthenticated: true,
            });
            // Load previous sessions
            await useChatStore
                .getState()
                .loadSessions(user.user_id);
        } catch {
            localStorage.removeItem("user");
        }
    },

    login: async (payload) => {
        set((state) => ({
            loading: {
                ...state.loading,
                login: true,
            },
            error: null,
        }));

        try {
            const response = await login(payload);

            const chatStore = useChatStore.getState();

            // Set the newly created session
            chatStore.setCurrentSession(response.session);

            // Load previous ACTIVE sessions
            await chatStore.loadSessions(
                response.user.user_id
            );

            // Add the new EMPTY session to the top if it's not already there
            useChatStore.setState((state) => ({
                sessions: [
                    response.session,
                    ...state.sessions,
                ],
            }));

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            set((state) => ({
                user: response.user,

                isAuthenticated: true,

                loading: {
                    ...state.loading,
                    login: false,
                },
            }));
        } catch (error: unknown) {
            let message = "Unable to login.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({
                error: message,

                loading: {
                    ...state.loading,
                    login: false,
                },
            }));

            throw error;
        }
    },

    signup: async (payload) => {
        set((state) => ({
            loading: {
                ...state.loading,
                signup: true,
            },
            error: null,
        }));

        try {
            await signup(payload);

            set((state) => ({
                loading: {
                    ...state.loading,
                    signup: false,
                },
            }));
        } catch (error: unknown) {
            let message = "Unable to signup.";

            if (axios.isAxiosError(error)) {
                message =
                    error.response?.data?.detail ??
                    message;
            }

            set((state) => ({
                error: message,

                loading: {
                    ...state.loading,
                    signup: false,
                },
            }));

            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("user");

        set({
            user: null,
            isAuthenticated: false,
            error: null,
        });
    },

    clearError: () => {
        set({
            error: null,
        });
    },
}));