import { GoogleLoginCallbackPage } from '@/features/auth/login/pages/GoogleLoginCallbackPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <GoogleLoginCallbackPage />
    </Suspense>
  );
}
