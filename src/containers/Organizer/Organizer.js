/* eslint react/prop-types: 0 */
import React from 'react';

import format from 'date-fns/format';

import * as constants from '../../common/Constants';

const languageCodeToLanguage = {
  fi: 'suomi',
  sv: 'ruotsi',
  en: 'englanti',
  es: 'espanja',
  it: 'italia',
  fr: 'ranska',
  se: 'ruotsi',
  de: 'saksa',
  ru: 'venäjä',
};

const levelCodeToLevel = {
  PERUS: 'perustaso',
  KESKI: 'keskitaso',
  YLIN: 'ylin taso',
};

const getLanguageTexts = languages => {
  let parsed = '';
  if (languages) {
    parsed = languages.map(l => {
      return `${languageCodeToLanguage[l.language_code]}/${
        levelCodeToLevel[l.level_code]
      } `;
    });
  }
  return parsed;
};

const getContactPerson = organizer => {
  return `${organizer.contact_name} ${organizer.contact_email} ${
    organizer.contact_phone_number
  }`;
};

export default class Organizer extends React.Component {
  render() {
    const { organizer, organization } = this.props;
    return organizer && organization ? (
      <tr key={organizer.oid}>
        <td>{organization.postiosoite.postitoimipaikka}</td>
        <td>{organization.nimi.fi}</td>
        <td>
          {format(organizer.agreement_start_date, constants.DATE_FORMAT)} -{' '}
          {format(organizer.agreement_end_date, constants.DATE_FORMAT)}
        </td>
        <td>{getLanguageTexts(organizer.languages)}</td>
        <td>{getContactPerson(organizer)}</td>
      </tr>
    ) : null;
  }
}
