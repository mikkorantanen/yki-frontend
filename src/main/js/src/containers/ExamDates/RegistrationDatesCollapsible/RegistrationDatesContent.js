import React, {useState} from 'react';
import classes from './RegistrationDatesCollapsible.module.css';
import {useTranslation} from "react-i18next";
import ControlledCheckbox from "../../../components/UI/Checkbox/ControlledCheckbox";
import RegistrationPeriod from "../util/RegistrationPeriod";
import editIcon from "../../../assets/svg/edit.svg";
import {languageToString} from "../../../util/util";

const RegistrationDatesContent = ({content}) => {
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation();

  const mapByLangAndDate = () => {
    const tempArr = [];
    {content.map((item, i) => {
      for (let j = 0; item.languages.length > j; j++) {
        tempArr.push({
          id: i + 1,
          examDate: item.exam_date,
          languages: [{language_code: item.languages[j].language_code}],
          registration_start_date: item.registration_start_date,
          registration_end_date: item.registration_end_date,
        })
      }
    })}
    return tempArr;
  }

  const level = t('common.level.all');

  const language = ( lang ) => {
      return lang.languages.map(l => {
        return languageToString(l.language_code).toLowerCase();
      })
        .join(', ');
  };

  return (
    <>
      <div className={classes.Grid}>
        <ControlledCheckbox
          onChange={() => console.log('test!')}
          // checked={this.state.checkboxes[e.id]}
        />
        <h4>{t('common.registationPeriod')}</h4>
        <h4>{t('common.language')}</h4>
        <h4>{t('common.level')}</h4>
        <h4>{t('common.edit')}</h4>
      </div>
      <hr className={classes.GridDivider}/>
      <>
      {content.map((item, i) => {
        return (
          <div key={i} className={classes.Grid}>
            <ControlledCheckbox
              onChange={() => setChecked(!checked)}
              name={item.id}
              checked={checked}
            />
            <p><RegistrationPeriod withoutText period={[item]} /></p>
            <p>{language(item)}</p>
            <p>{level}</p>
            <button
              className={classes.EditButton}
              onClick={() => console.log('open editor for')}
            >
              <img src={editIcon} alt={'edit-icon'}/>
            </button>
          </div>
        )
      })}
      </>
    </>
  );
}

export default RegistrationDatesContent;