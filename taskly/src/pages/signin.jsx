import { useState } from "react";
import "../styles/login.css";
import LoginArt from "../assets/loginart.png";
import logo from "../assets/simpleLogo.png";
import { supabase } from "../supabaseClient";

export const Signin = ({ onAuthSuccess, onSignupClick }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Email and password are required.");
            return;
        }

        setLoading(true);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
        });

        setLoading(false);

        if (signInError) {
            setError(signInError.message || "Unable to sign in. Please check your credentials.");
            return;
        }

        onAuthSuccess?.();
    };

    return (
        <div className="all">
            <section className="login-art">
                <div className="image-art">
                    <img src={LoginArt} alt="Aerial view of the Taskly workspace" />
                    <div className="image-caption">
                        <h2>Welcome back</h2>
                    </div>
                    <p className="art-credit">Credit: @qFireniel</p>
                </div>
            </section>

            <section className="login-section">
                <div className="login">
                    <img className="page-logo" src={logo} alt="Taskly logo" />
                    <form onSubmit={handleSubmit}>
                        <h1>Sign In</h1>
                        <h3>Enter your details to access your workspace</h3>

                        <div>
                            <label htmlFor="signin-email">Email</label>
                            <input
                                type="email"
                                id="signin-email"
                                placeholder="Email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                            />
                        </div>

                        <div className="password-field">
                            <label htmlFor="signin-password">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="signin-password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((visible) => !visible)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {error && <p className="form-error" role="alert">{error}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                        <p className="auth-switch">
                            New to Asyn?{" "}
                            <button type="button" onClick={onSignupClick}>Sign up</button>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};