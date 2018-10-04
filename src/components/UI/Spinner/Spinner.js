import React from 'react';

import ophStyles from '../../../assets/css/oph-styles.css';

const spinner = () => (
  <div className={ophStyles['oph-spinner']} aria-label="Loading">
    <div className={[ophStyles['oph-bounce'], ophStyles['oph-bounce1']].join(' ')} />
    <div className={[ophStyles['oph-bounce'], ophStyles['oph-bounce2']].join(' ')} />
    <div className={[ophStyles['oph-bounce'], ophStyles['oph-bounce3']].join(' ')} />
  </div>
);

export default spinner;
