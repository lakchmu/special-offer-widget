jest.mock('../TBFSpecialOffers/request');

import getOffers from '../TBFSpecialOffers/getOffers';
import OfferModel from '../TBFSpecialOffers/offerModel';
import { MOCK_GET_OFFERS } from '../TBFSpecialOffers/__mocks__/constants';

test('class OfferModel', () => {
  const token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  const filters = {};
  getOffers(token, filters).then( response => {
    let testOffer = JSON.parse(MOCK_GET_OFFERS).special_offers[0];
    let offerModel = new OfferModel(testOffer);
    expect(offerModel.title).toBe(testOffer.title);
    expect(offerModel.shortDescription).toBe(testOffer.short_description);
    expect(offerModel.description).toBe(testOffer.description);
    expect(offerModel.dateFrom).toBe(testOffer.date_from);
    expect(offerModel.dateTo).toBe(testOffer.date_to);
    expect(offerModel.imageLink).toBe(testOffer.image);
    expect(offerModel.discountValue).toBe(testOffer.discount_value);
    expect(offerModel.discountType).toBe(testOffer.discount_type);
    expect(offerModel.bookingLink).toBe(testOffer.link);
  });
});