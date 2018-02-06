import 'whatwg-fetch';

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
    .then((response) => {
      if (response.ok === false) {
        throw new Error(`Fetch: response.ok is ${response.ok}, response.status is ${response.status}`);
      }
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
}

export default request;
