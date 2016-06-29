import bluebird from 'bluebird';
import xhr from '../utility/xhr';
import {BASE} from '../constants';

export async function addListing(listing) {
  return new bluebird((resolve, reject) => {
    xhr('POST', `${BASE}/me/listings`, {listing}).then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    });
  });
}


