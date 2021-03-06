import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Description.module.css';
import Header from '../../../components/Header/Header';

const description = ({ history }) => {
  const { t } = useTranslation();

  document.title = 'YKI';

  return (
    <React.Fragment>
      <Header />
      <main className={classes.Content}>
        <article>
          <h1>{t('registration.description.title')}</h1>
          <p>{t('registration.description.text1')}</p>
          <p>{t('registration.description.text2')}</p>
          <p>{t('registration.description.text3')}</p>
          <p>{t('registration.description.text4')}</p>
          <p>{t('common.level.basic.price')}</p>
          <p>{t('common.level.intermediate.price')}</p>
          <p>{t('common.level.advanced.price')}</p>
          <p>
            <a
              href={t('registration.tutorial.url')}
              rel="noopener noreferrer"
              target="_blank"
            >
              {t('registration.tutorial')}
            </a>
          </p>
        </article>
        <button
          className={classes.ContinueButton}
          data-cy="continue-button"
          onClick={() => history.push(t('registration.path.select.language'))}
          role="link"
        >
          {t('registration.description.continue')}
        </button>
      </main>
    </React.Fragment>
  );
};

export default description;
