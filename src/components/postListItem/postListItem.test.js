import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import PostListItem from './postListItem'

describe('postListItem compnent', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <PostListItem />
      </BrowserRouter>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})