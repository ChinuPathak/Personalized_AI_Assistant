import { useNavigate } from "react-router-dom";
import { Header, MainLayout, Sidebar } from "../../components/layout";
import ChatWindow from "./ChatWindow";
import { useAuth } from "../../hooks";

const ChatPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <MainLayout
            header={<Header title="AI Assistant" />}
            sidebar={<Sidebar onLogout={handleLogout} />}
        >
            <ChatWindow />
        </MainLayout>
    );
};

export default ChatPage;