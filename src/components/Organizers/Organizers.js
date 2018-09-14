/* eslint react/prop-types: 0 */
import React from 'react';

import { connect } from 'react-redux';

import Organizer from '../../containers/Organizer/Organizer';

import styles from './Organizers.css';

const mapStateToProps = state => {
  return {
    organizers: state.organizers,
    organizations: state.organizations,
    error: state.error,
  };
};

const getOrganization = (oid, organizations) => {
  return organizations.find(o => o.oid === oid);
};

export const Organizers = ({ organizers, organizations, error }) => (
  <div className={styles.Organizers}>
    {error && <p>Error getting organizers</p>}
    {organizers.length > 0 && (
      <table>
        <thead>
          <tr>
            <td>Paikkakunta</td>
            <td>Järjestäjä</td>
            <td>Voimassaolo</td>
            <td>Kielet</td>
            <td>Yhteyshenkilö</td>
          </tr>
        </thead>
        <tbody>
          {organizers.map((org, i) => (
            <Organizer
              key={i}
              organizer={org}
              organization={getOrganization(org.oid, organizations)}
            />
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default connect(mapStateToProps)(Organizers);
