/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

import styles from './OrganizerAdd.css';

import { connect } from 'react-redux';

import * as api from '../../api';

import OrganizerForm from '../OrganizerForm/OrganizerForm';

import ophStyles from '../../oph-styles.css';

const searchOrganizations = AwesomeDebouncePromise(
  api.loadOrganizationsByFreeText,
  500,
);

const mapStateToProps = state => {
  return {
    organizationsSearchResult: state.organizationsSearchResult,
    error: state.error,
  };
};

export class OrganizerAdd extends Component {
  constructor() {
    super();
    this.state = {
      seachText: '',
      selectedOption: '',
      showForm: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = async event => {
    const seachText = event.target.value;
    this.setState({ seachText: seachText });
    searchOrganizations(seachText);
  };

  handleOptionChange = changeEvent => {
    this.setState({ selectedOption: changeEvent.target.value, showForm: true });
  };

  render() {
    const { seachText, showForm, selectedOption } = this.state;
    const foundOrganizations = this.props.organizationsSearchResult;
    const count = foundOrganizations.length;
    const selectedOrganization = foundOrganizations.find(
      o => o.oid === selectedOption,
    );
    return (
      <div>
        <h2>Järjestäjän lisääminen</h2>
        <div>
          <label
            className={styles.OrganizerAddLabel}
            htmlFor="organizationSearchField"
          >
            Haku
          </label>
          <input
            type="text"
            id="organizationSearchField"
            value={seachText}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <form className={styles.OrganizerAddForm}>
            {count === 0 && <span>Ei hakutuloksia</span>}
            {count > 20 ? (
              <span>Löytyi {count} organisaatiota, tarkenna hakua</span>
            ) : (
              foundOrganizations.map((org, i) => (
                <div key={i} className="radio">
                  <label>
                    <input
                      type="radio"
                      value={org.oid}
                      checked={selectedOption === org.oid}
                      onChange={this.handleOptionChange}
                    />
                    {[org.nimi.fi, org.nimi.sv, org.nimi.en].filter(o => o)[0]}
                  </label>
                </div>
              ))
            )}
            {/* {foundOrganizations.map((org, i) => (
              <div key={i} className="radio">
                <label>
                  <input
                    type="radio"
                    value={org.oid}
                    checked={selectedOption === org.oid}
                    onChange={this.handleOptionChange}
                  />
                  {[org.nimi.fi, org.nimi.sv, org.nimi.en].filter(o => o)[0]}
                </label>
              </div>
            ))} */}
          </form>
        </div>
        {showForm && <OrganizerForm organization={selectedOrganization} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrganizerAdd);
