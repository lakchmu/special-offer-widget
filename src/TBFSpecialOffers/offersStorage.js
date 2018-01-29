import OfferModel from './offerModel';

class OffersStorage {
  constructor(offersList) {
    this.list = offersList.map(offer => new OfferModel(offer));
  }
}

export default OffersStorage;
