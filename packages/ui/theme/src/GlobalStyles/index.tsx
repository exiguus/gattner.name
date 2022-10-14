import React from 'react'
import { BrowserReset } from './components/BrowserReset'
import { Fonts } from './components/Fonts'
import { Root } from './components/Root'
import { FunctionComponent } from 'react'

const GlobalStyles: FunctionComponent = () => (
  <>
    <BrowserReset />
    <Fonts />
    <Root />
  </>
)

export { GlobalStyles, BrowserReset, Fonts, Root }
