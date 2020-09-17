import React from 'react';

import classes from './Footer.module.css';

import OPHFooterLogo from '../../assets/images/OPH_Su_Ru_vaaka_nega.png';

// TODO: LOCALIZATIONS
const Footer = () => {
  return (
      <footer className={classes.Footer}>
        <div className={classes.FooterLinks}>
          <a href={'https://opintopolku.fi/'}>Opintopolku.fi</a>
          <a href={'https://www.oph.fi'}>Opintohallituksen kotisivu</a>
          <a href={'https://www.facebook.com/opetushallitus'}>Opetushallituksen Facebook-sivu</a>
        </div>
        <div className={classes.FooterText}>
          <p>Hakaniemenranta 6 PL 380, </p>
          <p>00531 Helsinki</p>
          <p>Puhelin +358 29 533 1000</p>
          <p>Faksi +358 29 533 1035</p>
        </div>
        <div className={classes.FooterLogo}>
          <img src={ OPHFooterLogo } alt={'OPH-logo'} />
        </div>
      </footer>
  )
};

export default Footer;
