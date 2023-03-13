const isTranslation = (value: unknown): value is string =>
  value != null && typeof value === 'string'

export type LANG = string

export class Client {
  private translations: LANG[] = []
  private translation: Record<string, string> = {}
  private resource: Record<LANG, { translation: Record<string, string> }>
  private lang: LANG = ''

  constructor({
    resource,
  }: {
    resource: Record<LANG, { translation: Record<string, string> }>
  }) {
    this.translations = Object.keys(resource)
    this.resource = resource
  }

  init = (lang: LANG) => {
    this.lang = lang
    this.translation = this.translations.includes(lang)
      ? this.resource[lang].translation
      : this.resource[this.translations[0]].translation
  }

  t = (key: string, lang?: string, fallback?: string): string => {
    const oldLang = this.lang
    if (lang) {
      if (this.translations.includes(lang)) {
        this.init(lang)
      } else {
        if (fallback) {
          return fallback
        }
      }
    }

    const translation = isTranslation(this.translation?.[key])
      ? `${this.translation?.[key]}`
      : fallback || key

    if (oldLang !== this.lang) {
      this.init(oldLang)
    }
    return translation
  }
}
