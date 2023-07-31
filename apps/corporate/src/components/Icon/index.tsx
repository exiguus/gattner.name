import React, { ElementType } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Icon as IconName } from '../../../schemas'

import GithubIcon from '../../assets/github-alt.svg'
import MastodonIcon from '../../assets/mastodon-alt.svg'
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
  mastodon: MastodonIcon,
  simon: SimonIcon,
  'simon-alt': SimonAltIcon,
  analysis: AnalysisIcon,
  envelope: EnvelopeIcon,
  fork: ForkIcon,
}

type IconProps = {
  type: string
  fill?: string
  stroke?: string
}

export const Icon = ({ type, fill, stroke }: IconProps) => {
  const { theme } = useTheme()
  const I = type in icons ? icons[type as IconName] : icons.analysis
  return (
    <I
      fill={fill || theme.application.color}
      stroke={stroke || 'transparent'}
    />
  )
}
