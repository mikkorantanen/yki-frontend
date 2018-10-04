import React from 'react';
import ReactDOM from 'react-dom';
import { Organizers } from './Organizers';

import { Provider } from 'react-redux';

import store from '../../store/index';

const organizers = {
  organizers: [],
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Organizers organizers={organizers} />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
