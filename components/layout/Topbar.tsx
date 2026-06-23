'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/lib/ThemeContext';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/billing': 'Billing',
  '/services': 'Services',
  '/profile': 'Profile',
};

export function Topbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? 'Portal';
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 flex items-center justify-between shrink-0 transition-colors duration-200"
      style={{ height: '52px' }}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-400 dark:text-gray-500">Portal</span>
        <span className="text-xs text-gray-300 dark:text-gray-600">/</span>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <FontAwesomeIcon icon={faBell} className="w-3.5 h-3.5" />
        </button>

        {/* Profile */}
        <Link
          href="/profile"
          aria-label="Go to profile"
          className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5" />
        </Link>

        {/* Dark / Light toggle */}
        <button
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleTheme}
          className="w-8 h-8 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
