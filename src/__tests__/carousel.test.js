/* global jest, describe, it, expect */

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersView from '../TBFSpecialOffers/offersView';

jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

function setup() {
  const data = {
    token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0',
    filters: {},
  };
  return getOffers(data.token, data.filters);
}

describe('Testing Carousel class', () => {
  it('Testing render function', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    const options = { view: 'carousel' };
    expect.assertions(1);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, options);
      expect(root).toMatchSnapshot();
    });
  });

  it('Testing arrow event listener', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    const options = { view: 'carousel' };
    expect.assertions(4);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, options);
      const leftArrow = document.querySelector('.tbf-so-arrow[data-direction="to-left"]');
      const rightArrow = document.querySelector('.tbf-so-arrow[data-direction="to-right"]');
      const indicators = document.querySelectorAll('.tbf-so-carousel-indicator');
      rightArrow.click();
      expect(document.querySelectorAll('.tbf-so-carousel-indicator.active').length).toBe(1);
      expect(indicators[1].classList.contains('active')).toBeTruthy();
      leftArrow.click();
      expect(document.querySelectorAll('.tbf-so-carousel-indicator.active').length).toBe(1);
      expect(indicators[0].classList.contains('active')).toBeTruthy();
    });
  });

  it('Testing indicator event listener', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    const options = { view: 'carousel' };
    expect.assertions(4);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, options);
      const indicators = document.querySelectorAll('.tbf-so-carousel-indicator');
      indicators[1].click();
      expect(indicators[1].classList.contains('active')).toBeTruthy();
      expect(document.querySelectorAll('.tbf-so-carousel-indicator.active').length).toBe(1);
      indicators[0].click();
      expect(indicators[0].classList.contains('active')).toBeTruthy();
      expect(document.querySelectorAll('.tbf-so-carousel-indicator.active').length).toBe(1);
    });
  });
});
