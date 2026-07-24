export type ChatRole = "user" | "assistant";

export type SessionStatus = "EMPTY" | "ACTIVE";

export interface Session {
    session_id: number;
    user_id: number;
    title: string;
    status: SessionStatus;
    created_at: string;
}

export interface CreateSessionRequest {
    user_id: number;
}

export interface CreateSessionResponse {
    message: string;
    session: Session;
}

export interface ChatMessage {
    chat_id?: number;
    session_id: number;
    role: ChatRole;
    message: string;
    created_at?: string;
    loading?: boolean;
}

export interface ChatLoading {
    session: boolean;
    generate: boolean;
    upload: boolean;
    voice: boolean;
}

export interface GenerateRequest {
    session_id: number;
    query: string;
}

export interface GenerateResponse {
    response: string;
}