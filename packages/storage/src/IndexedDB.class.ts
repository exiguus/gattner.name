/**
 * @description handle indexedDB storage
 */

export const INDEXEDDB_DEFAULT_DATABASENAME = '__gattner'
export const INDEXEDDB_DEFAULT_STORENAME = '__store'
export const INDEXEDDB_DEFAULT_AUTOINCREMENT = true

export type StorageItemName = string | { db: string; store: string }
export type StorageItemValue = Array<string>
export type StorageItem = {
  item: { name: StorageItemName; autoIncrement?: boolean }
}

export class IndexedDBStorage {
  databaseName: string
  storeName: string
  db: IDBDatabase | null
  settings: StorageItem = {
    item: {
      name: {
        db: INDEXEDDB_DEFAULT_DATABASENAME,
        store: INDEXEDDB_DEFAULT_STORENAME,
      },
      autoIncrement: INDEXEDDB_DEFAULT_AUTOINCREMENT,
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
    this.databaseName =
      typeof this.settings.item.name === 'string'
        ? this.settings.item.name
        : this.settings.item.name.db
    this.storeName =
      typeof this.settings.item.name === 'string'
        ? this.settings.item.name
        : this.settings.item.name.store
    this.db = null
  }

  private getStorageItem = async (key?: IDBValidKey) => {
    const value = await this.getDB(key ?? 1)
    return JSON.parse(`${value}` ?? '[]')
  }

  private getLastStorageItem = async () => {
    const { value } = await this.openCurserDB(null, 'prev')
    return JSON.parse(`${value.value}` ?? '[]')
  }

  private setStorageItem = async (value: unknown, key?: IDBValidKey) => {
    await this.addDB(JSON.stringify(value ?? ''), key)
  }

  private removeStorageItem = async () => {
    await this.clearDB()
  }

  async open() {
    await this.openDB()
  }

  async close() {
    await this.closeDB()
  }

  async pull(key?: IDBValidKey) {
    return await this.getItem(key)
  }

  async pullLast() {
    return await this.getLastStorageItem()
  }

  async push(value: unknown, key?: IDBValidKey) {
    await this.setItem(
      value,
      this.settings.item.autoIncrement ? undefined : key
    )
  }

  async clear() {
    await this.removeStorageItem()
  }

  private async getItem(key?: IDBValidKey) {
    return await this.getStorageItem(
      this.settings.item.autoIncrement ? key : undefined
    )
  }

  private async setItem(value: unknown, key?: IDBValidKey) {
    await this.setStorageItem(value, key)
  }

  private openDB() {
    return new Promise((resolve, reject) => {
      // indexedDB works in the browser as well in the worker
      const request = indexedDB.open(this.databaseName)

      request.onerror = () => {
        reject('Error opening IndexedDB database')
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve('IndexedDB database opened successfully')
      }

      request.onupgradeneeded = event => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - event.target.result is IDBDatabase
        this.db = event.target?.result
        if (this.db === null) {
          reject('Error opening IndexedDB database')
        } else {
          this.db.createObjectStore(this.storeName, {
            keyPath: 'key',
            autoIncrement: this.settings.item.autoIncrement,
          })
        }
      }
    })
  }

