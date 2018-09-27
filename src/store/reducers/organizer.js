const initialState = {
  organizers: [],
  organizations: [],
  organizationsSearchResult: [],
  organizerAddResult: null,
  busyCounter: 0,
};

const reducer = (state = initialState, action) => {
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
        busyCounter: state.busyCounter - 1,
        organizationsSearchResult: action.response.organisaatiot,
      };
    case 'LOAD_ORGANIZATIONS_BY_FREE_TEXT_PENDING':
      return {
        ...state,
        busyCounter: state.busyCounter + 1,
      };
    case 'CREATE_ORGANIZER_SUCCESS':
      return {
        ...state,
        organizerAddResult: action.response.success,
      };
    case 'CREATE_ORGANIZER_RESET':
      return {
        ...state,
        organizerAddResult: null,
      };
    default:
      return state;
  }
};

export default reducer;
