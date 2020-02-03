import React, { Component } from 'react';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from '../../components/UI/DatePicker/DatePicker';
import { DATE_FORMAT } from '../../common/Constants';
import { languageToString } from '../../util/util';
import classes from './AddOrEditPostAdmissionConfiguration.module.css';

// olemassaolevaa konfiguraatiota ei voi poistaa jos jälki-ilmoperiodi on käynnissä

const ExamDateDetails = ({ examDate, languages }) => (
  <>
    <p>Tutkintopäivä: {moment(examDate).format(DATE_FORMAT)}</p>
    <p>Kielet: {languages.map(l => languageToString(l.language_code).toLowerCase()).join(', ')}</p>
  </>
);

const FormFields = examDates => (
  <Formik>

  </Formik>
)

const editView = examDate => (
  <>
    <h1>Muokkaa jälki-ilmoittautumisasetuksia</h1>
    {/* { tähän jotain helpparitekstejä kertomaan jos konfiguraatiota ei voi poistaa } */}

    <ExamDateDetails examDate={examDate.exam_date} languages={examDate.languages} />
  </>
);

const createView = examDate => (
  <>
    <h1>Luo jälki-ilmoittautumisasetukset</h1>
    <ExamDateDetails examDate={examDate.exam_date} languages={examDate.languages} />
  </>
);

const AddOrEditPostAdmissionConfiguration = ({ examDate }) => {
  console.log(examDate)
  return (
    examDate.post_admission_end_date ? editView(examDate) : createView(examDate)
  )
}

export default AddOrEditPostAdmissionConfiguration;
