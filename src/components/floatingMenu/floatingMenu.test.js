import React from 'react';
import ReactDOM from 'react-dom';
import FloatingMenu from './floatingMenu';

describe.only('FloatingMenu component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FloatingMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
