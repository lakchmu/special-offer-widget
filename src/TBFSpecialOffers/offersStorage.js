import OfferModel from './offerModel';

class OffersStorage {
  constructor(offersList) {
    this.list = [];
    offersList.map(offer => this.list.push( new OfferModel(offer) ) );
  }
}

export default OffersStorage;