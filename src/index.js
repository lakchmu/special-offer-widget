import getOffers from './TBFSpecialOffers/getOffers';
import OffersView from './TBFSpecialOffers/offersView';

function TBFSpecialOffer(
  targetDivElement,
  token,
  options = { defaultCSS: true, defaultEvents: true },
  filters = {},
) {
  try {
    getOffers(token, filters)
      .then(offersStorage => new OffersView(targetDivElement, offersStorage, options))
      .catch(error => console.warn(error, 'TBFSpecialOffer: something going wrong!'));
  } catch (error) {
    console.warn(error);
  }
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;
