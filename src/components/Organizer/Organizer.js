import React from 'react';
import PropTypes from 'prop-types';

import classes from './Organizer.css';
import moment from 'moment';
import * as constants from '../../common/Constants';

const organizer = props => {
  const address = (
    <p>
      {props.organization.kayntiosoite.osoite},{' '}
      {props.organization.kayntiosoite.postinumeroUri.split('_').pop()}{' '}
      {props.organization.kayntiosoite.postitoimipaikka}{' '}
    </p>
  );
  const website = (
    <p>
      {props.organization.yhteystiedot.map(yht => {
        if (yht.www) {
          return yht.www;
        }
      })}
    </p>
  );

  const contactPerson = (
    <p>
      {props.organizer.contact_name} {props.organizer.contact_email}{' '}
      {props.organizer.contact_phone_number}
    </p>
  );

  const contractDuration = (
    <p>
      {moment(props.organizer.agreement_start_date).format(constants.DATE_FORMAT)} -{' '}
      {moment(props.organizer.agreement_end_date).format(constants.DATE_FORMAT)}
    </p>
  );

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

  const languages = props.organizer.languages
    ? props.organizer.languages.map(lang => {
        return (
          <p key={lang.language_code + lang.level_code}>
            {languageCodeToLanguage[lang.language_code]} / {levelCodeToLevel[lang.level_code]}
          </p>
        );
      })
    : '-';

  return (
    <div className={classes.Organizer}>
      <h2>{props.organization.nimi.fi}</h2>
      {website}
      <strong>Sopimuskausi</strong>
      {contractDuration}
      <strong>Katuosoite</strong>
      {address}
      <strong>Yhteyshenkilö</strong>
      {contactPerson}
      <strong>Kielet</strong>
      {languages}
    </div>
  );
};

organizer.propTypes = {
  organizer: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};

export default organizer;
