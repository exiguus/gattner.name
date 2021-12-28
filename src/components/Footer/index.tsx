import React, { FunctionComponent } from 'react'
import styled, { useTheme } from 'styled-components'
import { footer } from '../../../data/site.json'
import { Section } from '../Section'
import { Link } from '../Link'
import { LastFm } from '../../components/LastFm'
import GithubIcon from '../../assets/github-alt.svg'
import TwitterIcon from '../../assets/twitter-alt.svg'
import SimonIcon from '../../assets/simon-alt.svg'
import AnalysisIcon from '../../assets/analysis-alt.svg'
import EnvelopeIcon from '../../assets/envelope-alt.svg'

const StyledFooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledList = styled.ul`
  display: flex;
  min-width: 12.5rem;
  align-items: flex-start;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    justify-content: space-between;
    align-items: center;
  }
`
const StyledListItem = styled.li`
  display: block;
  min-width: 1.5rem;
`

const Menu = styled.ul`
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`

const MenuLink = styled.li`
  display: inline-block;
  margin-right: 1em;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    display: block;
    margin-left: 1em;
    margin-right: 0;
  }
  text-decoration: none;
`

const Footer: FunctionComponent = () => {
  const theme = useTheme()
  return (
    <footer>
      <Section>
        <StyledFooterInner>
          <StyledList>
            <StyledListItem>
              <Link
                href={footer.nav.github.url}
                title={footer.nav.github.title}
              >
                <GithubIcon fill={theme.link.color} />
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link
                href={footer.nav.twitter.url}
                title={footer.nav.twitter.title}
              >
                <TwitterIcon fill={theme.link.color} />
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link to={footer.nav.about.url} title={footer.nav.about.title}>
                <SimonIcon fill={theme.link.color} />
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link
                href={footer.nav.contact.url}
                title={footer.nav.contact.title}
              >
                <EnvelopeIcon fill={theme.link.color} />
              </Link>
            </StyledListItem>
            <StyledListItem>
              <Link
                href={footer.nav.analysis.url}
                title={footer.nav.analysis.title}
              >
                <AnalysisIcon fill={theme.link.color} />
              </Link>
            </StyledListItem>
          </StyledList>
          <Menu>
            <MenuLink>
              <Link to="/impressum" lineThrough={true}>
                Impressum
              </Link>
            </MenuLink>
          </Menu>
          <LastFm
            userName="exiguus_"
            apiKey="98a2e5544a139a5675d1a85b8126f0f7"
          />
        </StyledFooterInner>
      </Section>
    </footer>
  )
}

export { Footer }
