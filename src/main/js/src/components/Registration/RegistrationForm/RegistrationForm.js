import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withTranslation } from 'react-i18next';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import moment from 'moment';

import classes from './RegistrationForm.module.css';
import Button from '../../UI/Button/Button';
import RadioButton from '../../UI/RadioButton/RadioButton';
import NationalitySelect from './NationalitySelect/NationalitySelect';
import ZipAndPostOffice from '../../ZipAndPostOffice/ZipAndPostOffice';
import GenderSelect from './GenderSelect/GenderSelect';
import { DATE_FORMAT, ISO_DATE_FORMAT_SHORT } from '../../../common/Constants';
import RegistrationError from '../RegistrationError/RegistrationError';

export const registrationForm = props => {
  const mandatoryErrorMsg = props.t('error.mandatory');
  const maxErrorMsg = props.t('error.max');

  function validatePhoneNumber(value) {
    if (value) {
      const phoneNumber = parsePhoneNumberFromString(value);
      return phoneNumber && phoneNumber.isValid();
    } else {
      return true;
    }
  }

  function validateBirthDate(value) {
    if (props.initData.user.ssn) {
      return true;
    }
    if (value) {
      const date = moment(value, DATE_FORMAT, true);
      if (date.isValid() || date.isBefore(moment())) {
        return true;
      } else {
        return this.createError({ message: props.t('error.birthdate') });
      }
    } else {
      return this.createError({ message: mandatoryErrorMsg });
    }
  }

  function sameEmail(confirmEmail) {
    return confirmEmail === this.parent.email;
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(mandatoryErrorMsg)
      .max(128, maxErrorMsg),
    lastName: Yup.string()
      .required(mandatoryErrorMsg)
      .max(128, maxErrorMsg),
    streetAddress: Yup.string()
      .required(mandatoryErrorMsg)
      .max(128, maxErrorMsg),
    zip: Yup.string()
      .required(mandatoryErrorMsg)
      .max(16, maxErrorMsg),
    postOffice: Yup.string()
      .required(mandatoryErrorMsg)
      .max(64, maxErrorMsg),
    phoneNumber: Yup.string()
      .required(mandatoryErrorMsg)
      .test(
        'invalid-phone-number',
        props.t('error.phoneNumber'),
        validatePhoneNumber,
      ),
    email: Yup.string()
      .email(props.t('error.email'))
      .required(mandatoryErrorMsg)
      .max(64, maxErrorMsg),
    nationality: Yup.string().required(mandatoryErrorMsg),
    confirmEmail: Yup.string().test(
      'same-email',
      props.t('error.confirmEmail'),
      sameEmail,
    ),
    birthdate: Yup.string().test(
      'invalid-birthdate',
      props.t('error.birthdate'),
      validateBirthDate,
    ),
    examLang: Yup.string().required(mandatoryErrorMsg),
    certificateLang: Yup.string().required(mandatoryErrorMsg),
  });

  const RadioButtonComponent = ({
    field: { name, value, onChange },
    id,
    checkedValue,
    label,
  }) => {
    return (
      <RadioButton
        name={name}
        id={id}
        checkedValue={checkedValue}
        value={value}
        onChange={onChange}
        label={label}
      />
    );
  };

  const RadioButtonGroup = ({
    value,
    id,
    label,
    className,
    children,
    error,
  }) => {
    return (
      <div className={className} id={id}>
        <h3>{label}</h3>
        {children}
        {error && value ? (
          <span className={classes.ErrorMessage}>{error}</span>
        ) : null}
      </div>
    );
  };

  const inputField = (name, placeholder = '', extra, type = 'text') => (
    <React.Fragment>
      <h3>{props.t(`registration.form.${name}`)}</h3>
      <Field
        name={name}
        data-cy={`input-${name}`}
        placeholder={placeholder}
        className={classes.TextInput}
        type={type}
        aria-label={props.t(`registration.form.aria.${name}`)}
      />
      {extra && <span>{extra}</span>}
      <ErrorMessage
        name={name}
        data-cy={`input-error-${name}`}
        component="span"
        className={classes.ErrorMessage}
      />
    </React.Fragment>
  );

  const readonlyWhenExistsInput = (name, initialValues, type) =>
    initialValues[name] && initialValues[name].length > 0 ? (
      <React.Fragment>
        <h3>{props.t(`registration.form.${name}`)}</h3>
        <span>{initialValues[name]}</span>
      </React.Fragment>
    ) : (
      inputField(name, null, null, type)
    );

  const showExamLang = () => {
    const lang = props.initData.exam_session.language_code;

    return !(lang === 'fin' || lang === 'swe');
  };

  const emptyIfAbsent = value => {
    return value ? value : '';
  };

  const getNationalityDesc = code => {
    const nationality = props.initData.nationalities.find(
      n => n.koodiArvo === code,
    );
    const metadata = nationality.metadata.find(m => m.kieli === 'FI');
    return metadata ? metadata.nimi : '';
  };

  return (
    <Formik
      initialValues={{
        firstName: emptyIfAbsent(props.initData.user.first_name),
        lastName: emptyIfAbsent(props.initData.user.last_name),
        streetAddress: emptyIfAbsent(props.initData.user.street_address),
        zip: emptyIfAbsent(props.initData.user.zip),
        postOffice: emptyIfAbsent(props.initData.user.post_office),
        nationality: props.initData.user.nationalities
          ? props.initData.user.nationalities[0]
          : '',
        birthdate: '',
        gender: '',
        phoneNumber: '',
        email: emptyIfAbsent(props.initData.user.email),
        confirmEmail: emptyIfAbsent(props.initData.user.email),
        examLang:
          props.initData.exam_session.language_code === 'swe' ? 'sv' : 'fi',
        certificateLang: 'fi',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        const payload = {
          first_name: values.firstName,
          last_name: values.lastName,
          nationalities: [values.nationality],
          nationality_desc: getNationalityDesc(values.nationality),
          ssn: props.initData.user.ssn,
          birthdate: values.birthdate
            ? moment(values.birthdate, DATE_FORMAT).format(
                ISO_DATE_FORMAT_SHORT,
              )
            : null,
          gender: values.gender,
          certificate_lang: values.certificateLang,
          exam_lang: values.examLang,
          post_office: values.postOffice,
          zip: values.zip,
          street_address: values.streetAddress,
          phone_number: parsePhoneNumberFromString(values.phoneNumber).format(
            'E.164',
          ),
          email: values.email,
        };
        props.onSubmitRegistrationForm(props.initData.registration_id, payload);
      }}
      render={({ values, isValid, errors, initialValues, setFieldValue }) => (
        <Form className={classes.Form}>
          <div data-cy="registration-form">
            <p>{props.t('registration.form.info')}</p>
            <div className={classes.FormElement}>
              {readonlyWhenExistsInput('firstName', initialValues)}
            </div>
            <div className={classes.FormElement}>
              {readonlyWhenExistsInput('lastName', initialValues)}
            </div>
            <div className={classes.FormElement}>
              {inputField('streetAddress')}
            </div>
            <div className={classes.FormElement}>
              <ZipAndPostOffice values={values} setFieldValue={setFieldValue} />
            </div>
            <div className={classes.FormElement}>
              {inputField('phoneNumber', null, ' (+358)', 'tel')}
            </div>
            <div className={classes.FormElement}>
              {readonlyWhenExistsInput('email', initialValues, 'email')}
            </div>
            {!props.initData.user.email && (
              <div className={classes.FormElement}>
                {inputField('confirmEmail', null, null, 'email')}
              </div>
            )}
            {!initialValues.nationality && (
              <div className={classes.FormElement}>
                <NationalitySelect
                  nationalities={props.initData.nationalities}
                  className={classes.NationalitySelect}
                />
              </div>
            )}
            {!props.initData.user.ssn && (
              <div className={classes.FormElement}>
                <div className={classes.Birthdate}>
                  {inputField(
                    'birthdate',
                    props.t('registration.form.birthdate.placeholder'),
                  )}
                </div>
                <div className={classes.Gender}>
                  <GenderSelect
                    genders={props.initData.genders}
                    className={classes.GenderSelect}
                  />
                </div>
              </div>
            )}
            {showExamLang() && (
              <div
                className={[classes.FormElement, classes.RadiobuttonGroup].join(
                  ' ',
                )}
              >
                <RadioButtonGroup
                  label={props.t('registration.form.examLang')}
                  value={values.examLang}
                  error={errors.examLang}
                >
                  <Field
                    component={RadioButtonComponent}
                    name="examLang"
                    id={'examLang-fi'}
                    checkedValue={'fi'}
                    label={props.t('common.language.fin')}
                  />
                  <Field
                    component={RadioButtonComponent}
                    name="examLang"
                    id={'examLang-sv'}
                    checkedValue={'sv'}
                    label={props.t('common.language.swe')}
                  />
                </RadioButtonGroup>
              </div>
            )}
            <div
              className={[classes.FormElement, classes.RadiobuttonGroup].join(
                ' ',
              )}
            >
              <RadioButtonGroup
                label={props.t('registration.form.certificateLang')}
                value={values.certificateLang}
                error={errors.certificateLang}
              >
                <Field
                  component={RadioButtonComponent}
                  name="certificateLang"
                  id={'certificateLang-fi'}
                  checkedValue={'fi'}
                  label={props.t('common.language.fin')}
                />
                <Field
                  component={RadioButtonComponent}
                  name="certificateLang"
                  id={'certificateLang-sv'}
                  checkedValue={'sv'}
                  label={props.t('common.language.swe')}
                />
                <Field
                  component={RadioButtonComponent}
                  name="certificateLang"
                  id={'certificateLang-en'}
                  checkedValue={'en'}
                  label={props.t('common.language.eng')}
                />
              </RadioButtonGroup>
            </div>
          </div>
          <p>{props.t('registration.form.specialArrangements.info')}</p>
          <p>{props.t('registration.form.summary.info')}</p>
          <Button
            type="submit"
            isRegistration={true}
            datacy="form-submit-button"
            btnType={!isValid || props.submitting ? 'Disabled' : null}
            ariaLabel={
              !isValid || props.submitting
                ? props.t('registration.form.aria.submit.button')
                : null
            }
          >
            {props.t('registration.form.submit.button')}
          </Button>
          {props.submitError && (
            <div data-cy="form-submit-error" className={classes.SubmitError}>
              <RegistrationError
                error={props.submitError}
                defaultKey={'error.registrationForm.submitFailed'}
              />
            </div>
          )}
        </Form>
      )}
    />
  );
};

registrationForm.propTypes = {
  initData: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
  onSubmitRegistrationForm: PropTypes.func.isRequired,
  submitError: PropTypes.object,
};

export default withTranslation()(registrationForm);
