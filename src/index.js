import getOffers from './TBFSpecialOffers/getOffers';
import OffersStorage from './TBFSpecialOffers/offersStorage';
import OffersView from './TBFSpecialOffers/offersView';

function TBFSpecialOffer(targetDivElement, token, filters, options) {
  getOffers(token, filters).then( response => {
    const offersStorage = new OffersStorage( JSON.parse(response).special_offers );
    const offersView = new OffersView(targetDivElement, offersStorage, options);
  });
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;