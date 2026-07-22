interface UploadedFileProps {
    file: File;
    loading?: boolean;
    onRemove?: () => void;
}

const UploadedFile = ({
    file,
    loading = false,
    onRemove,
}: UploadedFileProps) => {

    const size =
        (file.size / 1024 / 1024).toFixed(2);

    return (
        <div className="uploaded-file">

            <div className="uploaded-file-info">

                <div>
                    <strong>
                        {file.name}
                    </strong>

                    <p>
                        {size} MB
                    </p>
                </div>

                {loading && (
                    <span>
                        Uploading...
                    </span>
                )}

            </div>

            {!loading && onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                >
                    ✕
                </button>
            )}

        </div>
    );
};

export default UploadedFile;