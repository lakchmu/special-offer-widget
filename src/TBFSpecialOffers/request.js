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
    .then(response => response)
    .catch(error => console.warn(error, 'Something going wrong!'));
}

export default request;
