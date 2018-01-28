function request(url, method, headerName, headerValue) {
  let headers = new Headers();
  headers.append(headerName, headerValue);
  const initOptions = { method: method,
                        headers: headers,
                        mode: 'cors',
                        cache: 'default' };
  
  return fetch(url, initOptions)
    .then(function(response) {
      return response;
    })
    .catch(error => {
      console.warn(error, "Something going wrong!");
    });
}

export default request;