import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import DrawerToggle from './DrawerToggle/DrawerToggle';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed} />
      <DrawerToggle />
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
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
