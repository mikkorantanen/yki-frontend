import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';

import classes from './ExamSessionListItem.module.css';
import {levelDescription} from '../../../../util/util';
import {
  DATE_FORMAT,
  DATE_FORMAT_WITHOUT_YEAR, MOBILE_VIEW, MOBILE_VIEW_LARGE_LANDSCAPE, TABLET_VIEW,
} from '../../../../common/Constants';
import * as actions from '../../../../store/actions/index';

/*const min = window.innerWidth > 640;
const max = window.innerWidth < 1023;
const orientation = window.screen.orientation.type === 'landscape-primary';
const MOBILE_VIEW_LARGE_LANDSCAPE = min && max && orientation;*/

const examSessionListItem = ({
                               examSession: session,
                               language,
                               onSelectExamSession,
                               history,
                             }) => {
  const [t, i18n] = useTranslation();

  const selectExamSession = () => {
    onSelectExamSession(session);
    history.push(`/tutkintotilaisuus/${session.id}`);
  };

  const examDate = moment(session.session_date).format(DATE_FORMAT);
  const date = <div className={classes.Date}>{examDate}</div>;

  // TODO: localization
  const examFee = `Hinta: ${session.exam_fee} €`;

  const examLanguage = t(`common.language.${language.code}`);
  const examLevel = levelDescription(session.level_code).toLowerCase();
  const exam = (
      <div className={classes.Exam}>
        <strong>{`${examLanguage}, ${examLevel}`}</strong>
      </div>
  );

  const sessionLocation =
      session.location.find(l => l.lang === i18n.language) || session.location[0];
  const name = sessionLocation.name;
  const address = sessionLocation.street_address || '';
  const city = sessionLocation.post_office.toUpperCase() || '';
  const location = (
      <span className={classes.Location}>
      {name} <br/> {address} <br/> {session.location[0].zip} <strong>{city}</strong>
    </span>
  );

  const spotsAvailable = session.max_participants - session.participants;

  const spotsAvailableText =
      spotsAvailable === 1
          ? t('registration.examSpots.singleFree')
          : t('registration.examSpots.free');
  const availability = (
      <div className={classes.Availability}>
        <strong>
          {spotsAvailable > 0 ? (
              <>
                <span>{spotsAvailable}</span>{' '}
                <span className={classes.HiddenOnDesktop}>
                  {spotsAvailableText}
                </span>
              </>
          ) : (
              <span>{t('registration.examSpots.full')}</span>
          )}
        </strong>
      </div>
  );

  const registrationOpen = (
      <div className={classes.RegistrationOpen}>
      <span className={classes.HiddenOnDesktop}>
        {t('registration.list.signupOpen')}
      </span>{' '}
        <span>
        {`${moment(session.registration_start_date).format(
            DATE_FORMAT_WITHOUT_YEAR,
        )} - ${moment(session.registration_end_date).format(
            DATE_FORMAT_WITHOUT_YEAR,
        )}`}
      </span>
      </div>
  );

  const buttonText = spotsAvailable
      ? t('registration.register')
      : session.queue_full
          ? t('registration.register.queueFull')
          : t('registration.register.forQueue');
  const srLabel = `${buttonText} ${examLanguage} ${examLevel}. ${examDate}. ${name}, ${address}, ${city}. ${spotsAvailable} ${spotsAvailableText}.`;
  const registerButton = (
      <button
          className={'YkiButton'}
          onClick={selectExamSession}
          role="link"
          aria-label={srLabel}
      >
        {buttonText}
      </button>
  );

  const locationOnMobileView = (
      <div className={classes.Location}>
        <span>
          {name}<br/>{address}<br/>
        </span>
        <span>
          {session.location[0].zip}{' '}{city}
        </span>
      </div>
  )

  return (
      <>
        {MOBILE_VIEW || TABLET_VIEW || MOBILE_VIEW_LARGE_LANDSCAPE ?
            <div
                className={classes.ExamSessionListItem}
                data-cy="exam-session-list-item"
            >
              <div className={classes.MobileRow}>
                <div>{exam}</div>
                <div>{date}</div>
              </div>
              <hr/>
              <div>{registrationOpen}</div>
              <hr/>
              <div className={classes.MobileRow}>
                <div>{availability}</div>
                {session.queue_full ? null : <div className={classes.ExamFee}>{examFee}</div>}
              </div>
              <hr/>
              <div>
                {locationOnMobileView}
                {registerButton}
              </div>
            </div>
            :
            <div
                className={classes.ExamSessionListItem}
                data-cy="exam-session-list-item"
            >
              {date}
              {location}
              {exam}
              {availability}
              {registrationOpen}
              {registerButton}
            </div>
        }
      </>
  );
};

examSessionListItem.propTypes = {
  examSession: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectExamSession: session =>
        dispatch(actions.selectExamSession(session)),
  };
};

export default connect(
    null,
    mapDispatchToProps,
)(examSessionListItem);
