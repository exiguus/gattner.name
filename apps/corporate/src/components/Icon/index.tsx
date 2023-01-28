import React, { ElementType, FunctionComponent } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Icon as IconName } from '../../../schemas'

import GithubIcon from '../../assets/github-alt.svg'
import TwitterIcon from '../../assets/twitter-alt.svg'
import SimonIcon from '../../assets/simon-alt.svg'
import SimonAltIcon from '../../assets/simon.svg'
import AnalysisIcon from '../../assets/analysis-alt.svg'
import EnvelopeIcon from '../../assets/envelope-alt.svg'
import ForkIcon from '../../assets/fork-alt.svg'

type Icons = {
  [x in IconName]: ElementType
}

const icons: Icons = {
  github: GithubIcon,
  twitter: TwitterIcon,
  simon: SimonIcon,
  'simon-alt': SimonAltIcon,
  analysis: AnalysisIcon,
  envelope: EnvelopeIcon,
  fork: ForkIcon,
}

interface IconProps {
  type: string
  fill?: string
  stroke?: string
}

export const Icon: FunctionComponent<IconProps> = ({ type, fill, stroke }) => {
  const { theme } = useTheme()
  const I = type in icons ? icons[type as IconName] : icons.analysis
  return (
    <I
      fill={fill || theme.application.color}
      stroke={stroke || 'transparent'}
    />
  )
}
