import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
import { DATE_FORMAT } from '../../../../common/Constants';
import * as actions from '../../../../store/actions/index';
import classes from './ExamSessionPostAdmission.module.css'

const ExamSessionPostAdmissionCreate = props => {
  const t = props.t;
  const validationSchema = Yup.object().shape({
    postAdmissionStart: Yup.string().required(t('error.mandatory')),
    postAdmissionEnd: Yup.string().required(t('error.mandatory')),
    postAdmissionQuota: Yup.number().typeError(t('error.numeric.int')).required(t('error.mandatory')).positive(t('error.numeric.positive')).integer(t('error.numeric.int')),
  });

  const postAdmissionAddHandler = (postadmission) => {
    props.onPostAdmissionAdd(props.examSession.id, postadmission);
    props.onCancel();
  }

  const formikCheckbox = ({ field, type }) => {
    return (
      <label>
        Jononotifikaatio
        <input {...field} type={type} />
      </label>
    )
  }

  return (
    <Formik
      initialValues={{
        postAdmissionStart: '',
        postAdmissionEnd: '',
        postAdmissionQuota: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        const submitPayload = {
          post_admission_start_date: values.postAdmissionStart,
          post_admission_end_date: values.postAdmissionEnd,
          post_admission_quota: values.postAdmissionQuota
        }

        postAdmissionAddHandler(submitPayload);
      }}
      render={({ values, setFieldValue, isValid, handleReset }) => (
        <Form className={classes.Form}>
          <div data-cy="post-admission-form-create">
            <div>
              <label className={classes.Label} htmlFor="postAdmissionStart">{t('examSession.postAdmission.startDate')}</label>
              <DatePicker
                id="postAdmissionStart"
                className={`${classes.Input} ${classes.DatePicker}`}
                options={{
                  defaultDate: '',
                  value: values.postAdmissionStart,
                  minDate: moment(props.examSession.registration_end_date).add(1, 'days').format('YYYY MM DD')
                }}
                onChange={d =>
                  setFieldValue(
                    'postAdmissionStart',
                    moment(d[0], DATE_FORMAT).toISOString(),
                  )
                }
                locale={props.i18n.language}
                tabIndex="1"
              />
              <ErrorMessage
                name="postAdmissionStart"
                component="span"
                className={classes.ErrorMessage}
              />
            </div>
            <div>
              <label className={classes.Label} htmlFor="postAdmissionEnd">{t('examSession.postAdmission.endDate')}</label>
              <DatePicker
                id="postAdmissionEnd"
                className={`${classes.Input} ${classes.DatePicker}`}
                options={{
                  defaultDate: '',
                  value: values.postAdmissionStart,
                  minDate: moment(props.examSession.registration_end_date).add(1, 'days').format('YYYY MM DD')
                }}
                onChange={d =>
                  setFieldValue(
                    'postAdmissionEnd',
                    moment(d[0], DATE_FORMAT).toISOString(),
                  )
                }
                locale={props.i18n.language}
                tabIndex="2"
              />
              <ErrorMessage
                name="postAdmissionEnd"
                component="span"
                className={classes.ErrorMessage}
              />
            </div>
            <div>
              <label className={classes.Label} htmlFor="postAdmissionParticipantAmount">{t('examSession.postAdmission.participantAmount')}</label>
              <Field
                id="postAdmissionQuota"
                className={classes.Input}
                name="postAdmissionQuota"
                data-cy="input-admission-quota"
                tabIndex="3"
              />
              <ErrorMessage
                name="postAdmissionQuota"
                component="span"
                className={classes.ErrorMessage}
              />
            </div>
            <div className={classes.Buttons} data-cy="admission-create-form-controls">
              <button className={`${classes.Button} ${classes.ButtonRight}`} type="submit" tabIndex="4">
              {t('common.confirm')}
              </button>

              <button className={classes.Action} type="button" onClick={props.onCancel} tabIndex="5">
                {t('common.cancelConfirm')}
              </button>
            </div>
          </div>
        </Form>
      )}/>
    )
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onPostAdmissionAdd: (examSessionId, postadmission) =>
      dispatch(actions.addPostAdmission(examSessionId, postadmission))
  }
};

ExamSessionPostAdmissionCreate.propTypes = {
  examSession: PropTypes.object.isRequired,
  onPostAdmissionAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamSessionPostAdmissionCreate));
