import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const formikCheckbox = ({ field, type }) => {
  return (
    <label>
      Jononotifikaatio
      <input {...field} type={type} />
    </label>
  )
}

export class ExamSessionPostAdmissionCreate extends Component {
  render() {
    return (
      <Formik>
        <Form>
          <div data-cy="post-admission-form-create">
            <div>
              <label htmlFor="postAdmissionStart">Aloitusajankohta</label>
              <Field
                id="post-admission-start"
                name="postAdmissionStart"
                data-cy="input-admission-start"
              />
            </div>
            <div>
              <label htmlFor="postAdmissionEnd">Lopetusajankohta</label>
              <Field
                id="post-admission-end"
                name="postAdmissionEnd"
                data-cy="input-admission-end"
              />
            </div>
            <div>
              <label htmlFor="postAdmissionParticipantAmount">Paikkojen määrä</label>
              <Field
                id="post-admission-participant-amount"
                name="postAdmissionParticipantAmount"
                data-cy="input-admission-participant-amount"
              />
            </div>
            <div>
              <Field
                id="post-admission-notify-queue"
                name="postAdmissionNotifyQueue"
                data-cy="input-admission-notify-queue"
                type="checkbox"
                component={formikCheckbox}
              />
            </div>
            <div data-cy="admission-create-form-controls">
              <button>
                Ok
              </button>
              {/* muista propType */}
              <button onClick={this.props.onCancel}>
                Peruuta
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    )
  }
}