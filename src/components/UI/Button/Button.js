/* eslint react/prop-types: 0 */
import React from 'react';

import classes from './Button.css';
import ophStyles from '../../../assets/css/oph-styles.css';

const button = props => (
  <button
    disabled={props.disabled}
    className={[
      ophStyles['oph-button'],
      ophStyles['oph-button-primary'],
      classes.Button,
      classes[props.btnType],
    ].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;
