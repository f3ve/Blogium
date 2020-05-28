import React from 'react'
import ReactDOM from 'react-dom'
import {ReactRouter} from 'react-router-dom'
import App from './App'

describe('app.js', () => {
  it('renders without crashing', () => {
    let div = document.createElement('div')
    ReactDOM.render(
      <ReactRouter>
        <App />
      </ReactRouter>,
      div
    )
  })
}) 

