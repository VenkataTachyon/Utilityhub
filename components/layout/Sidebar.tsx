'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableCells,
  faFileInvoiceDollar,
  faWrench,
  faRightFromBracket,
  faBolt,
  faList,
} from '@fortawesome/free-solid-svg-icons';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: faTableCells },
  { href: '/billing',   label: 'Billing',   icon: faFileInvoiceDollar },
  { href: '/services',  label: 'Services',  icon: faWrench },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar-glass flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        width: collapsed ? 56 : 220,
        transition: 'width 0.2s ease',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: collapsed ? '16px 10px' : '14px 14px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          borderBottom: '1px solid var(--border-soft)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faBolt} style={{ width: 13, height: 13, color: 'white' }} />
        </div>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2, margin: 0 }}>
              UtilityHub
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-faint)', margin: 0 }}>Customer Portal</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-faint)',
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon icon={faList} style={{ width: 13, height: 13 }} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 6px', overflowY: 'auto' }}>
        {!collapsed && (
          <div
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-faint)',
              padding: '4px 10px 6px',
            }}
          >
            Main
          </div>
        )}
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 9,
                    padding: collapsed ? '7px 14px' : '7px 10px',
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: 'none',
                    background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
                    color: isActive ? '#6366f1' : 'var(--text-secondary)',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    transition: 'background 0.12s, color 0.12s',
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={{
                      width: 15,
                      height: 15,
                      flexShrink: 0,
                      opacity: isActive ? 1 : 0.7,
                    }}
                  />
                  {!collapsed && item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account chip */}
      <div style={{ padding: '10px 6px', borderTop: '1px solid var(--border-soft)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            padding: collapsed ? '8px 10px' : '8px 10px',
            background: 'rgba(99,102,241,0.06)',
            borderRadius: 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            JD
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  John Doe
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-faint)' }}>ACC-001234</div>
              </div>
              <button
                aria-label="Sign out"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-faint)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} style={{ width: 13, height: 13 }} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
