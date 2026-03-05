import { useState } from 'react';
import { Shield, User, Mail, Lock, Eye, EyeOff, ArrowRight, Phone, IdCard, Home, MapPin, Camera, X, ChevronDown } from 'lucide-react';
import useToast from '../hooks/useToast.js';

const HOSTELS = [
    'Unity Hall',
    'University Hall (Katanga)',
    'Independence Hall (Conti)',
    'Queens Hall',
    'Republic Hall (Repub)',
    'Africa Hall',
    'Hall 7 (Brunei)',
    'Gaza Hostel',
    'Ayeduase Hostel',
    'Private Hostel (Off-campus)',
];

const GENDERS = ['Male', 'Female', 'Prefer not to say'];

export default function SignUp({ onSignUp, onSwitchToSignIn }) {
    const toast = useToast();
    const [isStudent, setIsStudent] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPhotoPrompt, setShowPhotoPrompt] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        studentId: '',
        password: '',
        confirmPassword: '',
        hostel: '',
        town: '',
        landmark: '',
        gender: '',
    });
    const formMaxWidth = 'clamp(360px, 60vw, 720px)';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        // Store location data for Walk With Me pairing
        localStorage.setItem('safetrack_profile', JSON.stringify({
            fullName: formData.fullName,
            hostel: formData.hostel,
            town: formData.town,
            landmark: formData.landmark,
            gender: formData.gender,
            studentId: formData.studentId,
        }));
        // Show photo upload prompt
        setShowPhotoPrompt(true);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFinishSignUp = () => {
        if (onSignUp) {
            onSignUp({ ...formData, userType: isStudent ? 'student' : 'security' });
        }
        setShowPhotoPrompt(false);
    };

    const handleSkipPhoto = () => {
        if (onSignUp) {
            onSignUp({ ...formData, userType: isStudent ? 'student' : 'security' });
        }
        setShowPhotoPrompt(false);
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

    const selectStyle = {
        ...inputStyle,
        padding: '12px 48px 12px 48px',
        appearance: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
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

    // Photo upload prompt overlay
    if (showPhotoPrompt) {
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
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), transparent, rgba(74, 222, 128, 0.1))',
                    pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: formMaxWidth }}>
                    {/* Photo upload area */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        margin: '0 auto 24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-bg-secondary)',
                        border: '3px dashed var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {photoPreview ? (
                            <>
                                <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button
                                    type="button"
                                    onClick={() => setPhotoPreview(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '4px',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(0,0,0,0.7)',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <X style={{ width: '14px', height: '14px', color: 'white' }} />
                                </button>
                            </>
                        ) : (
                            <Camera style={{ width: '36px', height: '36px', color: 'var(--color-text-muted)' }} />
                        )}
                    </div>

                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Verify Your Identity
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
                        Upload a clear photo of yourself to verify your account. This helps keep the campus community safe.
                    </p>

                    {/* Upload button */}
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        width: '100%',
                        height: '48px',
                        borderRadius: '12px',
                        fontWeight: '600',
                        border: '1px solid var(--color-primary)',
                        cursor: 'pointer',
                        color: 'var(--color-primary)',
                        backgroundColor: 'transparent',
                        marginBottom: '12px',
                        fontSize: '16px',
                    }}>
                        <Camera style={{ width: '20px', height: '20px' }} />
                        <span>{photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                        <input
                            type="file"
                            accept="image/*"
                            capture="user"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                    </label>

                    {/* Continue button */}
                    <button
                        type="button"
                        onClick={handleFinishSignUp}
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
                            backgroundColor: photoPreview ? 'var(--color-secondary)' : 'var(--color-bg-tertiary)',
                            marginBottom: '12px',
                        }}
                    >
                        <span>{photoPreview ? 'Submit & Continue' : 'Continue without Photo'}</span>
                        <ArrowRight style={{ width: '20px', height: '20px' }} />
                    </button>

                    {/* Skip */}
                    <button
                        type="button"
                        onClick={handleSkipPhoto}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            fontSize: '13px',
                            cursor: 'pointer',
                        }}
                    >
                        I&apos;ll do this later
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
            justifyContent: 'flex-start',
            padding: 'clamp(16px, 5vw, 32px)',
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
            <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth, marginBottom: '20px' }}>
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
            <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: formMaxWidth }}>
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

                {/* Gender */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Gender</label>
                    <div style={{ position: 'relative' }}>
                        <User style={iconStyle} />
                        <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            style={{
                                ...selectStyle,
                                color: formData.gender ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                            }}
                            required
                        >
                            <option value="" disabled>Select gender</option>
                            {GENDERS.map((g) => (
                                <option key={g} value={g} style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>{g}</option>
                            ))}
                        </select>
                        <ChevronDown style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '18px',
                            height: '18px',
                            color: 'var(--color-text-muted)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                </div>

                {/* Hostel Name */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Hostel Name</label>
                    <div style={{ position: 'relative' }}>
                        <Home style={iconStyle} />
                        <select
                            value={formData.hostel}
                            onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                            style={{
                                ...selectStyle,
                                color: formData.hostel ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                            }}
                            required
                        >
                            <option value="" disabled>Select your hostel</option>
                            {HOSTELS.map((h) => (
                                <option key={h} value={h} style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)' }}>{h}</option>
                            ))}
                        </select>
                        <ChevronDown style={{
                            position: 'absolute',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '18px',
                            height: '18px',
                            color: 'var(--color-text-muted)',
                            pointerEvents: 'none',
                        }} />
                    </div>
                </div>

                {/* Town */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Town</label>
                    <div style={{ position: 'relative' }}>
                        <MapPin style={iconStyle} />
                        <input
                            type="text"
                            placeholder="e.g., Ayeduase, Bomso, Kotei"
                            value={formData.town}
                            onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                            style={inputStyle}
                            required
                        />
                    </div>
                </div>

                {/* Landmark (Optional) */}
                <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Landmark <span style={{ color: 'var(--color-text-muted)', fontWeight: '400' }}>(Optional)</span></label>
                    <div style={{ position: 'relative' }}>
                        <MapPin style={iconStyle} />
                        <input
                            type="text"
                            placeholder="e.g., Near Pharmacy, Opposite KFC"
                            value={formData.landmark}
                            onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                            style={inputStyle}
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
            <p style={{ position: 'relative', zIndex: 10, color: 'var(--color-text-muted)', fontSize: '11px', marginTop: '16px', textAlign: 'center', paddingBottom: '32px' }}>
                Your request will be reviewed by campus security
            </p>
        </div>
    );
}
