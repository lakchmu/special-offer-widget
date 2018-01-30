import { MOCK_GET_OFFERS } from './constants';

function request(url, method, tokenValue) {
  let result = {data: MOCK_GET_OFFERS, json: () => JSON.parse(result.data)};
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        url === 'https://app.thebookingfactory.com/api/public/v1/special_offers' &&
        method === 'get' &&
        typeof tokenValue === 'string'
          ? resolve(result)
          : reject({
              error: 'Error data',
            }),
    );
  });
}

export default request;