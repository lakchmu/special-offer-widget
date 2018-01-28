import request from './request';
import OffersStorage from './offersStorage';

function getOffers(token, filters) {
  const endPoint = 'https://app.thebookingfactory.com/api/public/v1/special_offers';
  return request(endPoint, 'get', 'token', token)
    .then(function(response) {
      return response.json();
    })
    .then(json => {
      return new OffersStorage(json.special_offers);
    });
}

export default getOffers;