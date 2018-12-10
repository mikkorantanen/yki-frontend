import React from 'react';

import classes from './RegistryItemDetails.module.css';
import Hyperlink from '../UI/Hyperlink/Hyperlink';
import { getLanguagesWithLevelDescriptions } from '../../util/registryUtil';

const registryItemDetails = props => {
  const languages = (
    <div className={classes.Languages}>
      <h3>Kielitutkinnot</h3>
      {getLanguagesWithLevelDescriptions(props.item.languages).map(lang => {
        return <p key={lang}>{lang}</p>;
      })}
    </div>
  );

  const address = `${props.item.address.street}, ${
    props.item.address.zipCode
  } ${props.item.address.city}`;

  const contact = (
    <div className={classes.Contact}>
      <h3>Yhteystiedot</h3>
      <p>{props.item.contact.name}</p>
      <Hyperlink type="phone" to={props.item.contact.phone} />
      <Hyperlink type="email" to={props.item.contact.email} />
      <p>{address}</p>
      <Hyperlink to={props.item.website} />
    </div>
  );

  const agreement = (
    <div className={props.agreementActive ? null : classes.AgreementExpired}>
      <h3>Järjestäjäsopimus</h3>
      <p>
        {props.item.agreement.start} - {props.item.agreement.end}
      </p>
    </div>
  );

  const extra = (
    <div className={classes.Extra}>
      <h3>Lisätiedot</h3>
      <p>{props.item.extra}</p>
    </div>
  );

  return (
    <div className={classes.RegistryItemDetails}>
      <div className={classes.Grid}>
        {languages}
        {contact}
        {agreement}
        {extra}
      </div>
      <button className={classes.Modify} onClick={props.clicked}>
        Muokkaa
      </button>
    </div>
  );
};

export default registryItemDetails;