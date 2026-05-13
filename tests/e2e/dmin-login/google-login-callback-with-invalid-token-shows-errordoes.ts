import { test, expect } from '@playwright/test';
import { mockLoginFailure } from '../helpers/auth-api-mock';

test('admin login: google login callback invalid token does not authenticate', async ({ page }) => {
  await mockLoginFailure(page);

  const state = encodeURIComponent(btoa(JSON.stringify({})));
  await page.goto(`/login/google-login-callback?code=invalid-code&state=${state}`);

  await page.waitForURL(/\/login$/);
  await expect(page).toHaveURL(/\/login$/);
});
