import api from "./axios";

import type { UploadDocumentResponse } from "../types";

export const uploadDocument = async (
    userId: number,
    sessionId: number,
    file: File
): Promise<UploadDocumentResponse> => {

    const formData = new FormData();

    formData.append("file", file);

    const { data } = await api.post<UploadDocumentResponse>(
        `/docUpload?userId=${userId}&sessionId=${sessionId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};