'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─── Badge ──────────────────────────────────────────────────────────────────
const badgeVariants = {
  success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
  danger:  'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
  info:    'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  gray:    'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
} as const;

export function Badge({ variant = 'info', children, className }: {
  variant?: keyof typeof badgeVariants; children: ReactNode; className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', badgeVariants[variant], className)}>
      {children}
    </span>
  );
}

// ─── Pill ────────────────────────────────────────────────────────────────────
const pillVariants = {
  green: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400',
  amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400',
  red:   'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-400',
  blue:  'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400',
  gray:  'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
} as const;

export function Pill({ variant = 'gray', children }: { variant?: keyof typeof pillVariants; children: ReactNode; }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', pillVariants[variant])}>
      {children}
    </span>
  );
}

// ─── Button ──────────────────────────────────────────────────────────────────
type ButtonVariant = 'default' | 'primary' | 'ghost';
type ButtonSize    = 'sm' | 'md';

const btnBase = 'inline-flex items-center gap-1.5 font-medium rounded-md border cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none';
const btnVariants: Record<ButtonVariant, string> = {
  default: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700',
  primary: 'bg-blue-700 border-blue-700 text-white hover:bg-blue-800',
  ghost:   'bg-transparent border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800',
};
const btnSizes: Record<ButtonSize, string> = { sm: 'px-2.5 py-1 text-xs', md: 'px-3.5 py-1.5 text-sm' };

export function Button({ variant = 'default', size = 'md', className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; }) {
  return <button className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...props}>{children}</button>;
}

// ─── Toggle ──────────────────────────────────────────────────────────────────
export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string; }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
        className={cn('relative w-9 h-5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500', checked ? 'bg-blue-700' : 'bg-gray-300 dark:bg-gray-600')}>
        <span className={cn('absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform', checked && 'translate-x-4')} />
      </button>
      {label && <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className, noPad }: { children: ReactNode; className?: string; noPad?: boolean; }) {
  return (
    <div className={cn('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl transition-colors', !noPad && 'p-4 md:p-5', className)}>
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-t border-gray-100 dark:border-gray-800 my-4', className)} />;
}

// ─── KvRow ───────────────────────────────────────────────────────────────────
export function KvRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 text-sm">
      <span className="text-gray-500 dark:text-gray-400 shrink-0 mr-4">{label}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100 text-right max-w-[60%]">{value}</span>
    </div>
  );
}

// ─── StatMini ────────────────────────────────────────────────────────────────
export function StatMini({ label, value, sub, valueClassName }: { label: string; value: ReactNode; sub?: ReactNode; valueClassName?: string; }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</div>
      <div className={cn('text-base font-semibold text-gray-900 dark:text-gray-100', valueClassName)}>{value}</div>
      {sub && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── SectionTitle ────────────────────────────────────────────────────────────
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode; }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{children}</h2>
      {action}
    </div>
  );
}

// ─── FormRow ─────────────────────────────────────────────────────────────────
export function FormRow({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode; }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={htmlFor} className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

// ─── Input / Select / Textarea ────────────────────────────────────────────────
const inputBase = 'w-full px-2.5 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-gray-100 font-sans focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors placeholder:text-gray-400 dark:placeholder:text-gray-600';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, props.className)} {...props} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(inputBase, 'cursor-pointer', props.className)} {...props} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputBase, 'resize-none', props.className)} {...props} />;
}

// ─── AlertBanner ─────────────────────────────────────────────────────────────
export function AlertBanner({ type = 'info', children }: { type?: 'info' | 'warning' | 'error'; children: ReactNode; }) {
  const styles = {
    info:    'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 text-blue-800 dark:text-blue-300',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    error:   'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-800 dark:text-red-300',
  };
  return (
    <div className={cn('flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg border text-xs leading-relaxed', styles[type])}>
      <span className="mt-0.5 text-sm">ℹ</span>
      <div>{children}</div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 w-full max-w-md mx-4 p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <button onClick={onClose} className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-lg leading-none focus-visible:outline-none" aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void; }) {
  return (
    <div className="flex border-b border-gray-200 dark:border-gray-800 mb-5">
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)}
          className={cn('px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors focus-visible:outline-none',
            active === tab
              ? 'border-blue-700 text-blue-700 dark:text-blue-400 font-medium'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          )}>
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── SegmentedControl ────────────────────────────────────────────────────────
export function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void; }) {
  return (
    <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)}
          className={cn('px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none',
            value === opt ? 'bg-blue-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
          )}>
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── PreferenceRow ───────────────────────────────────────────────────────────
export function PreferenceRow({ title, description, children }: { title: ReactNode; description?: string; children: ReactNode; }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div>
        {typeof title === 'string'
          ? <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</div>
          : title}
        {description && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{description}</div>}
      </div>
      {children}
    </div>
  );
}

// ─── StepIndicator ───────────────────────────────────────────────────────────
export function StepIndicator({ steps, current }: { steps: string[]; current: number; }) {
  return (
    <div className="flex items-center gap-1 mb-4">
      {steps.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : 'pending';
        return (
          <div key={label} className="flex items-center gap-1">
            <div className="flex items-center gap-1.5">
              <span className={cn('w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold',
                state === 'done'    && 'bg-emerald-600 text-white',
                state === 'active'  && 'bg-blue-700 text-white',
                state === 'pending' && 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
              )}>
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className={cn('text-xs',
                state === 'active'  && 'text-gray-800 dark:text-gray-200 font-medium',
                state !== 'active'  && 'text-gray-400 dark:text-gray-600'
              )}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200 dark:bg-gray-700 mx-1" />}
          </div>
        );
      })}
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full mb-5">
      <div className="h-1 bg-blue-700 rounded-full transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────
export function Timeline({ items }: { items: Array<{ title: string; date?: string; completed: boolean; active?: boolean }>; }) {
  return (
    <ul className="space-y-0">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 pb-4 relative">
          <div className="flex flex-col items-center">
            <span className={cn('w-2.5 h-2.5 rounded-full border-2 mt-0.5 shrink-0',
              item.completed               && 'bg-emerald-500 border-emerald-500',
              item.active && !item.completed && 'bg-blue-50 dark:bg-blue-900/30 border-blue-700',
              !item.completed && !item.active && 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
            )} />
            {i < items.length - 1 && <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />}
          </div>
          <div className="pb-1">
            <div className={cn('text-xs font-medium',
              item.active && !item.completed ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300',
              !item.completed && !item.active && 'text-gray-400 dark:text-gray-600'
            )}>{item.title}</div>
            {item.date && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{item.date}</div>}
          </div>
        </li>
      ))}
    </ul>
  );
}

// ─── LoadingSpinner ───────────────────────────────────────────────────────────
export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center py-12', className)}>
      <div className="w-6 h-6 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ─── ErrorState ──────────────────────────────────────────────────────────────
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <div className="text-3xl">⚠️</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{message}</div>
      {onRetry && <Button size="sm" onClick={onRetry}>Retry</Button>}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      <div className="text-3xl">📭</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{message}</div>
    </div>
  );
}
