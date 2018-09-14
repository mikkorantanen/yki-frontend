import store from '../store';

const config = {
  baseUrl: '',
  locale: '',
};

function handleErrors(response) {
  if (response.ok) return response.json();
  throw new Error(response.statusText, response);
}

const apiRequest = async (name, url, params = {}, method = 'get', body) => {
  try {
    const promise = fetch(`${config.baseUrl}/${url}`, { method: method }).then(
      handleErrors,
    );
    store.dispatch({
      type: `${name}_SUCCESS`,
      params,
      body: JSON.stringify(body),
      response: await promise,
    });
    return promise;
  } catch (err) {
    store.dispatch({ type: `${name}_ERROR`, params, error: err.message });
    console.error(`${name} failed: ${err.message}`);
  }
};

export const loadOrganizationsByOids = oids => {
  return apiRequest(
    'LOAD_ORGANIZATIONS_BY_OIDS',
    'organisaatio-service/rest/organisaatio/v3/findbyoids',
    {},
    'post',
    oids,
  );
};

export const loadOrganizers = () => {
  return apiRequest('LOAD_ORGANIZERS', 'yki/api/virkailija/organizers');
};

export const loadOrganization = oid => {
  return apiRequest(
    'LOAD_ORGANIZATION',
    `organisaatio-service/rest/organisaatio/v3/${oid}`,
    oid,
  );
};

export const loadOrganizationsByFreeText = searchText => {
  return apiRequest(
    'LOAD_ORGANIZATIONS_BY_FREE_TEXT',
    `organisaatio-service/rest/organisaatio/v2/hae/nimi?searchStr=${searchText}&aktiiviset=true&suunnitellut=true&lakkautetut=false`,
  );
};
