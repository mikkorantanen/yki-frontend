import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from '../../../../components/UI/DatePicker/DatePicker';
import { DATE_FORMAT } from '../../../../common/Constants';

const examSessionPostAdmissionCreate = props => {
  const validationSchema = Yup.object().shape({
    postAdmissionStart: Yup.string().required('Pakollinen'),
    postAdmissionEnd: Yup.string().required('Pakollinen'),
    postAdmissionParticipantAmount: Yup.number().required().min(1, 'Vähintään 1').integer(),
    postAdmissionNotifyQueue: Yup.boolean(),
  });
  
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
        postAdmissionParticipantAmount: '',
        postAdmissionNotifyQueue: true,
      }}
      validationSchema={validationSchema}
      onSubmit={() => alert("test")}
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
                tabIndex="1"
              />
            </div>
            <div>
              <label htmlFor="postAdmissionParticipantAmount">Paikkojen määrä</label>
              <Field
                id="postAdmissionParticipantAmount"
                name="postAdmissionParticipantAmount"
                data-cy="input-admission-participant-amount"
                tabIndex="3"
              />
            </div>
            <div>
              <Field
                id="postAdmissionNotifyQueue"
                name="postAdmissionNotifyQueue"
                data-cy="input-admission-notify-queue"
                type="checkbox"
                component={formikCheckbox}
                tabIndex="4"
              />
            </div>
            <div data-cy="admission-create-form-controls">
              <button type="submit" tabIndex="5">
                Ok
              </button>
              
              <button type="button" onClick={props.onCancel} tabIndex="6">
                Peruuta
              </button>
            </div>
          </div>
        </Form>
      )}/>
    )
}

export default examSessionPostAdmissionCreate;