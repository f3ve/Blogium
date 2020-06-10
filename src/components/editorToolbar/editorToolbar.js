import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './editorToolbar.css'

export default function EditorToolbar(props) {
  function format(command, value) {
    document.execCommand(command, false, value);
  }
  
  function setUrl(e) {
    e.preventDefault()
    const url = document.getElementById('txtFormatUrl').value;
    const show = document.getElementById('url-input')
    const sText = document.getSelection();
    // create an even called insert HTML 
    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    document.getElementById('txtFormatUrl').value = ''
    show.classList.add('hidden')
  }

  function addLink() {
    const show = document.getElementById('url-input')
    if (show.classList.contains('hidden')) {
      show.classList.remove('hidden')
    } else {
      show.classList.add('hidden')
    }
  }

  function setTitle() {
    const target = document.getSelection();
    document.execCommand('insertHTML', false, '<h2>' + target + '</h2>')
  }

  function addCodeBlock() {
    const codeBlock = document.createElement('pre')
    const target = document.getSelection()
    if (target.focusNode.nodeName.includes('#text') || 
        target.focusNode.classList.contains('title') || 
        target.focusNode.className.includes('codeBlock') ||
        target.focusNode.className.includes('editor')) {
      return
    }
    const id = `codeBlock-${document.getElementsByClassName('codeBlock').length + 1}`


    codeBlock.classList.add('codeBlock')
    codeBlock.addEventListener('paste', paste)
    // co
    codeBlock.setAttribute('id', `${id}`)
    target.focusNode.replaceWith(codeBlock)
    
    addLineAfterBlock(id)
  }

  
  function addLineAfterBlock(id) {
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
  
  function paste(e) {
    e.preventDefault()
    
    const open = new RegExp('<', 'gi')
    const close = new RegExp('>', 'gi')
    const text = (e.originalEvent || e).clipboardData.getData('text/plain').replace(open, '&lt').replace(close, '&gt')
    
    document.execCommand('insertHTML', false, text)
  }
  
  const {handleSubmit} = props
  return (
    <div class="sample-toolbar">
      <a href="javascript:void(0)" onClick={e => format('bold')}><FontAwesomeIcon icon='bold' className='icon' /></a>
      <a href="javascript:void(0)" onClick={e => format('italic')}><FontAwesomeIcon icon='italic' className='icon'/></a>
      <a href="javascript:void(0)" onClick={e => format('insertUnorderedList')}><FontAwesomeIcon icon='list' className='icon'/></a>
      <a href="javascript:void(0)" onClick={e => addLink()}><FontAwesomeIcon icon='link' className='icon' /></a>
      <div id='url-input' className='hidden'>
        <input id="txtFormatUrl" placeholder="url" class="form-control" />
        <button onClick={e => setUrl(e)}>Create Link</button>
      </div>
      <a href="javascript:void(0)" onClick={e => setTitle()}><FontAwesomeIcon icon='heading' className='icon' /></a>
      <a href="javascript:void(0)" onClick={e => addCodeBlock()}><FontAwesomeIcon icon='code' className='icon' /></a>
      <a href="javascript:void(0)" onClick={e => handleSubmit()}><FontAwesomeIcon icon='plus' className='icon'/></a>
    </div>
  )
}