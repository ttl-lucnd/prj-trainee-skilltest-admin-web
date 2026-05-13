import { test, expect } from '@playwright/test';
import { mockGoogleLoginUrl } from '../helpers/auth-api-mock';

test('admin login: clicking Google button uses full-page redirect to Google OAuth URL', async ({ page }) => {
  const loginUrl = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=e2e-test';
  await mockGoogleLoginUrl(page, loginUrl);

  await page.goto('/login');
  const googleBtn = page.getByRole('button', { name: /Googleメールでログイン/i });

  await Promise.all([page.waitForURL(/accounts\.google\.com/i), googleBtn.click()]);

  expect(page.url()).toMatch(/accounts\.google\.com/i);
});
