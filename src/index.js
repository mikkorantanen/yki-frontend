import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import organizerReducer from './store/reducers/organizer';
import examSessionReducer from './store/reducers/examSession';
import registrationReducer from './store/reducers/registration';

const rootReducer = combineReducers({
  org: organizerReducer,
  exam: examSessionReducer,
  reg: registrationReducer,
});

// To enable https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
