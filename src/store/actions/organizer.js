import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const fetchOrganizerRegistryContent = () => {
  const fetchedOrganizers = [];
  const organizationIds = [];
  const fetchedOrganizations = [];
  const registry = [];
  return dispatch => {
    dispatch(fetchOrganizerRegistryContentStart());
    axios
      .get('/yki/api/virkailija/organizers')
      .then(res => {
        for (const key in res.data.organizers) {
          fetchedOrganizers.push(res.data.organizers[key]);
        }
        for (const key in fetchedOrganizers) {
          organizationIds.push(fetchedOrganizers[key].oid);
        }
        return axios.post('/organisaatio-service/rest/organisaatio/v4/findbyoids', organizationIds);
      })
      .then(res => {
        for (const key in res.data) {
          fetchedOrganizations.push(res.data[key]);
        }
        for (const key in fetchedOrganizers) {
          const organization = fetchedOrganizations.find(
            organization => organization.oid === fetchedOrganizers[key].oid,
          );
          registry.push({ organizer: fetchedOrganizers[key], organization: organization });
        }
        dispatch(fetchOrganizerRegistryContentSuccess(registry));
      })
      .catch(err => {
        dispatch(fetchOrganizerRegistryContentFail(err));
      });
  };
};

export const fetchOrganizerRegistryContentStart = () => {
  return {
    type: actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_START,
    loading: true,
  };
};

export const fetchOrganizerRegistryContentSuccess = registry => {
  return {
    type: actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_SUCCESS,
    organizerRegistry: registry,
    loading: false,
  };
};

export const fetchOrganizerRegistryContentFail = error => {
  return {
    type: actionTypes.FETCH_ORGANIZER_REGISTRY_CONTENT_FAIL,
    loading: false,
    error: error,
  };
};

export const searchOrganizationByName = name => {
  const searchOrganizationsByNameResult = [];
  return dispatch => {
    dispatch(searchOrganizationByNameStart());
    axios
      .get(
        `organisaatio-service/rest/organisaatio/v2/hae/tyyppi?searchStr=${name}&aktiiviset=true&suunnitellut=true&lakkautetut=false`,
      )
      .then(res => {
        for (const key in res.data.organisaatiot) {
          searchResults.push(res.data.organisaatiot[key]);
        }
        dispatch(searchOrganizerByNameSuccess(searchOrganizationsByNameResult));
      })
      .catch(err => {
        dispatch(searchOrganizerByNameFail(err));
      });
  };
};

// old
export const resetCreateOrganizer = () => ({
  type: actionTypes.CREATE_ORGANIZER_RESET,
});
