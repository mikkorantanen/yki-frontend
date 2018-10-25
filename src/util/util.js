export const getMatchingName = (namesObj, lang) => {
  if (Object.keys(namesObj).length === 1) {
    return Object.values(namesObj)[0];
  } else {
    if (namesObj[lang]) {
      return namesObj[lang];
    } else {
      if (namesObj['fi']) {
        return namesObj['fi'];
      }
      if (namesObj['en']) {
        return namesObj['en'];
      }
      if (namesObj['sv']) {
        return namesObj['sv'];
      }
      return 'No Name Found';
    }
  }
};
