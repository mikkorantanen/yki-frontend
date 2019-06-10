import React from 'react';

import classes from './Header.module.css';
import Logo from '../UI/Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
import LanguageSelect from '../UI/LanguageSelect/LanguageSelect';
import LogOut from '../UI/LogOut/LogOut';

const header = ({ nav }) =>
  nav ? (
    <header className={classes.Header}>
      <nav>
        <NavigationItems />
      </nav>
    </header>
  ) : (
    <header className={classes.RegistrationHeader}>
      <Logo />
      <span>Opetushallitus</span>
      <div className={classes.HeaderLinksContainer}>
        <LogOut />
        <LanguageSelect />
      </div>
    </header>
  );

export default header;
