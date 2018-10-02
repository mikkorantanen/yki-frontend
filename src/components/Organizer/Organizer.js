/* eslint react/prop-types: 0 */

import React from 'react';

import classes from './Organizer.css';

const organizer = props => {
  console.log(props);

  const address = `${
    props.organization.kayntiosoite.osoite
  }, ${props.organization.kayntiosoite.postinumeroUri.split('_').pop()} ${
    props.organization.kayntiosoite.postitoimipaikka
  }`;

  let website = '';
  for (const key in props.organization.yhteystiedot) {
    if (props.organization.yhteystiedot[key].www) {
      website = props.organization.yhteystiedot[key].www;
    }
  }

  const contactPerson = `${props.organizer.contact_name} ${props.organizer.contact_email} ${
    props.organizer.contact_phone_number
  }`;

  return (
    <div className={classes.Organizer}>
      <h2>{props.organization.nimi.fi}</h2>
      <p>{website}</p>
      <p>
        <strong>Katuosoite</strong>
      </p>
      <p>{address}</p>
      <p>
        <strong>Yhteyshenkilö</strong>
      </p>
      <p>{contactPerson}</p>
    </div>
  );
};

export default organizer;
