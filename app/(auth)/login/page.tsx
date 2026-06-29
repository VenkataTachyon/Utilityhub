'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/lib/AuthContext';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid var(--border-mid)',
  background: 'var(--bg-input)',
  color: 'var(--text-primary)',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

export default function LoginPage() {
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) router.replace('/dashboard');
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setSubmitting(true);
    const result = await login(email.trim(), password);
    setSubmitting(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error ?? 'Login failed.');
    }
  };

  return (
    <div
      className="content-card"
      style={{ width: '100%', maxWidth: 420, padding: '36px 32px' }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faBolt} style={{ width: 16, height: 16, color: 'white' }} />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            UtilityHub
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>Customer Portal</div>
        </div>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          Sign in to manage your utility account
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
            Email address
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={{
              ...inputStyle,
              borderColor: focusedField === 'email' ? '#6366f1' : undefined,
              boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(99,102,241,0.12)' : undefined,
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={{
                ...inputStyle,
                paddingRight: 40,
                borderColor: focusedField === 'password' ? '#6366f1' : undefined,
                boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(99,102,241,0.12)' : undefined,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-faint)',
                padding: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              marginBottom: 16,
              padding: '10px 12px',
              borderRadius: 8,
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.2)',
              color: '#ef4444',
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '11px 16px',
            borderRadius: 8,
            border: 'none',
            background: submitting ? 'rgba(99,102,241,0.5)' : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.15s',
            letterSpacing: '0.01em',
          }}
        >
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {/* Footer */}
      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', margin: '20px 0 0' }}>
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          style={{ color: 'var(--text-link)', fontWeight: 600, textDecoration: 'none' }}
        >
          Sign up
        </Link>
      </p>

    </div>
  );
}
