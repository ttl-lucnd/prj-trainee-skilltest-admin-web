import { test, expect } from '@playwright/test';

/**
 * Suite title is distinct from the file name (`login.spec.ts`) so the Playwright / Testing
 * tree shows a clear group label in the E2E tab.
 */
test.describe('Authentication — admin login (Google OAuth)', () => {
  test('login page shows app headings and an enabled Google sign-in control', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByRole('heading', { name: '技能実習検定' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '管理システム' })).toBeVisible();

    const googleLogin = page.getByRole('button', { name: /Googleメールでログイン/ });
    await expect(googleLogin).toBeVisible();
    await expect(googleLogin).toBeEnabled();
  });
});
