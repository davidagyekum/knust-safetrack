import { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function SignIn({ onSignIn, onSwitchToSignUp }) {
    const [isStudent, setIsStudent] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const formMaxWidth = 'clamp(360px, 60vw, 720px)';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSignIn) {
            onSignIn({ ...formData, userType: isStudent ? 'student' : 'security' });
        }
    };

    // Inline styles to override any CSS conflicts
    const inputStyle = {
        width: '100%',
        height: '48px',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '12px 48px',
        color: 'var(--color-text-primary)',
        fontSize: '16px',
        outline: 'none',
        boxSizing: 'border-box',
        display: 'block',
    };

    const buttonStyle = {
        width: '100%',
        height: '48px',
        borderRadius: '12px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-bg-primary)',
        backgroundColor: isStudent ? 'var(--color-primary)' : 'var(--color-secondary)',
    };

    return (
        <div style={{
            minHeight: '100dvh',
            width: '100%',
            backgroundColor: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 5vw, 32px)',
            overflowY: 'auto',
        }}>
            {/* Background Gradient */}
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), transparent, rgba(74, 222, 128, 0.1))',
                pointerEvents: 'none',
            }} />

            {/* Logo & Title */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '32px' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 16px',
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden',
                }}>
                    <img
                        src="/knust-logo.png"
                        alt="KNUST Logo"
                        style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                    />
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    KNUST SafeTrack
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Campus Safety & Security
                </p>
            </div>

            {/* User Type Toggle */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth, marginBottom: '24px' }}>
                <div style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    borderRadius: '12px',
                    padding: '6px',
                    display: 'flex',
                    gap: '4px',
                    border: '1px solid var(--color-border)',
                }}>
                    <button
                        type="button"
                        onClick={() => setIsStudent(true)}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: isStudent ? 'var(--color-primary)' : 'transparent',
                            color: isStudent ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                        }}
                    >
                        <User style={{ width: '16px', height: '16px' }} />
                        <span>Student</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsStudent(false)}
                        style={{
                            flex: 1,
                            padding: '12px 16px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: !isStudent ? 'var(--color-secondary)' : 'transparent',
                            color: !isStudent ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                        }}
                    >
                        <Shield style={{ width: '16px', height: '16px' }} />
                        <span>Security</span>
                    </button>
                </div>
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth }}>
                {/* Email/ID Field */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        {isStudent ? 'Student Email' : 'Staff ID'}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <Mail style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            color: 'var(--color-text-muted)',
                            pointerEvents: 'none',
                        }} />
                        <input
                            type={isStudent ? 'email' : 'text'}
                            placeholder={isStudent ? 'name@st.knust.edu.gh' : 'Enter staff ID'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Password Field */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        Password
                    </label>
                    <div style={{ position: 'relative' }}>
                        <Lock style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            color: 'var(--color-text-muted)',
                            pointerEvents: 'none',
                        }} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ ...inputStyle, paddingRight: '48px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-muted)',
                                padding: '4px',
                            }}
                        >
                            {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                    <button type="button" style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontSize: '14px',
                        cursor: 'pointer',
                    }}>
                        Forgot password?
                    </button>
                </div>

                {/* Submit Button */}
                <button type="submit" style={buttonStyle}>
                    <span>Sign In</span>
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
            </form>

            {/* Switch to Sign Up */}
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '24px', textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    Request Access
                </button>
            </p>

            {/* Footer */}
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '16px', textAlign: 'center' }}>
                By signing in, you agree to our Terms & Privacy Policy
            </p>
        </div>
    );
}
