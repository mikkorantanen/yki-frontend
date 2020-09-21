import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

import classes from "./NavigationTabs.module.css";
import LanguageSelect from "../../../containers/LanguageSelect/LanguageSelect";
import {useSelector} from "react-redux";

const isMobile = window.innerWidth < 425;

const NavigationTabs = (props) => {
  const [showLanguagesMenu, setLanguageMenuShow] = useState(false);
  const location = useLocation();
  const {t} = useTranslation();
  const state = useSelector(state => state);

  const handleOnClick = () => {
    setLanguageMenuShow(!showLanguagesMenu);
  }

  const baseLinks = () => {
    return (
        <>
          {/*TODO: hold state on navigation : check history props */}
          <div className={location.pathname === '/' ? classes.ActiveTab : classes.InactiveTab}>
            {/* todo: add new localization! */}
            <a href={'/'}>{'Esittely ja hinnasto'}</a>
          </div>
          <div className={location.pathname === '/' ? classes.InactiveTab : classes.ActiveTab}>
            <a href={`/yki${t('registration.path.select.exam')}=${state.yki.ykiLanguage}`}>{t('common.registration')}</a>
          </div>
        </>
    );
  };

  return (
      <>
        {showLanguagesMenu ?
            <LanguageSelect isOpen={props.isOpen} setCollapsibleOpen={props.setCollapsibleOpen}/>
            :
            <>
              {baseLinks()}
              {isMobile ?
                  <div onClick={() => handleOnClick()}>
                    <p className={classes.InactiveTab}>Kielen valinta</p>
                  </div>
                  :
                  null
              }
            </>
        }
      </>
  );
}

export default NavigationTabs;