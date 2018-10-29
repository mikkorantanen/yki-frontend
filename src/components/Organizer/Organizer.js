import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import classes from './Organizer.module.css';
import Hyperlink from '../../components/UI/Hyperlink/Hyperlink';
import * as constants from '../../common/Constants';
import { getMatchingName } from '../../util/util';

const organizer = props => {
  const name = getMatchingName(props.organization.nimi, props.lang);

  const wwwObj = props.organization.yhteystiedot.find(org => {
    return org.www;
  });
  const url = wwwObj && wwwObj.www ? wwwObj.www : '-';
  const website = (
    <p>
      <Hyperlink to={url} />
    </p>
  );

  const address = () => {
    let addr = '';
    const addrInfo =
      Object.keys(props.organization.kayntiosoite).length >=
      Object.keys(props.organization.postiosoite).length
        ? props.organization.kayntiosoite
        : props.organization.postiosoite;
    const addrType =
      addrInfo.osoiteTyyppi === 'kaynti' ? 'Käyntiosoite' : 'Postiosoite';
    if (Object.keys(addrInfo).length !== 0) {
      addr += addrInfo.osoite ? addrInfo.osoite : '<katuosoite puuttuu>';
      addr += addrInfo.postinumeroUri
        ? ', ' + addrInfo.postinumeroUri.split('_').pop()
        : '';
      addr += addrInfo.postitoimipaikka ? ' ' + addrInfo.postitoimipaikka : '';
    }
    return (
      <p>
        <strong>{addrType}</strong>
        <br />
        {addr}
      </p>
    );
  };

  const contactPerson = (
    <p>
      <strong>Yhteyshenkilö</strong> <br />
      {props.organizer.contact_name}{' '}
      <Hyperlink type="email" to={props.organizer.contact_email} />{' '}
      <Hyperlink type="phone" to={props.organizer.contact_phone_number} />
    </p>
  );

  const contractDuration = (
    <p>
      <strong>Sopimuskausi</strong>
      <br />
      {moment(props.organizer.agreement_start_date).format(
        constants.DATE_FORMAT,
      )}{' '}
      -{' '}
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
                {languageCodeToLanguage[lang.language_code]} /{' '}
                {levelCodeToLevel[lang.level_code]}
              </p>
            );
          })
        : '-'}
    </div>
  );

  return (
    <div className={classes.Organizer}>
      <h3>{name}</h3>
      {website}
      {contractDuration}
      {address()}
      {contactPerson}
      {languages}
    </div>
  );
};

organizer.propTypes = {
  lang: PropTypes.string.isRequired,
  organizer: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
};

export default organizer;
