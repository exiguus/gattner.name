import { fetchData } from '.'

describe('gitlab API contract', () => {
  test('save content and assets', async () => {
    const fetched = await fetchData()
      .then(() => true)
      .catch(() => false)
      .finally(() => false)

    await expect(fetched).toBe(true)
  }, 30000)
})
