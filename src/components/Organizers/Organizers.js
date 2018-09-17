/* eslint react/prop-types: 0 */
import React from 'react';

import { connect } from 'react-redux';

import Organizer from '../../containers/Organizer/Organizer';
import Spinner from '../Spinner/Spinner';
import styles from './Organizers.css';
import ophStyles from '../../oph-styles.css';

const mapStateToProps = state => {
  return {
    organizers: state.organizers,
    organizations: state.organizations,
    error: state.error,
    apiPending: state.busyCounter > 0,
  };
};

const getOrganization = (oid, organizations) => {
  return organizations.find(o => o.oid === oid);
};

export const Organizers = ({
  organizers,
  organizations,
  apiPending,
  error,
}) => (
  <div className={styles.Organizers}>
    <h2>Tutkintojen järjestäjät</h2>
    {error && <p>Virhe tietojen haussa</p>}
    {apiPending && <Spinner />}
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
