import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addAddress(address) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/addresses/add`, {address}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}