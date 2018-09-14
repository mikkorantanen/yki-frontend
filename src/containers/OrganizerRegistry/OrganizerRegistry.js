import React, { Component } from 'react';

import * as api from '../../api';
import Organizers from '../../components/Organizers/Organizers';
import OrganizerForm from '../OrganizerForm/OrganizerForm';
import OrganizationSearch from '../OrganizationSearch/OrganizationSearch';

import ophStyles from '../../oph-styles.css';
import styles from './OrganizerRegistry.css';

class OrganizerRegistry extends Component {
  constructor() {
    super();
    this.state = {
      showOrganizerForm: false,
    };
  }
  componentDidMount = async () => {
    const response = await api.loadOrganizers();
    const oids = response.organizers.map(o => o.oid);
    api.loadOrganizationsByOids(oids);
  };
  render() {
    const showOrganizerForm = this.state.showOrganizerForm;
    return (
      <div className={styles.OrganizerRegistry}>
        <h2>Tutkintojen järjestäjät</h2>
        <Organizers />
        {showOrganizerForm ? (
          <OrganizationSearch />
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
