'use client';

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { mockBillsResponse } from '@/lib/mockData';
import { Card, Button, Pill, StatMini } from '@/components/ui';
import { formatCurrency, formatDate, BILL_STATUS_MAP } from '@/lib/utils';
import { cn } from '@/lib/cn';
import type { Bill } from '@/types';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'PAID', label: 'Paid' },
  { value: 'UNPAID', label: 'Unpaid' },
  { value: 'OVERDUE', label: 'Overdue' },
];

// Custom dropdown that looks consistent in both light and dark mode
function StatusDropdown({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = STATUS_OPTIONS.find((o) => o.value === value) ?? STATUS_OPTIONS[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 min-w-[110px] justify-between"
      >
        {selected.label}
        <FontAwesomeIcon icon={faChevronDown} className={cn('w-2.5 h-2.5 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute z-20 top-full mt-1 left-0 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 overflow-hidden">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors',
                opt.value === value
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              )}
            >
              {opt.label}
              {opt.value === value && <FontAwesomeIcon icon={faCheck} className="w-2.5 h-2.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function BillsTab() {
  const [statusFilter, setStatusFilter] = useState('');
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-06-22');
  const [page, setPage] = useState(1);
  const { bills, summary, pagination } = mockBillsResponse;

  const filtered = bills.filter((b) => !statusFilter || b.status === statusFilter);

  const inputCls = 'px-2.5 py-1.5 text-xs rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors';

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {/* Custom styled dropdown — works correctly in dark mode */}
        <StatusDropdown value={statusFilter} onChange={setStatusFilter} />
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className={inputCls} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className={inputCls} />
        <Button size="sm">
          <FontAwesomeIcon icon={faDownload} className="w-3 h-3" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatMini label="Total billed (YTD)" value={formatCurrency(summary.totalBilled)} />
        <StatMini label="Total paid" value={formatCurrency(summary.totalPaid)} valueClassName="text-emerald-600 dark:text-emerald-400" />
        <StatMini label="Outstanding" value={formatCurrency(summary.outstandingBalance)} valueClassName="text-amber-600 dark:text-amber-400" />
      </div>

      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                {['Bill number', 'Bill date', 'Due date', 'Amount', 'Status', ''].map((h) => (
                  <th key={h} className="text-left text-[11px] text-gray-400 dark:text-gray-500 font-medium px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bill: Bill) => {
                const status = BILL_STATUS_MAP[bill.status];
                return (
                  <tr key={bill.billId} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-mono text-[11px]">{bill.billNumber}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400">{formatDate(bill.billDate)}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400">{formatDate(bill.dueDate)}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 font-medium text-gray-800 dark:text-gray-200">{formatCurrency(bill.amountDue)}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
                      <Pill variant={status.variant === 'green' ? 'green' : status.variant === 'amber' ? 'amber' : 'red'}>
                        {status.label}
                      </Pill>
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-right">
                      <Button size="sm">
                        <FontAwesomeIcon icon={faDownload} className="w-3 h-3" /> PDF
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2.5 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-400 dark:text-gray-500">Showing {filtered.length} of {pagination.totalRecords} bills</span>
          <div className="flex gap-1.5">
            <Button size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>‹</Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <Button key={i + 1} size="sm" variant={page === i + 1 ? 'primary' : 'default'} onClick={() => setPage(i + 1)}>{i + 1}</Button>
            ))}
            <Button size="sm" disabled={page === pagination.totalPages} onClick={() => setPage((p) => p + 1)}>›</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
