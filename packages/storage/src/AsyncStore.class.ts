import { IndexedDBStorage, StorageItemValue } from './IndexedDB.class'

/**
 * @description handle async store state
 */

export const MAX_ITEMS = 256
export const DEFAULT_NAME = '__gattner'
export const DEFAULT_TYPE = 'indexedDB'

export type Item = {
  item: { name: string; type: 'indexedDB' }
}
export type ItemValue = StorageItemValue

export default class AsyncStore {
  settings: Item = { item: { name: DEFAULT_NAME, type: DEFAULT_TYPE } }
  storage: IndexedDBStorage | null = null

  constructor(options: Partial<Item>) {
    this.settings = {
      ...this.settings,
      ...options,
      item: {
        ...this.settings.item,
        ...options.item,
      },
    }

    this.storage =
      this.settings.item.type === 'indexedDB'
        ? new IndexedDBStorage({
            item: { name: this.settings.item.name },
          })
        : null
  }

  async open() {
    await this.storage?.open()
  }

  async close() {
    await this.storage?.close()
  }

  async push(value: unknown) {
    await this.setStore(value ?? '')
  }

  async pull() {
    return await this.getStore()
  }

  async last() {
    const value = await this.getLastStore()
    return value[value.length - 1]
  }

  async clear() {
    if (this.storage != null) {
      await this.storage.clear()
    }
  }

  async setStore(value: unknown) {
    if (this.storage != null) {
      // const items = (await this.storage.pull()) || []
      // await this.storage.push([
      //   ...(items.length >= MAX_ITEMS ? items.slice(1) : items),
      //   ...value,
      // ])
      await this.storage.push(value)
    }
  }

  async getStore(): Promise<ItemValue[] | []> {
    return this.storage != null ? await this.storage.pull() : []
  }

  async getLastStore(): Promise<ItemValue[] | []> {
    return this.storage != null ? await this.storage.pullLast() : []
  }
}
