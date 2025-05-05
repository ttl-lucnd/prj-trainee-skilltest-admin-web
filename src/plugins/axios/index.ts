import dayjs from '@/plugins/dayjs';
import { AuthEventType, HeaderKey, HttpStatus, isJson, SupportLanguage } from '@/utils';
import { getCredential } from '@/utils/cookies';
import { IBodyResponse } from '@/utils/interfaces';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { checkAccessTokenExpireTime } from './services/authenticationHelpers';

export const options: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  } as unknown as AxiosRequestHeaders,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  responseType: 'json',
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.request.use(async (config) => {
  await checkAccessTokenExpireTime();
  const { accessToken } = getCredential();

  Object.assign(config, {
    headers: {
      [HeaderKey.TIME_ZONE]: dayjs().format('Z'),
      [HeaderKey.TIME_ZONE_NAME]: dayjs.tz.guess(),
      [HeaderKey.ACCEPT_LANGUAGE]: SupportLanguage.JA,
      [HeaderKey.CONTENT_TYPE]: 'application/json',
      [HeaderKey.AUTHORIZATION]: `Bearer ${accessToken}`,
      ...config.headers,
    },
  });
  return config;
});

const handleNetworkError = (error: any) => ({
  ...(error?.request?.data || {}),
  success: false,
  isRequestError: true,
  message: 'Network error, please try again later',
  code: HttpStatus.NETWORK_ERROR,
});

const handleResponseError = (error: any) => {
  if (error.response.status === HttpStatus.UNAUTHORIZED) {
    const unauthorizedEvent = new CustomEvent(AuthEventType.UNAUTHORIZED);
    window.dispatchEvent(unauthorizedEvent);
  }

  const parsedData =
    typeof error?.response?.data === 'string'
      ? JSON.parse(error.response.data)
      : error?.response?.data;

  return {
    code: error?.response?.status,
    ...(parsedData || {}),
    success: false,
  };
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof response?.data === 'string') {
      response.data = isJson(response.data) ? JSON.parse(response.data) : null;
    }
    response.data.success = true;
    return response.data;
  },
  async (error) => {
    // Skip error handling for logout API
    if (error.config?.url?.includes('/logout')) {
      return {
        success: false,
        message: error.response.data?.message || 'Logout failed',
        code: error.response.status,
      };
    }
    if (error.code === 'ERR_NETWORK') {
      return handleNetworkError(error);
    }
    if (error.response) {
      return handleResponseError(error) as IBodyResponse<unknown>;
    }
    return {
      success: false,
      message: 'System error, please try again later',
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  },
);

export default axiosInstance;
