import { test, expect } from '@playwright/test';
import { setupAuthenticatedSession } from '../helpers/auth-api-mock';

test('admin login: master admin can access admin accounts after login', async ({ page }) => {
  await setupAuthenticatedSession(page, 'super_admin');

  const state = encodeURIComponent(btoa(JSON.stringify({})));
  await page.goto(`/login/google-login-callback?code=e2e-master-code&state=${state}`);

  await page.waitForURL('**/quiz-management**');

  await page.goto('/admin-accounts');
  await page.waitForURL('**/admin-accounts**');

  const addAdminBtn = page.getByRole('button', { name: /管理者を追加/i });
  await expect(addAdminBtn).toBeVisible();
  await expect(addAdminBtn).toBeEnabled();
});