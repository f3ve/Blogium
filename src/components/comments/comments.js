import React from 'react'
import {translateDate} from '../utils/utils'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import './comments.css'

function Comments(props) {
  const activeUserId= TokenService.readJwToken().id
  const {authorId} = props
  const {onDelete} = props
  const {onFail} = props

  function handleDelete(e, cId) {
    e.preventDefault()
    PostsApiService.deleteComment(cId)
      .then(res => {
        !res.ok
          ? res.json().then(res => Promise.reject(res))
          : onDelete()
      })
      .catch(err => onFail(err.error))
  }

  function renderDeleteButton(cId) {
    return <button onClick={e => handleDelete(e, cId)}>Delete</button>
  }
  
  return (
    <ul className='comments-list'>
      {
        props.comments.reverse().map(c => {
          const date = translateDate(new Date (c.date_created))
          return (
            <li key={c.id} className='comment'>
              <div className='user-container'>
                <Link to={`/user/${c.user.id}`}>
                  <img src={c.user.img} alt={`${c.user.username}'s profile icon`} className='user-img'/>
                </Link>
                <p>{c.user.username}</p>
              </div>
              <p>{c.content}</p>
              <p>{date}</p>
              {
                activeUserId === c.user.id || activeUserId === authorId
                  ? renderDeleteButton(c.id)
                  : null
              }
            </li>
          )
        })
      }
    </ul>
  )
}

Comments.defaultProps = {
  comments: []
}

export default Comments