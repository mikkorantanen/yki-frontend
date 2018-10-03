/* eslint react/prop-types: 0 */

import React from 'react';

import classes from './Organizer.css';

const organizer = props => {
  console.log(props);

  const address = `${
    props.organization.kayntiosoite.osoite
  }, ${props.organization.kayntiosoite.postinumeroUri.split('_').pop()} ${
    props.organization.kayntiosoite.postitoimipaikka
  }`;

  let website = '';
  for (const key in props.organization.yhteystiedot) {
    if (props.organization.yhteystiedot[key].www) {
      website = props.organization.yhteystiedot[key].www;
    }
  }

  const contactPerson = `${props.organizer.contact_name} ${props.organizer.contact_email} ${
    props.organizer.contact_phone_number
  }`;

  return (
    <div className={classes.Organizer}>
      <h2>{props.organization.nimi.fi}</h2>
      <p>{website}</p>
      <p>
        <strong>Katuosoite</strong>
      </p>
      <p>{address}</p>
      <p>
        <strong>Yhteyshenkilö</strong>
      </p>
      <p>{contactPerson}</p>
    </div>
  );
};

export default organizer;

/* eslint react/prop-types: 0 */
// import React from 'react';

// import * as moment from 'moment';

// import * as constants from '../../common/Constants';

// const languageCodeToLanguage = {
//   fi: 'suomi',
//   sv: 'ruotsi',
//   en: 'englanti',
//   es: 'espanja',
//   it: 'italia',
//   fr: 'ranska',
//   se: 'ruotsi',
//   de: 'saksa',
//   ru: 'venäjä',
// };

// const levelCodeToLevel = {
//   PERUS: 'perustaso',
//   KESKI: 'keskitaso',
//   YLIN: 'ylin taso',
// };

// const getLanguageTexts = languages => {
//   let parsed = '';
//   if (languages) {
//     parsed = languages.map(l => {
//       return `${languageCodeToLanguage[l.language_code]}/${levelCodeToLevel[l.level_code]} `;
//     });
//   }
//   return parsed;
// };

// const getContactPerson = organizer => {
//   return `${organizer.contact_name} ${organizer.contact_email} ${organizer.contact_phone_number}`;
// };

// export default class Organizer extends React.Component {
//   render() {
//     const { organizer, organization } = this.props;
//     return organizer && organization ? (
//       <tr key={organizer.oid}>
//         <td>{organization.postiosoite.postitoimipaikka}</td>
//         <td>{organization.nimi.fi}</td>
//         <td>
//           {moment(organizer.agreement_start_date).format(constants.DATE_FORMAT)} -{' '}
//           {moment(organizer.agreement_end_date).format(constants.DATE_FORMAT)}
//         </td>
//         <td>{getLanguageTexts(organizer.languages)}</td>
//         <td>{getContactPerson(organizer)}</td>
//       </tr>
//     ) : null;
//   }
// }
