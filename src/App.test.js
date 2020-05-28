import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

describe('app.js', () => {
  it('renders without crashing', () => {
    let div = document.createElement('div')
    ReactDOM.render(
      <App />,
      div
    )
  })
}) 

