import React, { Component } from 'react';

import * as api from '../../api';
import Organizers from '../../components/Organizers/Organizers';
import OrganizerAdd from '../OrganizerAdd/OrganizerAdd';

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
        {showOrganizerForm ? (
          <OrganizerAdd />
        ) : (
          <React.Fragment>
            <Organizers />
            <button
              type="submit"
              className={[
                ophStyles['oph-button'],
                ophStyles['oph-button-primary'],
              ].join(' ')}
              onClick={() => this.setState({ showOrganizerForm: true })}
            >
              Lisää uusi
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default OrganizerRegistry;
