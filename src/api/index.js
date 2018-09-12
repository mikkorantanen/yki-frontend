import store from '../store';

const config = {
  baseUrl: '',
  locale: '',
};

function handleErrors(response) {
  if (response.ok) return response.json();
  throw new Error(response.statusText, response);
}

const apiRequest = async (name, url, params = {}) => {
  try {
    const promise = fetch(`${config.baseUrl}/${url}`, { method: 'GET' }).then(
      handleErrors,
    );
    store.dispatch({
      type: `${name}_SUCCESS`,
      params,
      response: await promise,
    });
    return promise;
  } catch (err) {
    store.dispatch({ type: `${name}_ERROR`, params, error: err.message });
    console.error(`${name} failed: ${err.message}`);
  }
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
