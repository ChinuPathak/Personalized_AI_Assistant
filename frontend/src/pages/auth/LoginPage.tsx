import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import {
    AuthLayout,
    Button,
    Card,
    Input,
    Alert
} from "../../components";

import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
    const navigate = useNavigate();

    const login = useAuthStore(
        (state) => state.login
    );

    const loading = useAuthStore(
        (state) => state.loading
    );

    const error = useAuthStore(
        (state) => state.error
    );

    const clearError = useAuthStore(
        (state) => state.clearError
    );

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        clearError();

        try {
            await login({
                email,
                password,
            });

            navigate("/chat");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthLayout>
            <Card
                title="Welcome Back 👋"
                subtitle="Sign in to continue using your AI Assistant."
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        leftIcon={<Mail size={18} />}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        leftIcon={<Lock size={18} />}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {error && (
                        <Alert
                            variant="error"
                            title="Login Failed"
                            description={error}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        loading={loading.login}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                        Register
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default LoginPage;