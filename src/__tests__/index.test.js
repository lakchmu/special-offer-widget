/* global jest, it, expect */

import TBFSpecialOffer from '../index';

jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

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
