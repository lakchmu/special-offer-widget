import getOffers from './TBFSpecialOffers/getOffers';

function TBFSpecialOffer(token, filters) {
  getOffers(token, filters).then( offersList => {
    console.log( offersList );
  });
}

window.TBFSpecialOffer = TBFSpecialOffer;
export default TBFSpecialOffer;