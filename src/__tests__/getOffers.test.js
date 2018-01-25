jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';
import { MOCK_GET_OFFERS } from '../constants';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  const filters = {};
  return getOffers(token, filters)
    .then(offersList => expect(offersList)
    .toEqual(MOCK_GET_OFFERS)
  );
});