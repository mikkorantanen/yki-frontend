import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
import { DATE_FORMAT } from '../../../../common/Constants';
import * as actions from '../../../../store/actions/index';

const ExamSessionPostAdmissionCreate = props => {
  const validationSchema = Yup.object().shape({
    postAdmissionStart: Yup.string().required('Pakollinen'),
    postAdmissionEnd: Yup.string().required('Pakollinen'),
    postAdmissionQuota: Yup.number().required().min(1, 'Vähintään 1').integer(),
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
        <Form>
          <div data-cy="post-admission-form-create">
            <div>
              <label htmlFor="postAdmissionStart">Aloitusajankohta</label>
              <DatePicker
                id="postAdmissionStart"
                options={{
                  defaultDate: '',
                  value: values.postAdmissionStart,
                }}
                onChange={d =>
                  setFieldValue(
                    'postAdmissionStart',
                    moment(d[0], DATE_FORMAT).toISOString(),
                  )
                }
                // locale={props.i18n.language}
                tabIndex="1"
              />
            </div>
            <div>
              <label htmlFor="postAdmissionEnd">Lopetusajankohta</label>
              <DatePicker
                id="postAdmissionEnd"
                options={{
                  defaultDate: '',
                  value: values.postAdmissionStart,
                }}
                onChange={d =>
                  setFieldValue(
                    'postAdmissionEnd',
                    moment(d[0], DATE_FORMAT).toISOString(),
                  )
                }
                // locale={props.i18n.language}
                tabIndex="2"
              />
            </div>
            <div>
              <label htmlFor="postAdmissionParticipantAmount">Paikkojen määrä</label>
              <Field
                id="postAdmissionQuota"
                name="postAdmissionQuota"
                data-cy="input-admission-quota"
                tabIndex="3"
              />
            </div>
            <div data-cy="admission-create-form-controls">
              <button type="submit" tabIndex="4">
                Ok
              </button>
              
              <button type="button" onClick={props.onCancel} tabIndex="5">
                Peruuta
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

export default connect(mapStateToProps, mapDispatchToProps)(ExamSessionPostAdmissionCreate);