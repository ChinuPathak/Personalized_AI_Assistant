import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore(
        (state) => state.isAuthenticated
    );
    const loading = useAuthStore((state) => state.loading);
    const error = useAuthStore((state) => state.error);

    const login = useAuthStore((state) => state.login);
    const signup = useAuthStore((state) => state.signup);
    const logout = useAuthStore((state) => state.logout);
    const clearError = useAuthStore(
        (state) => state.clearError
    );
    const initializeAuth = useAuthStore(
        (state) => state.initializeAuth
    );

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
        initializeAuth,
    };
};