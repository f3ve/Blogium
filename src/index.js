import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './app/App';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBold,
  faItalic,
  faList,
  faLink,
  faPlus,
  faHeading,
  faCode,
  faSave,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBold,
  faList,
  faItalic,
  faLink,
  faPlus,
  faHeading,
  faCode,
  faSave
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
