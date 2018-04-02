/* global jest, describe, it, expect */

import TBFSpecialOffer from '../index';

jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');
console.warn = jest.fn();

function setup() {
  return {
    targetDivElement: '.special-offers',
    token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0',
  };
}

it('Test TBFSpecialOffer function with default settings', () => {
  document.body.innerHTML = '<div class="special-offers"></div>';
  const setupData = setup();
  expect.assertions(1);
  return TBFSpecialOffer(setupData.targetDivElement, setupData.token)
    .then(offersView => expect(offersView).toMatchSnapshot());
});

it('Test TBFSpecialOffer function with wrong token', () => {
  document.body.innerHTML = '<div class="special-offers"></div>';
  const setupData = setup();
  expect.assertions(1);
  return TBFSpecialOffer(setupData.targetDivElement, '')
    .then(() =>
      expect(console.warn.mock.calls).toHaveLength(1));
});
