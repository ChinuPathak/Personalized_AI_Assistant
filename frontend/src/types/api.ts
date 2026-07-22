export interface ApiResponse<T = unknown> {
    message: string;
    data?: T;
}

export interface ApiError {
    detail: string;
}