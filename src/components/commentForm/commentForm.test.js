import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import CommentForm from './commentForm'

describe('CommentForm', () => {
  it('renders wihtout crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <CommentForm />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
}) 