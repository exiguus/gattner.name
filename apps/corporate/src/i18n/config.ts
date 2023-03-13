import { Client } from '../lib/i18n/client'
import { i18n } from '../../data/content/i18n.json'

export const resource = {
  en: {
    translation: i18n.translation.en,
  },
}

export const client = new Client({ resource })
