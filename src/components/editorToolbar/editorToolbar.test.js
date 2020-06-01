import React from 'react'
import ReactDOM from 'react-dom'
import EditorToolbar from './editorToolbar'

describe('EditorToolbar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <EditorToolbar />,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})