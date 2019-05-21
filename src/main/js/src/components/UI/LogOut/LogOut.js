import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import classes from './LogOut.module.css';

const logOut = ({ user }) => {
  return (
    user ? 
      <React.Fragment>
      <a className={classes.LogOut} href={`/yki/auth/logout`}>
      {/* add translation */}
        Log out
      </a>
      </React.Fragment>
      : null
  );
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(logOut);