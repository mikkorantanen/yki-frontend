import React from 'react';
import ReactDOM from 'react-dom';
import { Organizers } from './Organizers';

import { Provider } from 'react-redux';

const organizers = {
  organizers: [],
};

xit('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Organizers organizers={organizers} />
    </Provider>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
