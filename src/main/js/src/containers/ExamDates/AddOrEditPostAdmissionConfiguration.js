import React, { Component } from 'react';
import moment from 'moment';
import { DATE_FORMAT } from '../../common/Constants';
import { languageToString } from '../../util/util';

// olemassaolevaa konfiguraatiota ei voi poistaa jos jälki-ilmoperiodi on käynnissä

const AddOrEditPostAdmissionConfiguration = ({ examDate }) => {
  return (examDate.post_admission_end_date ?
    (
      <div>
        <h1>Muokkaa jälki-ilmoittautumisasetuksia</h1>
        {/* { tähän jotain helpparitekstejä kertomaan jos konfiguraatiota ei voi poistaa } */}

        <ExamDateDetails examDate={examDate.exam_date} languages={examDate.languages} />
      </div>
    ) :
    (
      <div>
        <h1>Luo jälki-ilmoittautumisasetukset</h1>
        <ExamDateDetails examDate={examDate.exam_date} languages={examDate.languages} />
      </div>
    ))
}

const ExamDateDetails = ({ examDate, languages })=> (
  <div>
    <p>Tutkintopäivä: {moment(examDate).format(DATE_FORMAT)}</p>
    <p>Kielet: {languages.map(l => languageToString(l.language_code).toLowerCase()).join(', ')}</p>
  </div>
);

export default AddOrEditPostAdmissionConfiguration;