'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs } from '@/components/ui';
import { BillsTab } from './BillsTab';
import { ConsumptionTab } from './ConsumptionTab';

const TABS = ['Bills', 'Consumption'];

export function BillingScreen() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') ?? 'Bills';
  const [activeTab, setActiveTab] = useState(
    TABS.includes(initialTab) ? initialTab : 'Bills'
  );

  return (
    <div>
      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      {activeTab === 'Bills' && <BillsTab />}
      {activeTab === 'Consumption' && <ConsumptionTab />}
    </div>
  );
}
