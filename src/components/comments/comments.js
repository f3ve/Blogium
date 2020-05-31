import React from 'react'
import {translateDate} from '../utils/utils'
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
                <img src={c.user.img} alt={`${c.user.username}'s profile icon`} className='user-img'/>
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

export default Comments