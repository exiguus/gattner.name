import Store from '@gattner/storage'
import { isObject, hasOwnProperty } from '@gattner/utils'
import { getRandomColor, hex2rgba } from '../../styles/theme'
import { Theme } from '../../../types/Theme'
import { variables } from '../../styles/theme/variables'

const store = new Store({
  item: { name: '__gattner__darkMode', type: 'localStorage' },
})
type StoreItem = { timestamp: number; darkMode: boolean }

const storeItem = {
  darkMode:
    document.querySelector('html')?.getAttribute('data-dark-mode') === 'true',
  timestamp: Date.now(),
}

const isStoreItem = (item: unknown): item is StoreItem =>
  isObject(item) &&
  hasOwnProperty(item, 'timestamp') &&
  typeof item.timestamp === 'number' &&
  hasOwnProperty(item, 'darkMode') &&
  typeof item.darkMode === 'boolean'

export const updateTheme = (theme: Theme, darkMode: boolean): Theme => {
  const [backgroundHue, backgroundSaturation, backgroundAlpha] =
    getRandomColor()
  theme.application.color = darkMode
    ? hex2rgba(variables.BrandSecondary, 0.8)
    : hex2rgba(variables.BrandPrimary, 0.8)
  theme.application.backgroundColor = darkMode
    ? `hsl(${backgroundHue}, 90%, 5%, 0.8)`
    : `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha}, 0.5)`

  theme.application.backgroundAnimationColor = darkMode
    ? `hsl(${backgroundHue}, 90%, 5%)`
    : `hsl(${backgroundHue}, ${backgroundSaturation}, ${backgroundAlpha})`
  theme.application.highlightColor = `hsl(${getRandomColor()}, ${
    darkMode ? 0.2 : 0.4
  })`
  return theme
}

export const current = (): StoreItem => {
  const currentItem = store.last()
  console.log({ currentItem, storeItem })
  return isStoreItem(currentItem) ? currentItem : storeItem
}

export const prev = (item: StoreItem, newItem: StoreItem) => {
  store.push(newItem)
  const prevItem = store.last()
  console.log({ prevItem })
  return isStoreItem(prevItem) ? prevItem : item
}
