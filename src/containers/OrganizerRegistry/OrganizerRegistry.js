import React, { Component } from 'react';

import { loadOrganizers } from '../../api/index';
import Organizers from '../../components/Organizers/Organizers';

import styles from './OrganizerRegistry.css';

class OrganizerRegistry extends Component {
  componentDidMount() {
    loadOrganizers();
  }
  render() {
    return (
      <div className={styles.OrganizerRegistry}>
        <Organizers />
      </div>
    );
  }
}

export default OrganizerRegistry;
