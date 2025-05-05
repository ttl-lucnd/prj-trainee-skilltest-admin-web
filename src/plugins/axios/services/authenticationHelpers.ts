import axios from 'axios';
import { throttle } from 'lodash';

import { options } from '@/plugins/axios';
import { AuthEventType, HeaderKey } from '@/utils/constants';
import { getCredential, removeCredentials, setCredentials } from '@/utils/cookies';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

const REFRESH_TOKEN_TIME_BUFFER_IN_SECOND = 90;

interface IDecodeToken {
  email: string;
  exp: number;
  expiresIn: number;
  iat: number;
  id: string;
  name: string;
}

export const getRefreshToken = async () => {
  const { refreshToken } = getCredential();
  try {
    const api = axios.create(options);
    const response = await api.post(
      'admin/auth/refresh-token',
      {},
      {
        headers: {
          [HeaderKey.AUTHORIZATION]: `Bearer ${refreshToken}`,
        },
      },
    );
    const responseData = response.data;
    if (responseData?.success) {
      const data = responseData?.data;
      setCredentials({
        accessToken: data?.accessToken?.token,
        expiresIn: data?.accessToken?.expiresIn,
        refreshToken: data?.refreshToken?.token,
        refreshExpiresIn: data?.refreshToken?.expiresIn,
      });
    } else {
      removeCredentials();
      // Dispatch unauthorized event
      const unauthorizedEvent = new CustomEvent(AuthEventType.UNAUTHORIZED);
      window.dispatchEvent(unauthorizedEvent);
    }
  } catch {
    removeCredentials();
  }
};

export const refreshTokenThrottled = throttle(getRefreshToken, 10000, {
  trailing: false,
});

export const checkAccessToken = (withRefresh = true) => {
  const { accessToken } = getCredential();
  if (!accessToken) {
    removeCredentials();
    return false;
  }

  const decodeAccessToken: IDecodeToken = jwtDecode(accessToken);
  if (withRefresh) {
    return (
      dayjs(decodeAccessToken.exp * 1000).diff(dayjs(), 'second') <
      REFRESH_TOKEN_TIME_BUFFER_IN_SECOND
    );
  }
  return dayjs(decodeAccessToken.exp * 1000).isBefore(dayjs());
};

export const checkAccessTokenExpireTime = async () => {
  const isExpireTime = checkAccessToken();
  if (isExpireTime) {
    await refreshTokenThrottled();
  }
};
