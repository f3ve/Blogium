import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './floatingMenu.css';

export default function FloatingMenu(props) {
  function toggleHiddenMenu(e) {
    e.preventDefault();

    const hidden = document.querySelector('.hide');

    hidden.classList.contains('show')
      ? hidden.classList.remove('show')
      : hidden.classList.add('show');
  }

  return (
    <React.Fragment>
      <menu className='hide'>
        <button className='clickMe' onClick={(e) => props.handleSubmit()}>
          Save as Draft
        </button>
        <button className='clickMe' onClick={(e) => props.handleSubmit(true)}>
          Publish
        </button>
      </menu>
      <button className='clickMe float' onClick={(e) => toggleHiddenMenu(e)}>
        <FontAwesomeIcon icon='save' />
      </button>
    </React.Fragment>
  );
}
