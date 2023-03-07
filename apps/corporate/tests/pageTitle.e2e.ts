import { isObject } from '@gattner/utils'
import { test, expect } from '@playwright/test'
import app from '../data/content/app.json'

const { describe } = test

describe('Page Meta', () => {
  const { routes, meta } = app
  routes.forEach(({ name, path, title: routeTitle }) => {
    Object.values(meta)
      .filter(item => isObject(item))
      .forEach(item => {
        Object.entries(item).forEach(([key, value]) => {
          Object.entries(value).forEach(([attrValue, contentValue]) => {
            test(`${name} has correct <meta ${key}="${attrValue}" />`, async ({
              page,
            }) => {
              await page.goto(path)

              const locator = await page.locator(`meta[${key}="${attrValue}"]`)
              await expect(locator).toHaveAttribute(
                'content',
                `${contentValue}`
              )
            })
          })
        })
      })

    Object.entries(meta)
      .filter(([, value]) => typeof value === 'string')
      .forEach(([key, value]) => {
        if (key === 'title') {
          test(`${name} has correct <${key}/>`, async ({ page }) => {
            await page.goto(path)

            // Expect a title "to contain" a substring.
            await expect(page).toHaveTitle(
              `${routeTitle ? `${routeTitle} - ` : ''}${value}`
            )
          })
        } else {
          test(`${name} has correct <meta name="${key}" />`, async ({
            page,
          }) => {
            await page.goto(path)

            const locator = await page.locator(`meta[name=${key}]`)
            await expect(locator).toHaveAttribute('content', `${value}`)
          })
        }
      })
  })
})
