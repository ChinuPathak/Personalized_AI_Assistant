export interface User {
    user_id: number;
    name: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user: User;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    message: string;
}