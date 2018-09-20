import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import styles from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import DrawerToggle from './DrawerToggle/DrawerToggle';

const sideDrawer = props => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <DrawerToggle />
      <div className={attachedStyles.join(' ')} onClick={props.closed}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <ul>
            <li>PlaceHolder for Navigation links</li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

sideDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  closed: PropTypes.func,
};

export default sideDrawer;
