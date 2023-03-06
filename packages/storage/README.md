# @gattner/storage

Storage Utils for local and session storage.

Async Storage Utils for indexedDB.

## Use

### Sync Storage

```ts
import Store from '@gattner/storage'

const STORE_NAME = '__gattner__storage'
const STORE_TYPE = 'sessionStorage'
const CACHE_TIME = 60 * 1000 * 3

const store = new Store({
  item: {
    name: STORE_NAME,
    type: STORE_TYPE,
  },
})

export const update() {
  const { timestamp, data } = store.last() || {}
  const validCache =
    Date.now() - (typeof timestamp === 'number' ? timestamp : 0) < CACHE_TIME
  if (validCache) {
    return data
  } else {
    const data = await fetch()
    const timestamp = Date.now()
    store.add({ timestamp, data})
    return data
  }
}
```

### Async Storage

```ts
import { AsyncStore } from '@gattner/storage'

const STORE_NAME = '__gattner__async_storage'
const STORE_TYPE = 'indexedDB'
const store = new AsyncStore({
  item: {
    name: STORE_NAME,
    type: STORE_TYPE,
  },
})

export const async update() {
  let data = null
  let storageData = null

  try {
    await store.open()
    const value = (await store.last()) || null
    storageData = value.data
    await store.close()
  } catch (error) {
    console.error(error)
  }

  if (!storageData) {
    const fetchData = await fetch()
    await store.add(fetchData)
    data = fetchData
  } else {
    data = storageData
  }

  if (data) {
    try {
      validate<Data>(dataSchema, storageData)
      data = storageData as Data
    } catch (error) {
      console.log(error)
    }
  }

  return data
}
```
