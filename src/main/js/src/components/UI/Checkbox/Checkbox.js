import React from 'react';
import PropTypes from 'prop-types';

import classes from './Checkbox.module.css';

const checkbox = props => (
  <label className={classes.Container}>
    <input
      type="checkbox"
      onChange={props.onChange}
      defaultChecked={props.checked || false}
      aria-label={props.ariaLabel || null}
    />
    <span className={classes.Checkmark} />
  </label>
);

checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  ariaLabel: PropTypes.string
};

export default checkbox;
