jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersView from '../TBFSpecialOffers/offersView';

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
    case 'render-function-return-not-a-string':
      options = {
        renderTemplate: (offerModel) => {
          const { title } = offerModel;
          return () => `
            <div class="tbf-so-offer">
                <div class="tbf-so-offer__title">${title}</div>
            </div>
            `;
        },
      };
      break;
    case 'render-function-without-offerModel-parameter':
      options = {
        renderTemplate: () => {
          const title = 'Title';
          const template = `
            <div class="tbf-so-offer">
                <div class="tbf-so-offer__title">${title}</div>
            </div>
          `;
          return template;
        },
      };
      break;
    default:
      break;
  }
  return options;
}

describe('Testing class methods', () => {
  it('Root element for widget does not exist', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    expect.assertions(1);
    return setup().then((offersStorage) => {
      function testWrapper() {
        return new OffersView('.not-existing-root-element', offersStorage, getOptions('empty'));
      }
      expect(testWrapper).toThrow();
    });
  });

  it('Testing default render function', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    expect.assertions(1);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, getOptions('empty'));
      expect(root).toMatchSnapshot();
    });
  });

  it('Testing adding css class to root element', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    expect.assertions(1);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, getOptions('empty'));
      expect(root.classList.contains('tbf-so-special-offers')).toMatchSnapshot();
    });
  });
});

describe('Testing event listeners', () => {
  it('Testing click event by "More" button', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    expect.assertions(4);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, getOptions('empty'));
      const root = document.querySelector('.special-offers');
      const moreButtons = root.querySelectorAll('.tbf-so-offer__more-link');
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

describe('Testing custom render function', () => {
  it('Testing rendering', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    const root = document.querySelector('.special-offers');
    expect.assertions(1);
    return setup().then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, getOptions('normal-render-function'));
      expect(root).toMatchSnapshot();
    });
  });

  it('Custom render function is not a function', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    expect.assertions(1);
    return setup().then((offersStorage) => {
      function testWrapper() {
        return new OffersView('.special-offers', offersStorage, getOptions('not function'));
      }
      expect(testWrapper).toThrow();
    });
  });

  it('Custom render function return not a string', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    expect.assertions(1);
    return setup().then((offersStorage) => {
      function testWrapper() {
        return new OffersView('.special-offers', offersStorage, getOptions('render-function-return-not-a-string'));
      }
      expect(testWrapper).toThrow();
    });
  });

  it('Custom render function without offerModel parameter', () => {
    document.body.innerHTML = '<div class="special-offers"></div>';
    expect.assertions(1);
    return setup().then((offersStorage) => {
      function testWrapper() {
        return new OffersView('.special-offers', offersStorage, getOptions('render-function-without-offerModel-parameter'));
      }
      expect(testWrapper).toThrow();
    });
  });
});

