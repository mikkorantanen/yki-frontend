import React from 'react';
import PropTypes from 'prop-types';

import classes from './Hyperlink.module.css';

const hyperlink = props => {
  let prefix = '';

  switch (props.type) {
    case 'email':
      prefix = 'mailto:';
      break;
    case 'phone':
      prefix = 'tel:';
      break;
    default:
      prefix = '';
  }

  return (
    <a href={prefix + props.to} className={classes.Hyperlink}>
      {props.to}
    </a>
  );
};

hyperlink.propTypes = {
  to: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default hyperlink;
