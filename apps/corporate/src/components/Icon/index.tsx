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
import styled from 'styled-components'

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
  const StyledIcon = styled(I)`
    fill: ${props => props.fill || props.theme.link.color};
    stroke: ${props => props.stroke};
  `
  return <StyledIcon fill={fill || theme.link.color} stroke={stroke} />
}
