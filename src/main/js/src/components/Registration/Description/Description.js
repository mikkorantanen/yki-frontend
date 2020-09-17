import React from 'react';
import {useTranslation} from 'react-i18next';

import HeadlineContainer from "../../HeadlineContainer/HeadlineContainer";
import DescriptionCollapsible from "../../DescriptionsCollapsible/DescriptionCollapsible";

import YkiImage1 from '../../../assets/images/ophYki_image1.png';

import classes from './Description.module.css';
import {levelTranslations} from "../../../util/util";

//TODO: new localizations and content!

const content = [
  {
    languageLevel: 'A1',
    descriptionText: 'Ymmärtää hitaasta ja selkeästä puheesta yksinkertaisia perustason ilmauksia, jotka liittyvät suoraan omaan elämään tai jotka koskevat välitöntä konkreettista ympäristöä. Pystyy ymmärtämään joitakin asioita helppotajuisista ja lyhyistä teksteistä. Selviää kaikkein yksinkertaisimmissa puhetilanteissa, mutta puhe on hidasta ja hyvin katkonaista ja ääntämisessä ja/tai kielen hallinnassa voi olla puutteita. Pystyy kirjoittamaan erittäin lyhyitä tekstejä, joissa on lukuisia kielellisiä puutteita.'
  },
  {
    languageLevel: 'A2',
    descriptionText: 'Ymmärtää selkeää ja yksinkertaistettua puhetta, joka käsittelee jokapäiväisiä ja tuttuja asioita. Ymmärtää helposti lyhyitä, yksinkertaisia tekstejä ja saa selville pääasiat jokapäiväisen elämän aihepiirejä käsittelevistä teksteistä. Selviää rutiininomaisissa yksinkertaista tiedonvaihtoa vaativissa puhetilanteissa, vaikka ääntäminen tai kielen hallinta voi olla vielä puutteellista. Pystyy kirjoittamaan suppeita, yksinkertaisia tekstejä jokapäiväisistä asioista, mutta teksti voi olla hajanaista.'
  }
];

const description = ({history}) => {
  const {t} = useTranslation();

  document.title = 'YKI';
  const examLevelsHeader = 'Tasojen kuvaukset';

  return (
      <>
        <main className={classes.Container}>
          <HeadlineContainer
              headlineTitle={t('registration.description.title')}
              headlineContent={<p>{t('registration.description.text1')}</p>}
              headlineImage={YkiImage1}
          />
          <div className={classes.InnerContainer}>
            <article className={classes.ArticleContent}>
              <p>{t('registration.description.text2')}</p>
              <p>{t('registration.description.text3')}</p>
              <p>{t('registration.description.text4')}</p>
            </article>
            <>
              <h2>{examLevelsHeader}</h2>
              <DescriptionCollapsible headerText={levelTranslations.PERUS} content={content}/>
              <DescriptionCollapsible headerText={levelTranslations.KESKI} content={content}/>
              <DescriptionCollapsible headerText={levelTranslations.YLIN} content={content}/>
            </>
            <>
              <button
                  className={'YkiButton'}
                  data-cy="continue-button"
                  onClick={() => history.push(t('registration.path.select.exam'))}
                  role="link"
              >
                {t('registration.register')}
              </button>
            </>
          </div>
          <div className={classes.PriceContainer}>
            <h2>Hinnasto</h2>
            <div className={classes.PriceBox}>
              <p>{t(levelTranslations.PERUS)}</p>
              <div className={classes.PriceTag}>
                <div className={classes.Price}>100</div>
                <div className={classes.Currency}>{'€'}</div>
              </div>
              <hr/>
              <p>{t(levelTranslations.KESKI)}</p>
              <div className={classes.PriceTag}>
                <div className={classes.Price}>123</div>
                <div className={classes.Currency}>{'€'}</div>
              </div>
              <hr/>
              <p>{t(levelTranslations.YLIN)}</p>
              <div className={classes.PriceTag}>
                <div className={classes.Price}>160</div>
                <div className={classes.Currency}>{'€'}</div>
              </div>
            </div>
          </div>
        </main>
      </>
  );
};

export default description;
