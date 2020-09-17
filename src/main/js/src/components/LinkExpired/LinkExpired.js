import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import classes from './LinkExpired.module.css';
import BackButton from "../Registration/BackButton/BackButton";

export const linkExpired = props => {

  const {history, match} = props;

  const key = () => {
    switch (match.path) {
      case '/ilmoittautuminen/vanhentunut': {
        return 'registration.expired.loginlink';
      }
      case '/maksu/vanhentunut': {
        return 'registration.expired.paymentlink';
      }
      default: {
        return 'registration.expired.link';
      }
    }
  };

  return (
    <>
      <main className={classes.Content}>
        <BackButton
            clicked={() =>
                history.push('/')
            }
        />
        <h1 data-cy="link-expired-header">{props.t(key())}</h1>
        <p>{props.t(`${key()}.info`)}</p>
      </main>
    </>
  );
};

linkExpired.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withTranslation()(linkExpired);
