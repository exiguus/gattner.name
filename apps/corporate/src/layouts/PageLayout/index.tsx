import React, {
  FunctionComponent,
  ReactNode,
  useLayoutEffect,
  useState,
} from 'react'
import styled from 'styled-components'
import DocumentMeta from 'react-document-meta'
import { isTouch } from '@gattner/utils'
import { AppProps, Meta, PageProps, Route } from '../../../schemas'
import useWindowSize from '../../hooks/useWindowSize'
import { isPrerender } from '../../utils/prerender'
import { getDocumentMeta } from '../../utils/meta'
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

interface PageLayoutProps extends PageProps, AppProps {
  path: Route['path']
  name: Route['name']
  children: ReactNode
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({
  header,
  origin,
  path,
  name,
  footer,
  children,
  routes,
  meta,
}) => {
  const prerender = isPrerender()
  let documentMeta = {}
  if (prerender) {
    const metaDynamic: Meta = {
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
    const metaPage =
      routes.find(route => route.meta != null && route.name === name)?.meta ??
      null
    documentMeta = getDocumentMeta(metaPage, metaDynamic, meta)
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
            <Header {...header} />
            <Main>{children}</Main>
            <Footer {...footer} />
          </StyledContent>
        </DocumentMeta>
      ) : (
        <StyledContent minHeight={minHeight} data-testid={`page-${name}`}>
          <Header {...header} />
          <Main>{children}</Main>
          <Footer {...footer} />
        </StyledContent>
      )}
    </>
  )
}

export { PageLayout }
