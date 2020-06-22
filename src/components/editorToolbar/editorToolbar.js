import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './editorToolbar.css';

export default function EditorToolbar(props) {
  function format(command, value) {
    document.execCommand(command, false, value);
  }

  function setUrl(e) {
    e.preventDefault();
    const url = document.getElementById('txtFormatUrl').value;
    const show = document.getElementById('url-input');
    const sText = document.getSelection();
    document.execCommand(
      'insertHTML',
      false,
      '<a href="' + url + '" target="_blank">' + sText + '</a>'
    );
    document.getElementById('txtFormatUrl').value = '';
    show.classList.add('hidden');
  }

  function addLink() {
    const show = document.getElementById('url-input');
    if (show.classList.contains('hidden')) {
      show.classList.remove('hidden');
    } else {
      show.classList.add('hidden');
    }
  }

  function setTitle() {
    const target = document.getSelection();
    document.execCommand('insertHTML', false, '<h2>' + target + '</h2>');
  }

  function addCodeBlock() {
    const codeBlock = document.createElement('pre');
    const target = document.getSelection();
    if (
      target.focusNode.nodeName.includes('#text') ||
      target.focusNode.classList.contains('title') ||
      target.focusNode.className.includes('codeBlock') ||
      target.focusNode.className.includes('editor')
    ) {
      return;
    }
    const id = `codeBlock-${
      document.getElementsByClassName('codeBlock').length + 1
    }`;

    codeBlock.classList.add('codeBlock');
    codeBlock.addEventListener('paste', paste);
    codeBlock.setAttribute('id', `${id}`);
    target.focusNode.replaceWith(codeBlock);

    addLineAfterBlock(id);
  }

  function addLineAfterBlock(id) {
    const block = document.getElementById(`${id}`);
    const div = document.createElement('div');
    const br = document.createElement('br');
    div.appendChild(br);

    if (!block) {
      return;
    } else {
      block.after(div);
    }
  }

  function paste(e) {
    e.preventDefault();

    const open = new RegExp('<', 'gi');
    const close = new RegExp('>', 'gi');
    const text = (e.originalEvent || e).clipboardData
      .getData('text/plain')
      .replace(open, '&lt')
      .replace(close, '&gt');

    document.execCommand('insertHTML', false, text);
  }

  return (
    <div class='sample-toolbar'>
      <button
        aria-label='bold'
        className='clickMe'
        onClick={(e) => format('bold')}
      >
        <FontAwesomeIcon icon='bold' />
      </button>
      <button
        aria-label='italic'
        className='clickMe'
        onClick={(e) => format('italic')}
      >
        <FontAwesomeIcon icon='italic' />
      </button>
      <button
        aria-label='insert unordered list'
        className='clickMe'
        onClick={(e) => format('insertUnorderedList')}
      >
        <FontAwesomeIcon icon='list' />
      </button>
      <button
        aria-label='open link insert bar'
        className='clickMe'
        onClick={(e) => addLink()}
      >
        <FontAwesomeIcon icon='link' />
      </button>
      <div id='url-input' className='hidden'>
        <input id='txtFormatUrl' placeholder='url' class='form-control' />
        <button className='clickMe' onClick={(e) => setUrl(e)}>
          Create Link
        </button>
      </div>
      <button
        aria-label='Create section header'
        className='clickMe'
        onClick={(e) => setTitle()}
      >
        <FontAwesomeIcon icon='heading' />
      </button>
      <button
        aria-label='add code block'
        className='clickMe'
        onClick={(e) => addCodeBlock()}
      >
        <FontAwesomeIcon icon='code' />
      </button>
    </div>
  );
}
