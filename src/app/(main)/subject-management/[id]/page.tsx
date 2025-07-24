import { Suspense } from 'react';
import { PackagePage } from '@/features/subjects/pages/PackagePage';

export default function Page() {
  return (
    <div className="w-full overflow-hidden flex flex-col bg-white">
      <main className="p-6 flex-1 flex flex-col gap-2.5">
        <Suspense fallback={<div>Loading...</div>}>
          <PackagePage />
        </Suspense>
      </main>
    </div>
  );
}
