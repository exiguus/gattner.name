export const isTouch = (): boolean =>
  'ontouchstart' in window || !!navigator.maxTouchPoints
