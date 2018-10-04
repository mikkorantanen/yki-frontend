import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import ophStyles from './assets/css/oph-styles.css';
import Layout from './hoc/Layout/Layout';
import OrganizerRegistry from './containers/OrganizerRegistry/OrganizerRegistry';
import NewOrganizer from './containers/Organizers/AddOrganizer/AddOrganizer';

class App extends Component {
  render() {
    return (
      <div className={ophStyles['oph-typography']}>
        <Layout>
          <Switch>
            <Route exact path="/" component={OrganizerRegistry} />
            <Route exact path="/jarjestajarekisteri" component={OrganizerRegistry} />
            <Route path="/jarjestajarekisteri/uusi" component={NewOrganizer} />
            <Route path="/tutkintatilaisuudet" component={OrganizerRegistry} />
            <Route path="/jarjestajarekisteri" component={OrganizerRegistry} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
