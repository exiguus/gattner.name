import Api from '.'

describe('Api Class', () => {
  test('send', () => {
    const api = new Api()
    expect(api).toBeInstanceOf(Api)
    expect(api.send).toBeInstanceOf(Function)
  })
})
