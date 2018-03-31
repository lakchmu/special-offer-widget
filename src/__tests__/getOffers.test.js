/* global jest, it, test, expect */

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersStorage from '../TBFSpecialOffers/offersStorage';

jest.mock('../TBFSpecialOffers/request');

function setup() {
  return { token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0' };
}

test('Function getOffers return a promise', () => {
  const setupData = setup();
  expect(getOffers(setupData.token)).toBeInstanceOf(Promise);
});

it('Function getOffers returns object of OffersStorage', () => {
  const setupData = setup();
  expect.assertions(1);
  return getOffers(setupData.token)
    .then(offersStorage => expect(offersStorage).toBeInstanceOf(OffersStorage));
});

