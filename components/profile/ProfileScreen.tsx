'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEnvelope, faPhone, faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, SectionTitle, FormRow, Input, Select, Badge, Divider, PreferenceRow, Toggle } from '@/components/ui';
import { EmailModal } from './EmailModal';
import { PhoneModal } from './PhoneModal';
import { AddressModal } from './AddressModal';

export function ProfileScreen() {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [lang, setLang] = useState('English');
  const [personalDirty, setPersonalDirty] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [paperless, setPaperless] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [phoneNotif, setPhoneNotif] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Left */}
      <div className="flex flex-col gap-5">
        <div>
          <SectionTitle>Personal information</SectionTitle>
          <Card>
            <FormRow label="First name" htmlFor="p-first">
              <Input id="p-first" value={firstName} onChange={(e) => { setFirstName(e.target.value); setPersonalDirty(true); }} />
            </FormRow>
            <FormRow label="Last name" htmlFor="p-last">
              <Input id="p-last" value={lastName} onChange={(e) => { setLastName(e.target.value); setPersonalDirty(true); }} />
            </FormRow>
            <FormRow label="Preferred language" htmlFor="p-lang">
              <Select id="p-lang" value={lang} onChange={(e) => { setLang(e.target.value); setPersonalDirty(true); }}>
                <option>English</option><option>Spanish</option><option>French</option>
              </Select>
            </FormRow>
            <Divider className="mb-3 mt-1" />
            <div className="flex gap-2 justify-end">
              <Button size="sm" disabled={!personalDirty} onClick={() => setPersonalDirty(false)}>Cancel</Button>
              <Button variant="primary" size="sm" disabled={!personalDirty} onClick={() => setPersonalDirty(false)}>
                <FontAwesomeIcon icon={faPen} className="w-3 h-3" /> Save changes
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <SectionTitle>Contact</SectionTitle>
          <Card>
            <PreferenceRow title={
              <div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faEnvelope} className="w-3 h-3" /> Email
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">j***@domain.com</div>
              </div>
            }>
              <Button size="sm" onClick={() => setEmailModalOpen(true)}>Change email</Button>
            </PreferenceRow>
            <PreferenceRow title={
              <div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mb-0.5 flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faPhone} className="w-3 h-3" /> Phone
                </div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  ***-***-1234 <Badge variant="info" className="text-[10px]">Mobile</Badge>
                </div>
              </div>
            }>
              <Button size="sm" onClick={() => setPhoneModalOpen(true)}>Change phone</Button>
            </PreferenceRow>
          </Card>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col gap-5">
        <div>
          <SectionTitle>Addresses</SectionTitle>
          <div className="flex flex-col gap-3">
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 bg-white dark:bg-gray-900">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-1.5">
                    <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> Billing address
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">123 Main Street</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Springfield, IL 62701</div>
                </div>
                <Button size="sm" onClick={() => setAddressModalOpen(true)}>
                  <FontAwesomeIcon icon={faPen} className="w-3 h-3" /> Edit
                </Button>
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" /> Service address
                    <span className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <FontAwesomeIcon icon={faLock} className="w-2.5 h-2.5" /> read-only
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">123 Main Street</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Springfield, IL 62701</div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1.5">
                    Change via <a href="/services?tab=Move+request" className="text-blue-700 dark:text-blue-400 hover:underline">Move request</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle>Preferences</SectionTitle>
          <Card>
            <PreferenceRow title="Paperless billing" description="Bills delivered to your email">
              <Toggle checked={paperless} onChange={setPaperless} />
            </PreferenceRow>
            <PreferenceRow title="Email notifications">
              <input type="checkbox" checked={emailNotif} onChange={(e) => setEmailNotif(e.target.checked)} className="w-4 h-4 accent-blue-700 cursor-pointer" />
            </PreferenceRow>
            <PreferenceRow title="SMS alerts">
              <input type="checkbox" checked={smsNotif} onChange={(e) => setSmsNotif(e.target.checked)} className="w-4 h-4 accent-blue-700 cursor-pointer" />
            </PreferenceRow>
            <PreferenceRow title="Phone call notifications">
              <input type="checkbox" checked={phoneNotif} onChange={(e) => setPhoneNotif(e.target.checked)} className="w-4 h-4 accent-blue-700 cursor-pointer" />
            </PreferenceRow>
          </Card>
        </div>
      </div>

      <EmailModal open={emailModalOpen} onClose={() => setEmailModalOpen(false)} />
      <PhoneModal open={phoneModalOpen} onClose={() => setPhoneModalOpen(false)} />
      <AddressModal open={addressModalOpen} onClose={() => setAddressModalOpen(false)} initialAddress={{ street: '123 Main Street', city: 'Springfield', state: 'IL', zip: '62701' }} />
    </div>
  );
}
