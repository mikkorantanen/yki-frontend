import React from 'react';
import PropTypes from 'prop-types';

import OPHLogo from '../../assets/images/oph_logo_vaaka.svg';
import styles from './Logo.css';

const logo = props => (
  <div className={styles.Logo} style={{ height: props.height }}>
    <img src={OPHLogo} alt="Opetushallitus" />
  </div>
);

logo.propTypes = {
  height: PropTypes.number,
};

export default logo;
