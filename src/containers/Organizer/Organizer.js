/* eslint react/prop-types: 0 */
import React from 'react';

import { connect } from 'react-redux';
import format from 'date-fns/format';

import { loadOrganization } from '../../api/index';

const mapStateToProps = (state, props) => {
  return {
    organization: state.organizations[props.organizer.oid],
    error: state.error,
  };
};

const parseLanguages = languages => {
  let parsed = '';
  if (languages) {
    parsed = languages.map(l => {
      return `${l.language_code}-${l.level_code} `;
    });
  }
  return parsed;
};

export class Organizer extends React.Component {
  componentDidMount() {
    loadOrganization(this.props.organizer.oid);
  }
  render() {
    const { organizer, organization } = this.props;
    return organizer && organization ? (
      <tr key={organizer.oid}>
        <td>{organization.nimi.fi}</td>
        <td>
          {format(organizer.agreement_start_date, 'DD.MM.YYYY')} -{' '}
          {format(organizer.agreement_end_date, 'DD.MM.YYYY')}
        </td>
        <td>{parseLanguages(organizer.languages)}</td>
      </tr>
    ) : null;
  }
}

export default connect(mapStateToProps)(Organizer);
