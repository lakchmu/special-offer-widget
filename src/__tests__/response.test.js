/* global jest, test, it, expect */

import request, { getResponse } from '../TBFSpecialOffers/request';

fetch = jest.fn(); // eslint-disable-line no-global-assign

function setup() {
  return { url: 'https://url', method: 'get', tokenValue: 'token' };
}

test('Test response function. It complete with throw if server answer with error', () => {
  function testWrapper() {
    return getResponse({ ok: false, status: 404 });
  }
  expect(testWrapper).toThrow();
});

it('Test request function', () => {
  const data = setup();
  expect.assertions(1);
  fetch
    .mockReturnValue(new Promise(resolve => resolve({ ok: true })));
  return request(data.url, data.method, data.tokenValue)
    .then(() => expect(fetch.mock.calls).toHaveLength(1));
});

it('Test request function2', () => {
  const data = setup();
  expect.assertions(1);
  fetch
    .mockReturnValue(new Promise((resolve, reject) => reject(new Error('Error'))));
  function testWrapper() {
    return request(data.url, data.method, data.tokenValue);
  }
  return expect(testWrapper()).rejects.toThrow();
});
