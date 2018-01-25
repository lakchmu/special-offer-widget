jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';
import OffersStorage from '../TBFSpecialOffers/offersStorage';
import { MOCK_GET_OFFERS } from '../constants';

test('class OfferModel', () => {
  const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  const filters = {};
  getOffers(token, filters).then( response => {
    let testOffersList = JSON.parse(MOCK_GET_OFFERS).special_offers;
    let testOffer = testOffersList[0];
    let offersStorage = new OffersStorage(testOffersList);
    expect(offersStorage.list[0].title).toBe(testOffersList[0].title);
    expect(offersStorage.list[0].shortDescription).toBe(testOffersList[0].short_description);
    expect(offersStorage.list[0].description).toBe(testOffersList[0].description);
    expect(offersStorage.list[0].dateFrom).toBe(testOffersList[0].date_from);
    expect(offersStorage.list[0].dateTo).toBe(testOffersList[0].date_to);
    expect(offersStorage.list[0].imageLink).toBe(testOffersList[0].image);
    expect(offersStorage.list[0].discountValue).toBe(testOffersList[0].discount_value);
    expect(offersStorage.list[0].discountType).toBe(testOffersList[0].discount_type);
    expect(offersStorage.list[0].bookingLink).toBe(testOffersList[0].link);
  });
});