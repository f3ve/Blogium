import React from 'react'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import EditorToolbar from '../../components/editorToolbar/editorToolbar'
import './editor.css'

export default class Editor extends React.Component {
  state={}

  componentDidMount() {
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
        .catch(err => alert(err))
    } else {
      this.setState({})
    }
  }
  
  handleSuccess(publish) {
    const token = TokenService.readJwToken()
    publish
      ? this.props.history.push(`/user/${token.id}`)
      : this.props.history.push(`/drafts`)
  }

  stringToHTML = (str) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(str, 'text/html')
    return doc.body
  }

  handleSubmit = (publish) => {
    const content = document.getElementById('sampleeditor').innerHTML
    const title = document.getElementById('title').textContent
    const img = document.querySelector('img') || null

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
        .catch(err => alert(err))
      : PostsApiService.patchPost(post, this.props.match.params.id)
          .then(res =>
            !res.ok
              ? res.json().then(e => Promise.reject(e))
              : this.handleSuccess(publish)
          )
          .catch(err => alert(err))
  }
  
  render() {
    window.addEventListener('keyup', this.press)
    return (
      <React.Fragment>
        <EditorToolbar 
          handleSubmit={this.handleSubmit} 
        />

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