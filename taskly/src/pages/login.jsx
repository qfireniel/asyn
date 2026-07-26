import React, { useState } from "react";
import "../styles/login.css";
import LoginArt from "../assets/loginart.png";
import logo from "../assets/simpleLogo.png";
import { supabase } from "../supabaseClient";

export const Login = ({ onAuthSuccess }) => {
    const [activeStage, setActiveStage] = useState(1);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const requirements = [
        { id: 1, label: '8+ characters', test: (pwd) => pwd.length >= 8 },
        { id: 2, label: 'Uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
        { id: 3, label: 'Contains a number', test: (pwd) => /[0-9]/.test(pwd) },
        { id: 4, label: 'Special character', test: (pwd) => /[^A-Za-z0-9]/.test(pwd) },
    ];

    const metCount = requirements.filter(req => req.test(password)).length;

    const getStrengthProgress = () => {
        if (password.length === 0) return { width: '0%', color: '#e5e7eb' };
        if (metCount <= 2) return { width: '33%', color: '#ef4444' };
        if (metCount === 3) return { width: '66%', color: '#f59e0b' };
        return { width: '100%', color: '#10b981' };
    };

    const strength = getStrengthProgress();

    const handleSignup = async (event) => {
        event.preventDefault();
        setError('');

        if (!firstName.trim() || !lastName.trim()) {
            setError('Please enter your first and last name.');
            return;
        }

        if (!email.trim() || !password.trim()) {
            setError('Email and password are required.');
            return;
        }

        if (metCount < 4) {
            setError('Please use a stronger password before signing up.');
            return;
        }

        if (!termsAccepted) {
            setError('You must agree to the terms and conditions.');
            return;
        }

        setLoading(true);

        setLoading(false);
        setActiveStage(2);
    };

    const handleNeedsSubmit = (event) => {
        event.preventDefault();
        setError('');

        if (!role) {
            setError('Please choose whether you are a Team Lead or a Member.');
            return;
        }

        setActiveStage(3);
    };

    const handleProfileSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!displayName.trim()) {
            setError('Please provide a display name for your profile.');
            return;
        }

        setLoading(true);

        const { data, error: signUpError } = await supabase.auth.signUp(
            { email, password },
            {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    role,
                    display_name: displayName,
                    bio,
                },
            }
        );

        if (signUpError) {
            setLoading(false);
            setError(signUpError.message || 'Unable to create your account. Please try again.');
            return;
        }

        const userId = data?.user?.id;
        const userEmail = data?.user?.email || email;

        if (userId) {
            const profileData = {
                id: userId,
                email: userEmail,
                first_name: firstName,
                last_name: lastName,
                display_name: displayName,
                bio,
                role,
            };

            const { error: profileError } = await supabase.from('profiles').upsert(profileData);
            if (profileError) {
                setLoading(false);
                setError(profileError.message || 'Unable to save your profile data.');
                return;
            }
        }

        await supabase.auth.signOut();
        setLoading(false);
        setCompleted(true);
    };

    const handleSignInSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (signInError) {
            setError(signInError.message || 'Unable to sign in. Please check your credentials.');
            return;
        }

        if (onAuthSuccess) {
            onAuthSuccess();
        }
    };

    const goBack = () => {
        setError('');
        setActiveStage((stage) => Math.max(1, stage - 1));
    };

    const renderStageIndicator = () => (
        <div className="image-stages" aria-hidden>
            <div className={`stage ${activeStage === 1 ? 'active' : ''}`}>
                <div className="stage-number">1</div>
                <div className="stage-text">Create an Account</div>
            </div>
            <div className={`stage ${activeStage === 2 ? 'active' : ''}`}>
                <div className="stage-number">2</div>
                <div className="stage-text">Set up your needs</div>
            </div>
            <div className={`stage ${activeStage === 3 ? 'active' : ''}`}>
                <div className="stage-number">3</div>
                <div className="stage-text">Set up your profile</div>
            </div>
        </div>
    );

    const renderStageContent = () => {
        if (completed) {
            return (
                <form onSubmit={handleSignInSubmit}>
                    <h1>Account created</h1>
                    <p>Your account is ready. Sign in again to access your workspace.</p>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword((show) => !show)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    {error && <p className="form-error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            );
        }

        switch (activeStage) {
            case 2:
                return (
                    <form onSubmit={handleNeedsSubmit}>
                        <h1>Set Up Your Needs</h1>
                        <h3>Choose your role before continuing.</h3>
                        <div className="checkbox-group role-group">
                            <label
                                className={role === 'Team Lead' ? 'selected' : ''}
                                onClick={() => setRole('Team Lead')}
                            >
                                Team Lead
                            </label>
                            <label
                                className={role === 'Member' ? 'selected' : ''}
                                onClick={() => setRole('Member')}
                            >
                                Member
                            </label>
                        </div>
                        {error && <p className="form-error">{error}</p>}
                        <div className="button-row">
                            <button type="button" className="secondary-button" onClick={goBack}>
                                Back
                            </button>
                            <button type="submit">Continue to Profile</button>
                        </div>
                    </form>
                );
            case 3:
                return (
                    <form onSubmit={handleProfileSubmit}>
                        <h1>Set Up Your Profile</h1>
                        <h3>Complete your profile so your workspace feels personal.</h3>
                        <div>
                            <label htmlFor="displayName">Display Name</label>
                            <input
                                type="text"
                                id="displayName"
                                placeholder="Your display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="bio">Bio</label>
                            <textarea
                                id="bio"
                                placeholder="Short bio or team role"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                            />
                        </div>
                        {error && <p className="form-error">{error}</p>}
                        <div className="button-row">
                            <button type="button" className="secondary-button" onClick={goBack}>
                                Back
                            </button>
                            <button type="submit">Finish Setup</button>
                        </div>
                    </form>
                );
            default:
                return (
                    <form onSubmit={handleSignup}>
                        <h1>Sign Up</h1>
                        <h3>Enter your personal data to create your account</h3>
                        <div className="names">
                            <div className="individual-name">
                                <label htmlFor="username">First Name</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="individual-name">
                                <label htmlFor="lastname">Last Name</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="password-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((show) => !show)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div style={{
                            marginTop: '0.15rem',
                            marginBottom: '0.05rem',
                            minHeight: password.length > 0 ? '36px' : '0px',
                            opacity: password.length > 0 ? 1 : 0,
                            transition: 'opacity 0.15s ease, min-height 0.15s ease',
                            overflow: 'hidden',
                            paddingTop: '1px'
                        }}>
                            <div style={{ width: '100%', height: '3px', backgroundColor: '#e5e7eb', borderRadius: '2px', overflow: 'hidden', marginBottom: '0.25rem' }}>
                                <div style={{ width: strength.width, height: '100%', backgroundColor: strength.color, transition: 'width 0.15s ease' }} />
                            </div>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '2px 8px',
                                fontSize: '0.68rem',
                                lineHeight: 1.1
                            }}>
                                {requirements.map((req) => {
                                    const isMet = req.test(password);
                                    return (
                                        <div key={req.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: isMet ? '#10b981' : '#9ca3af',
                                            transition: 'color 0.2s'
                                        }}>
                                            <span style={{ marginRight: '3px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                                {isMet ? '✓' : '•'}
                                            </span>
                                            <span>{req.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {error && <p className="form-error">{error}</p>}

                       <div className="terms">
                            <input
                                type="checkbox"
                                id="terms"
                                name="terms"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                required
                            />
                            <label htmlFor="terms">I agree to the terms and conditions</label>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Signing up…' : 'Sign Up'}
                        </button>
                    </form>
                );
        }
    };

    return (
        <div>
            <div className="all">
                <section className="login-art">
                    <div className="image-art">
                        <img src={LoginArt} alt="Login art" />
                        <div className="image-caption">
                            <h2>Get started with us</h2>
                        </div>
                        {renderStageIndicator()}
                        <p className="art-credit">Credit: @qFireniel</p>
                    </div>
                </section>
                <section className="login-section">
                    <div className="login">
                        <img className="page-logo" src={logo} alt="logo" />
                        {renderStageContent()}
                    </div>
                </section>
                <section>
                </section>
            </div>
        </div>
    );
};