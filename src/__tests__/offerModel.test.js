import OfferModel from '../TBFSpecialOffers/offerModel';
import { MOCK_GET_OFFERS } from '../TBFSpecialOffers/__mocks__/constants';

function setup() {
  const testOffer = JSON.parse(MOCK_GET_OFFERS).special_offers[0];
  return new OfferModel(testOffer);
}

test('Test OfferModel class', () => {
  const offerModel = setup();
  expect(typeof offerModel.title).toBe('string');
  expect(typeof offerModel.shortDescription).toBe('string');
  expect(typeof offerModel.description).toBe('string');
  expect(offerModel.dateFrom).toBeInstanceOf(Date);
  expect(offerModel.dateTo).toBeInstanceOf(Date);
  expect(typeof offerModel.imageLink).toBe('string');
  expect(typeof offerModel.discountValue).toBe('string');
  expect(typeof offerModel.discountType).toBe('string');
  expect(typeof offerModel.bookingLink).toBe('string');
});
