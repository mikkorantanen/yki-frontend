import i18next from 'i18next';
import moment from 'moment';

import { LANGUAGES } from '../common/Constants';

export const capitalize = s =>
  s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

export const levelTranslations = {
  PERUS: 'common.level.basic',
  KESKI: 'common.level.middle',
  YLIN: 'common.level.high',
};

export const levelDescription = level => {
  return i18next.t(levelTranslations[level]);
};

export const languageToString = lang => {
  const found = LANGUAGES.find(l => l.code === lang);
  return found ? found.name : '';
};

export const languagesToString = array => {
  const list = getLanguagesWithLevelDescriptions(array);
  return list.map(lang => lang.split(' ')[0].toLowerCase()).join(', ');
};

export const getLanguagesWithLevelDescriptions = array => {
  const list = [];
  for (const lang in LANGUAGES) {
    const language = LANGUAGES[lang];
    const levels = array
      .filter(l => l.language_code === language.code)
      .map(l => l.level_code)
      .reduce((acc, l) => acc.concat(l), []);

    if (levels.length > 0) {
      const description =
        levels.length === language.levels.length
          ? i18next.t('common.level.all')
          : levels
              .map(l => levelDescription(l))
              .join(` ${i18next.t('common.and')} `);
      list.push(`${language.name} - ${capitalize(description)}`);
    }
  }
  return list;
};

export const inRegistryOrExamSessions = () => {
  return (
    window.location.href.includes('jarjestajarekisteri') ||
    window.location.href.includes('tutkintotilaisuudet')
  );
};

export const nowBetweenDates = (startDate, endDate) => {
  const now = moment(new Date());
  return now.isBetween(startDate, endDate, 'day', '[]');
};
