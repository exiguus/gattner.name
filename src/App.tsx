import React, { FunctionComponent } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'

const App: FunctionComponent = () => {
  return (
    <BrowserRouter forceRefresh={process.env.NODE_ENV === 'production'}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/impressum" component={Impressum} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
