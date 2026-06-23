export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Returns the minimum move date (3 business days from today) as YYYY-MM-DD */
export function getMinMoveDate(): string {
  const date = new Date();
  let added = 0;
  while (added < 3) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toISOString().split('T')[0];
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  return `${local[0]}***@${domain}`;
}

export function maskPhone(phone: string): string {
  return phone.replace(/\d(?=\d{4})/g, '*');
}

type ServiceRequestType = 'Outage Report' | 'Meter Issue' | 'New Connection' | 'General Inquiry';

export const SERVICE_REQUEST_PRIORITIES: Record<ServiceRequestType, { label: string; variant: string }> = {
  'Outage Report': { label: 'CRITICAL', variant: 'danger' },
  'Meter Issue': { label: 'HIGH', variant: 'warning' },
  'New Connection': { label: 'NORMAL', variant: 'info' },
  'General Inquiry': { label: 'LOW', variant: 'gray' },
};

export const ORDER_STATUS_MAP: Record<string, { label: string; variant: string }> = {
  PENDING: { label: 'Pending', variant: 'blue' },
  IN_PROGRESS: { label: 'In progress', variant: 'amber' },
  COMPLETED: { label: 'Completed', variant: 'green' },
  CANCELLED: { label: 'Cancelled', variant: 'gray' },
};

export const BILL_STATUS_MAP: Record<string, { label: string; variant: string }> = {
  PAID: { label: 'Paid', variant: 'green' },
  UNPAID: { label: 'Unpaid', variant: 'amber' },
  OVERDUE: { label: 'Overdue', variant: 'red' },
};
