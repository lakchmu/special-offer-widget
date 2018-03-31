import getOffers from './TBFSpecialOffers/getOffers';
import OffersView from './TBFSpecialOffers/offersView';

function TBFSpecialOffer(
  targetDivElement,
  token,
  options = { defaultCSS: true, defaultEvents: true },
) {
  try {
    getOffers(token)
      .then(offersStorage => new OffersView(targetDivElement, offersStorage, options))
      .catch(error => console.warn(error, 'TBFSpecialOffer: something going wrong!'));
  } catch (error) {
    console.warn(error);
  }
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;
