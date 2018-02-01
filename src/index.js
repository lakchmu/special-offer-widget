import getOffers from './TBFSpecialOffers/getOffers';
import OffersView from './TBFSpecialOffers/offersView';

function TBFSpecialOffer(targetDivElement, token, filters, options) {
  getOffers(token, filters)
    .then(offersStorage => new OffersView(targetDivElement, offersStorage, options))
    .catch(error => console.warn(error, 'TBFSpecialOffer: Something going wrong!'));
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;
