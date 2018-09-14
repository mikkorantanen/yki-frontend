import { createStore } from 'redux';

const initialState = {
  organizers: [],
  organizations: [],
  organizationsSearchResult: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ORGANIZERS_SUCCESS':
      return { ...state, organizers: action.response.organizers };
    case 'LOAD_ORGANIZERS_ERROR':
      return { ...state, organizers: [], error: action.error };
    case 'LOAD_ORGANIZATIONS_BY_OIDS_SUCCESS':
      return {
        ...state,
        organizations: action.response,
      };
    case 'LOAD_ORGANIZATIONS_BY_FREE_TEXT_SUCCESS':
      return {
        ...state,
        organizationsSearchResult: action.response.organisaatiot,
      };
    default:
      return state;
  }
};
const store = createStore(rootReducer);

export default store;
