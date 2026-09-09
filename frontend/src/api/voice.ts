import api from "./axios";
import type { VoiceResponse } from "../types";

export const recordVoice = async (
    userId: number,
    sessionId: number,
    audioBlob: Blob
): Promise<VoiceResponse> => {
    console.log("Audio Blob:", audioBlob);
    console.log("Blob size:", audioBlob.size);
    console.log("Blob type:", audioBlob.type);
    const formData = new FormData();

    formData.append(
        "file",
        audioBlob,
        "recording.webm"
    );

    console.log(
        "FormData file:",
        formData.get("file")
    );

    const { data } = await api.post<VoiceResponse>(
        `/voiceChat?userId=${userId}&sessionId=${sessionId}`,
        formData
    );

    return data;
};