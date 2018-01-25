import getOffers from './TBFSpecialOffers/getOffers';
import OffersStorage from './TBFSpecialOffers/offersStorage';

function TBFSpecialOffer(token, filters) {
  getOffers(token, filters).then( response => {
    let offersStorage = new OffersStorage( JSON.parse(response).special_offers );
    console.log(offersStorage);
  });
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;