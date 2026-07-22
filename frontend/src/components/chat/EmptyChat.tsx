import { Bot, FileText, Mic, Sparkles } from "lucide-react";

const EmptyChat = () => {
    return (
        <div className="flex h-full items-center justify-center px-6">
            <div className="max-w-3xl text-center">
                {/* AI Icon */}
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10 ring-1 ring-blue-500/20">
                    <Bot className="h-10 w-10 text-blue-500" />
                </div>

                {/* Heading */}
                <h1 className="mb-3 text-4xl font-bold text-white">
                    Welcome to AI Assistant
                </h1>

                {/* Description */}
                <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400">
                    Ask questions, upload documents, or use voice input to
                    interact with your AI assistant.
                </p>

                {/* Feature Cards */}
                <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-blue-500 hover:bg-slate-800">
                        <Sparkles className="mx-auto mb-4 h-8 w-8 text-yellow-400" />

                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Ask Anything
                        </h3>

                        <p className="text-sm leading-6 text-slate-400">
                            Get instant answers, explanations, and ideas on any
                            topic.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-blue-500 hover:bg-slate-800">
                        <FileText className="mx-auto mb-4 h-8 w-8 text-green-400" />

                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Upload Documents
                        </h3>

                        <p className="text-sm leading-6 text-slate-400">
                            Upload PDFs, DOCX, or TXT files and chat with their
                            content.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-200 hover:border-blue-500 hover:bg-slate-800">
                        <Mic className="mx-auto mb-4 h-8 w-8 text-red-400" />

                        <h3 className="mb-2 text-lg font-semibold text-white">
                            Voice Chat
                        </h3>

                        <p className="text-sm leading-6 text-slate-400">
                            Speak naturally using your microphone and let AI
                            respond instantly.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="mt-10 text-sm text-slate-500">
                    Start a conversation by typing a message below.
                </p>
            </div>
        </div>
    );
};

export default EmptyChat;