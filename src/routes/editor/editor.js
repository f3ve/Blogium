import React from 'react'
import EditorToolbar from '../../components/editorToolbar/editorToolbar'
import './editor.css'

export default class Editor extends React.Component {
  format = (command, value)  => {
    document.execCommand(command, false, value);
  }
  
  setUrl = () => {
    const url = document.getElementById('txtFormatUrl').value;
    const sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    document.getElementById('txtFormatUrl').value = '';
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
    // window.addEventListener('load', function(){
    //   document.getElementById('sampleeditor').setAttribute('contenteditable', 'true');
    //   document.getElementById('sampleeditor2').setAttribute('contenteditable', 'true');
    // });
    return (
      <React.Fragment>
        <EditorToolbar setUrl={this.setUrl} format={this.format} handleSubmit={this.handleSubmit} />
        <div className='editor' id='sampleeditor' contentEditable='true'>
          <h2 id='title'>Title</h2>
        </div>
      </React.Fragment>
    )
  }
}