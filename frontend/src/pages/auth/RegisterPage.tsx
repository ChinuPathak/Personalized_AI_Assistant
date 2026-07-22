import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Lock,
} from "lucide-react";

import {
    AuthLayout,
    Button,
    Card,
    Input,
    Alert
} from "../../components";

import { useAuth } from "../../hooks";

const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        signup,
        loading,
        error,
        clearError,
    } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [validationError, setValidationError] =
        useState("");
    
    const errorMessage = validationError || error;

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        clearError();
        setValidationError("");

        if (password !== confirmPassword) {
            setValidationError(
                "Passwords do not match."
            );
            return;
        }

        try {
            await signup({
                name,
                email,
                password,
            });

            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthLayout>
            <Card
                title="Create Account 🚀"
                subtitle="Create your account to start using AI Assistant."
            >
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <Input
                        label="Full Name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        leftIcon={<User size={18} />}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

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
                        placeholder="Create a password"
                        value={password}
                        leftIcon={<Lock size={18} />}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        leftIcon={<Lock size={18} />}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    {errorMessage && (
                        <Alert
                            variant="error"
                            title="Registration Failed"
                            description={errorMessage}
                        />
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        loading={loading.signup}
                    >
                        Create Account
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-blue-400 transition-colors hover:text-blue-300"
                    >
                        Sign In
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default RegisterPage;