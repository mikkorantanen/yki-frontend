import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import queryString from 'query-string';

import classes from './Registration.module.css';
import { LANGUAGES } from '../../common/Constants';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Registration/BackButton/BackButton';
import Filters from '../../components/Registration/Filters/Filters';
import ExamSessionList from '../../components/Registration/ExamSessionList/ExamSessionList';
import * as actions from '../../store/actions/index';

class Registration extends Component {
  componentDidMount() {
    const { language, level, location } = queryString.parse(
      this.props.history.location.search,
    );
    const lang = LANGUAGES.find(l => l.code === language);
    document.title = this.props.t('registration.document.title');

    const allQueryParamsExist = language && level && location;
    const paramsAreDifferent =
      (lang && this.props.language.name !== lang.name) ||
      this.props.level !== level ||
      this.props.location !== location;
    // if redux state is different from query params user has probably refreshed the page
    if (allQueryParamsExist !== undefined && paramsAreDifferent) {
      // set query params to redux state
      this.props.onSetAll(lang, level, location);
    }
    if (this.props.examSessions.length === 0) {
      this.props.onFetchExamSessions();
    }
  }

  onLanguageChange = event => {
    const language = LANGUAGES.find(l => l.name === event.target.value);
    this.props.onSelectLanguage(language);
  };

  onLevelChange = event => {
    this.props.onSelectLevel(event.target.value);
  };

  onLocationChange = event => {
    this.props.onSelectLocation(event.target.value);
  };

  render() {
    return (
      <Fragment>
        <Header />
        <BackButton
          clicked={() =>
            this.props.history.push('/ilmoittautuminen/valitse-paikkakunta')
          }
        />
        <main className={classes.Content}>
          <h1>{this.props.t('registration.title')}</h1>
          <Filters
            language={this.props.language}
            onLanguageChange={this.onLanguageChange}
            level={this.props.level}
            onLevelChange={this.onLevelChange}
            location={this.props.location}
            onLocationChange={this.onLocationChange}
            locations={this.props.locations}
            history={this.props.history}
          />
          <p className={classes.Upcoming}>
            {this.props.t('examSession.upcomingExamSessions')}
          </p>
          <p>
            {this.props.t('registration.times.info')} 
          </p>
          <ExamSessionList
            examSessions={this.props.filteredExamSessionsGroupedByDate}
            language={this.props.language}
            history={this.props.history}
          />
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    examSessions: state.registration.examSessions,
    filteredExamSessionsGroupedByDate:
      state.registration.filteredExamSessionsGroupedByDate,
    language: state.registration.language,
    level: state.registration.level,
    location: state.registration.location,
    locations: state.registration.locations,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchExamSessions: () => dispatch(actions.fetchExamSessions()),
    onSelectLevel: level => dispatch(actions.selectLevel(level)),
    onSelectLanguage: language => dispatch(actions.selectLanguage(language)),
    onSelectLocation: location => dispatch(actions.selectLocation(location)),
    onSetAll: (language, level, location) =>
      dispatch(actions.setAll(language, level, location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Registration));
