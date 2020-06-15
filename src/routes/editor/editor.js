import React from 'react'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import Context from '../../context'
import EditorToolbar from '../../components/editorToolbar/editorToolbar'
import './editor.css'

export default class Editor extends React.Component {
  static contextType = Context

  static defaultProps = {
    match: {
      params: {}
    }
  }
  state={}

  componentDidMount() {
    this.context.clearError()
    if (this.props.match.params.id) {
      PostsApiService.getPost(this.props.match.params.id)
        .then(res => {
          this.setState({
            post: res
          })
        })
        .then(() => {
          const doc = document.getElementsByClassName('editor')

          doc[0].innerHTML = this.state.post.content
        })
        .catch(err => this.context.setError(err))
    } else {
      this.setState({})
    }
  }
  
  handleSuccess(publish) {
    const token = TokenService.readJwToken()
    this.context.clearError()
    publish
      ? this.props.history.push(`/user/${token.id}`)
      : this.props.history.push(`/drafts`)
  }

  validateTitle(title) {
    if (title === '') {
      return 'Your post must have a title to be published'
    }

    if (title.length < 4) {
      return 'Your title must be at least 4 characters long.'
    }
  }

  validateContent(content) {
    if(content === '') {
      return 'You must have some content in order to publish your post'
    }

    if (content.length < 400) {
      return 'Your post needs to have at least 400 characters in order to publish it. Add some more content or save it as a draft to come back later.'
    }
  }

  handleSubmit = (publish) => {
    const content = document.getElementById('sampleeditor').innerHTML
    const title = document.getElementById('title').textContent
    // const img = document.querySelector('img') || null

    console.log(content.length)
    const titleErr = this.validateTitle(title)
    const contentErr = this.validateContent(content)

    if(publish && titleErr) {
      this.context.setError(titleErr)
      return
    }

    if (publish && contentErr) {
      this.context.setError(contentErr)
      return
    }

    let post

    publish
      ? post = {
          title,
          content,
          img: 'https://picsum.photos/200',
          published: true
        }
      : post = {
          title,
          content,
          img: 'https://picsum.photos/200',
          published: false
        }
 
    !this.props.match.params.id
      ? PostsApiService.postPost(post)
        .then(res =>
          !res.ok
            ? res.json().then(e => Promise.reject(e))
            : this.handleSuccess(publish)  
        )
        .catch(err => this.context.setError(err.error))
      : PostsApiService.patchPost(post, this.props.match.params.id)
          .then(res =>
            !res.ok
              ? res.json().then(e => Promise.reject(e))
              : this.handleSuccess(publish)
          )
          .catch(err => this.context.setError(err.error))
  }
  
  render() {
    window.addEventListener('keyup', this.press)
    return (
      <React.Fragment>
        <EditorToolbar 
          handleSubmit={this.handleSubmit} 
        />
        {
          this.context.error !== null
            ? <p className='error'>{this.context.error}</p>
            : null
        }
        <div id='title' contentEditable='true' spellCheck='true' placeholder='Title...' data-placeholder='Title...' className='title'>
          {
            this.state.post
              ? this.state.post.title
              : null
          }
        </div>
        <div className='editor' id='sampleeditor' contentEditable='true' placeholder='Body...' spellCheck='true' data-placeholder='Body...'>
          {/* {
            this.state.post
              ? this.state.post.content
              : null
          } */}
        </div>
        <div id='test'></div> 
      </React.Fragment>
    )
  }
}