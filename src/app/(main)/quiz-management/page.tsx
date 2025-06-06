import { QuestionsPage } from '@/features/questions/pages/QuestionsPage';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '質問一覧',
};

export default function Page() {
  return (
    <div className="w-full overflow-hidden flex flex-col bg-white">
      <main className="p-6 flex-1 flex flex-col gap-2.5">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionsPage />
        </Suspense>
      </main>
    </div>
  );
}
