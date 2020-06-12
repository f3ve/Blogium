import React from 'react'
import PostsApiService from '../../services/posts-api-services'
import PostListItem from '../../components/postListItem/postListItem'
import './drafts.css'

class Drafts extends React.Component {
  state = {
    drafts: []
  }

  componentDidMount() {
    PostsApiService.getDrafts()
      .then(drafts => this.setState({drafts}))
      .catch(err => alert(err))
  }

  renderDrafts() {
    return (
      <ul className='post-list'>
        {
          this.state.drafts.map(p => {
            return <PostListItem post={p} key={p.id} />
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