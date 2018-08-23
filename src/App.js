import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import OrganizerRegistry from './containers/OrganizerRegistry/OrganizerRegistry';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <OrganizerRegistry />
        </Layout>
      </div>
    );
  }
}

export default App;
