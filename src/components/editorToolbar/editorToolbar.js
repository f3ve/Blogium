import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './editorToolbar.css'

export default function EditorToolbar(props) {
  const { format, setUrl, handleSubmit } = props
  return (
    <div class="sample-toolbar">
      <a href="javascript:void(0)" onClick={e => format('bold')}><FontAwesomeIcon icon='bold' className='icon' /></a>
      <a href="javascript:void(0)" onClick={e => format('italic')}><FontAwesomeIcon icon='italic' className='icon'/></a>
      <a href="javascript:void(0)" onClick={e => format('insertUnorderedList')}><FontAwesomeIcon icon='list' className='icon'/></a>
      <a href="javascript:void(0)" onClick={e => setUrl()}><FontAwesomeIcon icon='link' className='icon' /></a>
      <span><input id="txtFormatUrl" placeholder="url" class="form-control" /></span>
      <a href="javascript:void(0)" onClick={e => handleSubmit()}><FontAwesomeIcon icon='plus' className='icon'/></a>
    </div>
  )
}