import { IProfile } from '@/features/auth/interfaces';
import Cookies from 'js-cookie';

export enum COOKIES_KEY {
  ACCESS_TOKEN_COOKIE_NAME = 'accessToken',
  REFRESH_TOKEN_COOKIE_NAME = 'refreshToken',
  PROFILE_DATA_COOKIE_NAME = 'profile',
}

export function setProfileData(profile: IProfile, expiresIn: number) {
  Cookies.set(COOKIES_KEY.PROFILE_DATA_COOKIE_NAME, JSON.stringify(profile), {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresIn,
    path: '/',
  });
}

export function getProfileData() {
  try {
    const profile = Cookies.get(COOKIES_KEY.PROFILE_DATA_COOKIE_NAME);
    return profile ? JSON.parse(profile) : null;
  } catch {
    return null;
  }
}

export function setCredentials(credentials: {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
}) {
  const { accessToken, expiresIn, refreshToken, refreshExpiresIn } = credentials;
  Cookies.set(COOKIES_KEY.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: expiresIn,
    path: '/',
  });

  Cookies.set(COOKIES_KEY.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: refreshExpiresIn,
    path: '/',
  });
}

export function getCredential() {
  const accessToken = Cookies.get(COOKIES_KEY.ACCESS_TOKEN_COOKIE_NAME);
  const refreshToken = Cookies.get(COOKIES_KEY.REFRESH_TOKEN_COOKIE_NAME);
  return {
    accessToken,
    refreshToken,
  };
}

export function removeCredentials() {
  Cookies.remove(COOKIES_KEY.ACCESS_TOKEN_COOKIE_NAME);
  Cookies.remove(COOKIES_KEY.REFRESH_TOKEN_COOKIE_NAME);
}

export function removeAllCookies() {
  Object.values(COOKIES_KEY).forEach((key) => {
    Cookies.remove(key);
  });
}
