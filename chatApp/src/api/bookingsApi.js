import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function cancelBooking(id) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/bookings/${id}/cancel`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}


export async function dropBooking(id) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/bookings/${id}/drop`).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}
