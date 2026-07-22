import api from "./axios";

import type { VoiceResponse } from "../types";

export const recordVoice = async (
    userId: number,
    sessionId: number
): Promise<VoiceResponse> => {

    const { data } =
        await api.post<VoiceResponse>(
            `/voiceChat?userId=${userId}&sessionId=${sessionId}`
        );

    return data;
};