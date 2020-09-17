import React from 'react';
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classes from "./NavigationTabs.module.css";

const NavigationTabs = () => {
  const location = useLocation();
  const {t} = useTranslation();

  return (
      <>
        <div className={location.pathname === '/' ? classes.ActiveTab : classes.InactiveTab}>
          {/* todo: add new localization! */}
          <a href={'/'}>{'Esittely ja hinnasto'}</a>
        </div>
        <div className={location.pathname === '/' ? classes.InactiveTab : classes.ActiveTab}>
          <a href={`/yki${t('registration.path.select.exam')}`}>{t('common.registration')}</a>
        </div>
      </>
  );
}

export default NavigationTabs;