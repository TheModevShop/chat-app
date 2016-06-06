import bluebird from 'bluebird';
import tree from 'state/StateTree';
import xhr from 'utility/xhr';
import {BASE} from '../constants';

const account = tree.select(['account']);
const preferences = tree.select(['preferences']);

export async function createAccount(data) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/users`, data).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}

export async function fetchToken(data) {
  return new bluebird((resolve, reject) => {
    data.type = 'local';
    xhr('POST', `${BASE}/auth/local`, data).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log('err')
    });
  });
}


// export function fetchPreferences(data) {
// }
