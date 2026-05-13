import { Suspense } from 'react';
import { Metadata } from 'next';
import { SubscriptionPage } from '@/features/subscriptions/pages/SubscriptionPage';

export const metadata: Metadata = {
  title: '会員登録管理',
};

export default function Page() {
  return (
    <div className="w-full overflow-hidden flex flex-col bg-white">
      <main className="p-6 flex-1 flex flex-col gap-2.5">
        <Suspense fallback={<div>Loading...</div>}>
          <SubscriptionPage />
        </Suspense>
      </main>
    </div>
  );
}
