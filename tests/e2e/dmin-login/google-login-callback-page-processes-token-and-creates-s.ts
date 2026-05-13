import { test, expect } from '@playwright/test';
import { mockLoginSuccess } from '../helpers/auth-api-mock';

test('admin login: google login callback creates session and redirects', async ({ page }) => {
  await mockLoginSuccess(page, 'super_admin');

  const state = encodeURIComponent(btoa(JSON.stringify({})));
  await page.goto(`/login/google-login-callback?code=e2e-oauth-code&state=${state}`);

  await page.waitForURL('**/quiz-management**');
  await expect(page).toHaveURL(/\/quiz-management/);
});
