import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import classes from './Organizer.css';
import Hyperlink from '../../components/UI/Hyperlink/Hyperlink';
import * as constants from '../../common/Constants';

const organizer = props => {
  const url = props.organization.yhteystiedot.find(org => {
    return org.www;
  }).www;

  const website = (
    <p>
      <Hyperlink to={url} />
    </p>
  );

  const address = (
    <p>
      <strong>Katuosoite</strong>
      <br />
      {props.organization.kayntiosoite.osoite},{' '}
      {props.organization.kayntiosoite.postinumeroUri.split('_').pop()}{' '}
      {props.organization.kayntiosoite.postitoimipaikka}{' '}
    </p>
  );

  const contactPerson = (
    <p>
      <strong>Yhteyshenkilö</strong> <br />
      {props.organizer.contact_name} <Hyperlink type="email" to={props.organizer.contact_email} />{' '}
      <Hyperlink type="phone" to={props.organizer.contact_phone_number} />
    </p>
  );

  const contractDuration = (
    <p>
      <strong>Sopimuskausi</strong>
      <br />
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

  const languages = (
    <div>
      <strong>Kielet</strong>
      <br />
      {props.organizer.languages
        ? props.organizer.languages.map(lang => {
            return (
              <p key={lang.language_code + lang.level_code}>
                {languageCodeToLanguage[lang.language_code]} / {levelCodeToLevel[lang.level_code]}
              </p>
            );
          })
        : '-'}
    </div>
  );

  return (
    <div className={classes.Organizer}>
      <h2>{props.organization.nimi.fi}</h2>
      {website}
      {contractDuration}
      {address}
      {contactPerson}
      {languages}
    </div>
  );
};

organizer.propTypes = {
  organizer: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};

export default organizer;
