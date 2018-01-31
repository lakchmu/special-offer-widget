import OfferModel from '../TBFSpecialOffers/offerModel';
import { MOCK_GET_OFFERS } from '../TBFSpecialOffers/__mocks__/constants';

test('Test OfferModel class', () => {
  const testOffer = JSON.parse(MOCK_GET_OFFERS).special_offers[0];
  const offerModel = new OfferModel(testOffer);
  expect(typeof offerModel.title).toBe('string');
  expect(typeof offerModel.shortDescription).toBe('string');
  expect(typeof offerModel.description).toBe('string');
  expect(typeof offerModel.dateFrom).toBe('string');
  expect(typeof offerModel.dateTo).toBe('string');
  expect(typeof offerModel.imageLink).toBe('string');
  expect(typeof offerModel.discountValue).toBe('string');
  expect(typeof offerModel.discountType).toBe('string');
  expect(typeof offerModel.bookingLink).toBe('string');
});
