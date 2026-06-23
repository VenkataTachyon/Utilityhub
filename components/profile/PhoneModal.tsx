'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, FormRow, Select, Input, Toggle } from '@/components/ui';

export function PhoneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phoneType, setPhoneType] = useState('Mobile');
  const [phone, setPhone] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(true);

  function handleClose() {
    onClose();
    setTimeout(() => { setPhone(''); setSmsOptIn(true); }, 300);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Change phone number">
      <FormRow label="Phone type" htmlFor="phone-type">
        <Select id="phone-type" value={phoneType} onChange={(e) => setPhoneType(e.target.value)}>
          <option>Mobile</option><option>Home</option><option>Work</option>
        </Select>
      </FormRow>
      <FormRow label="New phone number" htmlFor="phone-num">
        <Input id="phone-num" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormRow>
      <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 mb-4">
        <div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">Opt in to SMS alerts</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Receive outage and billing notifications by text</div>
        </div>
        <Toggle checked={smsOptIn} onChange={setSmsOptIn} />
      </div>
      <Button variant="primary" className="w-full justify-center" disabled={!phone.trim()} onClick={handleClose}>
        <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5" /> Save phone number
      </Button>
    </Modal>
  );
}
