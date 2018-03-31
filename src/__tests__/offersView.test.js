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

function getOptions(key) {
  let options;
  switch (key) {
    case 'empty':
      options = {};
      break;
    case 'normal-render-function':
      options = {
        renderTemplate: (offerModel) => {
          const { title } = offerModel;
          const template = `<div class="tbf-so-offer">\n<div class="tbf-so-offer__title">${title}</div>\n</div>`;
          return template;
        },
      };
      break;
    case 'not function':
      options = {
        renderTemplate: 'not function',
      };
      break;
    default:
      break;
  }
  return options;
}

function setupTest(rootElement, optionKey) {
  document.body.innerHTML = '<div class="special-offers"></div>';
  return setup()
    .then(offersStorage => new OffersView(rootElement, offersStorage, getOptions(optionKey)));
}

function setupWrapperTest(rootElement, optionKey) {
  document.body.innerHTML = '<div class="special-offers"></div>';
  return setup()
    .then(offersStorage => function testWrapper() {
      return new OffersView(rootElement, offersStorage, getOptions(optionKey));
    });
}

describe('Testing class methods', () => {
  it('Root element for widget does not exist', () => {
    expect.assertions(1);
    return setupWrapperTest('.not-existing-root-element', 'empty')
      .then(testWrapper => expect(testWrapper).toThrow());
  });

  it('Testing default render function', () => {
    expect.assertions(1);
    return setupTest('.special-offers', 'empty')
      .then(offersView => expect(offersView.rootElement).toMatchSnapshot());
  });

  it('Testing adding css class to root element', () => {
    expect.assertions(1);
    return setupTest('.special-offers', 'empty')
      .then((offersView) => {
        const containsClass = offersView.rootElement.classList.contains('tbf-so-special-offers');
        return expect(containsClass).toBeTruthy();
      });
  });
});

describe('Testing custom render function', () => {
  it('Testing rendering', () => {
    expect.assertions(1);
    return setupTest('.special-offers', 'normal-render-function')
      .then(offersView => expect(offersView.rootElement).toMatchSnapshot());
  });

  it('Custom render function is not a function', () => {
    expect.assertions(1);
    return setupWrapperTest('.special-offers', 'not function')
      .then(testWrapper => expect(testWrapper).toThrow());
  });
});

describe('Testing event listeners', () => {
  it('Testing click event by "More" button', () => {
    expect.assertions(4);
    return setupTest('.special-offers', 'empty')
      .then((offersView) => {
        const moreButtons = offersView.rootElement.querySelectorAll('.tbf-so-offer__more-link');
        moreButtons.forEach((moreButton) => {
          let parentOffer = moreButton.parentElement;
          while (!parentOffer.classList.contains('tbf-so-offer') &&
            !parentOffer.classList.contains('tbf-special-offers')) {
            parentOffer = parentOffer.parentElement;
          }
          moreButton.click();
          expect(parentOffer.classList.contains('tbf-so-open')).toBeTruthy();
          moreButton.click();
          expect(parentOffer.classList.contains('tbf-so-open')).not.toBeTruthy();
        });
      });
  });
});
