import React from 'react';
import PropTypes from 'prop-types';

import classes from './Checkbox.module.css';

const checkbox = props => (
  <label className={classes.Container}>
    <input
      type="checkbox"
      onChange={props.onChange}
      defaultChecked={props.checked || false}
      disabled={props.disabled}
    />
    <span className={classes.Checkmark} data-cy={props.datacy} />
  </label>
);

checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  /* todo: poista disabled jos ei tarpeen */
  disabled: PropTypes.bool,
  datacy: PropTypes.string,

};

export default checkbox;
