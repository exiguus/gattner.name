import React, { ElementType, FunctionComponent } from 'react'
import { useTheme } from 'styled-components'

import GithubIcon from '../../assets/github-alt.svg'
import TwitterIcon from '../../assets/twitter-alt.svg'
import SimonIcon from '../../assets/simon-alt.svg'
import SimonAltIcon from '../../assets/simon.svg'
import AnalysisIcon from '../../assets/analysis-alt.svg'
import EnvelopeIcon from '../../assets/envelope-alt.svg'

type IconNames =
  | 'github'
  | 'twitter'
  | 'simon'
  | 'simon-alt'
  | 'analysis'
  | 'envelope'

type Icons = {
  [x in IconNames | string]: ElementType
}

const icons: Icons = {
  github: GithubIcon,
  twitter: TwitterIcon,
  simon: SimonIcon,
  'simon-alt': SimonAltIcon,
  analysis: AnalysisIcon,
  envelope: EnvelopeIcon,
}

interface IconProps {
  type: string
  fill?: string
  stroke?: string
}

export const Icon: FunctionComponent<IconProps> = ({ type, fill, stroke }) => {
  const theme = useTheme()
  const I = type in icons ? icons[type] : icons.analysis
  return <I fill={fill || theme.link.color} stroke={stroke} />
}
