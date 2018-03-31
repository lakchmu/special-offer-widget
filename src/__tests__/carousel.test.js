/* global jest, describe, it, expect */

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersView from '../TBFSpecialOffers/offersView';

jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

function setup() {
  const data = {
    token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0',
  };
  return getOffers(data.token);
}

function setupTest(rootElement) {
  document.body.innerHTML = '<div class="special-offers"></div>';
  const options = { view: 'carousel' };
  return setup()
    .then(offersStorage => new OffersView(rootElement, offersStorage, options));
}

describe('Testing Carousel class', () => {
  it('Testing render function', () => {
    expect.assertions(1);
    return setupTest('.special-offers')
      .then(offersView => expect(offersView.rootElement).toMatchSnapshot());
  });

  it('Testing arrow event listener', () => {
    expect.assertions(4);
    return setupTest('.special-offers')
      .then(() => {
        const leftArrow = document.querySelector('.tbf-so-arrow[data-direction="to-left"]');
        const rightArrow = document.querySelector('.tbf-so-arrow[data-direction="to-right"]');
        const indicators = document.querySelectorAll('.tbf-so-carousel-indicator');
        rightArrow.click();
        expect(document.querySelectorAll('.tbf-so-carousel-indicator.active')).toHaveLength(1);
        expect(indicators[1].classList.contains('active')).toBeTruthy();
        leftArrow.click();
        expect(document.querySelectorAll('.tbf-so-carousel-indicator.active')).toHaveLength(1);
        expect(indicators[0].classList.contains('active')).toBeTruthy();
      });
  });

  it('Testing indicator event listener', () => {
    expect.assertions(4);
    return setupTest('.special-offers')
      .then(() => {
        const indicators = document.querySelectorAll('.tbf-so-carousel-indicator');
        indicators[1].click();
        expect(indicators[1].classList.contains('active')).toBeTruthy();
        expect(document.querySelectorAll('.tbf-so-carousel-indicator.active')).toHaveLength(1);
        indicators[0].click();
        expect(indicators[0].classList.contains('active')).toBeTruthy();
        expect(document.querySelectorAll('.tbf-so-carousel-indicator.active')).toHaveLength(1);
      });
  });
});
