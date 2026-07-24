import { Header, MainLayout, Sidebar } from "../../components/layout";
import ChatWindow from "./ChatWindow";

const ChatPage = () => {
    return (
        <MainLayout
            header={<Header title="AI Assistant" />}
            sidebar={<Sidebar />}
        >
            <ChatWindow />
        </MainLayout>
    );
};

export default ChatPage;