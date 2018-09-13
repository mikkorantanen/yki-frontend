import React, { Component } from 'react';

import { loadOrganizers } from '../../api/index';
import Organizers from '../../components/Organizers/Organizers';
import OrganizerForm from '../OrganizerForm/OrganizerForm';

import ophStyles from '../../oph-styles.css';
import styles from './OrganizerRegistry.css';

class OrganizerRegistry extends Component {
  constructor() {
    super();
    this.state = {
      showOrganizerForm: false,
    };
  }
  componentDidMount() {
    loadOrganizers();
  }
  render() {
    const showOrganizerForm = this.state.showOrganizerForm;
    return (
      <div className={styles.OrganizerRegistry}>
        <h2>Tutkintojen järjestäjät</h2>
        <Organizers />
        {showOrganizerForm ? (
          <OrganizerForm />
        ) : (
          <button
            type="submit"
            className={[
              ophStyles['oph-button'],
              ophStyles['oph-button-primary'],
            ].join(' ')}
            onClick={() => this.setState({ showOrganizerForm: true })}
          >
            Lisää
          </button>
        )}
      </div>
    );
  }
}

export default OrganizerRegistry;
