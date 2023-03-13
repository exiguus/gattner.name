import { useContext } from 'react'
import { I18nContext } from '../providers/i18n'

export const useTranslate = () => useContext(I18nContext)
