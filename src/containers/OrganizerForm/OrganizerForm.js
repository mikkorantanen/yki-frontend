import React, { Component } from 'react';

import styles from './OrganizerForm.css';

import format from 'date-fns/format';

import * as constants from '../../common/Constants';

import ophStyles from '../../oph-styles.css';

class OrganizerForm extends Component {
  constructor() {
    super();
    this.state = {
      organizer: '',
      validityStart: format(new Date(), constants.DATE_FORMAT),
      validityEnd: '',
      contactName: '',
      contactPhoneNumber: '',
      contactEmail: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { organizer } = this.state;
  }
  render() {
    const {
      organizer,
      validityStart,
      validityEnd,
      contactName,
      contactPhoneNumber,
      contactEmail,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Järjestäjän lisääminen</h2>
          <fieldset>
            <div className={styles.OrganizerFormRow}>
              <label htmlFor="organizer">Järjestäjä</label>
              <input
                type="text"
                id="organizer"
                value={organizer}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.OrganizerFormRow}>
              <label htmlFor="validity">Voimassaolo</label>
              <input
                type="text"
                id="validityStart"
                value={validityStart}
                onChange={this.handleChange}
              />
              -
              <input
                type="text"
                id="validityEnd"
                value={validityEnd}
                onChange={this.handleChange}
              />
            </div>
            <p>Yhteyshenkilö</p>
            <div className={styles.OrganizerFormRow}>
              <label htmlFor="contactName">Nimi</label>
              <input
                type="text"
                id="contactName"
                value={contactName}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.OrganizerFormRow}>
              <label htmlFor="contactEmail">Sähköposti</label>
              <input
                type="email"
                id="contactEmail"
                value={contactEmail}
                onChange={this.handleChange}
              />
            </div>
            <div className={styles.OrganizerFormRow}>
              <label htmlFor="contactPhoneNumber">Puhelinnumero</label>
              <input
                type="text"
                id="contactPhoneNumber"
                value={contactPhoneNumber}
                onChange={this.handleChange}
              />
            </div>
            <button
              type="submit"
              className={[
                ophStyles['oph-button'],
                ophStyles['oph-button-primary'],
              ].join(' ')}
            >
              Tallenna
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default OrganizerForm;
