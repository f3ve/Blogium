import React from 'react'
import Context from '../../context'
import dummyStore from '../../dummy-store'
import './postPage.css'

class PostPage extends React.Component {
  static contextType = Context

  state = {
    post: {},
    comments: []
  }

  componentDidMount() {
    const { id } = this.props.match.params
    const post= dummyStore.posts.filter(p => p.id === parseInt(id))[0]
    const comments = dummyStore.comments.filter(c => c.post_id === parseInt(id))
    this.setState({
      post
    })
  }
  render() {
    const {post} = this.state
    return (
      <section>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </section>
    )
  }
}

export default PostPage