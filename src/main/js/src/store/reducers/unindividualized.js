import { 
  FETCH_UNINDIVIDUALIZED_START, 
  FETCH_UNINDIVIDUALIZED_FAIL,
  FETCH_UNINDIVIDUALIZED_SUCCESS, 
} from '../actions/actionTypes';

const initialState = {
  unindividualized: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UNINDIVIDUALIZED_START:
      return {
        ...state, loading: true
      };
    case FETCH_UNINDIVIDUALIZED_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case FETCH_UNINDIVIDUALIZED_SUCCESS:
      return {
        ...state,
        loading: false,
        unindividualized: action.unindividualized,
      };
    default:
      return state;
  }
}

export default reducer;