import React from 'react'
import Context from '../../context'
import PostsApiService from '../../services/posts-api-services'
import './userPage.css'
import PostListItem from '../../components/postListItem/postListItem'

export default class UserPage extends React.Component {
  static defaultProps = {
    match: {
      params: ''
    }
  }

  static contextType = Context

  state = {
    user: {},
    posts: []
  }

  componentDidMount() {
    const {id} = this.props.match.params
    this.context.clearError()
    PostsApiService.getUser(id)
      .then(user => {
        this.setState({
          user
        })
      })
      .catch(err => this.context.setError(err))
    
    PostsApiService.getUsersPosts(id)
      .then(posts => {
        this.setState({
          posts
        })
      })
      .catch(err => this.context.setError(err.error))
  }

  renderPage() {
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

  render() {
    return (
      <React.Fragment >
        {
          !this.state.user
            ?<h2>Loading</h2>
            : this.renderPage()
        }
      </React.Fragment>
    )
  }
}

