/* eslint react/prop-types: 0 */
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Form, Field } from 'react-final-form';

import * as moment from 'moment';

import * as constants from '../../../common/Constants';
import * as api from '../../../api';
import Alert from '../../../components/Alert/Alert';
import { resetCreateOrganizer } from '../../../actions/index';

import ophStyles from '../../../oph-styles.css';
import styles from './OrganizerForm.css';

const mapStateToProps = state => {
  return {
    organizerAddResult: state.organizerAddResult,
  };
};

const errorClass = [ophStyles['oph-field-text'], ophStyles['oph-error']].join(
  ' ',
);
const labelClass = ophStyles['oph-label'];
const inputClass = ophStyles['oph-input'];
const requiredFieldClass = [
  ophStyles['oph-field'],
  ophStyles['oph-field-is-required'],
].join(' ');
const checkBoxButtonInputClass = ophStyles['oph-checkbox-button-input'];
const checkBoxButtonTextClass = ophStyles['oph-checkbox-button-text'];

const mapDispatchToProps = dispatch => {
  return {
    resetCreateOrganizer: () => dispatch(resetCreateOrganizer()),
  };
};

const getOrganizationName = org => {
  return org ? [org.nimi.fi, org.nimi.sv, org.nimi.en].filter(o => o)[0] : null;
};

const validDate = value =>
  moment(value, constants.DATE_FORMAT, true).isValid()
    ? undefined
    : 'Anna päivämäärä muodossa pp.kk.vvvv';

const required = value => (value ? undefined : 'Pakollinen');

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const onSubmit = values => {
  const languages = Object.keys(values.languages)
    .map(l => {
      if (values.languages[l]) {
        const codeAndLevel = l.split('-');
        return {
          language_code: codeAndLevel[0],
          level_code: codeAndLevel[1].toUpperCase(),
        };
      }
    })
    .filter(l => l);

  const request = {
    oid: values.oid,
    agreement_start_date: moment(
      values.validityStart,
      constants.DATE_FORMAT,
    ).toISOString(),
    agreement_end_date: moment(
      values.validityEnd,
      constants.DATE_FORMAT,
    ).toISOString(),
    contact_name: values.contactName,
    contact_email: values.contactPhoneNumber,
    contact_phone_number: values.contactEmail,
    languages: languages,
  };
  api.createOrganizer(request);
};

const inputWithMeta = (input, meta, label) => {
  return (
    <div className={requiredFieldClass}>
      <label className={labelClass}>{label}</label>
      <input {...input} className={inputClass} type="text" />
      {meta.error &&
        meta.touched && <div className={errorClass}>{meta.error}</div>}
    </div>
  );
};

const languageCheckBox = (language, level, index) => {
  const id = `${language}-${level}`;
  return (
    <Field key={index} name={`languages.${id}`} type="checkbox">
      {({ input }) => (
        <label htmlFor={id}>
          <input
            {...input}
            id={id}
            className={checkBoxButtonInputClass}
            type="checkbox"
            value="1"
          />
          <span className={checkBoxButtonTextClass}>{level}</span>
        </label>
      )}
    </Field>
  );
};

const all = ['perus', 'keski', 'ylin'];
const languageLevels = [
  { lang: 'Suomi', code: 'fi', levels: all },
  { lang: 'Ruotsi', code: 'sv', levels: all },
  { lang: 'Englanti', code: 'en', levels: all },
  { lang: 'Espanja', code: 'es', levels: all },
  { lang: 'Italia', code: 'it', levels: ['perus', 'keski'] },
  { lang: 'Ranska', code: 'fr', levels: all },
  { lang: 'Pohjoissaame', code: 'se', levels: all },
  { lang: 'Saksa', code: 'de', levels: all },
  { lang: 'Venäjä', code: 'ru', levels: all },
];

const createLanguageCheckboxes = () => {
  return languageLevels.map((ll, i) => {
    return (
      <fieldset key={i}>
        <legend>{ll.lang}</legend>
        {ll.levels.map((level, i) => {
          return languageCheckBox(ll.code, level, i);
        })}
      </fieldset>
    );
  });
};

class OrganizerForm extends Component {
  render() {
    const {
      organization,
      organizerAddResult,
      resetCreateOrganizer,
    } = this.props;
    return (
      <React.Fragment>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            oid: this.props.organization ? this.props.organization.oid : '',
            validityStart: moment(new Date()).format(constants.DATE_FORMAT),
          }}
          render={({
            handleSubmit,
            form,
            pristine,
            values,
            invalid,
            submitting,
          }) => (
            <form onSubmit={handleSubmit} className={styles.OrganizerForm}>
              <h4>{getOrganizationName(organization)}</h4>
              <fieldset>
                <legend>Sopimus</legend>
                <Field
                  name="validityStart"
                  validate={composeValidators(required, validDate)}
                >
                  {({ input, meta }) =>
                    inputWithMeta(input, meta, 'Alkupäivämäärä')
                  }
                </Field>
                <Field
                  name="validityEnd"
                  validate={composeValidators(required, validDate)}
                >
                  {({ input, meta }) =>
                    inputWithMeta(input, meta, 'Loppupäivämäärä')
                  }
                </Field>
              </fieldset>
              <fieldset>
                <legend>Yhteyshenkilö</legend>
                <Field name="contactName" validate={required}>
                  {({ input, meta }) => inputWithMeta(input, meta, 'Nimi')}
                </Field>
                <Field name="contactEmail" validate={required}>
                  {({ input, meta }) =>
                    inputWithMeta(input, meta, 'Sähköposti')
                  }
                </Field>
                <Field name="contactPhoneNumber" validate={required}>
                  {({ input, meta }) =>
                    inputWithMeta(input, meta, 'Puhelinnumero')
                  }
                </Field>
              </fieldset>
              <fieldset>
                <legend>Kielet</legend>
                <Field name="languages">
                  {({ input, meta }) => createLanguageCheckboxes()}
                </Field>
              </fieldset>
              <div className={styles.OrganizerFormSaveButton}>
                <button
                  type="submit"
                  disabled={
                    pristine || invalid || organizerAddResult || submitting
                  }
                  className={[
                    ophStyles['oph-button'],
                    ophStyles['oph-button-primary'],
                  ].join(' ')}
                >
                  Tallenna
                </button>
              </div>
            </form>
          )}
        />
        {organizerAddResult && (
          <Alert title="Järjestäjä lisätty" onClose={resetCreateOrganizer} />
        )}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrganizerForm);
