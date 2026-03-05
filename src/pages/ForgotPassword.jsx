import { useState } from 'react';
import { Shield, User, Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPassword({ onBackToSignIn }) {
    const [isStudent, setIsStudent] = useState(true);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formMaxWidth = 'clamp(360px, 60vw, 720px)';

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

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

    // Success state — email sent
    if (isSubmitted) {
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
            }}>
                {/* Background Gradient */}
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), transparent, rgba(74, 222, 128, 0.1))',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: formMaxWidth }}>
                    {/* Success icon */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 24px',
                        backgroundColor: 'rgba(34, 139, 34, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CheckCircle style={{ width: '40px', height: '40px', color: 'var(--color-secondary)' }} />
                    </div>

                    <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                        Check Your Email
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '8px' }}>
                        We&apos;ve sent a password reset link to
                    </p>
                    <p style={{ color: 'var(--color-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
                        {email}
                    </p>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', marginBottom: '32px' }}>
                        The link will expire in 15 minutes. If you don&apos;t see the email, check your spam folder.
                    </p>

                    {/* Back to Sign In */}
                    <button
                        type="button"
                        onClick={onBackToSignIn}
                        style={{
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
                            backgroundColor: 'var(--color-primary)',
                        }}
                    >
                        <ArrowLeft style={{ width: '20px', height: '20px' }} />
                        <span>Back to Sign In</span>
                    </button>

                    {/* Resend link */}
                    <button
                        type="button"
                        onClick={() => setIsSubmitted(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            marginTop: '16px',
                        }}
                    >
                        Didn&apos;t receive it? <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Resend</span>
                    </button>
                </div>
            </div>
        );
    }

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

            {/* Back Button */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth, marginBottom: '24px' }}>
                <button
                    type="button"
                    onClick={onBackToSignIn}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 0',
                    }}
                >
                    <ArrowLeft style={{ width: '18px', height: '18px' }} />
                    Back to Sign In
                </button>
            </div>

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
                    Reset Password
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    Enter your email to receive a reset link
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

            {/* Reset Form */}
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth }}>
                {/* Email Field */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        {isStudent ? 'Student Email' : 'Staff Email'}
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
                            type="email"
                            placeholder={isStudent ? 'name@st.knust.edu.gh' : 'name@knust.edu.gh'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
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
                    }}
                >
                    <span>Send Reset Link</span>
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
            </form>

            {/* Footer */}
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '24px', textAlign: 'center' }}>
                Remember your password?{' '}
                <button
                    type="button"
                    onClick={onBackToSignIn}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                >
                    Sign In
                </button>
            </p>
        </div>
    );
}
