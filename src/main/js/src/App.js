import React, { lazy, Suspense } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import registryReducer from './store/reducers/registry';
import examSessionReducer from './store/reducers/examSession';
import registrationReducer from './store/reducers/registration';
import userReducer from './store/reducers/user';
import examDatesReducer from './store/reducers/examDates';
import ErrorBoundary from './containers/ErrorBoundary/ErrorBoundary';
import Spinner from './components/UI/Spinner/Spinner';
import Description from './components/Registration/Description/Description';
import LinkExpired from './components/LinkExpired/LinkExpired';
import LanguageSelection from './containers/Registration/LanguageSelection/LanguageSelection';
import LevelSelection from './containers/Registration/LevelSelection/LevelSelection';
import LocationSelection from './containers/Registration/LocationSelection/LocationSelection';
import Registration from './containers/Registration/Registration';
import NotFound from './components/NotFound/NotFound';
import PaymentRedirect from './containers/PaymentRedirect/PaymentRedirect';
import PaymentStatus from './containers/PaymentStatus/PaymentStatus';
import Init from './containers/Init/Init';
import ExamDates from './containers/ExamDates/ExamDates';
import RegistrationPage from './containers/Registration/RegistrationPage/RegistrationPage';
import ExamDetailsPage from './components/Registration/ExamDetailsPage/ExamDetailsPage';

const Registry = lazy(() => import('./containers/Registry/Registry'));
const ExamSessions = lazy(() =>
  import('./containers/ExamSessions/ExamSessions'),
);
const UnindividualizedList = lazy(() =>
  import('./containers/Unindividualized/UnindividualizedList'),
);

const rootReducer = combineReducers({
  registry: registryReducer,
  exam: examSessionReducer,
  registration: registrationReducer,
  user: userReducer,
  dates: examDatesReducer,
});

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk),
);

const app = () => (
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <Init>
        <Router basename={'/yki'}>
          <Switch>
            <ErrorBoundary>
              <Route exact path="/" component={Description} />
              <Route exact path="/ilmoittautuminen" component={Description} />
              <Route
                path="/ilmoittautuminen/valitse-kieli"
                component={LanguageSelection}
              />
              <Route
                path="/ilmoittautuminen/valitse-taso"
                component={LevelSelection}
              />
              <Route
                path="/ilmoittautuminen/valitse-paikkakunta"
                component={LocationSelection}
              />
              <Route
                path="/ilmoittautuminen/valitse-tutkintotilaisuus"
                component={Registration}
              />
              <Route
                path="/tutkintotilaisuus/:examSessionId"
                component={ExamDetailsPage}
              />
              <Route
                path="/ilmoittautuminen/tutkintotilaisuus/:examSessionId"
                component={RegistrationPage}
              />
              <Route
                path="/ilmoittautuminen/vanhentunut"
                component={LinkExpired}
              />
              <Route path="/maksu/vanhentunut" component={LinkExpired} />
              <Route path="/maksu/tila" component={PaymentStatus} />
              <Route
                path="/maksu/ilmoittautuminen/:registrationId"
                component={PaymentRedirect}
              />
              <Route
                path="/tutkintotilaisuudet"
                render={() => <ExamSessions />}
              />
              {/* TODO: change back to use component={Component} after react-router-dom updates version */}
              <Route path="/jarjestajarekisteri" render={() => <Registry />} />
              <Route path="/tutkintopaivat" render={() => <ExamDates />} />
              <Route path="/yksiloimattomat" render={() => <UnindividualizedList />} />
            </ErrorBoundary>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Init>
    </Suspense>
  </Provider>
);

export default app;
