/**
 * @description handle localStorage and sessionStorage
 */

export const STORAGE_DEFAULT_NAME = '__gattner'
export const STORAGE_DEFAULT_TYPE = 'sessionStorage'

export type StorageItemName = string
export type StorageItemValue = Record<string, unknown>
export type StorageItemType = 'localStorage' | 'sessionStorage'
export type StorageItem = {
  item: { name: StorageItemName; type: StorageItemType }
}

export default class Storage {
  settings: StorageItem = {
    item: {
      name: STORAGE_DEFAULT_NAME,
      type: STORAGE_DEFAULT_TYPE,
    },
  }

  constructor(options: Partial<StorageItem>) {
    this.settings = {
      ...this.settings,
      ...options,
      item: {
        ...this.settings.item,
        ...options.item,
      },
    }
  }

  private getStorageItem = (name: StorageItemName) =>
    JSON.parse(window[this.settings.item.type].getItem(name) ?? '[]')
  private setStorageItem = (name: StorageItemName, value: StorageItemValue[]) =>
    window[this.settings.item.type].setItem(name, JSON.stringify(value ?? []))
  private removeStorageItem = (name: StorageItemName) =>
    window[this.settings.item.type].removeItem(name)

  pull() {
    return this.item
  }

  push(value: StorageItemValue[]) {
    this.item = value
  }

  clear() {
    this.removeStorageItem(this.settings.item.name)
  }

  get item() {
    return this.getStorageItem(this.settings.item.name)
  }

  set item(value: StorageItemValue[]) {
    this.setStorageItem(this.settings.item.name, value)
  }
}
