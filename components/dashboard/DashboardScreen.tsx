'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileInvoiceDollar, faChartBar, faWrench, faUser,
  faCircleCheck, faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { mockAccountSummary } from '@/lib/mockData';
import { Badge, Card, AlertBanner, StatMini, SectionTitle, KvRow } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';

function QuickActionCard({ faIcon, title, description, href, iconBg, iconColorClass }: {
  faIcon: IconDefinition; title: string; description: string; href: string; iconBg: string; iconColorClass: string;
}) {
  return (
    <Link href={href} className="template-card flex items-center gap-3 p-3.5" style={{ textDecoration: 'none' }}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
        <FontAwesomeIcon icon={faIcon} className={`w-4 h-4 ${iconColorClass}`} />
      </div>
      <div>
        <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{title}</div>
        <div className="text-xs" style={{ color: 'var(--text-faint)' }}>{description}</div>
      </div>
    </Link>
  );
}

export function DashboardScreen() {
  const account = mockAccountSummary;
  const [paperless] = useState(account.paperlessBilling);

  return (
    <div>
      {/* Account header */}
      <div className="flex items-center gap-2.5 mb-4">
        <Badge variant="success">
          <FontAwesomeIcon icon={faCircleCheck} className="w-3 h-3" /> Active
        </Badge>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {account.serviceType} · {account.accountNumber} · {account.serviceAddress}
        </span>
      </div>

      {/* Alerts */}
      {account.alerts.map((alert, i) => (
        <div key={i} className="mb-4">
          <AlertBanner type={alert.type === 'INFO' ? 'info' : alert.type === 'WARNING' ? 'warning' : 'error'}>
            <strong>Alert:</strong> {alert.message}
          </AlertBanner>
        </div>
      ))}

      {/* Balance cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Card>
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Current due</div>
          <div className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(account.balance.currentDue)}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>Due {formatDate(account.nextDueDate)}</div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Past due</div>
          <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(account.balance.pastDue)}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>No outstanding balance</div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Last payment</div>
          <div className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(account.lastPayment.amount)}</div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{formatDate(account.lastPayment.date)}</div>
        </Card>
        <Card>
          <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Paperless billing</div>
          <div className="mt-1.5">
            <Badge variant={paperless ? 'success' : 'gray'}>
              {paperless ? '✓ Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
            {paperless ? 'Bills sent to email' : 'Paper bills mailed'}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick actions */}
        <div>
          <SectionTitle>Quick actions</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <QuickActionCard href="/billing" faIcon={faFileInvoiceDollar} title="View Bills" description="12 months history" iconBg="bg-blue-50 dark:bg-blue-900/30" iconColorClass="text-blue-700 dark:text-blue-400" />
            <QuickActionCard href="/billing?tab=Consumption" faIcon={faChartBar} title="Consumption" description="Usage & trends" iconBg="bg-emerald-50 dark:bg-emerald-900/30" iconColorClass="text-emerald-700 dark:text-emerald-400" />
            <QuickActionCard href="/services" faIcon={faWrench} title="Manage Services" description="Orders & requests" iconBg="bg-amber-50 dark:bg-amber-900/30" iconColorClass="text-amber-700 dark:text-amber-400" />
            <QuickActionCard href="/profile" faIcon={faUser} title="Edit Profile" description="Contact & preferences" iconBg="bg-purple-50 dark:bg-purple-900/30" iconColorClass="text-purple-700 dark:text-purple-400" />
          </div>
        </div>

        {/* Account summary */}
        <div>
          <SectionTitle>Account summary</SectionTitle>
          <Card>
            <KvRow label="Account number" value={account.accountNumber} />
            <KvRow label="Service type" value={account.serviceType} />
            <KvRow label="Account status" value={<Badge variant="success">Active</Badge>} />
            <KvRow label="Service address" value={account.serviceAddress} />
            <KvRow label="Total due" value={<span className="text-amber-700 dark:text-amber-400 font-semibold">{formatCurrency(account.balance.totalDue)}</span>} />
            <KvRow label="Next due date" value={formatDate(account.nextDueDate)} />
          </Card>
        </div>
      </div>
    </div>
  );
}
