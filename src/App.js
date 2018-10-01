import React, { Component } from 'react';

import ophStyles from './oph-styles.css';
import Layout from './hoc/Layout/Layout';
import OrganizerRegistry from './containers/OrganizerRegistry/OrganizerRegistry';

class App extends Component {
  render() {
    return (
      <div className={ophStyles['oph-typography']}>
        <Layout>
          <OrganizerRegistry />
        </Layout>
      </div>
    );
  }
}

export default App;
