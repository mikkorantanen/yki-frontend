import { createStore } from 'redux';

const initialState = {
  organizers: [],
  organizations: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_ORGANIZERS_SUCCESS':
      return { ...state, organizers: action.response.organizers };
    case 'LOAD_ORGANIZERS_ERROR':
      return { ...state, organizers: [], error: action.error };
    case 'LOAD_ORGANIZATION_SUCCESS':
      return {
        ...state,
        organizations: {
          ...state.organizations,
          [action.params]: action.response,
        },
      };
    default:
      return state;
  }
};
const store = createStore(rootReducer);

export default store;
