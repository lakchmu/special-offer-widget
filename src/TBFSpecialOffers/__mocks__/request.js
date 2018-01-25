import { MOCK_GET_OFFERS } from '../../constants';

const specialOffers = MOCK_GET_OFFERS;

function request(url, method, headerName, headerValue) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        url === 'https://app.thebookingfactory.com/api/public/v1/special_offers' &&
        method === 'get' &&
        headerName === 'token'
          ? resolve(specialOffers)
          : reject({
              error: 'Error data',
            }),
    );
  });
}

export default request;