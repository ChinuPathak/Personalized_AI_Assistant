export interface UploadDocumentResponse {
    message: string;
}

export interface UploadedDocument {
    document_id?: number;
    session_id: number;
    file_name: string;
    created_at?: string;
}