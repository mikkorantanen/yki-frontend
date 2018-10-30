import React from 'react';
import PropTypes from 'prop-types';

import ophStyles from '../../oph-styles.css';

const alert = props => (
  <div className={ophStyles['oph-typography']}>
    <div className={[ophStyles['oph-alert'], ophStyles['oph-alert-success']].join(' ')}>
      <div className={ophStyles['oph-alert-container']}>
        <div className={ophStyles['oph-alert-title']}>{props.title}</div>
        {props.optionalText && (
          <div className={ophStyles['oph-alert-text']}>{props.optionalText}</div>
        )}
        <button
          className={[ophStyles['oph-button'], ophStyles['oph-button-close']].join(' ')}
          type="button"
          title="Close"
          aria-label="Close"
          onClick={props.onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  </div>
);

alert.PropTypes = {
  title: PropTypes.string,
  optionalText: PropTypes.string,
  onClose: PropTypes.func,
};

export default alert;
