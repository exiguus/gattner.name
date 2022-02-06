import React from 'react'
import { BrowserReset } from './components/BrowserReset'
import { Fonts } from './components/Fonts'
import { Body } from './components/Body'
import { FunctionComponent } from 'react'

const GlobalStyles: FunctionComponent = () => (
  <>
    <BrowserReset />
    <Fonts />
    <Body />
  </>
)

export { GlobalStyles }
