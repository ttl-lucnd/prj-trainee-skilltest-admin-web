import { test, expect } from '@playwright/test';

test('admin login UI: system name + Google button', async ({ page }) => {
  await page.goto('/login');

  // Matches src/i18n/ja/login.json (locale SupportLanguage.JA)
  await expect(page.getByRole('heading', { name: '技能実習検定', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: '管理システム', exact: true })).toBeVisible();

  const googleBtn = page.getByRole('button', { name: /Googleメールでログイン/i });
  await expect(googleBtn).toBeVisible();
  await expect(googleBtn).toBeEnabled();

  const emailInputs = page.locator('input[type="email"], input[name*="email" i], input[aria-label*="email" i]');
  const passwordInputs = page.locator('input[type="password"], input[name*="password" i], input[aria-label*="password" i]');
  await expect(emailInputs).toHaveCount(0);
  await expect(passwordInputs).toHaveCount(0);
});
