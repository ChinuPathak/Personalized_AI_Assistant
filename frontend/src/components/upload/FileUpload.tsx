import { useRef } from "react";

interface FileUploadProps {
    accept?: string;
    disabled?: boolean;
    onFileSelect: (file: File) => void;
    children?: React.ReactNode;
}

const FileUpload = ({
    accept = ".pdf,.doc,.docx",
    disabled = false,
    onFileSelect,
    children,
}: FileUploadProps) => {
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (file) {
            onFileSelect(file);
        }

        // Allows selecting the same file again
        event.target.value = "";
    };

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                hidden
                disabled={disabled}
                onChange={handleChange}
            />

            <button
                type="button"
                onClick={handleClick}
                disabled={disabled}
            >
                {children ?? "Upload File"}
            </button>
        </>
    );
};

export default FileUpload;