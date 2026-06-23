'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTableCells,
  faFileInvoiceDollar,
  faWrench,
  faUser,
  faHeadset,
  faGear,
  faRightFromBracket,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: faTableCells },
  { href: '/billing', label: 'Billing', icon: faFileInvoiceDollar },
  { href: '/services', label: 'Services', icon: faWrench },
  { href: '/profile', label: 'Profile', icon: faUser },
];

const bottomItems = [
  { href: '/support', label: 'Support', icon: faHeadset },
  { href: '/settings', label: 'Settings', icon: faGear },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] min-w-[220px] bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col h-full transition-colors duration-200">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-700 rounded-md flex items-center justify-center text-white text-sm">
            <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">UtilityHub</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Customer Portal</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-3">
        <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 px-2 mb-1.5">
          Main
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
                )}
              >
                <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-600 px-2 mb-1.5 mt-5">
          Account
        </div>
        <ul className="space-y-0.5">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <FontAwesomeIcon icon={item.icon} className="w-3.5 h-3.5 shrink-0" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Account chip */}
      <div className="px-2 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2.5 px-2.5 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center text-xs text-white font-semibold shrink-0">
            JD
          </div>
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
        </div>
      </div>
    </aside>
  );
}
