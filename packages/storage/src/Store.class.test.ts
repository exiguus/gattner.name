import Store from './Store.class'

describe('Store Class', () => {
  afterEach(() => {
    sessionStorage.clear()
    localStorage.clear()
  })

  test('create', () => {
    const store = new Store({ item: { name: '_test', type: 'sessionStorage' } })
    expect(typeof store === 'object').toBe(true)
    expect(typeof store.push === 'function').toBe(true)
    expect(typeof store.pull === 'function').toBe(true)
    expect(typeof store.last === 'function').toBe(true)
  })

  test('push', () => {
    const store = new Store({
      item: { name: '_test', type: 'sessionStorage' },
    })
    store.push({ test: 'test' })
    expect(store.pull()).toEqual([{ test: 'test' }])
  })

  test('pull', () => {
    const store = new Store({ item: { name: '_test', type: 'sessionStorage' } })
    expect(store.pull()).toEqual([])
    store.push({ test: 'test' })
    expect(store.pull()).toEqual([{ test: 'test' }])
    store.push({ test: 'test2' })
    store.pull()
    store.pull()
    expect(store.pull()).toEqual([{ test: 'test' }, { test: 'test2' }])
  })

  test('last', () => {
    const store = new Store({ item: { name: '_test', type: 'sessionStorage' } })
    store.push({ test: 'test' })
    store.push({ test: 'test2' })
    store.push({ test: 'test3' })
    expect(store.last()).toEqual({ test: 'test3' })
  })

  test('clear', () => {
    const store = new Store({ item: { name: '_test', type: 'sessionStorage' } })
    store.push({ test: 'test' })
    store.push({ test: 'test2' })
    store.push({ test: 'test3' })
    expect(store.pull()).toEqual([
      { test: 'test' },
      { test: 'test2' },
      { test: 'test3' },
    ])
    store.clear()
    expect(store.pull()).toEqual([])
    store.clear()
    expect(store.pull()).toEqual([])
  })

  test('type', () => {
    const storeSession = new Store({
      item: { name: '_test', type: 'sessionStorage' },
    })
    const storeLocal = new Store({
      item: { name: '_test', type: 'localStorage' },
    })
    storeSession.push({ test: 'test' })
    storeLocal.push({ test: 'test' })
    expect(storeSession.pull()).toEqual(storeLocal.pull())
    storeSession.push({ test: 'test2' })
    storeLocal.push({ test: 'test2' })
    expect(storeSession.last()).toEqual(storeLocal.last())
    storeSession.clear()
    storeLocal.clear()
    expect(storeSession.pull()).toEqual(storeLocal.pull())
  })
})
