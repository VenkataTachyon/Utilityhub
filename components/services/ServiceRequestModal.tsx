'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, FormRow, Select, Textarea, Input, Badge, StepIndicator, ProgressBar, KvRow } from '@/components/ui';
import { SERVICE_REQUEST_PRIORITIES } from '@/lib/utils';

type RequestType = keyof typeof SERVICE_REQUEST_PRIORITIES;
const REQUEST_TYPES: RequestType[] = ['Outage Report', 'Meter Issue', 'New Connection', 'General Inquiry'];
const TIME_SLOTS = ['Morning (8–12)', 'Afternoon (12–5)', 'Evening (5–8)'];
const STEPS = ['Request type', 'Details', 'Confirm'];

export function ServiceRequestModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [requestType, setRequestType] = useState<RequestType | ''>('');
  const [description, setDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [submitted, setSubmitted] = useState(false);

  const priority = requestType ? SERVICE_REQUEST_PRIORITIES[requestType] : null;
  const badgeVariant = priority?.variant === 'danger' ? 'danger' : priority?.variant === 'warning' ? 'warning' : priority?.variant === 'info' ? 'info' : 'gray';

  function handleClose() {
    onClose();
    setTimeout(() => { setStep(0); setRequestType(''); setDescription(''); setPreferredDate(''); setTimeSlot(TIME_SLOTS[0]); setSubmitted(false); }, 300);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Create service request">
      <StepIndicator steps={STEPS} current={step} />
      <ProgressBar value={((step + 1) / STEPS.length) * 100} />
      {submitted ? (
        <div className="text-center py-6">
          <div className="text-3xl mb-3">✅</div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Request submitted!</div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">We'll follow up at the scheduled time.</div>
        </div>
      ) : (
        <>
          {step === 0 && (
            <div>
              <FormRow label="Request type" htmlFor="sr-type">
                <Select id="sr-type" value={requestType} onChange={(e) => setRequestType(e.target.value as RequestType)}>
                  <option value="">Select a type…</option>
                  {REQUEST_TYPES.map((t) => <option key={t}>{t}</option>)}
                </Select>
              </FormRow>
              {priority && (
                <div className="mb-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  Auto-assigned priority: <Badge variant={badgeVariant as 'info' | 'danger' | 'warning' | 'success' | 'gray'}>{priority.label}</Badge>
                </div>
              )}
              <Button variant="primary" className="w-full justify-center" disabled={!requestType} onClick={() => setStep(1)}>Continue</Button>
            </div>
          )}
          {step === 1 && (
            <div>
              <FormRow label="Description" htmlFor="sr-desc">
                <Textarea id="sr-desc" rows={4} placeholder="Describe the issue in detail…" value={description} onChange={(e) => setDescription(e.target.value)} />
              </FormRow>
              <div className="grid grid-cols-2 gap-2.5">
                <FormRow label="Preferred date" htmlFor="sr-date"><Input id="sr-date" type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} /></FormRow>
                <FormRow label="Time slot" htmlFor="sr-slot"><Select id="sr-slot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>{TIME_SLOTS.map((s) => <option key={s}>{s}</option>)}</Select></FormRow>
              </div>
              <div className="flex gap-2 justify-between mt-1">
                <Button onClick={() => setStep(0)}><FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" /> Back</Button>
                <Button variant="primary" disabled={!description.trim()} onClick={() => setStep(2)}>Continue</Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Request summary</div>
                <KvRow label="Type" value={requestType} />
                <KvRow label="Priority" value={priority ? <Badge variant={badgeVariant as 'info' | 'danger' | 'warning' | 'success' | 'gray'}>{priority.label}</Badge> : '—'} />
                <KvRow label="Account" value="ACC-001234" />
                {preferredDate && <KvRow label="Preferred date" value={preferredDate} />}
                <KvRow label="Time slot" value={timeSlot} />
              </div>
              <div className="flex gap-2 justify-between">
                <Button onClick={() => setStep(1)}><FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" /> Back</Button>
                <Button variant="primary" onClick={() => setSubmitted(true)}>Submit request</Button>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
