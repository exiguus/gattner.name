import React, {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import DocumentMeta, { DocumentMetaProps } from 'react-document-meta'
import { isTouch } from '@gattner/utils'
import { AppProps, Meta, PageProps, Route } from '../../../schemas'
import useWindowSize from '../../hooks/useWindowSize'
import { isPrerender } from '../../utils/prerender'
import { getDocumentMeta } from '../../utils/meta'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Main } from '../../components/Main'
import { Aside } from '../../components/Aside'
import { SkipNav } from '../../components/SkipNav'

interface StyledContentProps {
  minHeight: string
}

const StyledContent = styled.div<StyledContentProps>`
  position: relative;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 100%;
  grid-template-rows: 2rem auto auto auto auto;
  justify-content: center;
  align-items: center;
  min-height: ${(props): string =>
    props.minHeight || props.theme.application.minHeight};

  box-sizing: content-box;
  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenTablet}) {
    grid-template-columns: ${(props): string =>
      props.theme.container.maxWidthTablet};
  }

  @media (min-width: ${(props): string =>
      props.theme.breakpoint.screenLaptopL}) {
    grid-template-columns: ${(props): string =>
      props.theme.container.maxWidthDesktop};
  }

  nav {
    margin-top: -1px;
  }

  header {
    align-self: start;
  }

  footer {
    align-self: end;
  }
`

interface PageLayoutProps extends PageProps, AppProps {
  path: Route['path']
  name: Route['name']
  title: Route['title']
  children: ReactNode
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({
  skipNav,
  header,
  origin,
  path,
  name,
  title,
  footer,
  children,
  meta,
}) => {
  const prerender = isPrerender()
  let documentMeta: DocumentMetaProps = {}

  if (prerender) {
    const metaDynamic: Meta = {
      title: `${title ? `${title} - ` : ''}${meta.title}`,
      canonical: `${origin}${path}`,
      meta: {
        name: {
          release: `${new Date(document.lastModified).toISOString()}`,
          'last-modified': `${new Date(document.lastModified)}`,
        },
        property: {
          'og:url': `${origin}${path}`,
          'twitter:domain': `${new URL(origin).hostname}`,
          'twitter:url': `${origin}${path}`,
        },
      },
    }
    documentMeta = getDocumentMeta(metaDynamic, meta)
  }
  const { height } = useWindowSize()
  const [minHeight, setMinHeight] = useState('100vh')

  useLayoutEffect(() => {
    if (isTouch()) setMinHeight(`${height}px`)
  }, [height])

  return (
    <>
      {prerender ? (
        <DocumentMeta {...documentMeta}>
          <StyledContent minHeight={minHeight} data-testid={`page-${name}`}>
            <SkipNav {...skipNav} />
            <Header {...header} />
            <Main>{children}</Main>
            <Aside />
            <Footer {...footer} />
          </StyledContent>
        </DocumentMeta>
      ) : (
        <StyledContent minHeight={minHeight} data-testid={`page-${name}`}>
          <SkipNav {...skipNav} />
          <Header {...header} />
          <Main>{children}</Main>
          <Aside />
          <Footer {...footer} />
        </StyledContent>
      )}
    </>
  )
}

export { PageLayout }
