import React from 'react'
import PostsApiService from '../../services/posts-api-services'
import Context from '../../context'
import PostListItem from '../../components/postListItem/postListItem'
import './main.css'

class Main extends React.Component {
  static contextType = Context

  componentDidMount() {
    this.context.clearError()
    PostsApiService.getPosts()
      .then(this.context.setPosts)
      .catch(err => this.context.setError(err.error))
  }

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