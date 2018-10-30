import * as actionTypes from '../actions/actionTypes';

const initialState = {
  localization: 'fi',
  organizerRegistry: [],
  loading: false,
  error: null,
  organizerAddResult: null,
  busyCounter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_SUCCESS:
      return {
        ...state,
        organizerRegistry: action.organizerRegistry,
        loading: false,
      };
    case actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_FAIL:
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
