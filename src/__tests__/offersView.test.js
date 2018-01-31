jest.mock('../TBFSpecialOffers/request');
jest.mock('../index.css');

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersView from '../TBFSpecialOffers/offersView';

const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
const filters = {};
const options = { defaultCSS: true, defaultEvents: true };

it('Test OffersView class', () => {
  expect.assertions(19);
  // Set up our document body
  document.body.innerHTML = '<div class="special-offers"></div>';
  return getOffers(token, filters)
    .then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, options);
      const root = document.querySelector('.special-offers');

      // Test render function
      // Test 'Offer' element
      expect(root.querySelector('.special-offers .tbf-so-offer')).not.toBeNull();

      // Test 'Header' element
      expect(root.querySelector('.special-offers .tbf-so-offer__header')).not.toBeNull();

      // Test 'Title' element
      const title = root.querySelector('.special-offers .tbf-so-offer__title');
      expect(title).not.toBeNull();
      if (title) {
        expect(title.textContent).toBe(offersStorage.list[0].title);
      }

      // Test 'Short description' element
      const shortDescription = root.querySelector('.special-offers .tbf-so-offer__short-description');
      expect(shortDescription).not.toBeNull();
      if (shortDescription) {
        expect(shortDescription.textContent).toBe(offersStorage.list[0].shortDescription);
      }

      // Test 'Content' element
      expect(root.querySelector('.special-offers .tbf-so-offer__content')).not.toBeNull();

      // Test 'Date from' and 'Date to' elements
      const dates = root.querySelector('.special-offers .tbf-so-offer__dates');
      expect(dates).not.toBeNull();
      if (dates) {
        expect(dates.textContent).toBe(`From ${offersStorage.list[0].dateFrom} to ${offersStorage.list[0].dateTo}`);
      }

      // Test 'Description' element
      const description = root.querySelector('.special-offers .tbf-so-offer__description');
      expect(description).not.toBeNull();
      if (description) {
        expect(description.textContent).toBe(offersStorage.list[0].description);
      }

      // Test 'Image' element
      const image = root.querySelector('.special-offers .tbf-so-offer__image');
      expect(image).not.toBeNull();
      if (image) {
        expect(image.src).toBe(offersStorage.list[0].imageLink);
      }

      // Test 'Discount' element
      const discount = root.querySelector('.special-offers .tbf-so-offer__discount');
      expect(discount).not.toBeNull();
      if (discount) {
        expect(discount.textContent).toBe(`${offersStorage.list[0].discountValue} ${offersStorage.list[0].discountType}`);
      }

      // Test 'BookingLink' element
      const bookingLink = root.querySelector('.special-offers .tbf-so-offer__booking-link');
      expect(bookingLink).not.toBeNull();
      if (bookingLink) {
        expect(bookingLink.href).toBe(offersStorage.list[0].bookingLink);
      }

      // Test events
      const offer = root.querySelector('.tbf-so-offer');
      offer.click();
      expect(offer.classList.contains('tbf-so-open')).toBeTruthy();
      offer.click();
      expect(offer.classList.contains('tbf-so-open')).not.toBeTruthy();
    });
});

it('Test using custom render function', () => {
  expect.assertions(3);
  // Set up our document body
  document.body.innerHTML = '<div class="special-offers"></div>';
  return getOffers(token, filters)
    .then((offersStorage) => {
      const offersView = new OffersView('.special-offers', offersStorage, options);
      const root = document.querySelector('.special-offers');

      options.renderTemplate = (offerModel) => {
        const { title } = offerModel;

        const template = `
          <div class="tbf-so-offer">
              <div class="tbf-so-offer__title">${title}</div>
          </div>
        `;
        return template;
      };

      // Test custom render function
      expect(root.querySelector('.special-offers .tbf-so-offer')).not.toBeNull();
      const title = root.querySelector('.special-offers .tbf-so-offer__title');
      expect(title).not.toBeNull();
      if (title) {
        expect(title.textContent).toBe(offersStorage.list[0].title);
      }
    });
});
