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
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: faTableCells },
  { href: '/billing', label: 'Billing', icon: faFileInvoiceDollar },
  { href: '/services', label: 'Services', icon: faWrench },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute -right-3 top-[72px] z-10 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <FontAwesomeIcon
          icon={collapsed ? faChevronRight : faChevronLeft}
          className="w-2.5 h-2.5"
        />
      </button>

      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white text-sm shrink-0">
            <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">UtilityHub</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">Customer Portal</div>
            </div>
          )}
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-3">
        {!collapsed && (
          <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 px-2 mb-1.5">
            Main
          </div>
        )}
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  collapsed && 'justify-center px-2',
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                )}
              >
                <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 shrink-0" />
                {!collapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account chip */}
      <div className="px-2 py-3 border-t border-gray-100 dark:border-gray-800">
        <div
          className={cn(
            'flex items-center gap-2.5 px-2.5 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg',
            collapsed && 'justify-center px-2'
          )}
        >
          <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs text-white font-semibold shrink-0">
            JD
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">John Doe</div>
                <div className="text-[10px] text-gray-400 dark:text-gray-500">ACC-001234</div>
              </div>
              <button
                aria-label="Sign out"
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus-visible:outline-none"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
