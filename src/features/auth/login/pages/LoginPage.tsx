'use client';

import { LightBulbIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PageRouter } from '@/utils';
import { useTranslations } from 'next-intl';
import { authService } from '../../services/auth.service';
import qs from 'qs';
import { useState } from 'react';

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
    <main className="bg-white flex min-h-screen flex-col items-center justify-center p-24">
      <LightBulbIcon />
      <h3 className="font-bold">{t('login.appName')}</h3>
      <h3 className="font-bold">{t('login.adminScreen')}</h3>
      <Button
        className="mt-[50px] w-[345px]"
        size="xl"
        disabled={loading}
        onClick={handleLoginWithGoogle}
        loading={loading}
      >
        {t('login.loginWithGoogle')}
      </Button>
    </main>
  );
}
