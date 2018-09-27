/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import styles from './OrganizerAdd.css';
import ophStyles from '../../oph-styles.css';

import { connect } from 'react-redux';

import * as api from '../../api/api';
import OrganizerForm from './OrganizerForm/OrganizerForm';
import Spinner from '../../components/Spinner/Spinner';

const searchOrganizations = AwesomeDebouncePromise(
  api.loadOrganizationsByFreeText,
  500,
);

export class OrganizerAdd extends Component {
  constructor() {
    super();
    this.state = {
      seachText: '',
      selectedOption: null,
      showForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async event => {
    const seachText = event.target.value;
    this.setState({ seachText: seachText });
    searchOrganizations(seachText);
  };

  handleOnClick = oid => {
    this.setState({ selectedOption: oid });
  };

  render() {
    const { seachText, selectedOption } = this.state;
    const { organizers, organizationsSearchResult, apiPending } = this.props;
    const organizationsWithoutOrganizer = organizationsSearchResult.filter(
      f =>
        !organizers.some(o => o.oid === f.oid) &&
        f.organisaatiotyypit[0] === 'OPPILAITOS',
    );
    const count = organizationsWithoutOrganizer.length;
    const selectedOrganization = organizationsWithoutOrganizer.find(
      o => o.oid === selectedOption,
    );
    return (
      <div>
        <h2>Järjestäjän lisääminen</h2>
        {apiPending && <Spinner />}
        {selectedOption ? (
          <OrganizerForm organization={selectedOrganization} />
        ) : (
          <div className={styles.OrganizerAddSearch}>
            <form className={styles.OrganizerAddForm}>
              <div className={ophStyles['oph-field']}>
                <label
                  className={ophStyles['oph-label']}
                  htmlFor="organizationSearchField"
                >
                  Haku
                </label>
                <input
                  type="text"
                  id="organizationSearchField"
                  className={ophStyles['oph-input']}
                  value={seachText}
                  onChange={this.handleChange}
                />
              </div>
              {count === 0 && !apiPending && <span>Ei hakutuloksia</span>}
              {count > 30 ? (
                <span>Löytyi {count} organisaatiota, tarkenna hakua</span>
              ) : (
                organizationsWithoutOrganizer.map((org, i) => (
                  <div key={i}>
                    <button
                      className={[
                        styles.OrganizerAddResultButton,
                        ophStyles['oph-button'],
                        ophStyles['oph-button-ghost'],
                      ].join(' ')}
                      type="button"
                      onClick={() => this.handleOnClick(org.oid)}
                    >
                      {
                        [org.nimi.fi, org.nimi.sv, org.nimi.en].filter(
                          o => o,
                        )[0]
                      }
                    </button>
                  </div>
                ))
              )}
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    organizers: state.organizers,
    organizationsSearchResult: state.organizationsSearchResult,
    organizerAddResult: state.organizerAddResult,
    apiPending: state.busyCounter > 0,
  };
};

export default connect(mapStateToProps)(OrganizerAdd);
