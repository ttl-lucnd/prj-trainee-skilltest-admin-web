'use client';

import { LoadingCircleIcon } from '@/components/icons';
import { isJson, PageRouter } from '@/utils';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '../../services/auth.service';
import { setCredentials, setProfileData } from '@/utils/cookies';

const ACCESS_DENIED = 'access_denied';
const NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL =
  process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL;

export function GoogleLoginCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const login = async () => {
      const token = searchParams.get('code');
      const state = searchParams.get('state') ?? '';
      const error = searchParams.get('error') ?? '';
      const decodedState = isJson(atob(state)) ? JSON.parse(atob(state)) : {};
      const { redirectUri, ...rest } = decodedState;
      // handle redirect when cancel
      if (error === ACCESS_DENIED && redirectUri) {
        const redirectUrl = new URL(redirectUri);
        const callbackUri = redirectUrl.searchParams.get('callbackUri');
        if (callbackUri) {
          window.location.href = callbackUri;
          return;
        }
      }
      if (!token) {
        router.push(PageRouter.LOGIN);
        return;
      }

      if (redirectUri) {
        const _state = btoa(JSON.stringify({ ...rest }));
        const redirectUrl = new URL(redirectUri);
        const params = new URLSearchParams(redirectUrl.search);
        // Remove callbackUri parameter
        params.delete('callbackUri');
        // Add code parameter
        params.append('code', token);
        params.append('state', _state);

        // Create the new URL
        const newUrl = `${redirectUrl.origin}${
          redirectUrl.pathname
        }?${params.toString()}`;

        window.location.href = newUrl;
        return;
      }

      const response = await authService.login({
          token,
          redirectUri: NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL ?? '',
      });
      if (response?.success) {
        setCredentials({
          accessToken: response.data?.accessToken?.token,
          expiresIn: response.data?.accessToken?.expiresIn,
          refreshToken: response.data?.refreshToken?.token,
          refreshExpiresIn: response.data?.refreshToken?.expiresIn,
        });
        setProfileData(response.data?.profile, response.data?.refreshToken?.expiresIn);
        router.push(PageRouter.QUIZ_MANAGEMENT);
        return;
      }
      router.push(PageRouter.LOGIN);
    };
    login();
  }, []);
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <LoadingCircleIcon className="animate-spin" size={48} />
    </div>
  );
}
