import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter } from 'react-router-dom'
import Drafts from './drafts'

describe('drafts route', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
       <Drafts />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})