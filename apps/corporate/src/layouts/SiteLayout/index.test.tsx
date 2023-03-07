import React from 'react'
import styled from 'styled-components'
import { render, screen } from '../../../tests/testUtils'
import { SiteLayout } from '.'

const Component = styled.div`
  background-color: ${props => props.theme.application.backgroundColor};
`

describe('SiteLayout', () => {
  test('theme light has random hsl background color', () => {
    render(
      <SiteLayout>
        <Component data-testid="component" />
      </SiteLayout>
    )

    const component = screen.getByTestId('component')
    expect(component).toHaveStyleRule(
      expect.stringMatching(/^background-color: hsl([0-9]{3}deg,20%,80%,0.5)$/)
    )
  })
})
