'use client';

import MainLayoutWrapper from '@/layouts/MainLayout';
import { useGlobalStore } from '@/utils/globalStore';
import { useShallow } from 'zustand/react/shallow';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';

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
  }, [pathname]);

  return <MainLayoutWrapper>
    {children}
    <Toaster/>
  </MainLayoutWrapper>;
}
