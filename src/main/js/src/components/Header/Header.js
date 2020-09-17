import React from 'react';

import classes from './Header.module.css';
import NavigationItems from './NavigationItems/NavigationItems';
import LanguageSelect from '../../containers/LanguageSelect/LanguageSelect';

import OPHLogo from '../../assets/svg/oph-logo-updated.svg';
import NavigationTabs from "./NavigationTabs/NavigationTabs";

const header = ({ nav }) =>
  nav ? (
    <header className={classes.Header}>
      <nav>
        <NavigationItems />
      </nav>
    </header>
  ) : (
    <header className={classes.RegistrationHeader}>
      <img src={OPHLogo} alt={'OPH-Logo'}/>
      <div className={classes.HeaderTabsContainer}>
        <NavigationTabs />
      </div>
      <LanguageSelect />
    </header>
  );

export default header;
