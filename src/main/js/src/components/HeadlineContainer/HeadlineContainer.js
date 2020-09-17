import React from 'react';
import PropTypes from 'prop-types';

import classes from './HeadlineContainer.module.css';

/** HeadlineContainer takes props from parent:
 * headlineTitle as string, headlineContent as any/JSX element, headlineImage as string or object. */
const HeadlineContainer = (props) => {

  const {headlineTitle, headlineContent, headlineImage} = props;

  return (
      <div className={classes.Headline}>
        <div className={classes.BaseContainer}>
          <div className={classes.HeadlineText}>
            <h1>{headlineTitle}</h1>
            <hr/>
            {headlineContent}
          </div>
        </div>
        <div className={classes.BaseContainer}>
          <div className={classes.ImageContainer} aria-disabled>
            <img aria-disabled src={headlineImage} alt={'headline'}/>
          </div>
        </div>
      </div>
  )
}

HeadlineContainer.propTypes = {
  headlineTitle: PropTypes.string.isRequired,
  headlineContent: PropTypes.element,
  headlineImage: PropTypes.string
};


export default HeadlineContainer;