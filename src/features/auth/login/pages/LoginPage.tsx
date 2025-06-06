'use client';

import { Button } from '@/components/ui/button';
import { PageRouter } from '@/utils';
import { useTranslations } from 'next-intl';
import { authService } from '../../services/auth.service';
import qs from 'qs';
import { useState } from 'react';
import Image from 'next/image';

const NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL;

export function LoginPage() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    const callbackUri = `${window.location.origin}${PageRouter.LOGIN}`;
    const redirectUri = `${window.location.origin}${
      PageRouter.GOOGLE_LOGIN_CALLBACK
    }?${qs.stringify({ callbackUri })}`;
    setLoading(true);
    const response = await authService.getGoogleLoginUrl(
      NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL ?? '',
      btoa(
        JSON.stringify({
          redirectUri,
        }),
      ),
    );

    if (response.success) {
      window.location.href = response.data.loginUrl;
    } else {
      setLoading(false);
    }
  };

  return (
    <main className="bg-primary-2 flex min-h-screen flex-col items-center justify-center p-24 text-white gap-2">
      <h2 className="font-bold">{t('login.appName')}</h2>
      <h2 className="font-bold">{t('login.adminScreen')}</h2>
      <Button
        className="mt-[20px] w-[300px] text-[#1C77C3] hover:text-primary-2 gap-[15px] justify-start font-[400]"
        size="xl"
        variant={'outline'}
        disabled={loading}
        onClick={handleLoginWithGoogle}
      >
        <Image
          className='ml-[10px]'
          src="/google-icon.png"
          alt="google-icon"
          width={45}
          height={45}
        />
        {t('login.loginWithGoogle')}
      </Button>
    </main>
  );
}
