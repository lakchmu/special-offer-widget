/* global test, expect */

import { response } from '../TBFSpecialOffers/request.js';

test('Test response function. It complete with throw if server answer with error', () => {
  function testWrapper() {
    return response({ ok: false, status: 404 });
  }
  expect(testWrapper).toThrow();
});
