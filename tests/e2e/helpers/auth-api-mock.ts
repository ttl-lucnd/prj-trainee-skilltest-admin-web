import type { Page } from '@playwright/test';

/** JSON body shape before axios response interceptors add `success` for 2xx responses. */
function jsonBody(body: unknown) {
  return JSON.stringify(body);
}

function loginProfile(role: 'super_admin' | 'admin') {
  const now = new Date().toISOString();
  return {
    id: 1,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    createdBy: null,
    updatedBy: null,
    deletedBy: null,
    iamUserId: 1,
    name: 'E2E Admin',
    role,
    status: 'active',
    allowedIps: [] as string[],
  };
}

function tokenStub(label: string) {
  const future = new Date(Date.now() + 86400000).toISOString();
  return {
    token: `e2e-${label}-token`,
    expiresIn: 1,
    expiredAt: future,
  };
}

function adminAccountProfile(role: 'super_admin' | 'admin') {
  const now = new Date().toISOString();
  return {
    id: '1',
    createdAt: now,
    createdBy: 1,
    updatedAt: now,
    updatedBy: 1,
    name: 'E2E Admin',
    email: 'e2e-admin@example.com',
    role,
  };
}

/**
 * Mocks GET admin/auth/google-login-url so the login button can redirect without a real backend.
 */
export async function mockGoogleLoginUrl(page: Page, loginUrl: string) {
  await page.route('**/admin/auth/google-login-url**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: jsonBody({
        code: 200,
        message: 'OK',
        data: { loginUrl },
      }),
    });
  });
}

/**
 * Mocks POST admin/auth/login with a successful session payload (cookies set client-side).
 */
export async function mockLoginSuccess(page: Page, role: 'super_admin' | 'admin' = 'super_admin') {
  await page.route('**/admin/auth/login', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: jsonBody({
        code: 200,
        message: 'OK',
        data: {
          profile: loginProfile(role),
          accessToken: tokenStub('access'),
          refreshToken: tokenStub('refresh'),
        },
      }),
    });
  });
}

/**
 * Mocks POST admin/auth/login with 401 so the callback page sends back to /login.
 */
export async function mockLoginFailure(page: Page) {
  await page.route('**/admin/auth/login', async (route) => {
    if (route.request().method() !== 'POST') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 401,
      contentType: 'application/json',
      body: jsonBody({
        success: false,
        message: 'Invalid or expired token',
        code: 401,
      }),
    });
  });
}

export async function mockAuthProfile(page: Page, role: 'super_admin' | 'admin' = 'super_admin') {
  await page.route('**/admin/auth/profile*', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: jsonBody({
        code: 200,
        message: 'OK',
        data: {
          profile: adminAccountProfile(role),
        },
      }),
    });
  });
}

export async function mockAdminAccountList(page: Page) {
  await page.route('**/admin/admin-account**', async (route) => {
    if (route.request().method() !== 'GET') {
      await route.continue();
      return;
    }
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: jsonBody({
        code: 200,
        message: 'OK',
        data: {
          items: [],
          totalItems: 0,
        },
      }),
    });
  });
}

/** Routes needed to finish OAuth callback and open admin account screens without a real API. */
export async function setupAuthenticatedSession(
  page: Page,
  role: 'super_admin' | 'admin' = 'super_admin',
) {
  await mockLoginSuccess(page, role);
  await mockAuthProfile(page, role);
  await mockAdminAccountList(page);
}
