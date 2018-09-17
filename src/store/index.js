import { createStore } from 'redux';

const initialState = {
  organizers: [],
  organizations: [],
  organizationsSearchResult: [],
  organizerAddResult: null,
  busyCounter: 0,
};

const data = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ORGANIZERS_SUCCESS':
      return {
        ...state,
        organizers: action.response.organizers,
        busyCounter: state.busyCounter - 1,
      };
    case 'LOAD_ORGANIZERS_ERROR':
      return { ...state, organizers: [], error: action.error };
    case 'LOAD_ORGANIZERS_PENDING':
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case 'LOAD_ORGANIZATIONS_BY_OIDS_SUCCESS':
      return {
        ...state,
        busyCounter: state.busyCounter - 1,
        organizations: action.response,
      };
    case 'LOAD_ORGANIZATIONS_BY_OIDS_PENDING':
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case 'LOAD_ORGANIZATIONS_BY_FREE_TEXT_SUCCESS':
      return {
        ...state,
        organizationsSearchResult: action.response.organisaatiot,
      };
    case 'CREATE_ORGANIZER_SUCCESS':
      return {
        ...state,
        organizerAddResult: action.response.success,
      };
    default:
      return state;
  }
};

const store = createStore(data);

export default store;
