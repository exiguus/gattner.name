import { getDocumentMeta } from './meta'

describe('meta', () => {
  describe('getDocumentMeta', () => {
    const metaSite = {
      origin: 'https://example.com',
      meta: null,
    }
    const metaPage = {
      title: 'Page title',
      meta: null,
    }

    test('merge', () => {
      const meta = getDocumentMeta(metaSite, metaPage)
      expect(typeof meta === 'object').toBe(true)
      expect(meta).toEqual({ ...metaSite, ...metaPage })
    })

    test('merge overwrite', () => {
      const metaSiteMeta = {
        name: {
          author: 'Full Name',
        },
      }
      const metaPageMeta = {
        name: {
          author: 'Other Full Name',
        },
      }

      expect(
        getDocumentMeta(
          { ...metaSite, ...{ meta: metaSiteMeta } },
          { ...metaPage, ...{ meta: metaPageMeta } }
        )
      ).toEqual({ ...metaSite, ...metaPage, ...{ meta: metaSiteMeta } })
      expect(
        getDocumentMeta(
          { ...metaPage, ...{ meta: metaPageMeta } },
          { ...metaSite, ...{ meta: metaSiteMeta } }
        )
      ).toEqual({ ...metaSite, ...metaPage, ...{ meta: metaPageMeta } })
    })

    test('sort', () => {
      const unsortedMeta = {
        title: 'Page title',
        meta: {
          name: {
            robots: 'nofollow, noindex',
            author: 'Full Name',
          },
          properties: {
            'og:url': 'http://example.com',
            'og:domain': 'example.com',
            'og:title': 'Page title',
            'og:description': 'Page description',
          },
        },
        origin: 'https://example.com',
      }
      const sortedMeta = {
        meta: {
          name: {
            author: 'Full Name',
            robots: 'nofollow, noindex',
          },
          properties: {
            'og:description': 'Page description',
            'og:domain': 'example.com',
            'og:title': 'Page title',
            'og:url': 'http://example.com',
          },
        },
        origin: 'https://example.com',
        title: 'Page title',
      }

      expect(getDocumentMeta(unsortedMeta)).toEqual(sortedMeta)
    })
  })
})
