jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersStorage from '../TBFSpecialOffers/offersStorage';

const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
const filters = {};

it('Function getOffers returns object of OffersStorage', () => {
  expect.assertions(1);
  return getOffers(token, filters)
    .then(offersStorage => expect(offersStorage).toBeInstanceOf(OffersStorage));
});

test('Function getOffers works with promise', () => {
  expect(getOffers(token, filters)).toBeInstanceOf(Promise);
});
