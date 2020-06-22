import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './floatingMenu.css';

export default function FloatingMenu(props) {
  function showMenu(e) {
    e.preventDefault(e);
    const menu = document.querySelector('.hide').classList;
    const icon = document.querySelector('.saveIcon');
    const button = document.querySelector('.xIcon');

    icon.style.display = 'none';
    button.style.display = 'initial';
    menu.add('show');
  }

  function hideMenu(e) {
    e.preventDefault(e);
    const menu = document.querySelector('.hide').classList;
    const icon = document.querySelector('.saveIcon');
    const button = document.querySelector('.xIcon');

    icon.style.display = 'initial';
    button.style.display = 'none';
    menu.remove('show');
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
      <button className='clickMe float saveIcon' onClick={(e) => showMenu(e)}>
        <FontAwesomeIcon icon='save' />
      </button>
      <button className='clickMe float xIcon' onClick={(e) => hideMenu(e)}>
        <FontAwesomeIcon icon='plus' className='x save' />
      </button>
    </React.Fragment>
  );
}
