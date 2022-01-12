import React from 'react'
import styled from 'styled-components'
import { render, screen } from '../../../test/testUtils'
import { AppLayout } from '.'

const Component = styled.div`
  background-color: ${props => props.theme.application.backgroundColor};
`

describe('AppLayout', () => {
  test('theme light has random hsl background color', () => {
    render(
      <AppLayout>
        <Component data-testid="component" />
      </AppLayout>
    )

    const component = screen.getByTestId('component')
    expect(component).toHaveStyleRule(
      expect.stringMatching(/^background-color: hsl([0-9]{3}deg,20%,80%,0.5)$/)
    )
  })
})
