import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: ['**/*.{spec,test}.{js,ts,mjs}', '**/dmin-login/**/*.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'https://admin-skilltest.tye-kick.com',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'yarn dev',
    url: 'https://admin-skilltest.tye-kick.com',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
