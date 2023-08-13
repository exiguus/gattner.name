export enum TextSizes {
  'sm' = '0.75rem',
  'md' = '1rem',
  'lg' = '1.25rem',
  'xl' = '1.5rem',
}

export type TextSize = keyof typeof TextSizes

export const textSizes = Object.keys(TextSizes) as TextSize[]

export enum TextWeights {
  'thin' = 100,
  'extralight' = 200,
  'light' = 300,
  'normal' = 400,
  'medium' = 500,
  'semibold' = 600,
  'bold' = 700,
  'extrabold' = 800,
  'black' = 900,
}

export type TextWeight = keyof typeof TextWeights

export const textWeights = Object.keys(TextWeights) as TextWeight[]

export enum TextAligns {
  'left' = 'left',
  'center' = 'center',
  'right' = 'right',
}

export type TextAlign = keyof typeof TextAligns

export const textAligns = Object.keys(TextAligns) as TextAlign[]
