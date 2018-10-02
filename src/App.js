import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ophStyles from './oph-styles.css';
import Layout from './hoc/Layout/Layout';
import OrganizerRegistry from './containers/OrganizerRegistry/OrganizerRegistry';

class App extends Component {
  render() {
    return (
      <div className={ophStyles['oph-typography']}>
        <Layout>
          <Switch>
            <Route exact path="/" component={OrganizerRegistry} />
            <Route path="/jarjestajarekisteri" component={OrganizerRegistry} />
            <Route path="/tutkintatilaisuudet" component={OrganizerRegistry} />
            <Route path="/jarjestajarekisteri" component={OrganizerRegistry} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
