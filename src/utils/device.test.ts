import { isTouch } from './device'

describe('Device', () => {
  describe('isTouch', () => {
    test('isTouch', () => {
      expect(isTouch()).toEqual(false)
    })

    test('isTouch use ontouchstart', () => {
      Object.defineProperty(global.window, 'ontouchstart', {
        value: null,
      })
      expect(isTouch()).toEqual(true)
    })

    test('isTouch use maxTouchPoints', () => {
      Object.defineProperty(global.navigator, 'maxTouchPoints', {
        value: 1,
      })
      expect(isTouch()).toEqual(true)
    })
  })
})
