'use client';

import MainLayoutWrapper from '@/layouts/MainLayout';
import { useGlobalStore } from '@/utils/globalStore';
import { useShallow } from 'zustand/react/shallow';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { PageRouter } from '@/utils';
import { getCredential } from '@/utils/cookies';

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { setCurrentPath } = useGlobalStore(
    useShallow((state) => ({
      setCurrentPath: state.setCurrentPath,
    })),
  );

  const pathname = usePathname();

  useEffect(() => {
    setCurrentPath(pathname);
    if (pathname !== PageRouter.LOGIN) {
      const refreshToken = getCredential().refreshToken;
      if (!refreshToken) {
        redirect(PageRouter.LOGIN);
      }
    }
  }, [pathname]);

  return <MainLayoutWrapper>
    {children}
    <Toaster/>
  </MainLayoutWrapper>;
}
