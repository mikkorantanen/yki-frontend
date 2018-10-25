import * as actionTypes from '../actions/actionTypes';

const initialState = {
  lang: 'fi',
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

    case actionTypes.LOAD_ORGANIZERS_PENDING:
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case actionTypes.LOAD_ORGANIZERS_SUCCESS:
      return {
        ...state,
        organizers: action.response.organizers,
        busyCounter: state.busyCounter - 1,
      };
    case actionTypes.LOAD_ORGANIZERS_ERROR:
      return { ...state, organizers: [], error: action.error };
    case actionTypes.LOAD_ORGANIZATIONS_BY_OIDS_PENDING:
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case actionTypes.LOAD_ORGANIZATIONS_BY_OIDS_SUCCESS:
      return {
        ...state,
        busyCounter: state.busyCounter - 1,
        organizations: action.response,
      };
    case actionTypes.LOAD_ORGANIZATIONS_BY_FREE_TEXT_PENDING:
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case actionTypes.LOAD_ORGANIZATIONS_BY_FREE_TEXT_SUCCESS:
      return {
        ...state,
        busyCounter: state.busyCounter - 1,
        organizationsSearchResult: action.response.organisaatiot,
      };
    case actionTypes.CREATE_ORGANIZER_SUCCESS:
      return {
        ...state,
        organizerAddResult: action.response.success,
      };
    case actionTypes.CREATE_ORGANIZER_RESET:
      return {
        ...state,
        organizerAddResult: null,
      };
    default:
      return state;
  }
};

export default reducer;
