import React from 'react'
import EditorToolbar from '../../components/editorToolbar/editorToolbar'
import './editor.css'

export default class Editor extends React.Component {
  format = (command, value)  => {
    document.execCommand(command, false, value);
  }
  
  setUrl = (e) => {
    e.preventDefault()
    const url = document.getElementById('txtFormatUrl').value;
    const show = document.getElementById('url-input')
    const sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    document.getElementById('txtFormatUrl').value = ''
    show.classList.add('hidden')
  }

  addLink = () => {
    const show = document.getElementById('url-input')
    if (show.classList.contains('hidden')) {
      show.classList.remove('hidden')
    } else {
      show.classList.add('hidden')
    }
  }

  setTitle = () => {
    const target = document.getSelection();
    document.execCommand('insertHTML', false, '<h2>' + target + '</h2>')
  }

  addCodeBlock = () => {
    const codeBlock = document.createElement('pre')
    const target = document.getSelection()
    if (target.focusNode.nodeName.includes('#text') || target.focusNode.classList.contains('title') || target.focusNode.className.includes('codeBlock')) {
      return
    }
    const id = `codeBlock-${document.getElementsByClassName('codeBlock').length + 1}`

    codeBlock.classList.add('codeBlock')
    codeBlock.addEventListener('paste', this.paste)
    document.execCommand('insertHTML', false, `<pre class='codeBlock' id='${id}'>${target}</pre>`)
    
    this.addLineAfterBlock(id)
  }

  addLineAfterBlock(id) {
    const block = document.getElementById(`${id}`)
    const div = document.createElement('div')
    const br = document.createElement('br')
    div.appendChild(br)
    
    if (!block) {
      return
    } else {
      block.after(div)
    }
  }

  paste = (e) => {
    e.preventDefault()

    const open = new RegExp('<', 'gi')
    const close = new RegExp('>', 'gi')
    const text = (e.originalEvent || e).clipboardData.getData('text/plain').replace(open, '&lt').replace(close, '&gt')

    document.execCommand('insertHTML', false, text)
  }
  
  handleSubmit = () => {
    const content = document.getElementById('sampleeditor').innerHTML
    const title = document.getElementById('title').textContent
    const id = Math.random() * Math.floor(100000)

    const post = {
      id,
      title,
      date_created: new Date(),
      date_modified: new Date(),
      content,
      user: {
        id: 1,
        username: 'jimbo',
        img: 'https://picsum.photos/200',
        bio: 'Hi my name is Jimmy and this is my bio'
      }
    } 

    console.log(post)
  }

  render() {
    return (
      <React.Fragment>
        <EditorToolbar 
          setUrl={this.setUrl} 
          format={this.format} 
          addLink={this.addLink}
          handleSubmit={this.handleSubmit} 
          setTitle={this.setTitle}
          addCodeBlock={this.addCodeBlock}
        />
        <div id='title' contentEditable='true' spellCheck='true' data-placeholder='Title...' className='title'>
        </div>
        <div className='editor' id='sampleeditor' contentEditable='true' spellCheck='true' data-placeholder='Body...' onPaste={this.paste}>
        </div>
      </React.Fragment>
    )
  }
}