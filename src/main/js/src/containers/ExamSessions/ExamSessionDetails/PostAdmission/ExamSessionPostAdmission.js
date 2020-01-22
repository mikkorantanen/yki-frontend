import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { ExamSessionPostAdmissionEdit } from './ExamSessionPostAdmissionEdit';
import ExamSessionPostAdmissionCreate from './ExamSessionPostAdmissionCreate';
import classes from './ExamSessionPostAdmission.module.css';

export class ExamSessionPostAdmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createMode: false,
    }
  }

  toggleCreateMode = () => {
    this.setState({ createMode: !this.state.createMode });
  }

  render() {
    const t = this.props.t;
    const postAdmission = this.props.examSession.post_admission;
    return (
      <div data-cy="exam-session-post-admission">
        <h2> Jälki-ilmoittautuminen {/* {t('examSession.postAdmission')} */} </h2>
        {postAdmission ?
          <ExamSessionPostAdmissionEdit postAdmission={postAdmission} /> : (
            this.state.createMode ? <ExamSessionPostAdmissionCreate examSession={this.props.examSession} onCancel={this.toggleCreateMode} /> : (
            <div data-cy="exam-session-no-post-admission">
              <button
                className={classes.Button}
                data-cy="button-add-post-admission"
                onClick={() => this.toggleCreateMode()}
              >
                {t('examSession.postAdmission.create')}
              </button>
            </div>)
          )}
      </div>
    )
  }
}

ExamSessionPostAdmission.propTypes = {
  examSession: PropTypes.object.isRequired,
}

export default withTranslation()(ExamSessionPostAdmission);