  private closeDB() {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  private addDB(value: string, key?: IDBValidKey) {
    return new Promise((resolve, reject) => {
      if (this.db === null) {
        reject('No IndexedDB database open to add data to')
      } else {
        const transaction = this.db.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = key ? store.add({ value, key }) : store.add({ value })
        request.onerror = () => {
          reject(`Error adding data to IndexedDB: ${request.error}`)
        }
        request.onsuccess = () => {
          resolve('Data added to IndexedDB successfully')
        }
      }
    })
  }

  private getDB(query: IDBValidKey | IDBKeyRange): Promise<IDBRequest> {
    return new Promise((resolve, reject) => {
      if (this.db === null) {
        reject('No IndexedDB database open to get data from')
      } else {
        const transaction = this.db.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.get(query)

        request.onerror = () => {
          reject(`Error retrieving data from IndexedDB: ${request.error}`)
        }

        request.onsuccess = () => {
          if (request.result) {
            resolve(request.result)
          } else {
            reject('No data found with the specified ID')
          }
        }
      }
    })
  }

  private openCurserDB(
    query?: IDBValidKey | IDBKeyRange | null | undefined,
    direction?: IDBCursorDirection | undefined
  ): Promise<IDBCursorWithValue> {
    return new Promise((resolve, reject) => {
      if (this.db === null) {
        reject('No IndexedDB database open to get data from')
      } else {
        const transaction = this.db.transaction([this.storeName], 'readonly')
        const store = transaction.objectStore(this.storeName)
        const request = store.openCursor(query, direction)

        request.onerror = () => {
          reject(`Error retrieving data from IndexedDB: ${request.error}`)
        }

        request.onsuccess = () => {
          if (request.result) {
            resolve(request.result)
          } else {
            reject('No data found with the specified ID')
          }
        }
      }
    })
  }

  // private getAllDB() {
  //   return new Promise((resolve, reject) => {
  //     if (this.db === null) {
  //       reject('No IndexedDB database open to get data from')
  //     } else {
  //       const transaction = this.db.transaction([this.storeName], 'readonly')
  //       const store = transaction.objectStore(this.storeName)
  //       const request = store.getAll()

  //       request.onerror = () => {
  //         reject('Error retrieving data from IndexedDB')
  //       }

  //       request.onsuccess = () => {
  //         resolve(request.result)
  //       }
  //     }
  //   })
  // }

  // private getAllKeysDB() {
  //   return new Promise((resolve, reject) => {
  //     if (this.db === null) {
  //       reject('No IndexedDB database open to get keys from')
  //     } else {
  //       const transaction = this.db.transaction([this.storeName], 'readonly')
  //       const store = transaction.objectStore(this.storeName)
  //       const request = store.getAllKeys()

  //       request.onerror = () => {
  //         reject('Error retrieving keys from IndexedDB')
  //       }

  //       request.onsuccess = () => {
  //         resolve(request.result)
  //       }
  //     }
  //   })
  // }

  // private updateDB(value: StorageItemValue[], key?: IDBValidKey | undefined) {
  //   return new Promise((resolve, reject) => {
  //     if (this.db === null) {
  //       reject('No IndexedDB database open to update data in')
  //     } else {
  //       const transaction = this.db.transaction([this.storeName], 'readwrite')
  //       const store = transaction.objectStore(this.storeName)
  //       const request = store.put(value, key)

  //       request.onerror = () => {
  //         reject('Error updating data in IndexedDB')
  //       }

  //       request.onsuccess = () => {
  //         resolve('Data updated in IndexedDB successfully')
  //       }
  //     }
  //   })
  // }

  // private deleteDB(query: IDBValidKey | IDBKeyRange) {
  //   return new Promise((resolve, reject) => {
  //     if (this.db === null) {
  //       reject('No IndexedDB database open to delete data from')
  //     } else {
  //       const transaction = this.db.transaction([this.storeName], 'readwrite')
  //       const store = transaction.objectStore(this.storeName)
  //       const request = store.delete(query)

  //       request.onerror = () => {
  //         reject('Error deleting data from IndexedDB')
  //       }

  //       request.onsuccess = () => {
  //         resolve('Data deleted from IndexedDB successfully')
  //       }
  //     }
  //   })
  // }

  private clearDB() {
    return new Promise((resolve, reject) => {
      if (this.db === null) {
        reject('No IndexedDB database open to clear data from')
      } else {
        const transaction = this.db.transaction([this.storeName], 'readwrite')
        const store = transaction.objectStore(this.storeName)
        const request = store.clear()

        request.onerror = () => {
          reject('Error clearing data from IndexedDB')
        }

        request.onsuccess = () => {
          resolve('Data clear from IndexedDB successfully')
        }
      }
    })
  }
}
