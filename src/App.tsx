import React, { FunctionComponent } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AppProps } from 'schemas'
import { AppLayout } from './layouts/AppLayout'

import page from '../data/content/page.json'
import home from '../data/content/home.json'
import about from '../data/content/about.json'
import contact from '../data/content/contact.json'
import impressum from '../data/content/impressum.json'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import { PageLayout } from './layouts/PageLayout'

const Page = ({ name }: { name: string }): JSX.Element | null => {
  switch (name) {
    case 'home':
      return <Home {...home} />
    case 'about':
      return <About {...about} />
    case 'contact':
      return <Contact {...contact} />
    case 'impressum':
      return <Impressum {...impressum} />
    default:
      return null
  }
}

const App: FunctionComponent<AppProps> = props => {
  const { routes } = props
  return (
    <AppLayout>
      <BrowserRouter forceRefresh={process.env.NODE_ENV === 'production'}>
        <Switch>
          {routes.map(({ name, path }, index) => (
            <Route exact path={path} key={`r-${index}`}>
              <PageLayout {...props} {...page} name={name} path={path}>
                <Page name={name} />
              </PageLayout>
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  )
}

export default App
