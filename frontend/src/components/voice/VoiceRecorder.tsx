import type { ReactNode } from "react";

interface VoiceRecorderProps {
    isRecording: boolean;
    loading?: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    startIcon?: ReactNode;
    stopIcon?: ReactNode;
}

const VoiceRecorder = ({
    isRecording,
    loading = false,
    onStartRecording,
    onStopRecording,
    startIcon,
    stopIcon,
}: VoiceRecorderProps) => {
    const handleClick = () => {
        if (isRecording) {
            onStopRecording();
        } else {
            onStartRecording();
        }
    };

    return (
        <button
            type="button"
            className={`voice-recorder ${
                isRecording ? "recording" : ""
            }`}
            disabled={loading}
            onClick={handleClick}
        >
            {isRecording
                ? stopIcon ?? "⏹️"
                : startIcon ?? "🎤"}

            <span className="voice-recorder-text">
                {loading
                    ? "Processing..."
                    : isRecording
                    ? "Stop Recording"
                    : "Start Recording"}
            </span>
        </button>
    );
};

export default VoiceRecorder;