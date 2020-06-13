import React from 'react'
import ReactDOM from 'react-dom'
import Drafts from './drafts'

describe('drafts route', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Drafts />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})