import React from 'react';

import Logo from '../../Logo/Logo';
import styles from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <drawerToggle />
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
    </Aux>
  );
};

export default sideDrawer;
