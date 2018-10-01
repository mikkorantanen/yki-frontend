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
      <h3>{props.organization.nimi.fi}</h3>
      <p>{website}</p>
      <p>{address}</p>
      <p>Yhteyshenkilö: {contactPerson}</p>
    </div>
  );
};

export default organizer;
