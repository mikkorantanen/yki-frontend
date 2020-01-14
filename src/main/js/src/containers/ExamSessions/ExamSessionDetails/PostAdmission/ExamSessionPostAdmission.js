import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const postAdmission = this.props.examSession.post_admission;
    return (
      <div data-cy="exam-session-post-admission">
        <h2> Jälki-ilmoittautuminen </h2>
        {postAdmission ? 
          <ExamSessionPostAdmissionEdit postAdmission={postAdmission} /> : (
            this.state.createMode ? <ExamSessionPostAdmissionCreate examSession={this.props.examSession} onCancel={this.toggleCreateMode} /> : (
            <div data-cy="exam-session-no-post-admission">
              <button 
                className={classes.Button} 
                data-cy="button-add-post-admission"
                onClick={() => this.toggleCreateMode()}
              >
                Luo jälki-ilmoittautuminen
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