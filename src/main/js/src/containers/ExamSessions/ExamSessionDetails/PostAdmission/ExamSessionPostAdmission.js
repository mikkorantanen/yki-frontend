import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import ExamSessionPostAdmissionEdit from './ExamSessionPostAdmissionEdit';
import ExamSessionPostAdmissionCreate from './ExamSessionPostAdmissionCreate';
import Spinner from '../../../../components/UI/Spinner/Spinner';
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

    if (this.props.examSession.post_admission_end_date === null) {
      // Post admission not available
      return <p>{t('examSession.postAdmission.notAllowed')}</p>
    } else if (this.props.examSession.post_admission_end_date) {
      // Possible to create PostAdmission
      if (postAdmission) {
        // Show Edit view
        return <ExamSessionPostAdmissionEdit postAdmission={postAdmission} examSessionId={this.props.examSession.id} postAdmissionMinDate={this.props.examSession.registration_end_date} postAdmissionEndDate={this.props.examSession.post_admission_end_date} />
      } else if (this.state.createMode) {
        // Show Create view
        return <ExamSessionPostAdmissionCreate examSessionId={this.props.examSession.id} postAdmissionMinDate={this.props.examSession.registration_end_date} postAdmissionEndDate={this.props.examSession.post_admission_end_date} onCancel={this.toggleCreateMode} />
      } else {
        // Show Create button
        return (
          <div data-cy="exam-session-no-post-admission">
            <button
              className={classes.Button}
              data-cy="button-add-post-admission"
              onClick={() => this.toggleCreateMode()}
            >
              {t('examSession.postAdmission.create')}
            </button>
          </div>
        )
      }
    }
  }
}

ExamSessionPostAdmission.propTypes = {
  examSession: PropTypes.object.isRequired,
}

export default withTranslation()(ExamSessionPostAdmission);
