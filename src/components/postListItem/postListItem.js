import React from 'react'
import { Link, withRouter} from 'react-router-dom'
import Context from '../../context'
import {translateDate} from '../utils/utils'
import './postListItem.css'
import PostsApiService from '../../services/posts-api-services'

class PostListItem extends React.Component {
 static contextType = Context
  
  handleDelete(e) {
    e.preventDefault()
    PostsApiService.deletePost(this.props.post.id)
      .then(res => {
        !res.ok
          ? res.json().then(res => Promise.reject(res))
          : this.props.onSuccessfulDelete()
      })
      .catch(err => this.context.setError(err.error))
  }

  handleEdit = (e) => {
    const {post} = this.props
    e.preventDefault()
    this.props.history.push(`/editor/${post.id}`)
  }
 
  RenderButtons() {
   return (
      <div>
        <button onClick={e => this.handleEdit(e)}>Edit</button>
        <button onClick={e => this.handleDelete(e)}>Delete</button>
      </div>
    )
  }
  render() {
    const {post, buttons} = this.props
    const date = translateDate(new Date(post.date_created))
    
    return (
      <li key={post.id} className='post-container'>
        <Link 
          to={
            post.published === false
            ? `/editor/${post.id}`
            : `/post/${post.id}`
          }
          >
          <h2 className='postTitle'>
            {
              post.title === ''
                ? 'Untitled'
                : post.title
            }
          </h2>
        </Link>
        <p className='author'>By {post.user.username}</p>
          <img src={post.img} alt='blog post img' className='postImg' />
          <p>Posted on: {date}</p>
          {
            buttons
              ? this.RenderButtons()
              : null          
          }
      </li>
    )
  }
}

PostListItem.defaultProps = {
  post: {
    id: 1,
    date_created: new Date(),
    title: '',
    img: '' ,
    user: {
      username: ''
    }
  }
}

export default withRouter(PostListItem)