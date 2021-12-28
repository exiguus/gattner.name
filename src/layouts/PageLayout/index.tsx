import React, {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import DocumentMeta from 'react-document-meta'
import useWindowSize from '../../hooks/useWindowSize'
import { title, description, keywords } from '../../../data/site.json'
import { isTouch } from '../../utils/device'
import { isServer } from '../../utils/ssr'
import { AppLayout } from '../AppLayout'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Main } from '../../components/Main'

interface StyledContentProps {
  minHeight: string
}

const StyledContent = styled.div<StyledContentProps>`
  position: relative;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  justify-content: center;
  align-items: center;
  min-height: ${(props): string =>
    props.minHeight || props.theme.application.minHeight};

  box-sizing: content-box;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    grid-template-columns: ${(props): string =>
      props.theme.section.maxWidthTablet};
  }

  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenLaptopL}) {
    grid-template-columns: ${(props): string =>
      props.theme.section.maxWidthDesktop};
  }

  header {
    align-self: start;
    padding-top: 1rem;
  }

  footer {
    align-self: end;
  }
`

interface PageLayoutProps {
  children: ReactNode
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children }) => {
  const ssr = isServer()
  let meta = {}
  if (ssr) {
    meta = {
      title,
      description,
      // canonical: 'http://example.com/',
      meta: {
        name: {
          keywords,
        },
      },
    }
  }
  const { height } = useWindowSize()
  const [minHeight, setMinHeight] = useState('100vh')
  useLayoutEffect(() => {
    if (isTouch()) setMinHeight(`${height}px`)
  }, [height])
  return (
    <AppLayout>
      {ssr ? (
        <DocumentMeta {...meta}>
          <StyledContent minHeight={minHeight}>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </StyledContent>
        </DocumentMeta>
      ) : (
        <StyledContent minHeight={minHeight}>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </StyledContent>
      )}
    </AppLayout>
  )
}

export { PageLayout }
