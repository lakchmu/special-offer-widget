jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';

// The assertion for a promise must be returned.
it('works with promises', () => {
  expect.assertions(1);
  const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  const filters = {};
  return getOffers(token, filters)
          .then(offersList => expect(offersList).toEqual('[{ "title": "Last Minute Booking" }]'));
});