import React from 'react'
import Context from '../../context'
import PostListItem from '../../components/postListItem/postListItem'
import './main.css'

class Main extends React.Component {
  static contextType = Context

  render() {
    return (
      <ul className='post-list'>
        {
          this.context.posts.map(p => {
            return (
              <PostListItem post={p} key={p.id}/>
            )
          })
        }
      </ul>
    )
  }
}

export default Main