import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addAvailability(availability) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/availability`, {availability}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}
