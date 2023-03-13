import { isObject } from '@gattner/utils'
import { test, expect } from '@playwright/test'
import app from '../data/content/app.json'

const { describe } = test

describe('Document Meta', async () => {
  const { routes, meta } = app
  const metaProperties = routes.map(({ name, path, title }) => ({
    path,
    name,
    title,
    meta: Object.values(meta)
      .filter(item => isObject(item))
      .map(item =>
        Object.entries(item).map(([key, value]) =>
          Object.entries(value).map(([attrValue, contentValue]) => ({
            key,
            attrValue,
            contentValue,
          }))
        )
      )
      .flat(3),
  }))

  await Promise.all(
    metaProperties.map(async ({ path, name, title, meta }) => {
      test(`Page ${name}`, async ({ page }) => {
        await page.goto(path)

        await expect(page).toHaveTitle(
          `${title ? `${title} - ` : ''}${app.meta.title}`
        )

        const locator = await page.locator(`meta[name="description"]`)
        await expect(locator).toHaveAttribute(
          'content',
          `${app.meta.description}`
        )

        await Promise.all(
          meta.map(async ({ key, attrValue, contentValue }) => {
            const locator = await page.locator(`meta[${key}="${attrValue}"]`)
            await expect(locator).toHaveAttribute('content', `${contentValue}`)
          })
        )
      })
    })
  )
})
