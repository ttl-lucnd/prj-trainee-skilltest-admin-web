import { test, expect } from '@playwright/test';

/**
 * Main app layout treats missing refresh token as unauthenticated and should not leave users on protected screens.
 */
test.describe('Authentication — protected routes', () => {
  test('quiz management redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/quiz-management');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: '技能実習検定' })).toBeVisible();
  });

  test('admin accounts redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/admin-accounts');
    console.log('test commit');
    
    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('heading', { name: '技能実習検定' })).toBeVisible();
  });
});
