import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoginPage } from '@/features/auth/login/pages/LoginPage';
import { PageRouter } from '@/utils';
import { authService } from '@/features/auth/services/auth.service';
import qs from 'qs';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === 'string' ? src : ''} alt={alt ?? ''} {...props} />
  ),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      'login.appName': '技能実習検定',
      'login.adminScreen': '管理システム',
      'login.loginWithGoogle': 'Googleメールでログイン',
    })[key] ?? key,
}));

const mockGetGoogleLoginUrl = jest.spyOn(authService, 'getGoogleLoginUrl');

function mockGoogleUrlResponse(override: {
  success: boolean;
  data: { loginUrl: string };
  code: number;
}) {
  return override as unknown as Awaited<ReturnType<typeof authService.getGoogleLoginUrl>>;
}

describe('LoginPage', () => {
  /** Fake page origin for unit tests (no dev server required). Must match mocked `window.location.origin`. */
  const TEST_PAGE_ORIGIN = 'https://admin-skilltest.tye-kick.com';

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { origin: TEST_PAGE_ORIGIN, href: '' },
      writable: true,
    });
  });

  it('hiển thị tên ứng dụng và nhãn màn hình quản trị theo i18n (login.appName, login.adminScreen)', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: '技能実習検定' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '管理システム' })).toBeInTheDocument();
  });

  it('hiển thị nút đăng nhập Google (login.loginWithGoogle)', () => {
    render(<LoginPage />);
    
    expect(
      screen.getByRole('button', { name: /Googleメールでログイン/i }),
    ).toBeInTheDocument();
  });

  it('khi bấm đăng nhập Google, gọi getGoogleLoginUrl với redirectUri và state (base64 JSON) đúng format', async () => {
    mockGetGoogleLoginUrl.mockResolvedValue(
      mockGoogleUrlResponse({
        success: true,
        data: { loginUrl: 'https://accounts.google.com/o/oauth2' },
        code: 200,
      }),
    );

    render(<LoginPage />);

    fireEvent.click(screen.getByRole('button', { name: /Googleメールでログイン/i }));

    await waitFor(() => {
      expect(mockGetGoogleLoginUrl).toHaveBeenCalledTimes(1);
    });

    const expectedCallbackUri = `${TEST_PAGE_ORIGIN}${PageRouter.LOGIN}`;
    const expectedRedirectUri = `${TEST_PAGE_ORIGIN}${PageRouter.GOOGLE_LOGIN_CALLBACK}?${qs.stringify({ callbackUri: expectedCallbackUri })}`;
    const expectedState = btoa(JSON.stringify({ redirectUri: expectedRedirectUri }));

    const googleCallbackEnv =
      process.env.NEXT_PUBLIC_GOOGLE_LOGIN_CALLBACK_URL ?? '';

    expect(mockGetGoogleLoginUrl).toHaveBeenCalledWith(googleCallbackEnv, expectedState);
  });

  it('khi getGoogleLoginUrl thành công, chuyển hướng tới loginUrl', async () => {
    const loginUrl = 'https://accounts.google.com/authorize?client=test';
    mockGetGoogleLoginUrl.mockResolvedValue(
      mockGoogleUrlResponse({
        success: true,
        data: { loginUrl },
        code: 200,
      }),
    );

    render(<LoginPage />);

    fireEvent.click(screen.getByRole('button', { name: /Googleメールでログイン/i }));

    await waitFor(() => {
      expect(window.location.href).toBe(loginUrl);
    });
  });

  it('khi getGoogleLoginUrl thất bại, không đổi location; nút có thể bấm lại', async () => {
    mockGetGoogleLoginUrl.mockResolvedValue(
      mockGoogleUrlResponse({
        success: false,
        data: { loginUrl: '' },
        code: 400,
      }),
    );

    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /Googleメールでログイン/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(mockGetGoogleLoginUrl).toHaveBeenCalled();
    });

    expect(window.location.href).toBe('');

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it('trong lúc chờ URL Google, nút đăng nhập bị vô hiệu hóa; sau phản hồi lỗi thì bật lại', async () => {
    let resolvePromise!: (value: ReturnType<typeof mockGoogleUrlResponse>) => void;
    const pending = new Promise<ReturnType<typeof mockGoogleUrlResponse>>((resolve) => {
      resolvePromise = resolve;
    });
    mockGetGoogleLoginUrl.mockReturnValue(pending as never);

    render(<LoginPage />);

    const button = screen.getByRole('button', { name: /Googleメールでログイン/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    resolvePromise(
      mockGoogleUrlResponse({
        success: false,
        data: { loginUrl: '' },
        code: 400,
      }),
    );

    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});
