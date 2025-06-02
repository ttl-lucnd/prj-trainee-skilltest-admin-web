import { VocabularyPage } from '@/features/vocabularies/pages/VocabularyPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className="w-full overflow-hidden flex flex-col bg-white">
      <main className="p-6 flex-1 flex flex-col gap-2.5">
        <Suspense fallback={<div>Loading...</div>}>
          <VocabularyPage />
        </Suspense>
      </main>
    </div>
  );
}
