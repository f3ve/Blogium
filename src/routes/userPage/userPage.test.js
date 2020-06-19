import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import UserPage from './userPage'

describe('UserPage route', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <UserPage />
      </BrowserRouter>,
      div
    )
  })
})