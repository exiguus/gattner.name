import React, { FunctionComponent, lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import { AppProps } from 'schemas'
import { AppLayout } from './layouts/AppLayout'
import { PageLayout } from './layouts/PageLayout'
import { SiteLayout } from './layouts/SiteLayout'
import { Loading } from './components/Loading'

import page from '../data/content/page.json'
import home from '../data/content/home.json'
import about from '../data/content/about.json'
import contact from '../data/content/contact.json'
import impressum from '../data/content/impressum.json'
import error from '../data/content/error.json'

const pages: Record<string, Record<string, unknown>> = {
  home,
  about,
  contact,
  impressum,
  error,
}

const Pages: Record<string, ReturnType<typeof lazy>> = {
  home: lazy(() => import('./pages/Home')),
  about: lazy(() => import('./pages/About')),
  contact: lazy(() => import('./pages/Contact')),
  impressum: lazy(() => import('./pages/Impressum')),
  error: lazy(() => import('./pages/Error')),
}

const App: FunctionComponent<AppProps> = props => {
  const { routes, meta: appMeta } = props
  useEffect(() => {
    import('./lib/tracker').then(({ track }) => {
      track({
        type: 'load',
        msg: 'App loaded',
        value: `App loaded at location "${window.location.pathname}"`,
      })
    })
  }, [])

  return (
    <AppLayout>
      <BrowserRouter forceRefresh={process.env.NODE_ENV === 'production'}>
        <Switch>
          {routes.map(({ name, title, meta: pageMeta, path }) => {
            const Page = Pages[name]
            return (
              <Route exact path={path} key={`r-${name}`}>
                <SiteLayout>
                  <PageLayout
                    {...props}
                    {...page}
                    name={name}
                    title={title}
                    meta={{ ...appMeta, ...pageMeta }}
                    path={path}
                  >
                    <Suspense fallback={<Loading />}>
                      <Page {...pages[name]} />
                    </Suspense>
                  </PageLayout>
                </SiteLayout>
              </Route>
            )
          })}
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  )
}

export default App
