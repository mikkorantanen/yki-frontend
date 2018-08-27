import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.css';

const backdrop = props =>
  props.show ? (
    <div className={styles.Backdrop} onClick={props.clicked} />
  ) : null;

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clicked: PropTypes.func,
};

export default backdrop;
