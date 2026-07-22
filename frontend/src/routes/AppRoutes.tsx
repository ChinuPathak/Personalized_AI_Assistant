import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import {
    LoginPage,
    RegisterPage,
    ChatPage,
    NotFound,
} from "../pages";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/chat"
                        element={<ChatPage />}
                    />
                </Route>

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/chat"
                            replace
                        />
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;