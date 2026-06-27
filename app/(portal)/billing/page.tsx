import { Suspense } from 'react';
import { BillingScreen } from '@/components/billing/BillingScreen';

export default function BillingPage() {
  return (
    <Suspense>
      <BillingScreen />
    </Suspense>
  );
}
