import api from "./axios";

import type {
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
} from "../types";

export const login = async (
    payload: LoginRequest
): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>(
        "/login",
        payload
    );

    return data;
};

export const signup = async (
    payload: SignupRequest
): Promise<SignupResponse> => {
    const { data } = await api.post<SignupResponse>(
        "/signup",
        payload
    );

    return data;
};