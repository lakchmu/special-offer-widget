import { MOCK_GET_OFFERS } from './constants';
import { API_END_POINT, API_METHOD_SPECIAL_OFFERS } from '../../constants';

function request(url, method, tokenValue) {
  let result = {data: MOCK_GET_OFFERS, json: () => JSON.parse(result.data)};
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        url === API_END_POINT + API_METHOD_SPECIAL_OFFERS &&
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