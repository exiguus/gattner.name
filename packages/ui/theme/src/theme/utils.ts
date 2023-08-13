import { getRandomInt } from '@gattner/utils'
import { variables } from './variables'

export const rem = ({
  px,
  base = variables.FontSize,
}: {
  px: number
  base?: number
}): string => {
  return `${px / base}rem`
}

export const hex2rgba = (hex: string, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16)

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
}

// HSL
// S (saturation) and L (lightness) are percentages. 100% saturation is completely saturated, while 0% is completely unsaturated (gray). 100% lightness is white, 0% lightness is black, and 50% lightness is “normal.”
// A (alpha) can be a <number> between 0 and 1, or a <percentage>, where the number 1 corresponds to 100% (full opacity).
// H (hue) see: https://drafts.csswg.org/css-color/#the-hsl-notation
const getRandomHSLColor = (saturation = '20%', alpha = '80%') => {
  const hue = `${getRandomInt(0, 360)}deg`
  return [hue, saturation, alpha]
}

const getRandomHSLColors = (count = 99, saturation = '20%', alpha = '80%') => {
  const colors: Array<string[]> = []
  for (let i = 0; i < count; i++) {
    colors.push(getRandomHSLColor(saturation, alpha))
  }
  return colors
}

export function getRandomColor(): [string, string, string] {
  const colors = getRandomHSLColors()
  const max = colors.length - 1
  const min = 0
  const [hue, saturation, alpha] = colors[getRandomInt(min, max)]
  return [hue, saturation, alpha]
}
