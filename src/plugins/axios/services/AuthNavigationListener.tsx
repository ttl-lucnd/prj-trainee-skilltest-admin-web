'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthEventType, PageRouter } from '@/utils';
import { removeCredentials } from '@/utils/cookies';

export const AuthNavigationListener = () => {
  const router = useRouter();

  useEffect(() => {
    const handleUnauthorized = () => {
      removeCredentials();
      router.replace(PageRouter.LOGIN);
    };

    // Add event listeners
    window.addEventListener(AuthEventType.UNAUTHORIZED, handleUnauthorized);

    // Cleanup
    return () => {
      window.removeEventListener(AuthEventType.UNAUTHORIZED, handleUnauthorized);
    };
  }, [router]);

  return <></>;
};
