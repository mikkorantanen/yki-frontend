import * as actionTypes from './actionTypes';
import axios from '../../axios';

const fetchRegistryContentStart = () => {
  return {
    type: actionTypes.FETCH_REGISTRY_CONTENT_START,
    loading: true,
  };
};

const fetchRegistryContentSuccess = registry => {
  return {
    type: actionTypes.FETCH_REGISTRY_CONTENT_SUCCESS,
    registry: registry,
    loading: false,
  };
};

const fetchRegistryContentFail = error => {
  return {
    type: actionTypes.FETCH_REGISTRY_CONTENT_FAIL,
    error: error,
    loading: false,
  };
};

export const fetchRegistryContent = () => {
  const fetchedOrganizers = [];
  const organizationIds = [];
  const fetchedOrganizations = [];
  const registry = [];
  return dispatch => {
    dispatch(fetchRegistryContentStart());
    axios
      .get('/yki/api/virkailija/organizer')
      .then(res => {
        for (const key in res.data.organizers) {
          fetchedOrganizers.push(res.data.organizers[key]);
        }
        for (const key in fetchedOrganizers) {
          organizationIds.push(fetchedOrganizers[key].oid);
        }
        return axios.post(
          '/organisaatio-service/rest/organisaatio/v3/findbyoids',
          organizationIds,
        );
      })
      .then(res => {
        for (const key in res.data) {
          fetchedOrganizations.push(res.data[key]);
        }
        for (const key in fetchedOrganizers) {
          const organization = fetchedOrganizations.find(
            organization => organization.oid === fetchedOrganizers[key].oid,
          );
          registry.push({
            organizer: fetchedOrganizers[key],
            organization: organization,
          });
        }
        dispatch(fetchRegistryContentSuccess(registry));
      })
      .catch(err => {
        dispatch(fetchRegistryContentFail(err));
      })
      .finally(() => dispatch(fetchOrganizations()));
  };
};

const fetchOrganizationsStart = () => {
  return {
    type: actionTypes.FETCH_ORGANIZATIONS_START,
    loadingOrganizations: true,
  };
};

const fetchOrganizationsSuccess = organizations => {
  return {
    type: actionTypes.FETCH_ORGANIZATIONS_SUCCESS,
    organizations: organizations,
    loadingOrganizations: false,
  };
};

const fetchOrganizationsFail = error => {
  return {
    type: actionTypes.FETCH_ORGANIZATIONS_FAIL,
    error: error,
    loadingOrganizations: false,
  };
};

export const fetchOrganizations = () => {
  return dispatch => {
    dispatch(fetchOrganizationsStart());
    axios
      .get(
        '/organisaatio-service/rest/organisaatio/v4/hae?searchStr=&aktiiviset=true&suunnitellut=true&lakkautetut=false',
      )
      .then(res => {
        dispatch(fetchOrganizationsSuccess(res.data.organisaatiot));
      })
      .catch(err => {
        dispatch(fetchOrganizationsFail(err));
      });
  };
};

const addRegistryItemStart = () => {
  return {
    type: actionTypes.ADD_REGISTRY_ITEM_START,
    loading: true,
  };
};

const addRegistryItemSuccess = registryItem => {
  return {
    type: actionTypes.ADD_REGISTRY_ITEM_SUCCESS,
    registryItem: registryItem,
    loading: false,
  };
};

const addRegistryItemFail = error => {
  return {
    type: actionTypes.ADD_REGISTRY_ITEM_FAIL,
    error: error,
    loading: false,
  };
};

export const addRegistryItem = organizer => {
  const registryItem = {
    organizer: organizer,
    organization: {},
  };
  return dispatch => {
    dispatch(addRegistryItemStart());
    axios
      .post('/organisaatio-service/rest/organisaatio/v3/findbyoids', [
        organizer.oid,
      ])
      .then(res => {
        registryItem.organization = res.data[0];
        return axios
          .post('/yki/api/virkailija/organizer', registryItem.organizer)
          .then(() => {
            dispatch(addRegistryItemSuccess(registryItem));
          });
      })
      .catch(err => {
        dispatch(addRegistryItemFail(err));
      });
  };
};
