function request(url, method, headerName, headerValue) {
  return new Promise((resolve) => {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader(headerName, headerValue);
    req.onload = function () {
      resolve(this.responseText);
    };
    req.send();
  });
}

export default request;