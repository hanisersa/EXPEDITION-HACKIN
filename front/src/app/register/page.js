'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Heart, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    role: 'both',
    agreeTerms: false,
  });

  const locations = [
    'Gaza City', 'Khan Younis', 'Rafah', 'Deir al-Balah',
    'Jabalia', 'Beit Hanoun', 'Beit Lahia', 'Nuseirat', 'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      await authRegister({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        location: formData.location,
        role: formData.role,
      });
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    const p = formData.password;
    if (!p) return { width: '0%', color: '#e5e7eb', label: '' };
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    const levels = [
      { width: '25%', color: '#ef4444', label: 'Weak' },
      { width: '50%', color: '#f59e0b', label: 'Fair' },
      { width: '75%', color: '#3b82f6', label: 'Good' },
      { width: '100%', color: '#10b981', label: 'Strong' },
    ];
    return levels[score - 1] || levels[0];
  };

  const strength = passwordStrength();

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 0',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #010d06 0%, #021a0d 15%, #064E3B 40%, #065F46 60%, #047857 80%, #0d9466 100%)',
      }} />
      <div className="keffiyeh-pattern" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', top: '5%', left: '15%', width: '350px', height: '350px', background: 'rgba(52,211,153,0.06)', borderRadius: '50%', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: '300px', height: '300px', background: 'rgba(16,185,129,0.08)', borderRadius: '50%', filter: 'blur(80px)' }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '480px',
        margin: '0 24px',
      }}>
        {/* Logo / Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '20px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #10b981, #007A3D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(16,185,129,0.3)' }}>
              <Heart style={{ width: '24px', height: '24px', color: 'white', fill: 'white' }} />
            </div>
            <div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
                Taka<span style={{ color: '#6ee7b7' }}>ful</span>
              </span>
            </div>
          </Link>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
            Join The Movement
          </h1>
          <p style={{ color: 'rgba(167,243,208,0.6)', fontSize: '15px' }}>
            Create your account and start exchanging skills
          </p>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: step >= 1 ? '#10b981' : 'rgba(255,255,255,0.15)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700,
            transition: 'all 0.3s',
          }}>
            {step > 1 ? <CheckCircle2 style={{ width: '16px', height: '16px' }} /> : '1'}
          </div>
          <div style={{ width: '60px', height: '2px', background: step >= 2 ? '#10b981' : 'rgba(255,255,255,0.15)', borderRadius: '2px', transition: 'all 0.3s' }} />
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: step >= 2 ? '#10b981' : 'rgba(255,255,255,0.15)',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700,
            transition: 'all 0.3s',
          }}>
            2
          </div>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {error && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '12px 16px', borderRadius: '12px',
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#dc2626', fontSize: '13px', fontWeight: 500,
              }}>
                <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                {error}
              </div>
            )}
            {step === 1 ? (
              <>
                {/* Step 1: Basic Info */}
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Personal Information</p>

                {/* Name Row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>First Name</label>
                    <div style={{ position: 'relative' }}>
                      <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                      <input
                        type="text" placeholder="First name" required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="input-field" style={{ paddingLeft: '40px', height: '46px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Last Name</label>
                    <input
                      type="text" placeholder="Last name" required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="input-field" style={{ height: '46px' }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                    <input
                      type="email" placeholder="you@example.com" required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field" style={{ paddingLeft: '40px', height: '46px' }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                    <input
                      type="tel" placeholder="+970 59 XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field" style={{ paddingLeft: '40px', height: '46px' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                    <input
                      type={showPassword ? 'text' : 'password'} placeholder="Min 8 characters" required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input-field" style={{ paddingLeft: '40px', paddingRight: '40px', height: '46px' }}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                    >
                      {showPassword ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {formData.password && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ height: '4px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: strength.width, background: strength.color, borderRadius: '4px', transition: 'all 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '11px', color: strength.color, fontWeight: 500, marginTop: '4px', display: 'block' }}>{strength.label}</span>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Confirm Password</label>
                  <input
                    type="password" placeholder="Re-enter your password" required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="input-field" style={{ height: '46px' }}
                  />
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <span style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px', display: 'block' }}>Passwords don't match</span>
                  )}
                </div>

                <button type="submit" className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  Continue <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </>
            ) : (
              <>
                {/* Step 2: Location & Role */}
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Almost there!</p>

                {/* Location */}
                <div>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Your Location</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
                    <select
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-field" style={{ paddingLeft: '40px', height: '46px', cursor: 'pointer' }}
                    >
                      <option value="">Select your area</option>
                      {locations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <input
                    type="checkbox" id="terms" required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: '#10b981', cursor: 'pointer', marginTop: '2px' }}
                  />
                  <label htmlFor="terms" style={{ fontSize: '13px', color: '#6b7280', cursor: 'pointer', lineHeight: 1.5 }}>
                    I agree to the <Link href="#" style={{ color: '#059669', fontWeight: 500, textDecoration: 'none' }}>Terms of Service</Link> and <Link href="#" style={{ color: '#059669', fontWeight: 500, textDecoration: 'none' }}>Privacy Policy</Link>
                  </label>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1, padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 600,
                      border: '1.5px solid #e5e7eb', background: 'white', color: '#374151', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary"
                    style={{
                      flex: 2, padding: '14px', fontSize: '15px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                        Creating...
                      </span>
                    ) : (
                      <>Create Account <ArrowRight style={{ width: '16px', height: '16px' }} /></>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Sign In link */}
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6b7280' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#059669', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>
        </div>

        {/* Bottom text */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'rgba(167,243,208,0.4)' }}>
          Your skills can change lives. Welcome to Takaful. 🇵🇸
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
