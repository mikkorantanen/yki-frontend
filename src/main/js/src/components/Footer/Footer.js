import React from 'react';

import classes from './Footer.module.css';

import OPHFooterLogo from '../../assets/images/OPH_Su_Ru_vaaka_nega.png';

// TODO: LOCALIZATIONS
const Footer = () => {
  return (
      <footer className={classes.Footer}>
        <div className={classes.FooterLinks}>
          <a href={'https://opintopolku.fi/'}>Opintopolku.fi</a>
          <a href={'https://www.oph.fi'}>Opetushallituksen kotisivu</a>
          <a href={'https://www.facebook.com/opetushallitus'}>Opetushallituksen Facebook-sivu</a>
        </div>
        <div className={classes.FooterContact}>
          <p>Hakaniemenranta 6
            <br/>
            PL 380, 00531 Helsinki</p>
          <p>Puhelin <a href={"tel: +358 29 533 1000"}>+358 29 533 1000</a>
            <br/>
            Faksi <a href={"tel: +358 29 533 1035"}>+358 29 533 1035</a></p>
        </div>
        <div className={classes.FooterLogo}>
          <img src={OPHFooterLogo} alt={'OPH-logo'}/>
        </div>
      </footer>
  )
};

export default Footer;
