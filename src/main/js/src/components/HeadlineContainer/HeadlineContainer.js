import React from 'react';
import PropTypes from 'prop-types';

import classes from './HeadlineContainer.module.css';

/** HeadlineContainer takes props from parent:
 * headlineTitle as string, headlineContent as any/JSX element, headlineImage as string or object. */
const HeadlineContainer = (props) => {

    const {headlineTitle, headlineContent, headlineImage} = props;

    const desktopView = window.innerWidth > 425;

    return (
        <div className={classes.Headline}>
            <div className={classes.BaseContainer}>
                {desktopView ?
                    <div className={classes.HeadlineText}>
                        <h1>{headlineTitle}</h1>
                        <hr/>
                        {headlineContent}
                    </div>
                    :
                    <>
                        <div className={classes.HeadlineText}
                             style={{background: `url(${headlineImage})`, backgroundSize: '100%'}}>
                            <h1>{headlineTitle}</h1>
                        </div>
                        <div className={classes.HeadlineMobileContent}>
                            {headlineContent}
                        </div>
                    </>
                }
            </div>
            {desktopView ?
                <div className={classes.BaseContainer}>
                    <div className={classes.ImageContainer} aria-disabled>
                        <img aria-disabled src={headlineImage} alt={'headline'}/>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

HeadlineContainer.propTypes = {
    headlineTitle: PropTypes.string.isRequired,
    headlineContent: PropTypes.element,
    headlineImage: PropTypes.string
};

export default HeadlineContainer;