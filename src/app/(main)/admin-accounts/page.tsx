import { AdminAccountPage } from '@/features/admin-account/pages/AdminAccountPage';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '管理者一覧',
};

export default function Page() {
  return (
    <div className="w-full overflow-hidden flex flex-col">
      <main className="p-6 flex-1 flex flex-col gap-2.5">
        <Suspense fallback={<div>Loading...</div>}>
          <AdminAccountPage />
        </Suspense>
      </main>
    </div>
  );
}
