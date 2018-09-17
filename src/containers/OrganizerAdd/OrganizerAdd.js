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
    organizers: state.organizers,
    organizationsSearchResult: state.organizationsSearchResult,
    organizerAddResult: state.organizerAddResult,
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
    const {
      organizers,
      organizationsSearchResult,
      organizerAddResult,
    } = this.props;
    const organizationsWithoutOrganizer = organizationsSearchResult.filter(
      f => !organizers.some(o => o.oid === f.oid),
    );
    const count = organizationsWithoutOrganizer.length;
    const selectedOrganization = organizationsWithoutOrganizer.find(
      o => o.oid === selectedOption,
    );
    return (
      <div>
        <h2>Järjestäjän lisääminen</h2>
        {organizerAddResult === true && (
          <h3>Järjestäjän lisääminen onnistui</h3>
        )}
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
            {count > 30 ? (
              <span>Löytyi {count} organisaatiota, tarkenna hakua</span>
            ) : (
              organizationsWithoutOrganizer.map((org, i) => (
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
          </form>
        </div>
        {showForm && <OrganizerForm organization={selectedOrganization} />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(OrganizerAdd);
