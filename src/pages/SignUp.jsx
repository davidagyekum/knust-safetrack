import { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, EyeOff, ArrowRight, Phone, IdCard } from 'lucide-react';

export default function SignUp({ onSignUp, onSwitchToSignIn }) {
    const [isStudent, setIsStudent] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        studentId: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if (onSignUp) {
            onSignUp({ ...formData, userType: isStudent ? 'student' : 'security' });
        }
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

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: 'var(--color-text-secondary)',
        marginBottom: '8px',
    };

    const iconStyle = {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '20px',
        height: '20px',
        color: 'var(--color-text-muted)',
        pointerEvents: 'none',
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '24px',
            paddingTop: '48px',
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
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 12px',
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
                        style={{ width: '44px', height: '44px', objectFit: 'contain' }}
                    />
                </div>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    Request Access
                </h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px' }}>
                    Join KNUST SafeTrack
                </p>
            </div>

            {/* User Type Toggle */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '384px', marginBottom: '20px' }}>
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
                            padding: '10px 16px',
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
                            padding: '10px 16px',
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

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '384px' }}>
                {/* Full Name */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <User style={iconStyle} />
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Student ID / Staff ID */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>{isStudent ? 'Student ID' : 'Staff ID'}</label>
                    <div style={{ position: 'relative' }}>
                        <IdCard style={iconStyle} />
                        <input
                            type="text"
                            placeholder={isStudent ? 'e.g., 20012345' : 'e.g., SEC-001'}
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>{isStudent ? 'Student Email' : 'Work Email'}</label>
                    <div style={{ position: 'relative' }}>
                        <Mail style={iconStyle} />
                        <input
                            type="email"
                            placeholder={isStudent ? 'name@st.knust.edu.gh' : 'name@knust.edu.gh'}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <div style={{ position: 'relative' }}>
                        <Phone style={iconStyle} />
                        <input
                            type="tel"
                            placeholder="e.g., 024 123 4567"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock style={iconStyle} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            style={{ ...inputStyle, paddingRight: '48px' }}
                            required
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

                {/* Confirm Password */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock style={iconStyle} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
                    <span>Request Access</span>
                    <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button>
            </form>

            {/* Switch to Sign In */}
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-secondary)', fontSize: '14px', marginTop: '24px', textAlign: 'center' }}>
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    Sign In
                </button>
            </p>

            {/* Footer */}
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-muted)', fontSize: '11px', marginTop: '16px', textAlign: 'center' }}>
                Your request will be reviewed by campus security
            </p>
        </div>
    );
}
