import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import OrganizerRegistry from './containers/OrganizerRegistry/OrganizerRegistry';
import ophStyles from './oph-styles.css';

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
