import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addCard(id) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/payment-methods`, {stripeToken: id}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
      console.log(err)
    });
  });
}
