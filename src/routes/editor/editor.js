import React from 'react'
import TokenService from '../../services/token-service'
import PostsApiService from '../../services/posts-api-services'
import EditorToolbar from '../../components/editorToolbar/editorToolbar'
import './editor.css'

export default class Editor extends React.Component {
  
  handleSuccess() {
    console.log(TokenService.readJwToken())
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
          img,
          published: true
        }
      : post = {
          title,
          content,
          img,
          published: false
        } 
    
    PostsApiService.postPost(post)
      .then(res =>
        !res.ok
          ? res.json().then(e => Promise.reject(e))
          : this.handleSuccess()  
      )
  }
  
  render() {
    window.addEventListener('keyup', this.press)
    return (
      <React.Fragment>
        <EditorToolbar 
          handleSubmit={this.handleSubmit} 
        />

        <div id='title' contentEditable='true' spellCheck='true' placeholder='Title...' data-placeholder='Title...' className='title'>
        </div>
        <div className='editor' id='sampleeditor' contentEditable='true' placeholder='Body...' spellCheck='true' data-placeholder='Body...'>
        </div>
        <div id='test'></div> 
      </React.Fragment>
    )
  }
}