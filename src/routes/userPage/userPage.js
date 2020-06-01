import React from 'react'
import postListItem from '../../components/postListItem/postListItem'
import Context from '../../context'
import './userPage.css'
import PostListItem from '../../components/postListItem/postListItem'

export default class UserPage extends React.Component {
  static contextType = Context

  state = {
    user: {},
    posts: []
  }

  componentDidMount() {
    const user = this.context.users.filter(u => u.id === parseInt(this.props.match.params.id))[0]
    const posts = this.context.posts.filter(p => p.user.id === parseInt(this.props.match.params.id))

    this.setState({
      user,
      posts
    })
  }

  render() {
    const {user, posts} = this.state
    return (
      <React.Fragment >
        <section className='profile-header'>
          <img src={user.img} alt='User profile icon' className='profile-picture'></img>
          <p>{user.username}</p>
          <p>{user.bio}</p>
        </section>
        <section className='user-posts'>
          <ul className='post-list'>
            {posts.map(p => 
              <PostListItem post={p} />
              )}
          </ul>
        </section>
      </React.Fragment>
    )
  }
}

