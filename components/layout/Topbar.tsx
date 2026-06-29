'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth, getInitials } from '@/lib/AuthContext';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/billing':   'Billing',
  '/services':  'Services',
  '/profile':   'Profile',
};

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export function Topbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? 'Portal';
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';

  return (
    <header
      className="header-glass flex items-center justify-between px-6"
      style={{ height: 54, flexShrink: 0 }}
    >
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>Portal</span>
        <span style={{ fontSize: 12, color: 'var(--text-faint)' }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{title}</span>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Theme toggle — pill style */}
        <div
          role="button"
          tabIndex={0}
          onClick={toggleTheme}
          onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 13px',
            borderRadius: 20,
            border: isDark ? '2px solid #f1f5f9' : '2px solid #1e1b4b',
            backgroundColor: isDark ? '#f1f5f9' : '#1e1b4b',
            color: isDark ? '#1e1b4b' : '#f1f5f9',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0,
            boxShadow: isDark
              ? '0 0 0 3px rgba(241,245,249,0.3), 0 2px 8px rgba(0,0,0,0.4)'
              : '0 0 0 2px rgba(30,27,75,0.15), 0 2px 6px rgba(0,0,0,0.15)',
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
          <span>{isDark ? 'Light' : 'Dark'}</span>
        </div>

        {/* Bell */}
        <button
          aria-label="Notifications"
          className="icon-btn"
          style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faBell} style={{ width: 14, height: 14 }} />
        </button>

        {/* Avatar — links to profile */}
        <Link
          href="/profile"
          aria-label="Go to profile"
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
            textDecoration: 'none',
          }}
        >
          {user ? getInitials(user.fullName) : '?'}
        </Link>
      </div>
    </header>
  );
}
