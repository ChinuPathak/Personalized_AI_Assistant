interface VoiceVisualizerProps {
    isRecording: boolean;
    loading?: boolean;
    transcript?: string;
}

const VoiceVisualizer = ({
    isRecording,
    loading = false,
    transcript,
}: VoiceVisualizerProps) => {
    return (
        <div className="voice-visualizer">
            <div className="voice-visualizer-status">
                {loading ? (
                    <p>Processing voice...</p>
                ) : isRecording ? (
                    <p>Listening...</p>
                ) : (
                    <p>Microphone idle</p>
                )}
            </div>

            <div className="voice-visualizer-wave">
                {Array.from({ length: 20 }).map((_, index) => (
                    <span
                        key={index}
                        className={`voice-bar ${
                            isRecording
                                ? "voice-bar-active"
                                : ""
                        }`}
                    />
                ))}
            </div>

            {transcript && (
                <div className="voice-transcript">
                    <h4>Transcript</h4>
                    <p>{transcript}</p>
                </div>
            )}
        </div>
    );
};

export default VoiceVisualizer;