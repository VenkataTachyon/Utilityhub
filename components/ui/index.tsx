'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

// ─── Badge ──────────────────────────────────────────────────────────────────
const badgeVariants = {
  success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  danger:  'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  info:    'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  gray:    'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400',
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
  green: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  amber: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  red:   'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  blue:  'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  gray:  'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400',
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

const btnBase = 'inline-flex items-center gap-1.5 font-medium rounded-lg border cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none';
const btnVariants: Record<ButtonVariant, string> = {
  default: 'bg-[var(--bg-btn)] border-[var(--bg-btn-border)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]',
  primary: 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700',
  ghost:   'bg-transparent border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-btn)]',
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
        className={cn('relative w-9 h-5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500', checked ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600')}>
        <span className={cn('absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform', checked && 'translate-x-4')} />
      </button>
      {label && <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>}
    </label>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className, noPad }: { children: ReactNode; className?: string; noPad?: boolean; }) {
  return (
    <div className={cn('content-card', !noPad && 'p-4 md:p-5', className)}>
      {children}
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider({ className }: { className?: string }) {
  return <hr className={cn('border-t my-4', className)} style={{ borderColor: 'var(--border-soft)' }} />;
}

// ─── KvRow ───────────────────────────────────────────────────────────────────
export function KvRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between items-start py-2 text-sm" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginRight: 16 }}>{label}</span>
      <span className="font-medium text-right max-w-[60%]" style={{ color: 'var(--text-primary)' }}>{value}</span>
    </div>
  );
}

// ─── StatMini ────────────────────────────────────────────────────────────────
export function StatMini({ label, value, sub, valueClassName }: { label: string; value: ReactNode; sub?: ReactNode; valueClassName?: string; }) {
  return (
    <div className="rounded-xl p-3" style={{ background: 'var(--bg-btn)', border: '1px solid var(--border-soft)' }}>
      <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className={cn('text-base font-semibold', valueClassName)} style={{ color: 'var(--text-primary)' }}>{value}</div>
      {sub && <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{sub}</div>}
    </div>
  );
}

// ─── SectionTitle ────────────────────────────────────────────────────────────
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode; }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{children}</h2>
      {action}
    </div>
  );
}

// ─── FormRow ─────────────────────────────────────────────────────────────────
export function FormRow({ label, htmlFor, children }: { label: string; htmlFor?: string; children: ReactNode; }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={htmlFor} className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }}>{label}</label>
      {children}
    </div>
  );
}

// ─── Input / Select / Textarea ────────────────────────────────────────────────
const inputBase = 'w-full px-2.5 py-1.5 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors placeholder:text-[var(--text-faint)]';
const inputStyle = { background: 'var(--bg-input)', border: '1px solid var(--border-mid)', color: 'var(--text-primary)' };

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(inputBase, props.className)} style={inputStyle} {...props} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn(inputBase, 'cursor-pointer', props.className)} style={inputStyle} {...props} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(inputBase, 'resize-none', props.className)} style={inputStyle} {...props} />;
}

// ─── AlertBanner ─────────────────────────────────────────────────────────────
export function AlertBanner({ type = 'info', children }: { type?: 'info' | 'warning' | 'error'; children: ReactNode; }) {
  const styles = {
    info:    'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-800 dark:text-amber-300',
    error:   'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800 text-red-800 dark:text-red-300',
  };
  return (
    <div className={cn('flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs leading-relaxed', styles[type])}>
      <span className="mt-0.5 text-sm">ℹ</span>
      <div>{children}</div>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode; }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="content-card w-full max-w-md mx-4 p-5 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{title}</h3>
          <button onClick={onClose} className="text-lg leading-none focus-visible:outline-none" style={{ color: 'var(--text-faint)' }} aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void; }) {
  return (
    <div className="flex mb-5" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)}
          className="px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors focus-visible:outline-none"
          style={
            active === tab
              ? { borderColor: '#6366f1', color: '#6366f1', fontWeight: 500 }
              : { borderColor: 'transparent', color: 'var(--text-muted)' }
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ─── SegmentedControl ────────────────────────────────────────────────────────
export function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void; }) {
  return (
    <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--border-mid)' }}>
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)}
          className="px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none"
          style={
            value === opt
              ? { background: '#6366f1', color: 'white' }
              : { background: 'var(--bg-btn)', color: 'var(--text-muted)' }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── PreferenceRow ───────────────────────────────────────────────────────────
export function PreferenceRow({ title, description, children }: { title: ReactNode; description?: string; children: ReactNode; }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid var(--border-soft)' }}>
      <div>
        {typeof title === 'string'
          ? <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{title}</div>
          : title}
        {description && <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{description}</div>}
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
                state === 'pending' && 'bg-gray-100 dark:bg-white/10 text-gray-400'
              )}
              style={state === 'active' ? { background: '#6366f1', color: 'white' } : undefined}
              >
                {state === 'done' ? '✓' : i + 1}
              </span>
              <span className="text-xs" style={{
                color: state === 'active' ? 'var(--text-primary)' : 'var(--text-faint)',
                fontWeight: state === 'active' ? 500 : 400,
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-8 h-px mx-1" style={{ background: 'var(--border-mid)' }} />}
          </div>
        );
      })}
    </div>
  );
}

// ─── ProgressBar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1 rounded-full mb-5" style={{ background: 'var(--border-soft)' }}>
      <div className="h-1 rounded-full transition-all duration-300" style={{ width: `${value}%`, background: '#6366f1' }} />
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
              !item.completed && !item.active && 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
            )}
            style={item.active && !item.completed ? { background: 'rgba(99,102,241,0.1)', borderColor: '#6366f1' } : undefined}
            />
            {i < items.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'var(--border-soft)' }} />}
          </div>
          <div className="pb-1">
            <div className="text-xs font-medium" style={{
              color: item.active && !item.completed
                ? '#6366f1'
                : item.completed ? 'var(--text-secondary)' : 'var(--text-faint)',
            }}>{item.title}</div>
            {item.date && <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{item.date}</div>}
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
      <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#6366f1', borderTopColor: 'transparent' }} />
    </div>
  );
}

// ─── ErrorState ──────────────────────────────────────────────────────────────
export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
      <div className="text-3xl">⚠️</div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{message}</div>
      {onRetry && <Button size="sm" onClick={onRetry}>Retry</Button>}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center gap-2">
      <div className="text-3xl">📭</div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{message}</div>
    </div>
  );
}
