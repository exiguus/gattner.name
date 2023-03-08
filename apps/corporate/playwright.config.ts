import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'
import { config } from '../../playwright.config'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config()

const webServer =
  process.env.E2E_TEST_USE_LOCAL_SERVER === 'true'
    ? {
        command: 'pnpx http-server dist',
        port: 8080,
      }
    : undefined
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...config,
  testDir: './tests',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    ...config.use,
    baseURL: process.env.E2E_TEST_BASE_URL,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  ],

  webServer,
})
