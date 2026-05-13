import { test, expect } from '@playwright/test';

/**
 * Covers callback URL shapes that never call POST /admin/auth/login (see GoogleLoginCallbackPage).
 */
test.describe('Authentication — Google OAuth callback edges', () => {
  test('callback without authorization code redirects to login', async ({ page }) => {
    const state = encodeURIComponent(btoa(JSON.stringify({})));
    await page.goto(`/login/google-login-callback?state=${state}`);

    await expect(page).toHaveURL(/\/login$/);
  });
});
