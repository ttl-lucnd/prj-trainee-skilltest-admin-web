'use client';

import { SubscriptionFilterForm } from '../components/subscription/SubscriptionFilterForm';
import { SubscriptionList } from '../components/subscription/SubscriptionList';

export function SubscriptionPage() {
  return (
    <>
      <SubscriptionFilterForm />
      <SubscriptionList />
    </>
  );
}
