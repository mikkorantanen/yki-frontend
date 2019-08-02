import { 
  FETCH_UNINDIVIDUALIZED_START,
  FETCH_UNINDIVIDUALIZED_FAIL,
  FETCH_UNINDIVIDUALIZED_SUCCESS, 
} from './actionTypes';
import axios from '../../axios';

const fetchUnindividualizedStart = () => {
  return {
    type: FETCH_UNINDIVIDUALIZED_START,
    loading: true,
  }
}

const fetchUnindividualizedSuccess = applicants => {
  return {
    type: FETCH_UNINDIVIDUALIZED_SUCCESS,
    unindividualized: applicants,
    loading: false,
  }
}

const fetchUnindividualizedFail = error => {
  return {
    type: FETCH_UNINDIVIDUALIZED_FAIL,
    error: Object.assign(error, { key: 'error.unindividualized.fetchFailed' }),
    loading: false,
  }
}

export const fetchUnindividualizedApplicants = () => {
  return dispatch => {
    dispatch(fetchUnindividualizedStart());
    axios
    .get('/yki/api/virkailija/unindividualized')
    .then(res => {
      dispatch(fetchUnindividualizedSuccess(res.data.unindividualized))
    }).catch(err => {
      dispatch(fetchUnindividualizedFail(err));
    });
  }
}