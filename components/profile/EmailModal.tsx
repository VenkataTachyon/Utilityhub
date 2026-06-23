'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, FormRow, Input } from '@/components/ui';

export function EmailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'enter' | 'verify' | 'done'>('enter');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  function handleClose() {
    onClose();
    setTimeout(() => { setStep('enter'); setEmail(''); setCode(''); }, 300);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Change email address">
      {step === 'enter' && (
        <div>
          <FormRow label="New email address" htmlFor="new-email">
            <Input id="new-email" type="email" placeholder="new@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormRow>
          <Button variant="primary" className="w-full justify-center" disabled={!email.includes('@')} onClick={() => setStep('verify')}>
            <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" /> Send verification code
          </Button>
        </div>
      )}
      {step === 'verify' && (
        <div>
          <div className="text-center pb-4">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Verification code sent to <strong>{email}</strong>. Enter it below.</div>
          </div>
          <FormRow label="Verification code" htmlFor="otp-code">
            <Input id="otp-code" type="text" inputMode="numeric" maxLength={6} placeholder="6-digit code" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} />
          </FormRow>
          <Button variant="primary" className="w-full justify-center" disabled={code.length !== 6} onClick={() => setStep('done')}>
            Confirm email change
          </Button>
        </div>
      )}
      {step === 'done' && (
        <div className="text-center py-4">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Email updated successfully!</div>
          <Button className="mt-4" onClick={handleClose}>Close</Button>
        </div>
      )}
    </Modal>
  );
}
