import request from './request';

function getOffers(token, filters) {
  const endPoint = 'https://app.thebookingfactory.com/api/public/v1/special_offers';
  return request(endPoint, 'get', 'token', token).then( offersList => offersList );
}

export default getOffers;