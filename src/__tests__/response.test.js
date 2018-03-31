/* global test, expect */

import { getResponse } from '../TBFSpecialOffers/request.js';

test('Test response function. It complete with throw if server answer with error', () => {
  function testWrapper() {
    return getResponse({ ok: false, status: 404 });
  }
  expect(testWrapper).toThrow();
});
