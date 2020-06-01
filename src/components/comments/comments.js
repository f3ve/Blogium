import React from 'react'
import {translateDate} from '../utils/utils'
import {Link} from 'react-router-dom'
import './comments.css'

function Comments(props) {
  return (
    <ul className='comments-list'>
      {
        props.comments.map(c => {
          const date = translateDate(c.date_created)
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