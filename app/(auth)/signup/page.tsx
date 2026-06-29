'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth, SignupData } from '@/lib/AuthContext';

type ServiceType = 'ELECTRIC' | 'GAS' | 'WATER';
type AccountType = 'RESIDENTIAL' | 'COMMERCIAL';

const SERVICE_OPTIONS: { value: ServiceType; label: string; icon: string }[] = [
  { value: 'ELECTRIC', label: 'Electric', icon: '⚡' },
  { value: 'GAS',      label: 'Gas',      icon: '🔥' },
  { value: 'WATER',    label: 'Water',    icon: '💧' },
];

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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function SignupPage() {
  const { signup, user, isLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    serviceAddress: '',
  });
  const [serviceType, setServiceType] = useState<ServiceType>('ELECTRIC');
  const [accountType, setAccountType] = useState<AccountType>('RESIDENTIAL');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) router.replace('/dashboard');
  }, [user, isLoading, router]);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim())           errs.fullName = 'Full name is required.';
    if (!form.email.trim())              errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                         errs.email = 'Enter a valid email address.';
    if (!form.password)                  errs.password = 'Password is required.';
    else if (form.password.length < 8)   errs.password = 'Password must be at least 8 characters.';
    if (!form.confirmPassword)           errs.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword)
                                         errs.confirmPassword = 'Passwords do not match.';
    if (!form.serviceAddress.trim())     errs.serviceAddress = 'Service address is required.';
    if (!agreedToTerms)                  errs.terms = 'You must agree to the terms to continue.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setGlobalError('');
    setSubmitting(true);
    const data: SignupData = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      serviceType,
      accountType,
      serviceAddress: form.serviceAddress.trim(),
    };
    const result = await signup(data);
    setSubmitting(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setGlobalError(result.error ?? 'Sign up failed. Please try again.');
    }
  };

  const focusStyle = (field: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: errors[field] ? '#ef4444' : focusedField === field ? '#6366f1' : undefined,
    boxShadow: errors[field]
      ? '0 0 0 3px rgba(239,68,68,0.1)'
      : focusedField === field
      ? '0 0 0 3px rgba(99,102,241,0.12)'
      : undefined,
  });

  return (
    <div
      className="content-card"
      style={{ width: '100%', maxWidth: 460, padding: '32px 32px 28px' }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faBolt} style={{ width: 15, height: 15, color: 'white' }} />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
            UtilityHub
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>Customer Portal</div>
        </div>
      </div>

      {/* Heading */}
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 21, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px' }}>
          Create your account
        </h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
          Start managing your utility services online
        </p>
      </div>

      {globalError && (
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
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <Field label="Full name">
          <input
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.fullName}
            onChange={set('fullName')}
            onFocus={() => setFocusedField('fullName')}
            onBlur={() => setFocusedField(null)}
            style={focusStyle('fullName')}
          />
          {errors.fullName && <FieldError msg={errors.fullName} />}
        </Field>

        {/* Email */}
        <Field label="Email address">
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={set('email')}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            style={focusStyle('email')}
          />
          {errors.email && <FieldError msg={errors.email} />}
        </Field>

        {/* Password */}
        <Field label="Password">
          <div style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={set('password')}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              style={{ ...focusStyle('password'), paddingRight: 40 }}
            />
            <PasswordToggle show={showPw} onToggle={() => setShowPw((v) => !v)} />
          </div>
          {errors.password && <FieldError msg={errors.password} />}
        </Field>

        {/* Confirm Password */}
        <Field label="Confirm password">
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPw ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              onFocus={() => setFocusedField('confirmPassword')}
              onBlur={() => setFocusedField(null)}
              style={{ ...focusStyle('confirmPassword'), paddingRight: 40 }}
            />
            <PasswordToggle show={showConfirmPw} onToggle={() => setShowConfirmPw((v) => !v)} />
          </div>
          {errors.confirmPassword && <FieldError msg={errors.confirmPassword} />}
        </Field>

        {/* Service Type */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
            Service type
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {SERVICE_OPTIONS.map((opt) => {
              const active = serviceType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setServiceType(opt.value)}
                  style={{
                    flex: 1,
                    padding: '9px 8px',
                    borderRadius: 8,
                    border: active ? '2px solid #6366f1' : '1px solid var(--border-mid)',
                    background: active ? 'rgba(99,102,241,0.08)' : 'var(--bg-btn)',
                    color: active ? '#6366f1' : 'var(--text-secondary)',
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                >
                  <span>{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Type */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 8 }}>
            Account type
          </label>
          <div
            style={{
              display: 'inline-flex',
              borderRadius: 8,
              border: '1px solid var(--border-mid)',
              overflow: 'hidden',
              background: 'var(--bg-btn)',
            }}
          >
            {(['RESIDENTIAL', 'COMMERCIAL'] as AccountType[]).map((type) => {
              const active = accountType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAccountType(type)}
                  style={{
                    padding: '8px 20px',
                    border: 'none',
                    background: active ? '#6366f1' : 'transparent',
                    color: active ? 'white' : 'var(--text-muted)',
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    textTransform: 'capitalize',
                  }}
                >
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Service Address */}
        <Field label="Service address">
          <input
            type="text"
            autoComplete="street-address"
            placeholder="123 Main St, City, State ZIP"
            value={form.serviceAddress}
            onChange={set('serviceAddress')}
            onFocus={() => setFocusedField('serviceAddress')}
            onBlur={() => setFocusedField(null)}
            style={focusStyle('serviceAddress')}
          />
          {errors.serviceAddress && <FieldError msg={errors.serviceAddress} />}
        </Field>

        {/* Terms */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              cursor: 'pointer',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.4,
            }}
          >
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                setErrors((prev) => { const next = { ...prev }; delete next.terms; return next; });
              }}
              style={{ marginTop: 2, accentColor: '#6366f1', flexShrink: 0, width: 15, height: 15 }}
            />
            <span>
              I agree to the{' '}
              <span style={{ color: 'var(--text-link)', fontWeight: 500 }}>Terms of Service</span>
              {' '}and{' '}
              <span style={{ color: 'var(--text-link)', fontWeight: 500 }}>Privacy Policy</span>
            </span>
          </label>
          {errors.terms && <FieldError msg={errors.terms} />}
        </div>

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
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', margin: '18px 0 0' }}>
        Already have an account?{' '}
        <Link
          href="/login"
          style={{ color: 'var(--text-link)', fontWeight: 600, textDecoration: 'none' }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p style={{ fontSize: 12, color: '#ef4444', margin: '4px 0 0' }}>{msg}</p>
  );
}

function PasswordToggle({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
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
      <FontAwesomeIcon icon={show ? faEyeSlash : faEye} style={{ width: 14, height: 14 }} />
    </button>
  );
}
