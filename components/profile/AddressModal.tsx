'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, FormRow, Input } from '@/components/ui';

interface Props { open: boolean; onClose: () => void; initialAddress?: { street: string; city: string; state: string; zip: string }; }

export function AddressModal({ open, onClose, initialAddress }: Props) {
  const [street, setStreet] = useState(initialAddress?.street ?? '');
  const [city, setCity] = useState(initialAddress?.city ?? '');
  const [state, setState] = useState(initialAddress?.state ?? '');
  const [zip, setZip] = useState(initialAddress?.zip ?? '');
  const [effectiveDate, setEffectiveDate] = useState('');

  return (
    <Modal open={open} onClose={onClose} title="Edit billing address">
      <FormRow label="Street address" htmlFor="addr-street">
        <Input id="addr-street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="123 Main St" />
      </FormRow>
      <div className="grid grid-cols-3 gap-2">
        <FormRow label="City" htmlFor="addr-city"><Input id="addr-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Springfield" /></FormRow>
        <FormRow label="State" htmlFor="addr-state"><Input id="addr-state" value={state} onChange={(e) => setState(e.target.value)} placeholder="IL" /></FormRow>
        <FormRow label="ZIP" htmlFor="addr-zip"><Input id="addr-zip" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="62701" /></FormRow>
      </div>
      <FormRow label="Effective date" htmlFor="addr-date">
        <Input id="addr-date" type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
      </FormRow>
      <div className="flex gap-2 justify-end mt-1">
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={onClose}>
          <FontAwesomeIcon icon={faLocationDot} className="w-3.5 h-3.5" /> Save address
        </Button>
      </div>
    </Modal>
  );
}
