/* global jest, describe, it, expect */

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersView from '../TBFSpecialOffers/offersView';
import expandSpecialOfferDescription from '../TBFSpecialOffers/offerEvents';
import { GET_PARENT_OFFER, DEV_STYLE_URL } from '../constants';

jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

function setup() {
  const data = {
    token: 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0',
  };
  return getOffers(data.token);
}

function getNormalRenderFunction() {
  return (offerModel) => {
    const { title } = offerModel;
    const template = `<div class="tbf-so-offer">\n<div class="tbf-so-offer__title">${title}</div>\n</div>`;
    return template;
  };
}

function getErrorRenderFunction() {
  return () => '<div class="tbf-special-offers"><button class="tbf-so-offer__more-link"></button></div>';
}

function getOptions(key) {
  let options;
  switch (key) {
    case 'normal-render-function':
      options = { renderTemplate: getNormalRenderFunction() };
      break;
    case 'error-template':
      options = { renderTemplate: getErrorRenderFunction() };
      break;
    case 'not function':
      options = { renderTemplate: 'not function' };
      break;
    case 'missing-image':
      options = { missingImageUrl: '../../test-missing-image.png' };
      break;
    case 'without-styles':
      options = { defaultCSS: false };
      break;
    case 'without-events':
      options = { defaultEvents: false };
      break;
    default:
      options = {};
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

describe('Testing options', () => {
  it('Test using custom missing image url', () => {
    expect.assertions(1);
    return setupTest('.special-offers', 'missing-image')
      .then((offersView) => {
        expect(offersView.getImageLink('/images/public/missing.png'))
          .toBe(offersView.options.missingImageUrl);
      });
  });

  it('Test using develop styles', () => {
    OffersView.getLocationHostname = jest.fn();
    OffersView.getLocationHostname.mockReturnValue('localhost');
    expect.assertions(1);
    return setupTest('.special-offers', 'missing-image')
      .then(() => {
        expect(document.querySelector(`link[href="${DEV_STYLE_URL}"]`))
          .not.toBeNull();
      });
  });

  it('Do not use default styles', () => {
    console.warn = jest.fn();
    expect.assertions(1);
    return setupTest('.special-offers', 'without-styles')
      .then(() =>
        expect(console.warn.mock.calls).toHaveLength(1));
  });

  it('Do not use default events', () => {
    console.warn = jest.fn();
    expect.assertions(1);
    return setupTest('.special-offers', 'without-events')
      .then(() =>
        expect(console.warn.mock.calls).toHaveLength(1));
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
          const parentOffer = GET_PARENT_OFFER(moreButton);
          moreButton.click();
          expect(parentOffer.classList.contains('tbf-so-open')).toBeTruthy();
          moreButton.click();
          expect(parentOffer.classList.contains('tbf-so-open')).not.toBeTruthy();
        });
      });
  });

  it('Testing event by "More" button', () => {
    expect.assertions(1);
    return setupTest('.special-offers', 'error-template')
      .then((offersView) => {
        const moreButton = offersView.rootElement.querySelector('.tbf-so-offer__more-link');
        function testWrapper() {
          return expandSpecialOfferDescription.apply(moreButton);
        }
        expect(testWrapper).toThrow();
      });
  });
});
