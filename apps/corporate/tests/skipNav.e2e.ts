import { test, expect } from '@playwright/test'
import { skipNav } from '../data/content/page.json'

const { describe } = test

describe('Skip Navigation', () => {
  test('tab visible focus', async ({ page }) => {
    await page.goto('/')

    await page.keyboard.press('Tab')
    const locator = page.getByTestId(`skip-nav-${skipNav.nav.list[0].id}`)
    await expect(locator).toBeFocused()
    await expect(locator).toBeVisible()
  })

  test('available', async ({ page }) => {
    await page.goto('/')

    await Promise.all(
      skipNav.nav.list.map(async ({ id, text }) => {
        await expect(page.getByTestId(`skip-nav-${id}`)).toHaveText(text)
        await expect(page.getByTestId(`skip-nav-${id}`)).toHaveAttribute(
          'href',
          `#${id}`
        )
        await expect(page.getByTestId(`skip-nav-${id}`)).toHaveAttribute(
          'tabindex',
          '0'
        )
      })
    )
  })
})
