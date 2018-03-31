import getOffers from '../TBFSpecialOffers/getOffers';
import OffersStorage from '../TBFSpecialOffers/offersStorage';

jest.mock('../TBFSpecialOffers/request');

function setup() {
  return { token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0', filters: {} };
}

test('Function getOffers return a promise', () => {
  const setupData = setup();
  expect(getOffers(setupData.token, setupData.filters)).toBeInstanceOf(Promise);
});

it('Function getOffers returns object of OffersStorage', () => {
  const setupData = setup();
  expect.assertions(1);
  return getOffers(setupData.token, setupData.filters)
    .then(offersStorage => expect(offersStorage).toBeInstanceOf(OffersStorage));
});

