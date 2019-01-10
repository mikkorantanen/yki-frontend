import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';

import classes from './ExamSessionDetails.module.css';
import {
  DATE_FORMAT,
} from '../../../common/Constants';
import { getLanguagesWithLevelDescriptions } from '../../../util/util';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ParticipantList from '../../../components/UpcomingExamSessions/ExamSessionDetails/ParticipantList/ParticipantList';
import * as actions from '../../../store/actions/index';

class ExamSessionDetails extends Component {
  componentDidMount = () => {
    this.props.onFetchExamSessionParticipants(
      this.props.examSession.organizer_oid,
      this.props.examSession.id,
    );
  };

  render() {
    return this.props.loading ? (
      <Spinner />
    ) : (
      <div data-cy="exam-session-details">
        <h2 className={classes.ExamSessionDetailsHeader}>
          Tutkintotilaisuus:{' '}
          {getLanguagesWithLevelDescriptions([
            this.props.examSession,
          ])[0].toLowerCase()}{' '}
          {moment(this.props.examSession.session_date).format(DATE_FORMAT)}
        </h2>
        <ParticipantList
          examSession={this.props.examSession}
          participants={this.props.participants}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    participants: state.exam.participants,
    loading: state.exam.loading,
    error: state.exam.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchExamSessionParticipants: (organizerOid, examSessionId) =>
      dispatch(
        actions.fetchExamSessionParticipants(organizerOid, examSessionId),
      ),
    errorConfirmedHandler: () =>
      dispatch(actions.fetchExamSessionParticipantsFailReset()),
  };
};

ExamSessionDetails.propTypes = {
  examSession: PropTypes.object.isRequired,
  participants: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  onFetchExamSessionParticipants: PropTypes.func.isRequired,
  errorConfirmedHandler: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(ExamSessionDetails));