import { useNavigate } from "react-router-dom";

import { Button } from "../components";

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/chat");
    };

    return (
        <div className="not-found-page">
            <div className="not-found-card">
                <h1 className="not-found-title">
                    404
                </h1>

                <h2 className="not-found-heading">
                    Page Not Found
                </h2>

                <p className="not-found-description">
                    The page you are looking for
                    doesn't exist or has been moved.
                </p>

                <Button
                    type="button"
                    onClick={handleGoHome}
                >
                    Go to Chat
                </Button>
            </div>
        </div>
    );
};

export default NotFound;