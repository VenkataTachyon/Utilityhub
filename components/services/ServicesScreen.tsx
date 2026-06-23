'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt, faLocationDot, faPlus, faEye, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { mockServiceDetails, mockServiceOrders } from '@/lib/mockData';
import { Tabs, Card, Badge, Pill, Button, KvRow, Timeline, FormRow, Input, Select } from '@/components/ui';
import { formatDate, ORDER_STATUS_MAP, getMinMoveDate } from '@/lib/utils';
import { ServiceRequestModal } from './ServiceRequestModal';
import type { ServiceOrder } from '@/types';

const TABS = ['Service details', 'Service orders', 'Move request'];

function ServiceDetailsTab() {
  const svc = mockServiceDetails;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
            <FontAwesomeIcon icon={faBolt} className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Electric Service</div>
            <Badge variant="success">● Active</Badge>
          </div>
        </div>
        <KvRow label="Rate plan" value={svc.ratePlanName} />
        <KvRow label="Service start" value={formatDate(svc.serviceStartDate)} />
        <KvRow label="Meter number" value={svc.meterNumber} />
        <KvRow label="Meter type" value={svc.meterType} />
      </Card>
      <Card>
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5 text-gray-400" /> Service address
        </div>
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">123 Main Street</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Springfield, IL 62701</div>
        <hr className="border-gray-100 dark:border-gray-800 my-3" />
        <div className="text-xs text-gray-400 dark:text-gray-500">
          ℹ To change your service address, submit a move request.
        </div>
      </Card>
    </div>
  );
}

function ServiceOrdersTab() {
  const { orders } = mockServiceOrders;
  const [openOrderId, setOpenOrderId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-400 dark:text-gray-500">{orders.length} service orders on record</span>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className="w-3 h-3" /> Create service request
        </Button>
      </div>
      <Card noPad>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/60">
                {['Type', 'Description', 'Status', 'Scheduled', 'Completed', ''].map((h) => (
                  <th key={h} className="text-left text-[11px] text-gray-400 dark:text-gray-500 font-medium px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order: ServiceOrder) => {
                const statusMeta = ORDER_STATUS_MAP[order.status];
                return (
                  <tr key={order.orderId} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300 whitespace-nowrap">{order.orderType}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 max-w-[160px] truncate">{order.description}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
                      <Pill variant={statusMeta.variant === 'blue' ? 'blue' : statusMeta.variant === 'amber' ? 'amber' : statusMeta.variant === 'green' ? 'green' : 'gray'}>{statusMeta.label}</Pill>
                    </td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.scheduledDate ? formatDate(order.scheduledDate) : '—'}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400 whitespace-nowrap">{order.completedDate ? formatDate(order.completedDate) : '—'}</td>
                    <td className="px-3 py-2.5 border-b border-gray-100 dark:border-gray-800">
                      {order.timeline && (
                        <Button size="sm" onClick={() => setOpenOrderId(openOrderId === order.orderId ? null : order.orderId)}>
                          <FontAwesomeIcon icon={openOrderId === order.orderId ? faXmark : faEye} className="w-3 h-3" />
                          {openOrderId === order.orderId ? 'Hide' : 'View'}
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {openOrderId && (() => {
        const order = orders.find((o) => o.orderId === openOrderId);
        if (!order?.timeline) return null;
        return (
          <Card className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Order timeline — {order.orderType} #{order.orderId}</span>
              <Button size="sm" onClick={() => setOpenOrderId(null)}><FontAwesomeIcon icon={faXmark} className="w-3 h-3" /></Button>
            </div>
            <Timeline items={order.timeline.map((t) => ({
              title: t.status,
              date: t.timestamp ? new Date(t.timestamp).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : t.description || undefined,
              completed: t.completed,
              active: !t.completed && order.timeline!.indexOf(t) === order.timeline!.findIndex((x) => !x.completed),
            }))} />
          </Card>
        );
      })()}
      <ServiceRequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function MoveRequestTab() {
  const [moveType, setMoveType] = useState<'Move in' | 'Move out'>('Move in');
  const [moveDate, setMoveDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [finalMeter, setFinalMeter] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const minDate = getMinMoveDate();

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl mb-3">✅</div>
        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Move request submitted!</div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">We'll confirm your request within 1 business day.</div>
      </div>
    );
  }

  return (
    <Card className="max-w-lg">
      <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">Move request</div>
      <div className="flex border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden mb-4 w-fit">
        {(['Move in', 'Move out'] as const).map((t) => (
          <button key={t} onClick={() => setMoveType(t)}
            className={`px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none ${moveType === t ? 'bg-blue-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>
      <FormRow label={`${moveType === 'Move in' ? 'Move-in' : 'Move-out'} date`} htmlFor="move-date">
        <Input id="move-date" type="date" min={minDate} value={moveDate} onChange={(e) => setMoveDate(e.target.value)} />
      </FormRow>
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
        {moveType === 'Move in' ? 'New service address' : 'Forwarding address'}
      </div>
      <FormRow label="Street address" htmlFor="move-street">
        <Input id="move-street" placeholder="456 Oak Avenue" value={street} onChange={(e) => setStreet(e.target.value)} />
      </FormRow>
      <div className="grid grid-cols-3 gap-2">
        <FormRow label="City" htmlFor="move-city"><Input id="move-city" placeholder="Springfield" value={city} onChange={(e) => setCity(e.target.value)} /></FormRow>
        <FormRow label="State" htmlFor="move-state"><Input id="move-state" placeholder="IL" value={state} onChange={(e) => setState(e.target.value)} /></FormRow>
        <FormRow label="ZIP" htmlFor="move-zip"><Input id="move-zip" placeholder="62702" value={zip} onChange={(e) => setZip(e.target.value)} /></FormRow>
      </div>
      <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 mb-4">
        <div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Request final meter reading</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Technician will read meter on move date</div>
        </div>
        <button role="switch" aria-checked={finalMeter} onClick={() => setFinalMeter((v) => !v)}
          className={`relative w-9 h-5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${finalMeter ? 'bg-blue-700' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${finalMeter ? 'translate-x-4' : ''}`} />
        </button>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Summary</div>
        <KvRow label="Move type" value={moveType} />
        <KvRow label="Effective date" value={moveDate || '—'} />
        <KvRow label={moveType === 'Move in' ? 'New address' : 'Forwarding address'} value={street ? `${street}, ${city} ${state} ${zip}`.trim().replace(/,\s*$/, '') : '—'} />
      </div>
      <Button variant="primary" className="w-full justify-center" disabled={!moveDate || !street || !city} onClick={() => setSubmitted(true)}>
        Submit move request
      </Button>
    </Card>
  );
}

export function ServicesScreen() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  return (
    <div>
      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      {activeTab === 'Service details' && <ServiceDetailsTab />}
      {activeTab === 'Service orders' && <ServiceOrdersTab />}
      {activeTab === 'Move request' && <MoveRequestTab />}
    </div>
  );
}
