import React from 'react';
import PropTypes from 'prop-types';

import classes from './Page.module.css';
import Header from '../../components/Header/Header';

const page = props => (
  <React.Fragment>
    <Header nav />
    <main className={classes.Content}>{props.children}</main>
  </React.Fragment>
);

page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default page;
