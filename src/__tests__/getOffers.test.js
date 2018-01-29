jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersStorage from '../TBFSpecialOffers/offersStorage';

it('works with promises and returns object of OffersStorage', () => {
  expect.assertions(1);
  const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  const filters = {};
  return getOffers(token, filters)
    .then(offersStorage => expect(offersStorage).toBeInstanceOf(OffersStorage));
});