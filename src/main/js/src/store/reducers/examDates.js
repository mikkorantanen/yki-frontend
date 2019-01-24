import * as actionTypes from '../actions/actionTypes';

const initialState = {
  examDates: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_EXAM_DATES_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_EXAM_DATES_SUCCESS:
      return {
        ...state,
        examDates: action.examDates,
        loading: false,
      };
    case actionTypes.FETCH_EXAM_DATES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
