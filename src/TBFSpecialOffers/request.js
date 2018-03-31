import 'whatwg-fetch';

function getResponse(response) {
  if (response.ok === false) {
    throw new Error(`Fetch: response.ok is ${response.ok}, response.status is ${response.status}`);
  }
  return response;
}

function request(url, method, tokenValue) {
  const headers = new Headers();
  headers.append('token', tokenValue);
  const initOptions = {
    method,
    headers,
    mode: 'cors',
    cache: 'default',
  };

  return fetch(url, initOptions)
    .then(getResponse)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export default request;
export { getResponse };
