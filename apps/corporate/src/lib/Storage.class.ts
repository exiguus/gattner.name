/**
 * @description handle storage
 */

export const DEFAULT_NAME = '__gattner'
export const DEFAULT_TYPE = 'sessionStorage'

export type ItemName = string
export type ItemValue = Record<string, unknown>
export type ItemType = 'localStorage' | 'sessionStorage'
export type Item = { item: { name: ItemName; type: ItemType } }

export default class Storage {
  settings: Item = {
    item: {
      name: DEFAULT_NAME,
      type: DEFAULT_TYPE,
    },
  }

  constructor(options: Partial<Item>) {
    this.settings = {
      ...this.settings,
      ...options,
      item: {
        ...this.settings.item,
        ...options.item,
      },
    }
  }

  getItem = (name: ItemName) =>
    JSON.parse(window[this.settings.item.type].getItem(name) ?? '[]')
  setItem = (name: ItemName, value: ItemValue[]) =>
    window[this.settings.item.type].setItem(name, JSON.stringify(value ?? []))
  removeItem = (name: ItemName) =>
    window[this.settings.item.type].removeItem(name)

  pull() {
    return this.item
  }

  push(value: ItemValue[]) {
    this.item = value
  }

  get item() {
    return this.getItem(this.settings.item.name)
  }

  set item(value: ItemValue[]) {
    this.setItem(this.settings.item.name, value)
  }
}
