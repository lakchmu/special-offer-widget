import request from './request';
import OffersStorage from './offersStorage';
import { API_END_POINT, API_METHOD_SPECIAL_OFFERS } from '../constants';

function getOffers(token, filters) {
  const url = API_END_POINT + API_METHOD_SPECIAL_OFFERS;
  return request(url, 'get', token)
    .then(response => response.json())
    .then(json => new OffersStorage(json.special_offers));
}

export default getOffers;
