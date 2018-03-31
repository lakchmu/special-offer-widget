/* global test, expect */

import OfferModel from '../TBFSpecialOffers/offerModel';
import OffersStorage from '../TBFSpecialOffers/offersStorage';
import { MOCK_GET_OFFERS } from '../TBFSpecialOffers/__mocks__/constants';

function setup() {
  const testOffersList = JSON.parse(MOCK_GET_OFFERS).special_offers;
  return new OffersStorage(testOffersList);
}

test('OffersStorage instance contains array with OfferModel instances', () => {
  const offersStorage = setup();
  expect(offersStorage.list).toBeInstanceOf(Array);
  offersStorage.list.forEach(element => expect(element).toBeInstanceOf(OfferModel));
});
