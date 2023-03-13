import { Client } from './client'

const resource = {
  en: {
    translation: {
      'music.listen.to': 'Listen to:',
    },
  },
  fr: {
    translation: {
      'music.listen.to': 'Écouter:',
    },
  },
  it: {
    translation: {
      'music.listen.to': 'Ascolta:',
    },
  },
}

describe('lib i18n client', () => {
  let client: Client | null

  beforeEach(() => {
    client = new Client({ resource })
  })
  afterEach(() => {
    client = null
  })

  test('client', () => {
    expect(typeof client === 'object').toBe(true)
    expect(client).not.toBeNull()
    expect(typeof client?.init === 'function').toBe(true)
    expect(typeof client?.t === 'function').toBe(true)
  })

  test('client init and translation', () => {
    client?.init('en')
    expect(client?.t('music.listen.to')).toEqual('Listen to:')
    expect(client?.t('music.listen.to.not.exist')).toEqual(
      'music.listen.to.not.exist'
    )

    expect(client?.t('music.listen.to', 'en')).toEqual('Listen to:')
    expect(client?.t('music.listen.to.not.exist', 'en')).toEqual(
      'music.listen.to.not.exist'
    )
    expect(client?.t('music.listen.to', 'de')).toEqual('Listen to:')
    expect(client?.t('music.listen.to', 'de', 'Hört gerade:')).toEqual(
      'Hört gerade:'
    )

    expect(client?.t('music.listen.to', 'en', 'Listen to fallback:')).toEqual(
      'Listen to:'
    )
    expect(
      client?.t('music.listen.to.not.exist', 'en', 'Listen to fallback:')
    ).toEqual('Listen to fallback:')

    expect(client?.t('music.listen.to', 'fr')).toEqual('Écouter:')
    expect(client?.t('music.listen.to', 'it')).toEqual('Ascolta:')
  })
})
