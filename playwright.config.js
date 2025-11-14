// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Run all tests in parallel
  fullyParallel: true,

  // Fail build if .only is committed
  forbidOnly: !!process.env.CI,

  // Retry only in CI
  retries: process.env.CI ? 2 : 0,

  // Disable multiple workers in CI
  workers: process.env.CI ? 1 : undefined,

  // REPORTERS → HTML + Allure
    reporter: [
    ['list'],
    ['html', { outputFolder: 'html-report', open: 'never' }],
    ['allure-playwright']
  ],

  use: {
    // record useful data only on first retry
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  // Projects → Browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});
