import Storage, {
  Item,
  ItemValue,
  DEFAULT_NAME,
  DEFAULT_TYPE,
} from './Storage.class'

/**
 * @description handle store state
 */

export const MAX_ITEMS = 256

export default class Store {
  settings: Item = { item: { name: DEFAULT_NAME, type: DEFAULT_TYPE } }
  storage: Storage | null = null

  constructor(options: Partial<Item>) {
    this.settings = {
      ...this.settings,
      ...options,
      item: {
        ...this.settings.item,
        ...options.item,
      },
    }

    this.storage = new Storage({ item: this.settings.item })
  }

  push(value: ItemValue) {
    this.store = [value]
  }

  pull() {
    return this.store
  }

  last() {
    return this.store[this.store.length - 1]
  }

  set store(value: ItemValue[]) {
    if (this.storage != null) {
      const items = this.storage.pull()
      this.storage.push([
        ...(items.length >= MAX_ITEMS ? items.slice(1) : items),
        ...value,
      ])
    }
  }

  get store(): ItemValue[] | [] {
    return this.storage != null ? this.storage.pull() : []
  }
}
