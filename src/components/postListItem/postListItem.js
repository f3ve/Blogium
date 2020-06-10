import React from 'react'
import { Link } from 'react-router-dom'
import {translateDate} from '../utils/utils'
import './postListItem.css'

function PostListItem(props) {
  const {post} = props
  // const date = translateDate(post.date_created)

  return (
    <li key={post.id} className='post-container'>
      <Link to={`/post/${post.id}`}>
        <h2 className='postTitle'>{post.title}</h2>
      </Link>
      <p className='author'>By {post.user.username}</p>
        <img src={post.img} alt='blog post img' className='postImg' />
        {/* <p>Posted on: {date}</p> */}
    </li>
  )
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

export default PostListItem