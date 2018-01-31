import OfferModel from '../TBFSpecialOffers/offerModel';
import OffersStorage from '../TBFSpecialOffers/offersStorage';
import { MOCK_GET_OFFERS } from '../TBFSpecialOffers/__mocks__/constants';

test('OffersStorage instance contains array with OfferModel instances', () => {
  const testOffersList = JSON.parse(MOCK_GET_OFFERS).special_offers;
  const offersStorage = new OffersStorage(testOffersList);
  expect(offersStorage.list).toBeInstanceOf(Array);
  if (offersStorage.list instanceof Array) {
    offersStorage.list.forEach(element => expect(element).toBeInstanceOf(OfferModel));
  }
});
