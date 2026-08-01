import api from "./axios";

import type {
    CreateSessionRequest,
    CreateSessionResponse,
    GenerateRequest,
    GenerateResponse,
    Session,
} from "../types";


export interface ChatHistoryResponse {
    messages: {
        message_id: number;
        role: "user" | "assistant";
        message: string;
    }[];
}

/**
 * Create new chat session
 */
export const createSession = async (
    payload: CreateSessionRequest
): Promise<CreateSessionResponse> => {
    const response = await api.post(
        "/sessions",
        payload
    );

    return response.data;
};

/**
 * Generate AI response
 */
export const generateResponse = async (
    payload: GenerateRequest
): Promise<GenerateResponse> => {
    const { data } =
        await api.post<GenerateResponse>(
            "/generate",
            payload
        );

    return data;
};

/**
 * Load all sessions
 * Backend API to be added later
 */
export const getSessions = async (
    userId: number
): Promise<Session[]> => {
    const { data } =
        await api.get<Session[]>(
            `/sessions/${userId}`
        );

    return data;
};

/**
 * Load chat history
 * Backend API to be added later
 */
export const getChatHistory = async (
    sessionId: number
): Promise<ChatHistoryResponse> => {
    const { data } = await api.get<ChatHistoryResponse>(
        `/chat/history/${sessionId}`
    );

    return data;
};


/**
 * Delete session
 * Backend API to be added later
 */
export const deleteSession = async (
    sessionId: number
): Promise<void> => {
    await api.delete(`/sessions/${sessionId}`);
};