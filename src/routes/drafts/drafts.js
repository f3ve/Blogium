import React from 'react'
import PostsApiService from '../../services/posts-api-services'
import PostListItem from '../../components/postListItem/postListItem'
import Context from '../../context'
import './drafts.css'

class Drafts extends React.Component {
  static contextType = Context

  state = {
    drafts: []
  }

  componentDidMount() {
    this.context.clearError()
    PostsApiService.getDrafts()
      .then(drafts => this.setState({drafts}))
      .catch(err => this.context.setError(err.error))
  }

  onSuccessfulDelete = () => {
    this.context.clearError()
    PostsApiService.getDrafts()
      .then(drafts => this.setState({drafts}))
      .catch(err => this.context.setError(err.error))
  }

  renderDrafts() {
    return (
      <ul className='post-list'>
        {
          this.context.error !== null
            ? <p className='error'>{this.context.error}</p>
            : null
        }
        {
          this.state.drafts.map(p => {
            return <PostListItem post={p} key={p.id} buttons={true} onSuccessfulDelete={this.onSuccessfulDelete}/>
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.drafts.length === 0
            ? <h2>Loading</h2>
            : this.renderDrafts()
        }
      </React.Fragment>
    )
  }
}

export default Drafts