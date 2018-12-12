import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import classes from './RegistryItemDetails.module.css';
import Hyperlink from '../UI/Hyperlink/Hyperlink';
import { getLanguagesWithLevelDescriptions } from '../../util/registryUtil';
import { DATE_FORMAT } from '../../common/Constants';

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
        {moment(props.item.agreement.start).format(DATE_FORMAT)} -{' '}
        {moment(props.item.agreement.end).format(DATE_FORMAT)}
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
      <button className={classes.Update} onClick={props.clicked}>
        Muokkaa
      </button>
    </div>
  );
};

registryItemDetails.propTypes = {
  item: PropTypes.object.isRequired,
  clicked: PropTypes.func.isRequired,
};

export default registryItemDetails;
